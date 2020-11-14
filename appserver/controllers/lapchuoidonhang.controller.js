const models = require('../models/index')
const fetch = require('node-fetch');
const Moment = require('moment')
const bingKey = 'AsM4wGyTSNX5s9JyVa62Kwrd8Yuis4IsMMfbnjNIX3J6ol8ldiLIUHWW9DXYuQNa';
const url = `https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?key=${bingKey}`;

//b1 select don hang theo khung gio
const getDonhang = async (req, res) => {
    var mapData;
    var timeStart;
    var resultData = [];

    let settings = {
        method: "GET",
        // body: JSON.stringify(dataPost),
        // headers: { 'Content-Type': 'application/json' },
    };
    let dataFetch = await fetch('https://giaohangapi.herokuapp.com/giaohang', settings)
    let dataReceive = await dataFetch.json();

    mapData = dataReceive.data
    timeStart = dataReceive.timeStart

    if (mapData.length > 0 && timeStart != "") {

        const promises = mapData.map(async (e) => {
            let matrixData = await getDistance(e)
            //let dataRender = dijkstra(matrixData, timeStart)
            let test = getroute(matrixData, timeStart)
            resultData.push(test)
        })
        const results = await Promise.all(promises)

        return new Promise((resolve, reject) => {
            res.json({
                result: 'ok',
                data: resultData,
            })
        })
    } else {
        return new Promise((resolve, reject) => {
            res.json({
                result: 'fail',
                data: resultData,
            })
        })
    }
}

async function getDistance(listCoord) {
    const listCoordRequest = {
        "origins": [],
        "destinations": [],
        "travelMode": "driving"
    }
    listCoord.map(e => {
        let coord = { "latitude": e.KinhDo, "longitude": e.ViDo }
        listCoordRequest.origins.push(coord)
        listCoordRequest.destinations.push(coord)
    })
    var matrixData = {};
    //fetch api
    let settings = {
        method: "POST",
        body: JSON.stringify(listCoordRequest),
        headers: { 'Content-Type': 'application/json' },
    };
    let data = await fetch(url, settings)
    let matrix = await data.json();
    let dataMatrix = matrix.resourceSets[0].resources[0].results
    //lap bang trong so 
    let checkrow = 0;
    let dataperRow = {};
    for (let i of listCoord) {
        let timeStart = i.ThoiGianBatDau.split("T")[1].replace("Z", "").substr(0, 5);
        let timeEnd = i.ThoiGianKetThuc.split("T")[1].replace("Z", "").substr(0, 5);
        dataperRow = {};
        for (let e of dataMatrix) {
            if (checkrow < e.originIndex) {
                dataMatrix.splice(0, listCoord.length)
                break;
            }
            else {
                if (e.travelDistance != 0) {
                    let temp = { distance: e.travelDistance, duration: e.travelDuration };
                    dataperRow['iddiachi' + listCoord[e.destinationIndex].id] = temp;
                }
            }
        }
        checkrow++;
        matrixData['iddiachi' + i.id] = {
            route: dataperRow,
            timeRange: {
                start: timeStart,
                end: timeEnd
            }
        };
    }
    return matrixData

};
// function timediff(start, end) {
//     start = start.split(":");
//     end = end.split(":");
//     var startDate = new Date(0, 0, 0, start[0], start[1], 0);
//     var endDate = new Date(0, 0, 0, end[0], end[1], 0);
//     var diff = endDate.getTime() - startDate.getTime();
//     var hours = Math.floor(diff / 1000 / 60 / 60);
//     diff -= hours * 1000 * 60 * 60;
//     var minutes = Math.floor(diff / 1000 / 60);

//     if (hours < 0)
//         hours = hours + 24;

//     return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes;
// }
function addTimes(start, duration) {
    if (duration >= 60) {
        var hours = Math.floor(duration / 60);
        var minutes = duration % 60;
        duration = hours + ":" + minutes
    }
    else {
        duration = "00:" + duration
    }
    let totalH = 0;
    let totalM = 0;
    start = start.split(":");
    duration = duration.split(":");

    totalH += parseInt(start[0], 10) + parseInt(duration[0], 10);
    totalM += parseInt(start[1], 10) + parseInt(duration[1], 10);

    if (totalM >= 60) {
        totalH += Math.floor(totalM / 60);
        totalM = totalM % 60;
    }
    return totalH + ":" + totalM;
}
function checkTime(time, timeRange) {
    var y = new Date('01/01/2001 ' + time).getTime();

    var a = new Date('01/01/2001 ' + timeRange.start).getTime();
    var b = new Date('01/01/2001 ' + timeRange.end).getTime();
    if (y < Math.max(a, b) && y >= Math.min(a, b)) {
        return true
    }
    return false
}
function dijkstra(graph, timeStart, destination) {
    var s = Object.keys(graph)[0];
    var solutions = {};
    solutions[s] = [];
    solutions[s].dist = 0;
    solutions[s].dur = timeStart;
    while (true) {
        var parent = null;
        var nearest = null;
        var nearestDuration = null;
        var dist = Infinity;

        for (var n in solutions) {
            var ndist = solutions[n].dist;
            var ndur = solutions[n].dur;
            var adj = graph[n].route;

            for (var a in adj) {
                if (solutions[a])
                    continue;
                var d = adj[a].distance + ndist;
                var t = addTimes(ndur, adj[a].duration + 10)

                if (!checkTime(t, graph[a].timeRange)) {
                    continue;
                }

                if (d < dist) {
                    parent = solutions[n];
                    nearest = a;
                    nearestDuration = t;
                    dist = d;
                }
            }
        }
        if (dist === Infinity) {
            break;
        }
        solutions[nearest] = parent.concat(nearest);
        solutions[nearest].dist = dist;
        solutions[nearest].dur = nearestDuration;
    }
    let data = []
    for (var n in solutions) {
        let temp = {
            dist: solutions[n].dist,
            estimatedTime: solutions[n].dur,
        }
        temp[n] = solutions[n];
        data.push(temp);
    }
    return data;
}
function getroute(graph, timeStart) {
    var s = Object.keys(graph)[0];
    var solutions = {};
    solutions[s] = [];
    solutions[s].dist = 0;
    solutions[s].dur = timeStart;

    var currentPoint = s;
    var currentDist = 0;
    var currentDur = timeStart;
    let lastDur = timeStart;
    while (true) {
        let adj = graph[currentPoint].route;
        let distCheck = Infinity
        for (var subE in adj) {
            var ndist = adj[subE].distance
            var ndur = addTimes(lastDur, adj[subE].duration + 10)
            if (solutions[subE]) {
                continue;
            }
            if (!checkTime(ndur, graph[subE].timeRange)) {
                continue;
            }
            if (ndist < distCheck) {
                distCheck = ndist;
                currentPoint = subE;
                currentDur = ndur
            }
        }
        if (distCheck == Infinity) {
            break;
        }
        solutions[currentPoint] = [];
        solutions[currentPoint].dist = currentDist;
        solutions[currentPoint].dur = currentDur;
        lastDur = currentDur;
    }
    let dataOutTime = []
    for (var e in graph) {
        if (!solutions[e]) {
            let temp = {
                diachi: e,
                outTime: true
            }
            dataOutTime.push(temp);
        }
        else {
            continue
        }
    }
    let data = [];
    for (var n in solutions) {
        let temp = {
            diachi: n,
            //dist: solutions[n].dist,
            estimatedTime: solutions[n].dur,
        }
        data.push(temp);
    }
    let result = {
        dataInTime: data,
        dataOutTime: dataOutTime
    }
    return result;
}


module.exports = {
    getDistance,
    getDonhang,
}