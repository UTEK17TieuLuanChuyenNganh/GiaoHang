const models = require('../models/index')
const DiaChiXacNhan = models.DiaChiXacNhan

const createDiaChiXacNhan = async(req, res) => {
    let {
        ThoiGianUocLuong,
        DiaChiId,
        NguoiDungId,
    } = req.body;
    try {
        let newDiaChiXacNhan = await DiaChiXacNhan.create({
            ThoiGianUocLuong,
            DiaChiId,
            NguoiDungId,
        }, {
            fields: ["ThoiGianUocLuong", "DiaChiId", "NguoiDungId"]
        });
        if (newDiaChiXacNhan) {
            res.json({
                result: 'ok',
                data: newDiaChiXacNhan
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                massage: `Insert a new DiaChiXacNhan failed`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Insert a new DiaChiXacNhan failed. Error: ${error}`
        });
    }
}

const updateDiaChiXacNhan = async(req, res) => {
    const { id } = req.params;
    const {
        ThoiGianUocLuong,
        DiaChiId,
        NguoiDungId
    } = req.body;
    try {
        let DiaChiXacNhans = await DiaChiXacNhan.findAll({
            attributes: [
                'id',
                'ThoiGianUocLuong',
                'DiaChiId',
                'NguoiDungId',
            ],
            where: {
                id,
            }
        });
        if (DiaChiXacNhans.length > 0) {
            DiaChiXacNhans.forEach(async(DiaChiXacNhan) => {
                await DiaChiXacNhan.update({
                    ThoiGianUocLuong: ThoiGianUocLuong ? ThoiGianUocLuong : DiaChiXacNhan.ThoiGianUocLuong,
                    DiaChiId: DiaChiId ? DiaChiId : DiaChiXacNhan.DiaChiId,
                    NguoiDungId: NguoiDungId ? NguoiDungId : DiaChiXacNhan.NguoiDungId,
                });
            });
            res.json({
                result: 'ok',
                data: DiaChiXacNhans,
                message: "Update DiaChiXacNhan successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: "Cannot find the DiaChiXacNhan to update"
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Cannot update DiaChiXacNhan. Error:${error}`
        });
    }

}

// const disableDiaChiXacNhan = async(req, res) => {
//     const { id } = req.params;

//     try {
//         let DiaChiXacNhans = await DiaChiXacNhan.findAll({
//             attributes: [
//                 'id',
//                 'ThoiGianUocLuong',
//                 'DiaChiId',
//                 'NguoiDungId',
//                 'Email',
//                 'SDT',
//                 'Username',
//                 'Password',
//                 'laShop',
//             ],
//             where: {
//                 id,
//                 isDisable: false
//             }
//         });
//         if (DiaChiXacNhans.length > 0) {
//             DiaChiXacNhans.forEach(async(DiaChiXacNhan) => {
//                 await DiaChiXacNhan.update({
//                     isDisable: true
//                 });
//             });
//             res.json({
//                 result: 'ok',
//                 data: DiaChiXacNhans,
//                 message: "Disable DiaChiXacNhan profile successfully"
//             });
//         } else {
//             res.json({
//                 result: 'failed',
//                 data: {},
//                 message: "Cannot find the DiaChiXacNhan to disable"
//             });
//         }
//     } catch (error) {
//         res.json({
//             result: 'failed',
//             data: {},
//             message: `Cannot disable DiaChiXacNhan. Error:${error}`
//         });
//     }

// }

// const enableDiaChiXacNhan = async(req, res) => {
//     const { id } = req.params;

//     try {
//         let DiaChiXacNhans = await DiaChiXacNhan.findAll({
//             attributes: [
//                 'id',
//                 'ThoiGianUocLuong',
//                 'DiaChiId',
//                 'NguoiDungId',
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
//         if (DiaChiXacNhans.length > 0) {
//             DiaChiXacNhans.forEach(async(DiaChiXacNhan) => {
//                 await DiaChiXacNhan.update({
//                     isDisable: false
//                 });
//             });
//             res.json({
//                 result: 'ok',
//                 data: DiaChiXacNhans,
//                 message: "Enable DiaChiXacNhan profile successfully"
//             });
//         } else {
//             res.json({
//                 result: 'failed',
//                 data: {},
//                 message: "Cannot find the DiaChiXacNhan to enable"
//             });
//         }
//     } catch (error) {
//         res.json({
//             result: 'failed',
//             data: {},
//             message: `Cannot enable DiaChiXacNhan. Error:${error}`
//         });
//     }

// }

const getAllDiaChiXacNhan = async(req, res) => {
    try {
        const DiaChiXacNhans = await DiaChiXacNhan.findAll({
            attributes: [
                'id',
                'ThoiGianUocLuong',
                'DiaChiId',
                'NguoiDungId',
            ],
            // where: {
            //     isDisable: false
            // }
        });
        res.json({
            result: 'ok',
            data: DiaChiXacNhans,
            length: DiaChiXacNhans.length,
            message: "List DiaChiXacNhan successfully"
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list DiaChiXacNhan. Error:${error}`
        });
    }
}

const getDiaChiXacNhanById = async(req, res) => {
    const { id } = req.params;
    try {
        const DiaChiXacNhans = await DiaChiXacNhan.findAll({
            attributes: [
                'id',
                'ThoiGianUocLuong',
                'DiaChiId',
                'NguoiDungId',
            ],
            where: {
                id: id,
            },
        });
        if (DiaChiXacNhans.length > 0) {
            res.json({
                result: 'ok',
                data: DiaChiXacNhans[0],
                message: "List DiaChiXacNhan successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: `Cannot find list DiaChiXacNhan to show. Error:${error}`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list DiaChiXacNhan. Error:${error}`
        });
    }
}

module.exports = {
    createDiaChiXacNhan,
    updateDiaChiXacNhan,
    getAllDiaChiXacNhan,
    getDiaChiXacNhanById,
}