import itertools

import Levenshtein
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from scipy.sparse import csr_matrix

app = Flask(__name__)
cors = CORS(app, resources={r"/getMsg": {"origins": "*"}})
cors_1 = CORS(app, resources={r"/getData": {"origins": "*"}})


def leven_dist(seq1, seq2):
    return Levenshtein.distance(seq1, seq2)


def hamming_dist(seq1, seq2):
    return Levenshtein.hamming(seq1, seq2)


def get_dist_mat(data: list):
    df_list = []
    index = []
    comb = itertools.combinations_with_replacement(enumerate(data), 2)
    for (row, s1), (col, s2) in comb:
        dist = hamming_dist(s1, s2)
        index.append((dist, row, col))
        df_list.append((s1, s2, dist))
    dist_csr = csr_matrix((np.array(index).T[0], (np.array(index).T[1], np.array(index).T[2])))
    return dist_csr, df_list


def get_dist_mat_seq(data: list, seq, dist_threshold=2):
    seq = seq
    index = []
    for s in data:
        dist = leven_dist(s, seq)
        if dist < dist_threshold:
            index.append(s)

    return index


df_single = pd.read_csv('C:/Users/Dell/Desktop/single.csv').loc[:, 'Vgene':]
df_single['length'] = df_single.CDR3.apply(lambda x: len(x))
all_seqs = df_single.CDR3.values.tolist()


def get_len(species, len_range):
    """

    :param species: ['Human','Mouse','Cattle']
    :param len_range:
    :return: length data
    """
    df = df_single[df_single['Species'] == species].reset_index(drop=True)
    mina, maxa = len_range
    df_gene_len = {}
    for j in df['Gene'].unique():
        df_T = df[df['Gene'] == j]
        df_len = pd.DataFrame()
        for i in df_T['Cate'].unique():
            df_1 = pd.DataFrame(
                df_T[df_T['Cate'] == i].CDR3.apply(lambda x: len(x)).value_counts()).reset_index()
            df_1.columns = ['index', i]
            df_1 = df_1[(df_1['index'] > mina) & (df_1['index'] < maxa)].set_index('index')[[i]].apply(
                lambda x: x / sum(x))
            df_len = pd.concat([df_len, df_1], axis=1).fillna(0)
        df_gene_len[j] = df_len

    return pd.DataFrame.from_dict(df_gene_len, orient='index').T.to_json()


def get_sankey(species, cate):
    """

    :param species: ['Human','Mouse','Cattle']
    :return: sankey data
    """
    dca = {}
    cate = cate
    df = df_single[df_single['Species'] == species].reset_index(drop=True)

    df1_temp = df[df['Cate'] == cate]
    for i in ['TRA', 'TRB']:
        df1t = pd.DataFrame(df1_temp[['Vgene', 'Jgene']][df1_temp['Gene'] == i].value_counts()).reset_index()
        df1t.columns = ['source', 'target', 'value']
        if i == 'TRB':
            df1t_out = df1t[df1t['value'] > np.percentile(df1t[['value']], 50)]
        else:
            df1t_out = df1t
        dca[i] = df1t_out
        dca[i + 'Gene'] = pd.DataFrame(
            df1t_out['source'].unique().tolist() + df1t_out['target'].unique().tolist(),
            columns=['name'])
    return pd.DataFrame.from_dict(dca, orient='index').T.to_json(orient='records')


def get_graph(species, cate, show_length=15):
    dchumanb_15 = {}
    nodes_df = pd.DataFrame()
    links_df = pd.DataFrame()
    # categories = pd.DataFrame(columns=['name'])
    seqs = df_single[
        (df_single['Species'] == species) & (df_single['Gene'] == 'TRB') & (df_single['Cate'] == cate) & (
                    df_single['length'] == show_length)].CDR3.values.tolist()
    links = pd.DataFrame(get_dist_mat(seqs)[1], columns=['source', 'target', 'value'])
    links = links[links['value'] == 1].reset_index(drop=True)
    nodes = pd.DataFrame(set(links.source.tolist()) | set(links.target.tolist()))
    nodes.columns = ['name']
    nodes['value'] = show_length
    # nodes_df = pd.concat([nodes_df, df_15_out]).reset_index(drop=True)
    # categories = categories.append([{'name': str(i)}], ignore_index=True)

    dchumanb_15['nodes'] = nodes
    dchumanb_15['links'] = links
    # dchumanb_15['categories'] = categories
    # dchumanb_15['nodes']['category'] = dchumanb_15['nodes']['category'].apply(
    #     lambda x: dict(categories.assign(index=categories.index).values)[str(x)])
    return pd.DataFrame.from_dict(dchumanb_15, orient='index').T.to_json(orient='records')


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/getData', methods=['GET', 'Post'])
def home_1():
    if request.method == 'POST':
        data = request.get_json()
        if data['identifier'] == 'length':
            return get_len(data['species'], data['value'])
        elif data['identifier'] == 'sankey':
            return get_sankey(data['species'], data['cate'])
        elif data['identifier'] == 'graph':
            print(data)
            return get_graph(species=data['species'], cate=data['cate'], show_length=data['length'])
    else:
        return 'success'


@app.route('/getMsg', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        data2 = request.get_json()

        return jsonify(get_dist_mat_seq(all_seqs, seq=data2['info']))
    else:
        return jsonify('Hello')


if __name__ == '__main__':
    app.run(debug=True)
