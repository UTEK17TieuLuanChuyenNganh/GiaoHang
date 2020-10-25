const models = require('../models/index')
const DSSanPham = models.DSSanPham
const DonHang = models.DonHang
const createDSSanPham = async (req, res) => {
    let {
        SoLuong,
        DonHangId,
        SanPhamId,
    } = req.body;
    try {
        let newDSSanPham = await DSSanPham.create({
            SoLuong,
            DonHangId,
            SanPhamId,
        }, {
            fields: ["SoLuong", "DonHangId", "SanPhamId"]
        });
        if (newDSSanPham) {
            res.json({
                result: 'ok',
                data: newDSSanPham
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                massage: `Insert a new DSSanPham failed`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Insert a new DSSanPham failed. Error: ${error}`
        });
    }
}
const createMultiDSSanPham = async (req, res) => {
    let {
        data
    } = req.body;
    try {
        let newDSSanPham = await DSSanPham.bulkCreate(data,
            {
                fields: ["SoLuong", "DonHangId", "SanPhamId"]
            });
        if (newDSSanPham) {
            res.json({
                result: 'ok',
                data: newDSSanPham
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                massage: `Insert a new DSSanPham failed`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Insert a new DSSanPham failed. Error: ${error}`
        });
    }
}
const updateDSSanPham = async (req, res) => {
    const { id } = req.params;
    const {
        SoLuong,
        DonHangId,
        SanPhamId,
    } = req.body;
    try {
        let DSSanPhams = await DSSanPham.findAll({
            attributes: [
                'id',
                'SoLuong',
                'DonHangId',
                'SanPhamId',
            ],
            where: {
                id,
            }
        });
        if (DSSanPhams.length > 0) {
            DSSanPhams.forEach(async (DSSanPham) => {
                await DSSanPham.update({
                    SoLuong: SoLuong ? SoLuong : DSSanPham.SoLuong,
                    DonHangId: DonHangId ? DonHangId : DSSanPham.DonHangId,
                    SanPhamId: SanPhamId ? SanPhamId : DSSanPham.SanPhamId,
                });
            });
            res.json({
                result: 'ok',
                data: DSSanPhams,
                message: "Update DSSanPham successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: "Cannot find the DSSanPham to update"
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Cannot update DSSanPham. Error:${error}`
        });
    }

}

// const disableDSSanPham = async(req, res) => {
//     const { id } = req.params;

//     try {
//         let DSSanPhams = await DSSanPham.findAll({
//             attributes: [
//                 'id',
//                 'SoLuong',
//                 'DonHangId',
//                 'SanPhamId',
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
//         if (DSSanPhams.length > 0) {
//             DSSanPhams.forEach(async(DSSanPham) => {
//                 await DSSanPham.update({
//                     isDisable: true
//                 });
//             });
//             res.json({
//                 result: 'ok',
//                 data: DSSanPhams,
//                 message: "Disable DSSanPham profile successfully"
//             });
//         } else {
//             res.json({
//                 result: 'failed',
//                 data: {},
//                 message: "Cannot find the DSSanPham to disable"
//             });
//         }
//     } catch (error) {
//         res.json({
//             result: 'failed',
//             data: {},
//             message: `Cannot disable DSSanPham. Error:${error}`
//         });
//     }

// }

// const enableDSSanPham = async(req, res) => {
//     const { id } = req.params;

//     try {
//         let DSSanPhams = await DSSanPham.findAll({
//             attributes: [
//                 'id',
//                 'SoLuong',
//                 'DonHangId',
//                 'SanPhamId',
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
//         if (DSSanPhams.length > 0) {
//             DSSanPhams.forEach(async(DSSanPham) => {
//                 await DSSanPham.update({
//                     isDisable: false
//                 });
//             });
//             res.json({
//                 result: 'ok',
//                 data: DSSanPhams,
//                 message: "Enable DSSanPham profile successfully"
//             });
//         } else {
//             res.json({
//                 result: 'failed',
//                 data: {},
//                 message: "Cannot find the DSSanPham to enable"
//             });
//         }
//     } catch (error) {
//         res.json({
//             result: 'failed',
//             data: {},
//             message: `Cannot enable DSSanPham. Error:${error}`
//         });
//     }

// }

const getAllDSSanPham = async (req, res) => {
    try {
        const DSSanPhams = await DSSanPham.findAll({
            attributes: [
                'id',
                'SoLuong',
                'DonHangId',
                'SanPhamId',
            ],
            // where: {
            //     isDisable: false
            // }
        });
        res.json({
            result: 'ok',
            data: DSSanPhams,
            length: DSSanPhams.length,
            message: "List DSSanPham successfully"
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list DSSanPham. Error:${error}`
        });
    }
}

const getDSSanPhamById = async (req, res) => {
    const { id } = req.params;
    try {
        const DSSanPhams = await DSSanPham.findAll({
            attributes: [
                'id',
                'SoLuong',
                'DonHangId',
                'SanPhamId',
            ],
            where: {
                id: id,
            },
        });
        if (DSSanPhams.length > 0) {
            res.json({
                result: 'ok',
                data: DSSanPhams[0],
                message: "List DSSanPham successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: `Cannot find list DSSanPham to show. Error:${error}`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list DSSanPham. Error:${error}`
        });
    }
}
const getDSSanPhamByDonHangId = async (req, res) => {
    const { id } = req.params;
    try {
        const DSSanPhams = await DSSanPham.findAll({
            attributes: [
                'id',
                'SoLuong',
                'DonHangId',
                'SanPhamId',
            ],
            where: {
                DonHangId: id,
            },
            include: [{ all: true }]
        });
        if (DSSanPhams.length > 0) {
            res.json({
                result: 'ok',
                data: DSSanPhams,
                message: "List DSSanPham successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: `Cannot find list DSSanPham to show. Error:${error}`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list DSSanPham. Error:${error}`
        });
    }
}
const getDSSanPhamByNguoiDungId = async (req, res) => {
    const { id } = req.params;
    try {
        const dataRes = [];
        const DonHangs = await DonHang.findAll({
            attributes: [
                'id',
                'NgayDatHang',
                'TienVanChuyen',
                'TongTien',
                'TinhTrangDon',
                'NguoiDungId',
                'BuuCucId',
                'ChuoiGiaoHangId',
                'DiaChiId',
                'GhiChu',
                'DanhGia',
                'daThanhToan',
            ],
            where: {
                NguoiDungId: id,
            }
        });

        const promises = DonHangs.map(async (e) => {
            let DSSanPhams = await DSSanPham.findAll({
                attributes: [
                    'id',
                    'SoLuong',
                    'DonHangId',
                    'SanPhamId',
                ],
                where: {
                    DonHangId: e.id,
                },
                include: [{ all: true }]
            });
            dataRes.push({
                DonHang: e.dataValues,
                listSanpham: DSSanPhams
            })
        })
        const results = await Promise.all(promises)
        console.log(dataRes);
        if (dataRes.length > 0) {
            res.json({
                result: 'ok',
                data: dataRes,
                message: "List DSSanPham successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: `Cannot find list DSSanPham to show. Error:${error}`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list DSSanPham. Error:${error}`
        });
    }
}
module.exports = {
    createDSSanPham,
    createMultiDSSanPham,
    updateDSSanPham,
    getAllDSSanPham,
    getDSSanPhamById,
    getDSSanPhamByDonHangId,
    getDSSanPhamByNguoiDungId,
}