const models = require('../models/index')
const LoaiSanPham = models.LoaiSanPham

const createLoaiSanPham = async(req, res) => {
    let {
        TenLoai,
        Hinh,
        MoTa
    } = req.body;
    try {
        let newLoaiSanPham = await LoaiSanPham.create({
            TenLoai,
            Hinh,
            MoTa
        }, {
            fields: ["TenLoai", "Hinh", "MoTa"]
        });
        if (newLoaiSanPham) {
            res.json({
                result: 'ok',
                data: newLoaiSanPham
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                massage: `Insert a new LoaiSanPham failed`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Insert a new LoaiSanPham failed. Error: ${error}`
        });
    }
}

const updateLoaiSanPham = async(req, res) => {
    const { id } = req.params;
    const {
        TenLoai,
        Hinh,
        MoTa
    } = req.body;
    try {
        let LoaiSanPhams = await LoaiSanPham.findAll({
            attributes: [
                'id',
                'TenLoai',
                'Hinh',
                'MoTa'
            ],
            where: {
                id
            }
        });
        if (LoaiSanPhams.length > 0) {
            LoaiSanPhams.forEach(async(LoaiSanPham) => {
                await LoaiSanPham.update({
                    TenLoai: TenLoai ? TenLoai : LoaiSanPham.TenLoai,
                    Hinh: Hinh ? Hinh : LoaiSanPham.Hinh,
                    MoTa: MoTa ? MoTa : LoaiSanPham.MoTa
                });
            });
            res.json({
                result: 'ok',
                data: LoaiSanPhams,
                message: "Update LoaiSanPham successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: "Cannot find the LoaiSanPham to update"
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Cannot update LoaiSanPham. Error:${error}`
        });
    }

}

// const disableLoaiSanPham = async(req, res) => {
//     const { id } = req.params;

//     try {
//         let LoaiSanPhams = await LoaiSanPham.findAll({
//             attributes: [
//                 'id',
//                 'TenLoai',
//                 'Hinh',
//                 'MoTa',
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
//         if (LoaiSanPhams.length > 0) {
//             LoaiSanPhams.forEach(async(LoaiSanPham) => {
//                 await LoaiSanPham.update({
//                     isDisable: true
//                 });
//             });
//             res.json({
//                 result: 'ok',
//                 data: LoaiSanPhams,
//                 message: "Disable LoaiSanPham profile successfully"
//             });
//         } else {
//             res.json({
//                 result: 'failed',
//                 data: {},
//                 message: "Cannot find the LoaiSanPham to disable"
//             });
//         }
//     } catch (error) {
//         res.json({
//             result: 'failed',
//             data: {},
//             message: `Cannot disable LoaiSanPham. Error:${error}`
//         });
//     }

// }

// const enableLoaiSanPham = async(req, res) => {
//     const { id } = req.params;

//     try {
//         let LoaiSanPhams = await LoaiSanPham.findAll({
//             attributes: [
//                 'id',
//                 'TenLoai',
//                 'Hinh',
//                 'MoTa',
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
//         if (LoaiSanPhams.length > 0) {
//             LoaiSanPhams.forEach(async(LoaiSanPham) => {
//                 await LoaiSanPham.update({
//                     isDisable: false
//                 });
//             });
//             res.json({
//                 result: 'ok',
//                 data: LoaiSanPhams,
//                 message: "Enable LoaiSanPham profile successfully"
//             });
//         } else {
//             res.json({
//                 result: 'failed',
//                 data: {},
//                 message: "Cannot find the LoaiSanPham to enable"
//             });
//         }
//     } catch (error) {
//         res.json({
//             result: 'failed',
//             data: {},
//             message: `Cannot enable LoaiSanPham. Error:${error}`
//         });
//     }

// }

const getAllLoaiSanPham = async(req, res) => {
    try {
        const LoaiSanPhams = await LoaiSanPham.findAll({
            attributes: [
                'id',
                'TenLoai',
                'Hinh',
                'MoTa'
            ]
        });
        res.json({
            result: 'ok',
            data: LoaiSanPhams,
            length: LoaiSanPhams.length,
            message: "List LoaiSanPham successfully"
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list LoaiSanPham. Error:${error}`
        });
    }
}

const getLoaiSanPhamById = async(req, res) => {
    const { id } = req.params;
    try {
        const LoaiSanPhams = await LoaiSanPham.findAll({
            attributes: [
                'id',
                'TenLoai',
                'Hinh',
                'MoTa'
            ],
            where: {
                id: id
            },
        });
        if (LoaiSanPhams.length > 0) {
            res.json({
                result: 'ok',
                data: LoaiSanPhams[0],
                message: "List LoaiSanPham successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: `Cannot find list LoaiSanPham to show. Error:${error}`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list LoaiSanPham. Error:${error}`
        });
    }
}
module.exports = {
    createLoaiSanPham,
    updateLoaiSanPham,
    getAllLoaiSanPham,
    getLoaiSanPhamById,
}