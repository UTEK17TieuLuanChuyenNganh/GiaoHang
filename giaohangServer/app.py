# -*- coding: utf-8 -*-
"""
Created on Mon Nov  2 09:04:57 2020

@author: HQ
"""
import flask
from flask import jsonify
import pandas as pd
import numpy as np
#from scipy.cluster.hierarchy import linkage
from sklearn.cluster import AgglomerativeClustering
import requests 
X = np.array([[106,10]])
url = "http://servertlcn.herokuapp.com/lapchuoidonhang/donhang"
r = requests.post(url, json={
        "id":1,
        "timerange":{
                "timeStart":"11/3/2020 8:00",
                "timeEnd":"11/3/2020 11:00"  
                }
        })
data=r.json()
##print(data['data'][0]['Chuoi'])
 #soluong=len(data['data'])
for i in range(0,len(data['data'])):
    X=np.append(X,[[float(data['data'][i]['Kinhdo']),float(data['data'][i]['Vido'])]], axis = 0)
X=np.delete(X,0,axis = 0)
    #linked = linkage(X, 'single')

    #labelList = range(0,soluong)
hc=AgglomerativeClustering(n_clusters=2,affinity='euclidean', linkage='single')
y_hc=hc.fit_predict(X)
app = flask.Flask(__name__)


@app.route('/', methods=['GET'])
def home():
    try:
        return "hello quyen"
    except KeyError:
        return f'Invalid input ({pd.series.index.min()} - {pd.series.index.max()})'

@app.route('/giaohang', methods=['GET'])
def Cluster():
    try:
        return  jsonify({'data':{'cluster1':str(X[y_hc==0]),'cluster2':str(X[y_hc==1])}})
    except KeyError:
        return f'Invalid input ({pd.series.index.min()} - {pd.series.index.max()})'
if __name__ == '__main__':
    app.run()
