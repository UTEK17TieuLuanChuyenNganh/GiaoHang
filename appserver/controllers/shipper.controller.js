const models = require('../models/index')
const Shipper = models.Shipper
const NguoiDung = models.NguoiDung

const createShipper = async (req, res) => {
    let {
        CMND,
        STK,
        Diem,
        PhuongTienVanChuyen,
        NguoiDungId
    } = req.body;
    try {
        let newShipper = await Shipper.create({
            CMND,
            STK,
            Diem,
            PhuongTienVanChuyen,
            NguoiDungId
        }, {
            fields: ["CMND", "STK", "Diem", "PhuongTienVanChuyen", "NguoiDungId"]
        });
        if (newShipper) {
            res.json({
                result: 'ok',
                data: newShipper
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                massage: `Insert a new Shipper failed`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Insert a new Shipper failed. Error: ${error}`
        });
    }
}

const updateShipper = async (req, res) => {
    const { id } = req.params;
    const {
        CMND,
        STK,
        Diem,
        PhuongTienVanChuyen,
        NguoiDungId
    } = req.body;
    try {
        let Shippers = await Shipper.findAll({
            attributes: [
                'id',
                'CMND',
                'STK',
                'Diem',
                'PhuongTienVanChuyen',
                'NguoiDungId'
            ],
            where: {
                id
            }
        });
        if (Shippers.length > 0) {
            Shippers.forEach(async (Shipper) => {
                await Shipper.update({
                    CMND: CMND ? CMND : Shipper.CMND,
                    STK: STK ? STK : Shipper.STK,
                    Diem: Diem ? Diem : Shipper.Diem,
                    PhuongTienVanChuyen: PhuongTienVanChuyen ? PhuongTienVanChuyen : Shipper.PhuongTienVanChuyen,
                    NguoiDungId: NguoiDungId ? NguoiDungId : Shipper.NguoiDungId,
                });
            });
            res.json({
                result: 'ok',
                data: Shippers,
                message: "Update Shipper profile successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: "Cannot find the Shipper to update"
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Cannot update Shipper. Error:${error}`
        });
    }

}

// const disableShipper = async(req, res) => {
//     const { id } = req.params;

//     try {
//         let Shippers = await Shipper.findAll({
//             attributes: [
//                 'id',
//                 'CMND',
//                 'STK',
//                 'Diem',
//                 'Email',
//                 'SDT',
//                 'PhuongTienVanChuyen',
//                 'NguoiDungId',
//                 'laShop',
//             ],
//             where: {
//                 id,
//                 isDisable: false
//             }
//         });
//         if (Shippers.length > 0) {
//             Shippers.forEach(async(Shipper) => {
//                 await Shipper.update({
//                     isDisable: true
//                 });
//             });
//             res.json({
//                 result: 'ok',
//                 data: Shippers,
//                 message: "Disable Shipper profile successfully"
//             });
//         } else {
//             res.json({
//                 result: 'failed',
//                 data: {},
//                 message: "Cannot find the Shipper to disable"
//             });
//         }
//     } catch (error) {
//         res.json({
//             result: 'failed',
//             data: {},
//             message: `Cannot disable Shipper. Error:${error}`
//         });
//     }

// }

// const enableShipper = async(req, res) => {
//     const { id } = req.params;

//     try {
//         let Shippers = await Shipper.findAll({
//             attributes: [
//                 'id',
//                 'CMND',
//                 'STK',
//                 'Diem',
//                 'Email',
//                 'SDT',
//                 'PhuongTienVanChuyen',
//                 'NguoiDungId',
//                 'laShop',
//             ],
//             where: {
//                 id,
//                 isDisable: true
//             }
//         });
//         if (Shippers.length > 0) {
//             Shippers.forEach(async(Shipper) => {
//                 await Shipper.update({
//                     isDisable: false
//                 });
//             });
//             res.json({
//                 result: 'ok',
//                 data: Shippers,
//                 message: "Enable Shipper profile successfully"
//             });
//         } else {
//             res.json({
//                 result: 'failed',
//                 data: {},
//                 message: "Cannot find the Shipper to enable"
//             });
//         }
//     } catch (error) {
//         res.json({
//             result: 'failed',
//             data: {},
//             message: `Cannot enable Shipper. Error:${error}`
//         });
//     }

// }

const getAllShipper = async (req, res) => {
    try {
        const Shippers = await Shipper.findAll({
            attributes: [
                'id',
                'CMND',
                'STK',
                'Diem',
                'PhuongTienVanChuyen',
                'NguoiDungId',
            ]
        });
        res.json({
            result: 'ok',
            data: Shippers,
            length: Shippers.length,
            message: "List Shipper successfully"
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list Shipper. Error:${error}`
        });
    }
}

const getShipperById = async (req, res) => {
    const { id } = req.params;
    try {
        const Shippers = await Shipper.findAll({
            attributes: [
                'id',
                'CMND',
                'STK',
                'Diem',
                'PhuongTienVanChuyen',
                'NguoiDungId',
            ],
            where: {
                id: id,
            },
            include: [{ all: true }]
        });
        if (Shippers.length > 0) {
            res.json({
                result: 'ok',
                data: Shippers[0],
                message: "List Shipper successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: `Cannot find list Shipper to show. Error:${error}`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list Shipper. Error:${error}`
        });
    }
}

//get Shipper by Email
const getShipperByUsername = async (req, res) => {
    const { usn } = req.params;
    try {
        let attributesUS = [
            'HoTen',
            'SinhNhat',
            'GioiTinh',
            'Username',
            'Password',
            'Avatar',
            'Email',
            'SDT',
            'laShop',
            'isDisable'
        ]
        const Shippers = await Shipper.findAll({
            attributes: [
                'id',
                'CMND',
                'STK',
                'Diem',                
                'PhuongTienVanChuyen',
                'NguoiDungId',
            ],
            include: [{
                model: NguoiDung,                
                attributes: attributesUS,
                where: { Username: usn }
            }]
        });
        if (Shippers.length > 0) {
            res.json({
                result: 'ok',
                data: Shippers[0],
                message: "List Shipper successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: `Cannot find list Shipper to show. Error:${error}`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list Shipper. Error:${error}`
        });
    }
}
module.exports = {
    createShipper,
    updateShipper,
    //disableShipper,
    //enableShipper,
    getAllShipper,
    getShipperById,
    getShipperByUsername
}