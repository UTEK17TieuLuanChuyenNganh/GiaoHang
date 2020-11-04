const models = require('../models/index')
const Sequelize = require('sequelize')
const Moment = require('moment')
const DonHang = models.DonHang
const Diachi = models.Diachi
const Op = Sequelize.Op;
const operatorsAliases = {
    $like: Op.like,
    $not: Op.not,
    $between: Op.between,
    $or: Op.or,
    $and: Op.and
}
const createDonHang = async (req, res) => {
    let {
        NgayDatHang,
        TienVanChuyen,
        TongTien,
        GhiChu,
        DanhGia,
        TinhTrangDon,
        NguoiDungId,
        BuuCucId,
        ChuoiGiaoHangId,
        DiaChiId
    } = req.body;
    try {
        let newDonHang = await DonHang.create({
            NgayDatHang,
            TienVanChuyen,
            TongTien,
            GhiChu,
            DanhGia,
            TinhTrangDon,
            NguoiDungId,
            BuuCucId,
            ChuoiGiaoHangId,
            DiaChiId,
            daThanhToan: false
        }, {
            fields: ["NgayDatHang", "TienVanChuyen", "TongTien", "GhiChu",
                "DanhGia", "TinhTrangDon", "NguoiDungId",
                "BuuCucId", "ChuoiGiaoHangId", "DiaChiId"]
        });
        if (newDonHang) {
            res.json({
                result: 'ok',
                data: newDonHang
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                massage: `Insert a new DonHang failed`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Insert a new DonHang failed. Error: ${error}`
        });
    }
}

const updateDonHang = async (req, res) => {
    const { id } = req.params;
    const {
        NgayDatHang,
        TienVanChuyen,
        TongTien,
        GhiChu,
        DanhGia,
        TinhTrangDon,
        NguoiDungId,
        BuuCucId,
        ChuoiGiaoHangId,
        DiaChiId,
        daThanhToan,
    } = req.body;
    try {
        let DonHangs = await DonHang.findAll({
            attributes: [
                'id',
                'NgayDatHang',
                'TienVanChuyen',
                'TongTien',
                'GhiChu',
                'DanhGia',
                'TinhTrangDon',
                'NguoiDungId',
                'BuuCucId',
                'ChuoiGiaoHangId',
                'DiaChiId',
                'daThanhToan',
            ],
            where: {
                id,
            }
        });
        if (DonHangs.length > 0) {
            DonHangs.forEach(async (DonHang) => {
                await DonHang.update({
                    NgayDatHang: NgayDatHang ? NgayDatHang : DonHang.NgayDatHang,
                    TienVanChuyen: TienVanChuyen ? TienVanChuyen : DonHang.TienVanChuyen,
                    TongTien: TongTien ? TongTien : DonHang.TongTien,
                    GhiChu: GhiChu ? GhiChu : DonHang.GhiChu,
                    DanhGia: DanhGia ? DanhGia : DonHang.DanhGia,
                    TinhTrangDon: TinhTrangDon ? TinhTrangDon : DonHang.TinhTrangDon,
                    NguoiDungId: NguoiDungId ? NguoiDungId : DonHang.NguoiDungId,
                    BuuCucId: BuuCucId ? BuuCucId : DonHang.BuuCucId,
                    ChuoiGiaoHangId: ChuoiGiaoHangId ? ChuoiGiaoHangId : DonHang.ChuoiGiaoHangId,
                    DiaChiId: DiaChiId ? DiaChiId : DonHang.DiaChiId,
                    daThanhToan: daThanhToan ? daThanhToan : DonHang.daThanhToan,
                });
            });
            res.json({
                result: 'ok',
                data: DonHangs,
                message: "Update DonHang successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: "Cannot find the DonHang to update"
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Cannot update DonHang. Error:${error}`
        });
    }

}

// const disableDonHang = async(req, res) => {
//     const { id } = req.params;

//     try {
//         let DonHangs = await DonHang.findAll({
//             attributes: [
//                 'id',
//                 'NgayDatHang',
//                 'TienVanChuyen',
//                 'TongTien',
//                 'TinhTrangDon',
//                 'NguoiDungId',
//                 'GhiChu',
//                 'DanhGia',
//                 'daThanhToan',
//             ],
//             where: {
//                 id,
//                 isDisable: false
//             }
//         });
//         if (DonHangs.length > 0) {
//             DonHangs.forEach(async(DonHang) => {
//                 await DonHang.update({
//                     isDisable: true
//                 });
//             });
//             res.json({
//                 result: 'ok',
//                 data: DonHangs,
//                 message: "Disable DonHang profile successfully"
//             });
//         } else {
//             res.json({
//                 result: 'failed',
//                 data: {},
//                 message: "Cannot find the DonHang to disable"
//             });
//         }
//     } catch (error) {
//         res.json({
//             result: 'failed',
//             data: {},
//             message: `Cannot disable DonHang. Error:${error}`
//         });
//     }

// }

// const enableDonHang = async(req, res) => {
//     const { id } = req.params;

//     try {
//         let DonHangs = await DonHang.findAll({
//             attributes: [
//                 'id',
//                 'NgayDatHang',
//                 'TienVanChuyen',
//                 'TongTien',
//                 'TinhTrangDon',
//                 'NguoiDungId',
//                 'GhiChu',
//                 'DanhGia',
//                 'daThanhToan',
//             ],
//             where: {
//                 id,
//                 isDisable: true
//             }
//         });
//         if (DonHangs.length > 0) {
//             DonHangs.forEach(async(DonHang) => {
//                 await DonHang.update({
//                     isDisable: false
//                 });
//             });
//             res.json({
//                 result: 'ok',
//                 data: DonHangs,
//                 message: "Enable DonHang profile successfully"
//             });
//         } else {
//             res.json({
//                 result: 'failed',
//                 data: {},
//                 message: "Cannot find the DonHang to enable"
//             });
//         }
//     } catch (error) {
//         res.json({
//             result: 'failed',
//             data: {},
//             message: `Cannot enable DonHang. Error:${error}`
//         });
//     }

// }

const getAllDonHang = async (req, res) => {
    try {
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
            include: [{ all: true }]
        });
        res.json({
            result: 'ok',
            data: DonHangs,
            length: DonHangs.length,
            message: "List DonHang successfully"
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list DonHang. Error:${error}`
        });
    }
}

const getAllDonHangByNguoiDungId = async (req, res) => {
    const { id } = req.params;
    try {
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
                NguoiDungId: id
            }
        });
        res.json({
            result: 'ok',
            data: DonHangs,
            length: DonHangs.length,
            message: "List DonHang successfully"
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list DonHang. Error:${error}`
        });
    }
}

