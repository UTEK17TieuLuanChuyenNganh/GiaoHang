const models = require('../models/index')
const BuuCuc = models.BuuCuc

const createBuuCuc = async(req, res) => {
    let {
        TenChiNhanh,
        DiaChi
    } = req.body;
    try {
        let newBuuCuc = await BuuCuc.create({
            TenChiNhanh,
            DiaChi
        }, {
            fields: ["TenChiNhanh", "DiaChi"]
        });
        if (newBuuCuc) {
            res.json({
                result: 'ok',
                data: newBuuCuc
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                massage: `Insert a new BuuCuc failed`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Insert a new BuuCuc failed. Error: ${error}`
        });
    }
}

const updateBuuCuc = async(req, res) => {
    const { id } = req.params;
    const {
        TenChiNhanh,
        DiaChi,
    } = req.body;
    try {
        let BuuCucs = await BuuCuc.findAll({
            attributes: [
                'id',
                'TenChiNhanh',
                'DiaChi',
            ],
            where: {
                id,
            }
        });
        if (BuuCucs.length > 0) {
            BuuCucs.forEach(async(BuuCuc) => {
                await BuuCuc.update({
                    TenChiNhanh: TenChiNhanh ? TenChiNhanh : BuuCuc.TenChiNhanh,
                    DiaChi: DiaChi ? DiaChi : BuuCuc.DiaChi,
                });
            });
            res.json({
                result: 'ok',
                data: BuuCucs,
                message: "Update BuuCuc successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: "Cannot find the BuuCuc to update"
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Cannot update BuuCuc. Error:${error}`
        });
    }

}

// const disableBuuCuc = async(req, res) => {
//     const { id } = req.params;

//     try {
//         let BuuCucs = await BuuCuc.findAll({
//             attributes: [
//                 'id',
//                 'TenChiNhanh',
//                 'DiaChi',
//             ],
//             where: {
//                 id,
//                 isDisable: false
//             }
//         });
//         if (BuuCucs.length > 0) {
//             BuuCucs.forEach(async(BuuCuc) => {
//                 await BuuCuc.update({
//                     isDisable: true
//                 });
//             });
//             res.json({
//                 result: 'ok',
//                 data: BuuCucs,
//                 message: "Disable BuuCuc profile successfully"
//             });
//         } else {
//             res.json({
//                 result: 'failed',
//                 data: {},
//                 message: "Cannot find the BuuCuc to disable"
//             });
//         }
//     } catch (error) {
//         res.json({
//             result: 'failed',
//             data: {},
//             message: `Cannot disable BuuCuc. Error:${error}`
//         });
//     }

// }

// const enableBuuCuc = async(req, res) => {
//     const { id } = req.params;

//     try {
//         let BuuCucs = await BuuCuc.findAll({
//             attributes: [
//                 'id',
//                 'TenChiNhanh',
//                 'DiaChi',
//                 'GioiTinh',
//                 'Email',
//                 'SDT',
//                 'Username',
//                 'Password',
//                 'laShop',
//             ],
//             where: {
//                 id,
//                 isDisable: true
//             }
//         });
//         if (BuuCucs.length > 0) {
//             BuuCucs.forEach(async(BuuCuc) => {
//                 await BuuCuc.update({
//                     isDisable: false
//                 });
//             });
//             res.json({
//                 result: 'ok',
//                 data: BuuCucs,
//                 message: "Enable BuuCuc profile successfully"
//             });
//         } else {
//             res.json({
//                 result: 'failed',
//                 data: {},
//                 message: "Cannot find the BuuCuc to enable"
//             });
//         }
//     } catch (error) {
//         res.json({
//             result: 'failed',
//             data: {},
//             message: `Cannot enable BuuCuc. Error:${error}`
//         });
//     }

// }

const getAllBuuCuc = async(req, res) => {
    try {
        const BuuCucs = await BuuCuc.findAll({
            attributes: [
                'id',
                'TenChiNhanh',
                'DiaChi',
            ],
            // where: {
            //     isDisable: false
            // }
        });
        res.json({
            result: 'ok',
            data: BuuCucs,
            length: BuuCucs.length,
            message: "List BuuCuc successfully"
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list BuuCuc. Error:${error}`
        });
    }
}

const getBuuCucById = async(req, res) => {
    const { id } = req.params;
    try {
        const BuuCucs = await BuuCuc.findAll({
            attributes: [
                'id',
                'TenChiNhanh',
                'DiaChi',
            ],
            where: {
                id: id
            },
        });
        if (BuuCucs.length > 0) {
            res.json({
                result: 'ok',
                data: BuuCucs[0],
                message: "List BuuCuc successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: `Cannot find list BuuCuc to show. Error:${error}`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list BuuCuc. Error:${error}`
        });
    }
}

module.exports = {
    createBuuCuc,
    updateBuuCuc,
    getAllBuuCuc,
    getBuuCucById,
}