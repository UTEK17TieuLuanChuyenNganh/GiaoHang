const models = require('../models/index')
const Sequelize = require('sequelize')
const Moment = require('moment')
Moment.suppressDeprecationWarnings = true;
const DiaChi = models.DiaChi
const Donhang = models.Donhang
const Op = Sequelize.Op;
const operatorsAliases = {
    $like: Op.like,
    $not: Op.not,
    $between: Op.between,
    $or: Op.or,
    $and: Op.and
}
const createDiaChi = async (req, res) => {
    let {
        TenDiaChi,
        KinhDo,
        ViDo,
        ThoiGianBatDau,
        ThoiGianKetThuc,
        NguoiDungId,
        DonhangId
    } = req.body;
    try {
        let newDiaChi = await DiaChi.create({
            TenDiaChi,
            KinhDo,
            ViDo,
            ThoiGianBatDau,
            ThoiGianKetThuc,
            NguoiDungId,
            DonhangId,
            laMacDinh: false
        }, {
            fields: [
                "TenDiaChi",
                "laMacDinh",
                "KinhDo",
                "ViDo",
                "ThoiGianBatDau",
                "ThoiGianKetThuc",
                "NguoiDungId",
                "DonhangId",]
        });
        if (newDiaChi) {
            res.json({
                result: 'ok',
                data: newDiaChi
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                massage: `Insert a new DiaChi failed`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Insert a new DiaChi failed. Error: ${error}`
        });
    }
}
const updateDiaChi = async (req, res) => {
    const { id } = req.params;
    const {
        TenDiaChi,
        KinhDo,
        ViDo,
        ThoiGianBatDau,
        ThoiGianKetThuc,
        laMacDinh,
        NguoiDungId,
        DonhangId
    } = req.body;
    try {
        let DiaChis = await DiaChi.findAll({
            attributes: [
                'id',
                'TenDiaChi',
                'KinhDo',
                'ViDo',
                "ThoiGianBatDau",
                "ThoiGianKetThuc",
                'laMacDinh',
                'NguoiDungId',
                'DonhangId'
            ],
            where: {
                id,
            }
        });
        if (DiaChis.length > 0) {
            DiaChis.forEach(async (DiaChi) => {
                await DiaChi.update({
                    TenDiaChi: TenDiaChi ? TenDiaChi : DiaChi.TenDiaChi,
                    KinhDo: KinhDo ? KinhDo : DiaChi.KinhDo,
                    ViDo: ViDo ? ViDo : DiaChi.ViDo,
                    ThoiGianBatDau: ThoiGianBatDau ? ThoiGianBatDau : DiaChi.ThoiGianBatDau,
                    ThoiGianKetThuc: ThoiGianKetThuc ? ThoiGianKetThuc : DiaChi.ThoiGianKetThuc,
                    NguoiDungId: NguoiDungId ? NguoiDungId : DiaChi.NguoiDungId,
                    DonhangId: DonhangId ? DonhangId : DiaChi.DonhangId,
                    laMacDinh: laMacDinh != DiaChi.laMacDinh ? laMacDinh : DiaChi.laMacDinh,
                });
            });
            res.json({
                result: 'ok',
                data: DiaChis,
                message: "Update DiaChi successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: "Cannot find the DiaChi to update"
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Cannot update DiaChi. Error:${error}`
        });
    }

}
const deleteDiaChi = async (req, res) => {
    const { id } = req.body;    
    try {
        let DiaChis = await DiaChi.findAll({
            attributes: [
                'id',
                'TenDiaChi',
                'KinhDo',
                'ViDo',
                "ThoiGianBatDau",
                "ThoiGianKetThuc",
                'laMacDinh',
                'NguoiDungId',
                'DonhangId'
            ],
            where: {
                id,
            }
        });
        if (DiaChis.length > 0) {
            DiaChis.forEach(async (DiaChi) => {
                await DiaChi.destroy();
            });
            res.json({
                result: 'ok',                
                message: "Delete DiaChi successfully"
            });
        } else {
            res.json({
                result: 'failed',                
                message: "Cannot find the DiaChi to delete"
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',            
            message: `Cannot delete DiaChi. Error:${error}`
        });
    }

}
const getAllDiaChi = async (req, res) => {
    try {
        const DiaChis = await DiaChi.findAll({
            attributes: [
                'id',
                'TenDiaChi',
                'KinhDo',
                'ViDo',
                'ThoiGianBatDau',
                'ThoiGianKetThuc',
                'laMacDinh',
                'NguoiDungId',
                'DonhangId'
            ],
        });
        res.json({
            result: 'ok',
            data: DiaChis,
            length: DiaChis.length,
            message: "List DiaChi successfully"
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list DiaChi. Error:${error}`
        });
    }
}
const getDiaChiById = async (req, res) => {
    const { id } = req.params;
    try {
        const DiaChis = await DiaChi.findAll({
            attributes: [
                'id',
                'TenDiaChi',
                'KinhDo',
                'ViDo',
                'ThoiGianBatDau',
                'ThoiGianKetThuc',
                'laMacDinh',
                'NguoiDungId',
                'DonhangId'
            ],
            where: {
                id: id
            },
        });
        if (DiaChis.length > 0) {
            res.json({
                result: 'ok',
                data: DiaChis[0],
                message: "List DiaChi successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: `Cannot find list DiaChi to show. Error:${error}`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list DiaChi. Error:${error}`
        });
    }
}

const getDiaChiByNguoiDungId = async (req, res) => {
    const { id } = req.params;
    try {
        const DiaChis = await DiaChi.findAll({
            attributes: [
                'id',
                'TenDiaChi',
                'KinhDo',
                'ViDo',
                'ThoiGianBatDau',
                'ThoiGianKetThuc',
                'laMacDinh',
                'NguoiDungId',
                'DonhangId'
            ],
            where: {
                NguoiDungId: id,
                laMacDinh: false
            },
        });
        if (DiaChis.length > 0) {
            res.json({
                result: 'ok',
                data: DiaChis,
                message: "List DiaChi successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: `Cannot find list DiaChi to show. Error:${error}`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list DiaChi. Error:${error}`
        });
    }
}
const getDiaChiByDonHangId = async (req, res) => {
    const { id } = req.params;
    try {
        const DiaChis = await DiaChi.findAll({
            attributes: [
                'id',
                'TenDiaChi',
                'KinhDo',
                'ViDo',
                'ThoiGianBatDau',
                'ThoiGianKetThuc',
                'laMacDinh',
                'NguoiDungId',
                'DonhangId'
            ],
            where: {
                DonhangId: id,
                laMacDinh: true
            },
        });
        if (DiaChis.length > 0) {
            res.json({
                result: 'ok',
                data: DiaChis,
                message: "List DiaChi successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: `Cannot find list DiaChi to show. Error:${error}`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list DiaChi. Error:${error}`
        });
    }
}
const updateDiaChiByDonHangId = async (req, res) => {
    const { id } = req.params;
    const {
        TenDiaChi,
        KinhDo,
        ViDo,
        ThoiGianBatDau,
        ThoiGianKetThuc,
        laMacDinh,
        NguoiDungId,
        DonhangId
    } = req.body;
    try {
        let DiaChis = await DiaChi.findAll({
            attributes: [
                'id',
                'TenDiaChi',
                'KinhDo',
                'ViDo',
                "ThoiGianBatDau",
                "ThoiGianKetThuc",
                'laMacDinh',
                'NguoiDungId',
                'DonhangId'
            ],
            where: {
                DonhangId: id,
                laMacDinh: true
            }
        });
        if (DiaChis.length > 0) {
            DiaChis.forEach(async (DiaChi) => {
                await DiaChi.update({
                    TenDiaChi: TenDiaChi ? TenDiaChi : DiaChi.TenDiaChi,
                    KinhDo: KinhDo ? KinhDo : DiaChi.KinhDo,
                    ViDo: ViDo ? ViDo : DiaChi.ViDo,
                    ThoiGianBatDau: ThoiGianBatDau ? ThoiGianBatDau : DiaChi.ThoiGianBatDau,
                    ThoiGianKetThuc: ThoiGianKetThuc ? ThoiGianKetThuc : DiaChi.ThoiGianKetThuc,
                    NguoiDungId: NguoiDungId ? NguoiDungId : DiaChi.NguoiDungId,
                    DonhangId: DonhangId ? DonhangId : DiaChi.DonhangId,
                    laMacDinh: laMacDinh != DiaChi.laMacDinh ? laMacDinh : DiaChi.laMacDinh,
                });
            });
            res.json({
                result: 'ok',
                data: DiaChis,
                message: "Update DiaChi successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: "Cannot find the DiaChi to update"
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Cannot update DiaChi. Error:${error}`
        });
    }

}
const searchDiachiInTimeRange = async (req, res) => {
    const { id, timerange } = req.body;
    try {
        let timeStart = Moment.utc(timerange.timeStart).format()
        let timeEnd = Moment.utc(timerange.timeEnd).format()
        const Diachis = await DiaChi.findAll({
            attributes: [
                'id',
                'TenDiaChi',
                'KinhDo',
                'ViDo',
                'ThoiGianBatDau',
                'ThoiGianKetThuc',
                'laMacDinh',
                'NguoiDungId',
                'DonhangId',
            ],
            where: {
                laMacDinh: true,
                [Op.and]: [
                    Sequelize.literal(`(("DiaChi"."ThoiGianBatDau" BETWEEN '${timeStart}' AND '${timeEnd}') ` +
                        `AND (DATE_PART('hour','${timerange.timeEnd}'::timestamp - "DiaChi"."ThoiGianBatDau"::timestamp) >=1))` +
                        `OR ` +
                        `(("DiaChi"."ThoiGianKetThuc" BETWEEN '${timeStart}' AND '${timeEnd}') ` +
                        `AND (DATE_PART('hour',"DiaChi"."ThoiGianKetThuc"::timestamp - '${timerange.timeStart}'::timestamp) >=1)) ` +
                        `OR (("DiaChi"."ThoiGianBatDau" BETWEEN '${timeStart}' AND '${timeEnd}') AND ` +
                        `((DATE_PART('hour','${timerange.timeEnd}'::timestamp - "DiaChi"."ThoiGianBatDau"::timestamp)) = (DATE_PART('hour',"DiaChi"."ThoiGianKetThuc"::timestamp - '${timerange.timeEnd}'::timestamp)))) ` +
                        `OR (("DiaChi"."ThoiGianBatDau" BETWEEN '${timeStart}' AND '${timeEnd}') AND ` +
                        `("DiaChi"."ThoiGianKetThuc" BETWEEN '${timeStart}' AND '${timeEnd}')) ` +
                        `OR ((DATE_PART('day','${timerange.timeStart}' - "DiaChi"."ThoiGianBatDau") = 0 AND ` +
                        `((DATE_PART('hour','${timerange.timeStart}'::timestamp - "DiaChi"."ThoiGianBatDau"::timestamp)) >= 0 AND (DATE_PART('hour',"DiaChi"."ThoiGianKetThuc"::timestamp - '${timerange.timeEnd}'::timestamp)) >= 0))) `)
                ],
            },
            include: [{ model: models.NguoiDung }],
            order: [['id', 'asc']]
        });
        if (Diachis.length > 0) {
            res.json({
                result: 'ok',
                data: Diachis,
                length: Diachis.length,
                message: "List DonHang successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: `Cannot find list DonHang to show.${error}`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list DonHang. ${error}`
        });
    }
}

module.exports = {
    createDiaChi,
    updateDiaChi,
    getAllDiaChi,
    getDiaChiById,
    getDiaChiByNguoiDungId,
    getDiaChiByDonHangId,
    updateDiaChiByDonHangId,
    searchDiachiInTimeRange,
    deleteDiaChi
}