const getDonHangById = async (req, res) => {
    const { id } = req.params;
    try {
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
                id: id,
            },
        });
        if (DonHangs.length > 0) {
            res.json({
                result: 'ok',
                data: DonHangs[0],
                message: "List DonHang successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: `Cannot find list DonHang to show. Error:${error}`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list DonHang. Error:${error}`
        });
    }
}

const getDonHangByNguoiDungId = async (req, res) => {
    const { id, page } = req.params;
    try {
        const pageIndex = (page - 1) * 10;
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
            },
            offset: pageIndex,
            limit: 10,
            include: [{ all: true }],
            order: [['id', 'asc']]
        });
        if (DonHangs.length > 0) {
            res.json({
                result: 'ok',
                data: DonHangs,
                message: "List DonHang successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: `Cannot find list DonHang to show. Error:${error}`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list DonHang. Error:${error}`
        });
    }
}

const searchDonHang = async (req, res) => {
    const { id, date, dateCheck } = req.body;
    const { page } = req.params;
    try {
        const pageIndex = (page - 1) * 10;
        let dateStart = Moment(date.dateStart, "MM/DD/YY").add(1, 'd')
        let dateEnd = Moment(date.dateEnd, "MM/DD/YY").add(1, 'd')
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
                NgayDatHang: { [Op.between]: [dateStart, dateEnd] },
            },
            include: [{ all: true }],
            offset: pageIndex,
            limit: 10,
            order: [['id', 'asc']]
        });
        if (DonHangs.length > 0) {
            res.json({
                result: 'ok',
                data: DonHangs,
                message: "List DonHang successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: `Cannot find list DonHang to show. Error:${error}`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list DonHang. Error:${error}`
        });
    }
}

