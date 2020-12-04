const models = require('../models/index')
const ChuoiGiaoHang = models.ChuoiGiaoHang

const createChuoiGiaoHang = async (req, res) => {
    let {
        Chuoi,
        SoLuong,
        ThoiGianBatDau,
        isShipped,
        ShipperId,
        BuuCucId,
    } = req.body;
    try {
        let newChuoiGiaoHang = await ChuoiGiaoHang.create({
            Chuoi,
            SoLuong,
            ThoiGianBatDau,
            isShipped,
            ShipperId,
            BuuCucId,
        }, {
            fields: [
                "Chuoi",
                "SoLuong",
                "ThoiGianBatDau",
                "isShipped",
                "ShipperId",
                "BuuCucId",]
        });
        if (newChuoiGiaoHang) {
            res.json({
                result: 'ok',
                data: newChuoiGiaoHang
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                massage: `Insert a new ChuoiGiaoHang failed`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Insert a new ChuoiGiaoHang failed. Error: ${error}`
        });
    }
}

const updateChuoiGiaoHang = async (req, res) => {
    const { id } = req.params;
    const {
        Chuoi,
        SoLuong,
        ThoiGianBatDau,
        isShipped,
        BuuCucId,
        ShipperId,
    } = req.body;
    try {
        let ChuoiGiaoHangs = await ChuoiGiaoHang.findAll({
            attributes: [
                'id',
                'Chuoi',
                'SoLuong',
                'ThoiGianBatDau',
                'isShipped',
                'BuuCucId',
                'ShipperId',
            ],
            where: {
                id: id
            }
        });
        if (ChuoiGiaoHangs.length > 0) {
            ChuoiGiaoHangs.forEach(async (ChuoiGiaoHang) => {
                await ChuoiGiaoHang.update({
                    Chuoi: Chuoi ? Chuoi : ChuoiGiaoHang.Chuoi,
                    SoLuong: SoLuong ? SoLuong : ChuoiGiaoHang.SoLuong,
                    ThoiGianBatDau: ThoiGianBatDau ? ThoiGianBatDau : ChuoiGiaoHang.ThoiGianBatDau,
                    isShipped: isShipped != ChuoiGiaoHang.isShipped ? isShipped : ChuoiGiaoHang.isShipped,
                    BuuCucId: BuuCucId ? BuuCucId : ChuoiGiaoHang.BuuCucId,
                    ShipperId: ShipperId ? ShipperId : null,
                });
            });
            res.json({
                result: 'ok',
                data: ChuoiGiaoHangs,
                message: "Update ChuoiGiaoHang successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: "Cannot find the ChuoiGiaoHang to update"
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Cannot update ChuoiGiaoHang. Error:${error}`
        });
    }

}

// const disableChuoiGiaoHang = async(req, res) => {
//     const { id } = req.params;

//     try {
//         let ChuoiGiaoHangs = await ChuoiGiaoHang.findAll({
//             attributes: [
//                 'id',
//                 'Chuoi',
//                 'SoLuong',
//                 'BuuCucId',
//                 'Email',
//                 'SDT',
//                 'ShipperId',
//                 'Password',
//                 'laShop',
//             ],
//             where: {
//                 id,
//                 isDisable: false
//             }
//         });
//         if (ChuoiGiaoHangs.length > 0) {
//             ChuoiGiaoHangs.forEach(async(ChuoiGiaoHang) => {
//                 await ChuoiGiaoHang.update({
//                     isDisable: true
//                 });
//             });
//             res.json({
//                 result: 'ok',
//                 data: ChuoiGiaoHangs,
//                 message: "Disable ChuoiGiaoHang profile successfully"
//             });
//         } else {
//             res.json({
//                 result: 'failed',
//                 data: {},
//                 message: "Cannot find the ChuoiGiaoHang to disable"
//             });
//         }
//     } catch (error) {
//         res.json({
//             result: 'failed',
//             data: {},
//             message: `Cannot disable ChuoiGiaoHang. Error:${error}`
//         });
//     }

// }

// const enableChuoiGiaoHang = async(req, res) => {
//     const { id } = req.params;

//     try {
//         let ChuoiGiaoHangs = await ChuoiGiaoHang.findAll({
//             attributes: [
//                 'id',
//                 'Chuoi',
//                 'SoLuong',
//                 'BuuCucId',
//                 'Email',
//                 'SDT',
//                 'ShipperId',
//                 'Password',
//                 'laShop',
//             ],
//             where: {
//                 id,
//                 isDisable: true
//             }
//         });
//         if (ChuoiGiaoHangs.length > 0) {
//             ChuoiGiaoHangs.forEach(async(ChuoiGiaoHang) => {
//                 await ChuoiGiaoHang.update({
//                     isDisable: false
//                 });
//             });
//             res.json({
//                 result: 'ok',
//                 data: ChuoiGiaoHangs,
//                 message: "Enable ChuoiGiaoHang profile successfully"
//             });
//         } else {
//             res.json({
//                 result: 'failed',
//                 data: {},
//                 message: "Cannot find the ChuoiGiaoHang to enable"
//             });
//         }
//     } catch (error) {
//         res.json({
//             result: 'failed',
//             data: {},
//             message: `Cannot enable ChuoiGiaoHang. Error:${error}`
//         });
//     }

// }

const getAllChuoiGiaoHang = async (req, res) => {
    try {
        const ChuoiGiaoHangs = await ChuoiGiaoHang.findAll({
            attributes: [
                'id',
                'Chuoi',
                'SoLuong',
                'ThoiGianBatDau',
                'isShipped',
                'BuuCucId',
                'ShipperId',
            ],
            where: {
                ShipperId: null,
                isShipped: false
            }
        });
        res.json({
            result: 'ok',
            data: ChuoiGiaoHangs,
            length: ChuoiGiaoHangs.length,
            message: "List ChuoiGiaoHang successfully"
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list ChuoiGiaoHang. Error:${error}`
        });
    }
}

const getChuoiGiaoHangById = async (req, res) => {
    const { id } = req.params;
    try {
        const ChuoiGiaoHangs = await ChuoiGiaoHang.findAll({
            attributes: [
                'id',
                'Chuoi',
                'SoLuong',
                'ThoiGianBatDau',
                'isShipped',
                'BuuCucId',
                'ShipperId',
            ],
            where: {
                id: id,
            },
        });
        if (ChuoiGiaoHangs.length > 0) {
            res.json({
                result: 'ok',
                data: ChuoiGiaoHangs[0],
                message: "List ChuoiGiaoHang successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: `Cannot find list ChuoiGiaoHang to show. Error:${error}`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list ChuoiGiaoHang. Error:${error}`
        });
    }
}

const getChuoiGiaoHangByIdShipper = async (req, res) => {
    const { id } = req.params;
    try {
        const ChuoiGiaoHangs = await ChuoiGiaoHang.findAll({
            attributes: [
                'id',
                'Chuoi',
                'SoLuong',
                'ThoiGianBatDau',
                'isShipped',
                'BuuCucId',
                'ShipperId',
            ],
            where: {
                ShipperId: id,
                isShipped: false
            },
            include: [{ all: true }],
        });
        if (ChuoiGiaoHangs.length > 0) {
            res.json({
                result: 'ok',
                data: ChuoiGiaoHangs,
                message: "List ChuoiGiaoHang successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: `Cannot find list ChuoiGiaoHang to show. Error:${error}`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list ChuoiGiaoHang. Error:${error}`
        });
    }
}
module.exports = {
    createChuoiGiaoHang,
    updateChuoiGiaoHang,
    getAllChuoiGiaoHang,
    getChuoiGiaoHangById,
    getChuoiGiaoHangByIdShipper
}