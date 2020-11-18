const models = require('../models/index')
const ThongBao = models.ThongBao

const createThongBao = async (req, res) => {
    let {
        NoiDung,
        Type,
        isNew,
        NguoiDungId
    } = req.body;
    try {
        let newThongBao = await ThongBao.create({
            NoiDung,
            Type,
            isNew: true,
            NguoiDungId
        }, {
            fields: ["NoiDung", "Type", "isNew", "NguoiDungId"]
        });
        if (newThongBao) {
            res.json({
                result: 'ok',
                data: newThongBao
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                massage: `Insert a new ThongBao failed`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Insert a new ThongBao failed. Error: ${error}`
        });
    }
}

const updateThongBao = async (req, res) => {
    const { id } = req.params;
    const {
        NoiDung,
        Type,
        isNew
    } = req.body;
    try {
        let ThongBaos = await ThongBao.findAll({
            attributes: [
                'id',
                'NoiDung',
                'Type',
                'isNew',
                'NguoiDungId'
            ],
            where: {
                id,
            }
        });
        if (ThongBaos.length > 0) {
            ThongBaos.forEach(async (ThongBao) => {
                await ThongBao.update({
                    NoiDung: NoiDung ? NoiDung : ThongBao.NoiDung,
                    Type: Type ? Type : ThongBao.Type,
                    isNew: isNew != ThongBao.isNew ? isNew : ThongBao.isNew,                    
                });
            });
            res.json({
                result: 'ok',
                data: ThongBaos,
                message: "Update ThongBao successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: "Cannot find the ThongBao to update"
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Cannot update ThongBao. Error:${error}`
        });
    }

}

const getAllThongBao = async (req, res) => {
    try {
        const ThongBaos = await ThongBao.findAll({
            attributes: [
                'id',
                'NoiDung',
                'Type',
                'isNew',
                'NguoiDungId'
            ],
            // where: {
            //     isDisable: false
            // }
        });
        res.json({
            result: 'ok',
            data: ThongBaos,
            length: ThongBaos.length,
            message: "List ThongBao successfully"
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list ThongBao. Error:${error}`
        });
    }
}

const getThongBaoById = async (req, res) => {
    const { id } = req.params;
    try {
        const ThongBaos = await ThongBao.findAll({
            attributes: [
                'id',
                'NoiDung',
                'Type',
                'isNew',
                'NguoiDungId'
            ],
            where: {
                id: id
            },
        });
        if (ThongBaos.length > 0) {
            res.json({
                result: 'ok',
                data: ThongBaos[0],
                message: "List ThongBao successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: `Cannot find list ThongBao to show. Error:${error}`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list ThongBao. Error:${error}`
        });
    }
}
const getThongBaoByNguoiDungId = async (req, res) => {
    const { id } = req.params;
    try {
        const ThongBaos = await ThongBao.findAll({
            attributes: [
                'id',
                'NoiDung',
                'Type',
                'isNew',
                'NguoiDungId'
            ],
            where: {
                NguoiDungId: id
            },
        });
        if (ThongBaos.length > 0) {
            res.json({
                result: 'ok',
                data: ThongBaos,
                message: "List ThongBao successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: `Cannot find list ThongBao to show. Error:${error}`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list ThongBao. Error:${error}`
        });
    }
}
const getAllNewThongBao = async (req, res) => {
    const { id } = req.params;
    try {
        const ThongBaos = await ThongBao.findAll({
            attributes: [
                'id',
                'NoiDung',
                'Type',
                'isNew',
                'NguoiDungId'
            ],
            where: {
                NguoiDungId: id,
                isNew: true
            }
        });
        res.json({
            result: 'ok',
            data: ThongBaos,
            length: ThongBaos.length,
            message: "List ThongBao successfully"
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list ThongBao. Error:${error}`
        });
    }
}

module.exports = {
    createThongBao,
    updateThongBao,
    getAllThongBao,
    getThongBaoById,
    getThongBaoByNguoiDungId,
    getAllNewThongBao
}