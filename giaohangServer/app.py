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
from datetime import datetime
import requests 
import json



now = datetime.now() # current date and time
date=now.strftime("%m/%d/%Y")
timestartdefault=datetime.now()
timerun=datetime.now()
timeafter=datetime.now()
plustime=0
TempA=""
datatemp=""
A=0
y_hc=0

def Cluster(A):
    if(len(A)>1):
        hc=AgglomerativeClustering(n_clusters=2,affinity='euclidean', linkage='single')
        return hc.fit_predict(A)

#xuat cluster thanh json 
def outputdatatojson():
    a='{"data": [[],[]]}'
    data=json.loads(a)
    outputdata=data['data']
    cluster=0
    while(cluster<2):
        for j in range(0,len(A[y_hc==cluster])):
                for i in range(0,len(TempA)):
                    if(A[y_hc==cluster][j][0]==TempA[i][0] and A[y_hc==cluster][j][1]==TempA[i][1]):
                        outputdata[cluster].append(datatemp[i])
        cluster+=1
    return outputdata
def getjsontoarray():
    X = np.array([[106,10]])
    url = "http://servertlcn.herokuapp.com/diachi/search"
    r = requests.post(url, json=setjsontime(timerun, timeafter))
    data=r.json()
    for i in range(0,len(data['data'])):
        X=np.concatenate([X,[[float(data['data'][i]['KinhDo']),float(data['data'][i]['ViDo'])]]])
    X=np.delete(X,0,axis = 0)
    return X

def fplustime(timerun, plustime):
    return timerun.replace(day=timerun.day, 
                           hour=timerun.hour+plustime, 
                           minute=timerun.minute, 
                           second=timerun.second, 
                           microsecond=timerun.microsecond)

def setjsontime(timerun, timeafter):
    return {
            "id":1,
            "timerange":{
                    "timeStart":str(timerun.strftime("%m/%d/%Y %H:%M")),
                    "timeEnd":str(timeafter.strftime("%m/%d/%Y %H:%M")) 
                    }
            }
            
def gettime(timestart,pltime):
    global timestartdefault
    timestartdefault=datetime.strptime(str(date+" " +timestart),'%m/%d/%Y %H:%M')
    global plustime
    plustime=int(pltime)
#timestartdefault=datetime.strptime(date+" 8:00",'%m/%d/%Y %H:%M')
timestartdefault=datetime.strptime("11/03/2020"+" 8:00",'%m/%d/%Y %H:%M')
plustime=3
timerun=timestartdefault
#khoảng thời gian giao hàng
print(timestartdefault.strftime("%m/%d/%Y %H:%M"))
timeafter = fplustime(timerun,plustime)
print(timeafter.strftime("%m/%d/%Y %H:%M"))
#timerun=timeafter
def runcluster():
    global A
    A=getjsontoarray()
    global TempA
    TempA=getjsontoarray()  
    global y_hc
    y_hc=Cluster(A)
    url = "http://servertlcn.herokuapp.com/diachi/search"
    r = requests.post(url, json=setjsontime(timerun, timeafter))
    data=r.json()
    global datatemp
    datatemp=data['data']
    j=outputdatatojson()
    return j

app = flask.Flask(__name__)


@app.route('/', methods=['GET'])
def home():
    try:
        return "hello quyen"
    except KeyError:
        return f'Invalid input ({pd.series.index.min()} - {pd.series.index.max()})'

@app.route('/giaohang', methods=['GET'])
def Clusterr():
    try:
        j=runcluster()
        return  jsonify({'timeStart':timestartdefault.strftime("%H:%M"),'data':j,'plus':plustime})
    except KeyError:
        return f'Invalid input ({pd.series.index.min()} - {pd.series.index.max()})'
    
@app.route('/settime/<string:timestart>/<string:pltime>/', methods=['GET'])
def SetTime(timestart,pltime):
    try:
        gettime(timestart,pltime)
        return  ("đã cài thời gian "+ timestartdefault.strftime("%m/%d/%Y %H:%M") + 
                 " làm giờ giao đầu ngày và "+pltime+" làm thời gian được cộng vào")
    except KeyError:
        return f'Invalid input ({pd.series.index.min()} - {pd.series.index.max()})'


    
if __name__ == '__main__':
    app.run()
