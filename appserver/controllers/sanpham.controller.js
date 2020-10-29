const models = require('../models/index')
const Sequelize = require('sequelize')
const SanPham = models.SanPham
const Op = Sequelize.Op;
const operatorsAliases = {
    $like: Op.like,
    $not: Op.not
}
const createSanPham = async (req, res) => {
    let {
        TenSanPham,
        MoTa,
        Gia,
        NgayCapNhat,
        KhuyenMai,
        Hinh,
        SoLuong,
        KichCo,
        KhoiLuong,
        DanhGia,
        LoaiSanPhamId
    } = req.body;
    try {
        let newSanPham = await SanPham.create({
            TenSanPham,
            MoTa,
            Gia,
            NgayCapNhat,
            KhuyenMai,
            Hinh,
            SoLuong,
            KichCo,
            KhoiLuong,
            DanhGia,
            LoaiSanPhamId,
            isDisable: false
        }, {
            fields: ["TenSanPham", "MoTa", "Gia", "NgayCapNhat", "KhuyenMai", "Hinh",
                "SoLuong", "KichCo", "KhoiLuong", "DanhGia", "LoaiSanPhamId", "isDisable"]
        });
        if (newSanPham) {
            res.json({
                result: 'ok',
                data: newSanPham
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                massage: `Insert a new SanPham failed`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Insert a new SanPham failed. Error: ${error}`
        });
    }
}

const updateSanPham = async (req, res) => {
    const { id } = req.params;
    const {
        TenSanPham,
        MoTa,
        Gia,
        NgayCapNhat,
        KhuyenMai,
        Hinh,
        SoLuong,
        KichCo,
        KhoiLuong,
        DanhGia,
        LoaiSanPhamId
    } = req.body;
    try {
        let SanPhams = await SanPham.findAll({
            attributes: [
                'id',
                'TenSanPham',
                'MoTa',
                'Gia',
                'NgayCapNhat',
                'KhuyenMai',
                'Hinh',
                'SoLuong',
                'KichCo',
                'KhoiLuong',
                'DanhGia',
                'LoaiSanPhamId'
            ],
            where: {
                id,
                isDisable: false
            }
        });
        if (SanPhams.length > 0) {
            SanPhams.forEach(async (SanPham) => {
                await SanPham.update({
                    TenSanPham: TenSanPham ? TenSanPham : SanPham.TenSanPham,
                    MoTa: MoTa ? MoTa : SanPham.MoTa,
                    Gia: Gia ? Gia : SanPham.Gia,
                    NgayCapNhat: NgayCapNhat ? NgayCapNhat : SanPham.NgayCapNhat,
                    KhuyenMai: KhuyenMai ? KhuyenMai : SanPham.KhuyenMai,
                    Hinh: Hinh ? Hinh : SanPham.Hinh,
                    SoLuong: SoLuong ? SoLuong : SanPham.SoLuong,
                    KichCo: KichCo ? KichCo : SanPham.KichCo,
                    KhoiLuong: KhoiLuong ? KhoiLuong : SanPham.KhoiLuong,
                    DanhGia: DanhGia ? DanhGia : SanPham.DanhGia,
                    LoaiSanPhamId: LoaiSanPhamId ? LoaiSanPhamId : SanPham.LoaiSanPhamId,
                });
            });
            res.json({
                result: 'ok',
                data: SanPhams,
                message: "Update SanPham successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: "Cannot find the SanPham to update"
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Cannot update SanPham. Error:${error}`
        });
    }

}

const disableSanPham = async (req, res) => {
    const { id } = req.params;

    try {
        let SanPhams = await SanPham.findAll({
            attributes: [
                'id',
                'TenSanPham',
                'MoTa',
                'Gia',
                'Hinh',
                'SoLuong',
                'KichCo',
                'KhoiLuong',
                'DanhGia',
                'NgayCapNhat',
                'KhuyenMai',
            ],
            where: {
                id,
                isDisable: false
            }
        });
        if (SanPhams.length > 0) {
            SanPhams.forEach(async (SanPham) => {
                await SanPham.update({
                    isDisable: true
                });
            });
            res.json({
                result: 'ok',
                data: SanPhams,
                message: "Disable SanPham successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: "Cannot find the SanPham to disable"
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Cannot disable SanPham. Error:${error}`
        });
    }

}

const enableSanPham = async (req, res) => {
    const { id } = req.params;

    try {
        let SanPhams = await SanPham.findAll({
            attributes: [
                'id',
                'TenSanPham',
                'MoTa',
                'Gia',
                'Hinh',
                'SoLuong',
                'KichCo',
                'KhoiLuong',
                'DanhGia',
                'NgayCapNhat',
                'KhuyenMai',
            ],
            where: {
                id,
                isDisable: true
            }
        });
        if (SanPhams.length > 0) {
            SanPhams.forEach(async (SanPham) => {
                await SanPham.update({
                    isDisable: false
                });
            });
            res.json({
                result: 'ok',
                data: SanPhams,
                message: "Enable SanPham successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: "Cannot find the SanPham to enable"
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Cannot enable SanPham. Error:${error}`
        });
    }

}

const getAllSanPham = async (req, res) => {
    try {
        const SanPhams = await SanPham.findAll({
            attributes: [
                'id',
                'TenSanPham',
                'MoTa',
                'Gia',
                'Hinh',
                'SoLuong',
                'KichCo',
                'KhoiLuong',
                'DanhGia',
                'NgayCapNhat',
                'KhuyenMai',
                'LoaiSanPhamId'
            ],
            where: {
                isDisable: false
            }
        });
        res.json({
            result: 'ok',
            data: SanPhams,
            length: SanPhams.length,
            message: "List SanPham successfully"
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list SanPham. Error:${error}`
        });
    }
}

const getSanPhamById = async (req, res) => {
    const { id } = req.params;
    try {
        const SanPhams = await SanPham.findAll({
            attributes: [
                'id',
                'TenSanPham',
                'MoTa',
                'Gia',
                'Hinh',
                'SoLuong',
                'KichCo',
                'KhoiLuong',
                'DanhGia',
                'NgayCapNhat',
                'KhuyenMai',
                'LoaiSanPhamId'
            ],
            where: {
                id: id,
                isDisable: false

            },
        });
        if (SanPhams.length > 0) {
            res.json({
                result: 'ok',
                data: SanPhams[0],
                message: "List SanPham successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: `Cannot find list SanPham to show. Error:${error}`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list SanPham. Error:${error}`
        });
    }
}

const getSanPhamByType = async (req, res) => {
    const { typeId } = req.params;
    try {
        const SanPhams = await SanPham.findAll({
            attributes: [
                'id',
                'TenSanPham',
                'MoTa',
                'Gia',
                'Hinh',
                'SoLuong',
                'KichCo',
                'KhoiLuong',
                'DanhGia',
                'NgayCapNhat',
                'KhuyenMai',
                'LoaiSanPhamId'
            ],
            where: {
                LoaiSanPhamId: typeId,
                isDisable: false
            },
        });
        if (SanPhams.length > 0) {
            res.json({
                result: 'ok',
                data: SanPhams,
                message: "List SanPham successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: `Cannot find list SanPham to show. Error:${error}`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list SanPham. Error:${error}`
        });
    }
}

const searchSanPham = async (req, res) => {
    const { name } = req.params;
    try {
        const SanPhams = await SanPham.findAll({
            attributes: [
                'id',
                'TenSanPham',
                'MoTa',
                'Gia',
                'Hinh',
                'SoLuong',
                'KichCo',
                'KhoiLuong',
                'DanhGia',
                'NgayCapNhat',
                'KhuyenMai',
                'LoaiSanPhamId'
            ],
            where: {
                TenSanPham: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('TenSanPham')),
                    { [Op.like]: '%' + name + '%' }),
                isDisable: false
            },
            order: [['id','asc']]
        });
        if (SanPhams.length > 0) {
            res.json({
                result: 'ok',
                data: SanPhams,
                message: "List SanPham successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: `Cannot find list SanPham to show. Error:${error}`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list SanPham. Error:${error}`
        });
    }
}
module.exports = {
    createSanPham,
    updateSanPham,
    disableSanPham,
    enableSanPham,
    getAllSanPham,
    getSanPhamById,
    getSanPhamByType,
    searchSanPham
}