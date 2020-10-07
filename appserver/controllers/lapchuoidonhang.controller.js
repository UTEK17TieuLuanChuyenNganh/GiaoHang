const models = require('../models/index')
const fetch = require('node-fetch');
const bingKey = 'AsM4wGyTSNX5s9JyVa62Kwrd8Yuis4IsMMfbnjNIX3J6ol8ldiLIUHWW9DXYuQNa';
const listCoord =
    [
        { "latitude": 10.8579009, "longitude": 106.737498 },
        { "latitude": 10.8579009, "longitude": 106.737498 },
        { "latitude": 10.858786, "longitude": 106.7386245 },
        { "latitude": 10.8577416, "longitude": 106.7422418 },
        { "latitude": 10.8577416, "longitude": 106.7422418 },
        { "latitude": 10.8577416, "longitude": 106.7422418 },
        { "latitude": 10.8577943, "longitude": 106.7443661 },
        { "latitude": 10.8570356, "longitude": 106.7472629 },
    ];
const listCoordRequest = {
    "origins": [],
    "destinations": [],
    "travelMode": "driving"
}
listCoord.map(e => {
    listCoordRequest.origins.push(e)
    listCoordRequest.destinations.push(e)
})

const matrixData = [];

const url = `https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?key=${bingKey}`;
const getDistance = async (req, res) => {
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
    let checkrow = dataMatrix[0].originIndex;
    let dataperRow = [];
    for (let e of dataMatrix) {
        try {
            if (checkrow != e.originIndex) {
                matrixData[checkrow] = dataperRow;
                dataperRow = [];
                checkrow = e.originIndex;                
                dataperRow[e.destinationIndex] = e.travelDistance;
            }
            else {
                dataperRow[e.destinationIndex] = e.travelDistance;
            }
        }
        catch (error) {
            console.log('error' + error);
        }
    }
    
    return new Promise((resolve,reject)=>{
        res.json(matrixData)
    })
    
};
module.exports = {
    getDistance,
}