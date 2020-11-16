# -*- coding: utf-8 -*-
"""
Created on Sat Nov 14 16:04:55 2020

@author: HQ
"""

import numpy as np
import matplotlib.pyplot as plt
from scipy.cluster.hierarchy import dendrogram, linkage
import requests
import urllib, json
from sklearn.cluster import AgglomerativeClustering
from flask import Flask,jsonify

X = np.array([[106,10]])
url = "http://servertlcn.herokuapp.com/diachi/search"
r = requests.post(url, json={
        "id":1,
        "timerange":{
                "timeStart":"11/3/2020 8:00",
                "timeEnd":"11/3/2020 11:00"  
                }
})
data=r.json()
    ##print(data['data'][0]['Chuoi'])
soluong=len(data['data'])
for i in range(0,len(data['data'])):
   X=np.append(X,[[float(data['data'][i]['KinhDo']),float(data['data'][i]['ViDo'])]], axis = 0)
X=np.delete(X,0,axis = 0)
#print(X)
labels = range(0, soluong)
plt.figure(figsize=(10, 7))
plt.subplots_adjust(bottom=0)
plt.scatter(X[:,0],X[:,1], label='True Position')
for label, x, y in zip(labels, X[:, 0], X[:, 1]):
    plt.annotate(
        label,
        xy=(x, y), xytext=(-3, 3),
        textcoords='offset points', ha='right', va='bottom')
plt.show()


linked = linkage(X, 'single')

labelList = range(0,soluong)

plt.figure(figsize=(10,7))
dendrogram(linked,
            orientation='top',
            labels=labelList,
            distance_sort='descending',
            show_leaf_counts=True)
plt.show()

hc=AgglomerativeClustering(n_clusters=2,affinity='euclidean', linkage='single')
y_hc=hc.fit_predict(X);
#print(X[y_hc==1][0][0])
#print(X[y_hc==0,0],X[y_hc==0,1])
#print((X[y_hc==0,0],X[y_hc==0,1])[0][1])
#print((X[y_hc==0,0],X[y_hc==0,1])[1][1])
#print(X[y_hc==1,0],X[y_hc==1,1])

plt.scatter(X[y_hc==0,0],X[y_hc==0,1],s=100, c='red', label='Cluster1' )
plt.scatter(X[y_hc==1,0],X[y_hc==1,1],s=100, c='green', label='Cluster2' )
plt.scatter(X[y_hc==2,0],X[y_hc==2,1],s=100, c='blue', label='Cluster3' )
plt.show()
