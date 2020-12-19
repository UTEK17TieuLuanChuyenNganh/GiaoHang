const models = require('../models/index')
const fetch = require('node-fetch');
const Moment = require('moment');
const e = require('express');
const bingKey = 'AsM4wGyTSNX5s9JyVa62Kwrd8Yuis4IsMMfbnjNIX3J6ol8ldiLIUHWW9DXYuQNa';
const url = `https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?key=${bingKey}`;

//b1 select don hang theo khung gio
const getDonhang = async (req, res) => {
    let {
        data, timeStart, plus
    } = req.body;
    var mapData = data;
    var resultData = [];
    if (mapData.length > 0 && timeStart != "") {

        // Với từng cụm đơn hàng, bắt đầu các bước sau:
        const promises = mapData.map(async (e) => {
            // Lấy dữ liệu trọng số khoảng cách giữa các địa chỉ trong cụm đơn hàng
            let matrixData = await getDistance(e)
            //let dataRender = dijkstra(matrixData, timeStart)

            //Sử dụng thuật toán NNA để sắp xếp các đơn hàng theo khoảng cách và thời gian 
            let test = getroute(matrixData, timeStart);
            resultData.push(test)
        })
        const results = await Promise.all(promises)
        //Cập nhật là biến check địa chỉ và địa chỉ được chọn cho đơn hàng
        const promises2 = resultData.map(async (e) => {

            let dataInTime = e.dataInTime
            let dataOutTime = e.dataOutTime
            let dataPostChuoiInTime = {
                Chuoi: JSON.stringify({ chuoidonhang: dataInTime }),
                SoLuong: dataInTime.length,
                ThoiGianBatDau: timeStart,
                isShipped: false,
            }
            let chuoiData = await createChuoi(dataPostChuoiInTime);
            chuoiData = await chuoiData.json();


            //Tao thong bao
            //Tao chuoi intime
            const inTime = dataInTime.map(async (e) => {
                let dataThongbao = {
                    NoiDung: 'Đơn hàng ' + e.donhang.id + ' sẽ được giao đến địa chỉ: ' +
                        e.address.TenDiaChi + ' vào khung giờ (' + e.address.TimeRange + ')',
                    Type: 'giao hang',
                    NguoiDungId: e.reciver.id
                }
                await createThongBao(dataThongbao);
                await updateDonhang(e.donhang, e.address.id, chuoiData.data.id, e.price);
                await updateStatus(e.donhang.id);
            })
            const inTimePromises = await Promise.all(inTime);

            //Tao chuoi outtime
            const outTimeCheck = dataOutTime.map(async (e) => {
                let check = await checkOthersAddress(e.donhang.id, e.address.id)
                if (check) {
                    let index = dataOutTime.indexOf(e)
                    dataOutTime.splice(index, 1);
                }
            })
            const outTimeCheckPromises = await Promise.all(outTimeCheck);
            if (dataOutTime.length > 0) {
                let dataPostChuoiOutTime = {
                    Chuoi: JSON.stringify({ chuoidonhang: dataOutTime }),
                    SoLuong: dataOutTime.length
                }
                let chuoiDataOutTime = await createChuoi(dataPostChuoiOutTime);
                chuoiDataOutTime = await chuoiDataOutTime.json();
                const outTime = dataOutTime.map(async (e) => {
                    let dataThongbao = {
                        NoiDung: 'Đơn hàng ' + e.donhang.id + ' sẽ được giao đến địa chỉ: ' +
                            e.address.TenDiaChi + ' vào khung giờ (' + e.address.TimeRange + ')',
                        Type: 'giao hang',
                        NguoiDungId: e.reciver.id
                    }
                    await createThongBao(dataThongbao);
                    await updateDonhang(e.donhang, e.address.id, chuoiDataOutTime.data.id, e.price);
                    await updateStatus(e.donhang.id);
                })
                const outTimePromises = await Promise.all(outTime);
            }
        })
        const results2 = await Promise.all(promises2)
        //Trả dữ liệu về 
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

    //Request Data Format
    const listCoordRequest = {
        "origins": [],
        "destinations": [],
        "travelMode": "driving"
    }
    listCoord.map(e => {
        let coord = { "latitude": e.ViDo, "longitude": e.KinhDo }
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

    //Format dữ liệu trọng số để phù hợp với bài toán    
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
        let dataDonhang = await getDataDonhang(i.DonhangId);
        matrixData['iddiachi' + i.id] = {
            route: dataperRow,
            timeRange: {
                start: timeStart,
                end: timeEnd
            },
            donhang: {
                id: dataDonhang.data.id,
                TongTien: dataDonhang.data.TongTien,
                TinhTrangDon: dataDonhang.data.TinhTrangDon,
            },
            reciver: {
                id: i.NguoiDung.id,
                name: i.NguoiDung.HoTen,
                SDT: i.NguoiDung.SDT
            },
            address: {
                id: i.id,
                TenDiaChi: i.TenDiaChi,
                KinhDo: i.KinhDo,
                ViDo: i.ViDo,
                TimeRange: timeStart + ' - ' + timeEnd
            }
        };
    }
    return matrixData

};

function timediff(start, end) {
    start = start.split(":");
    end = end.split(":");
    if (parseInt(start[0]) < parseInt(end[0]))
        return true
    else
        return false
}

//Cộng thời gian, trả về chuỗi
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
//Kiểm tra thời gian có nằm trong khung giờ hay không
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
    //Xác định điểm khởi đầu và khởi tạo
    var s = Object.keys(graph)[0];
    var solutions = {};
    solutions[s] = [];
    solutions[s].price = 0;
    solutions[s].dur = timeStart;
    solutions[s].ord = graph[s].donhang;
    solutions[s].reciver = graph[s].reciver;
    solutions[s].address = graph[s].address;
    //Lưu trữ điểm hiện tại và thời gian đã đi
    var currentPoint = s;
    var currentDist = 0;
    var currentDur = timeStart;
    let lastDur = timeStart;


    //Tạo vòng lặp duyệt mảng trọng số
    while (true) {

        //Lấy ra dữ liệu trọng số của điểm hiện tại từ ma trận trọng số        
        let adj = graph[currentPoint].route;
        //console.log(currentPoint,adj)
        //Khởi tạo biến kiểm tra khoảng cách ( tìm min )
        let distCheck = Infinity
        //Duyệt từng khoảng cách so với cái điểm còn lại tìm khoảng cách ngắn nhất
        for (var subE in adj) {
            //Lấy giá trị khoảng cách
            var ndist = adj[subE].distance
            //Tạo biến thời gian ước lượng để tới được điểm tiếp theo 
            //( dùng để kiểm tra có phù hợp khung giờ đưa ra hay không)
            var ndur = addTimes(lastDur, adj[subE].duration + 10)
            //Kiểm tra nếu đã tồn tại điểm đó trong mảng thì duyệt điểm tiếp theo
            //Kiểm tra đánh dấu đã đi qua
            if (solutions[subE]) {
                continue;
            }

            //Kiểm tra nếu thời điểm đến điểm tiếp theo nằm trong khung giờ đã đưa ra
            //Nếu không nằm trong khung giờ đã đưa ra thì duyệt điểm tiếp theo
            //console.log(subE,checkTime(ndur, graph[subE].timeRange),ndist,distCheck)            
            if (!checkTime(ndur, graph[subE].timeRange)) {
                continue;
            }

            //Kiểm tra khoảng cách ngắn nhất trong tất cả các điểm 
            //Chọn làm điểm tiếp theo            
            if (ndist < distCheck) {
                distCheck = ndist;
                currentPoint = subE;
                currentDur = ndur
            }
        }
        //Nếu không tìm thấy điểm tiếp theo thì break vòng lặp, trả về mảng được sắp xếp
        if (distCheck == Infinity) {
            break;
        }

        //Lưu trữ điểm hiện tại, cập nhật lại các biến số và tiếp tục vòng lặp nếu chưa kết thúc
        solutions[currentPoint] = [];
        solutions[currentPoint].price = distCheck * 5000;
        solutions[currentPoint].dur = currentDur;
        solutions[currentPoint].ord = graph[currentPoint].donhang;
        solutions[currentPoint].reciver = graph[currentPoint].reciver;
        solutions[currentPoint].address = graph[currentPoint].address;
        lastDur = currentDur;
    }

    //Những điểm không thỏa điều kiện về thời gian và chưa được sắp xếp
    //Sẽ được lưu vào 1 chuỗi và được đánh dấu là outtime và được tạo thành 1 chuỗi đơn hàng riêng    
    let dataOutTime = []
    for (var e in graph) {
        if (!solutions[e]) {
            let temp = {
                diachi: e,
                outTime: true,
                donhang: graph[e].donhang,
                reciver: graph[e].reciver,
                address: graph[e].address,
            }
            dataOutTime.push(temp);
        }
        else {
            continue
        }
    }
    //Format lại data để response
    let data = [];
    for (var n in solutions) {
        let temp = {
            diachi: n,
            estimatedTime: solutions[n].dur,
            price: solutions[n].price,
            donhang: solutions[n].ord,
            reciver: solutions[n].reciver,
            address: solutions[n].address,
        }
        data.push(temp);
    }
    let result = {
        dataInTime: data,
        dataOutTime: dataOutTime
    }
    return result;
}

function updateStatus(iddonhang) {
    let dataPut = {
        laMacDinh: false
    }
    let settings = {
        method: "PUT",
        body: JSON.stringify(dataPut),
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('https://servertlcn.herokuapp.com/diachi/' + iddonhang + '/update', settings);
}
function updateDonhang(donhang, iddiachi, idchuoi, price) {
    let dataPut = {
        TienVanChuyen: price,
        TongTien: Number(donhang.TongTien) + Number(price),
        DiaChiId: iddiachi,
        ChuoiGiaoHangId: idchuoi,
    }
    let settings = {
        method: "PUT",
        body: JSON.stringify(dataPut),
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('https://servertlcn.herokuapp.com/donhang/' + donhang.id, settings);
}
function createChuoi(data) {
    let dataPost = data;
    let settings = {
        method: "POST",
        body: JSON.stringify(dataPost),
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('https://servertlcn.herokuapp.com/chuoigiaohang', settings);
}
async function getDataDonhang(iddonhang) {
    let settings = {
        method: "GET",
    };
    let dataFetch = await fetch('https://servertlcn.herokuapp.com/donhang/' + iddonhang, settings)
    dataFetch = await dataFetch.json();
    return dataFetch;
}
async function checkOthersAddress(iddonhang, iddiachi) {
    let settings = {
        method: "GET",
    };
    let dataFetch = await fetch('https://servertlcn.herokuapp.com/diachi/' + iddonhang + '/donhang', settings)
    dataFetch = await dataFetch.json();
    var date1;
    var date2;
    var time1;
    var time2;
    var flag = false;
    if (dataFetch.data.length > 1) {
        result = dataFetch.data.filter(r => r.id == iddiachi)
        date1 = new Date(result[0].ThoiGianKetThuc).getDate()
        time1 = result[0].ThoiGianKetThuc.split("T")[1].replace("Z", "").substr(0, 5);
        for (var e in dataFetch.data) {
            date2 = new Date(dataFetch.data[e].ThoiGianBatDau).getDate()
            time2 = dataFetch.data[e].ThoiGianBatDau.split("T")[1].replace("Z", "").substr(0, 5);
            if (date2 - date1 > 0) {
                flag = true; break;
            }
            if (timediff(time1, time2)) {
                flag = true; break;
            }
        }
    }
    return flag;
}
async function createThongBao(data) {
    let dataPost = data;
    let settings = {
        method: "POST",
        body: JSON.stringify(dataPost),
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('https://servertlcn.herokuapp.com/thongbao', settings);
}

module.exports = {
    getDistance,
    getDonhang,
}