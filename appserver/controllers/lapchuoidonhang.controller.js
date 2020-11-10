const models = require('../models/index')
const fetch = require('node-fetch');
const Moment = require('moment')
const bingKey = 'AsM4wGyTSNX5s9JyVa62Kwrd8Yuis4IsMMfbnjNIX3J6ol8ldiLIUHWW9DXYuQNa';
const url = `https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?key=${bingKey}`;

//b1 select don hang theo khung gio
const getDonhang = async (req, res) => {
    const { id, timerange } = req.body;
    let dataPost = {
        id: id,
        timerange: {
            timeStart: timerange.timeStart,
            timeEnd: timerange.timeEnd
        }
    }
    let settings = {
        method: "POST",
        body: JSON.stringify(dataPost),
        headers: { 'Content-Type': 'application/json' },
    };
    let dataFetch = await fetch('https://servertlcn.herokuapp.com/diachi/search', settings)
    let dataRes = await dataFetch.json();
    if (dataRes.length > 0) {
        let matrixData = await getDistance(dataRes.data)

        var startPoint = Object.keys(matrixData)[0];
        let dataRender = await dijkstra(matrixData, startPoint, "10:00")
        console.log(dataRender)
        return new Promise((resolve, reject) => {
            res.json({
                result: 'ok',
                data: dataRender,
            })
        })
    } else {
        return new Promise((resolve, reject) => {
            res.json({
                result: 'fail',
                data: dataRender,
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
function dijkstra(graph, s, timeStart) {
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
                var t = addTimes(ndur, adj[a].duration+10)
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
        solutions[nearest].dur = nearestDuration
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
const getRoute = async (req, res) => {
    var map = {
        a: { route: { e: 1, b: 19, g: 3 }, timeRange: { start: "9:00", end: "10:00" } },
        b: { route: { a: 12, c: 11 }, timeRange: { start: "11:00", end: "13:00" } },
        c: { route: { b: 14, d: 11 }, timeRange: { start: "9:00", end: "12:00" } },
        d: { route: { c: 111, e: 123 }, timeRange: { start: "15:00", end: "17:00" } },
        e: { route: { d: 142, a: 121 }, timeRange: { start: "8:00", end: "11:00" } },
        f: { route: { g: 41, h: 124 }, timeRange: { start: "7:00", end: "9:00" } },
        g: { route: { a: 13, f: 15 }, timeRange: { start: "7:00", end: "10:00" } },
        h: { route: { f: 51 }, timeRange: { start: "9:00", end: "11:00" } },
    }
    var timeStart = "8:00";
    var start = 'a';
    var solutions = dijkstra(map, start, timeStart);

    for (var s in solutions) {
        if (!solutions[s]) continue;
        solutions[s].push("total distance: " + solutions[s].dist);
    }
    return new Promise((resolve, reject) => {
        res.json(solutions)
    })
};
module.exports = {
    getDistance,
    getDonhang,
    getRoute
}