const searchDonHangCount = async (req, res) => {
    const { id, date, dateCheck } = req.body;
    try {
        let dateStart = Moment(date.dateStart, "MM/DD/YY").add(1, 'd')
        let dateEnd = Moment(date.dateEnd, "MM/DD/YY").add(1, 'd')
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
                NgayDatHang: { [Op.between]: [dateStart, dateEnd] },
            },
            include: [{ all: true }],
            order: [['id', 'asc']]
        });
        if (DonHangs.length > 0) {
            res.json({
                result: 'ok',
                data: DonHangs,
                length: DonHangs.length,
                message: "List DonHang successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: `Cannot find list DonHang to show. Error:${error}`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list DonHang. Error:${error}`
        });
    }
}

// const searchDonHangInTimeRange = async (req, res) => {
//     const { id,timerange } = req.body;
//     try {        
//         let timeStart = Moment(timerange.timeStart, "h:mm")
//         let timeEnd = Moment(timerange.timeEnd, "h:mm")
//         const DonHangs = await DonHang.findAll({
//             attributes: [
//                 'id',
//                 'NgayDatHang',
//                 'TienVanChuyen',
//                 'TongTien',
//                 'TinhTrangDon',
//                 'NguoiDungId',
//                 'BuuCucId',
//                 'ChuoiGiaoHangId',
//                 'DiaChiId',
//                 'GhiChu',
//                 'DanhGia',
//                 'daThanhToan',
//             ],
//             where: {
//                 NguoiDungId: id,
//             },
//             include: [{
//                 model: Diachi,
//                 where: {
//                     [Op.or]: [
//                         {
//                             [Op.and]: [
//                                 { ThoiGianBatDau: { [Op.between]: [timeStart, timeEnd] } },
//                                 Sequelize.where(Sequelize.fn('datediff', Sequelize.fn('hour'), timeEnd, Sequelize.col('ThoiGianKetThuc')), {
//                                     [Op.and]: [
//                                         { [Op.gt]: 2 },
//                                         { [Op.lt]: 6 },
//                                     ]
//                                 })
//                             ]
//                         },
//                         {
//                             [Op.and]: [
//                                 { ThoiGianKetThuc: { [Op.between]: [timeStart, timeEnd] } },
//                                 Sequelize.where(Sequelize.fn('datediff', Sequelize.fn('hour'), Sequelize.col('ThoiGianKetThuc'), timeStart), {
//                                     [Op.and]: [
//                                         { [Op.gt]: 2 },
//                                         { [Op.lt]: 6 },
//                                     ]
//                                 })
//                             ]
//                         },
//                     ],
//                     laMacDinh: true
//                 }
//             }],
//             order: [['id', 'asc']]
//         });
//         if (DonHangs.length > 0) {
//             res.json({
//                 result: 'ok',
//                 data: DonHangs,
//                 length: DonHangs.length,
//                 message: "List DonHang successfully"
//             });
//         } else {
//             res.json({
//                 result: 'failed',
//                 data: {},
//                 message: `Cannot find list DonHang to show. Error:${error}`
//             });
//         }
//     } catch (error) {
//         res.json({
//             result: 'failed',
//             data: [],
//             length: 0,
//             message: `Cannot list DonHang. Error:${error}`
//         });
//     }
// }
module.exports = {
    createDonHang,
    updateDonHang,
    getAllDonHang,
    getDonHangById,
    getAllDonHangByNguoiDungId,
    getDonHangByNguoiDungId,
    searchDonHang,
    searchDonHangCount,
}