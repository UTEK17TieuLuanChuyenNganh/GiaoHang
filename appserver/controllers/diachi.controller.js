const models = require('../models/index')
const DiaChi = models.DiaChi

const createDiaChi = async (req, res) => {
    let {
        TenDiaChi,
        KinhDo,
        ViDo,
        ThoiGianUocLuong,
        NguoiDungId
    } = req.body;
    try {
        let newDiaChi = await DiaChi.create({
            TenDiaChi,
            KinhDo,
            ViDo,
            ThoiGianUocLuong,
            NguoiDungId,
            laMacDinh: false
        }, {
            fields: [
                "TenDiaChi",
                "laMacDinh",
                "KinhDo",
                "ViDo",
                "ThoiGianUocLuong",
                "NguoiDungId",]
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
        ThoiGianUocLuong,
        laMacDinh,
        NguoiDungId
    } = req.body;
    try {
        let DiaChis = await DiaChi.findAll({
            attributes: [
                'id',
                'TenDiaChi',
                'KinhDo',
                'ViDo',
                'ThoiGianUocLuong',
                'laMacDinh',
                'NguoiDungId'
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
                    ThoiGianUocLuong: ThoiGianUocLuong ? ThoiGianUocLuong : DiaChi.ThoiGianUocLuong,        
                    NguoiDungId: NguoiDungId ? NguoiDungId : DiaChi.NguoiDungId,
                    laMacDinh: laMacDinh ? laMacDinh : DiaChi.laMacDinh,                    
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

const getAllDiaChi = async (req, res) => {
    try {
        const DiaChis = await DiaChi.findAll({
            attributes: [
                'id',
                'TenDiaChi',
                'KinhDo',
                'ViDo',
                'ThoiGianUocLuong',
                'laMacDinh'
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
                'ThoiGianUocLuong',
                'laMacDinh'
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
                'ThoiGianUocLuong',
                'laMacDinh',
                'NguoiDungId',
            ],
            where: {
                NguoiDungId: id
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
module.exports = {
    createDiaChi,
    updateDiaChi,
    getAllDiaChi,
    getDiaChiById,
    getDiaChiByNguoiDungId
}