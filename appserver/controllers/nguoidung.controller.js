const models = require('../models/index')
const Customer = models.NguoiDung

const createCustomer = async (req, res) => {
    let {
        HoTen,
        SinhNhat,
        GioiTinh,
        Username,
        Password,
        Avatar,
        Email,
        SDT,
    } = req.body;
    try {
        let newCustomer = await Customer.create({
            HoTen,
            SinhNhat,
            GioiTinh,
            Username,
            Password,
            Avatar,
            Email,
            SDT,
            laShop: false,
            isDisable: false
        }, {
            fields: ["HoTen", "SinhNhat", "GioiTinh", "Username", "Password", "Avatar", "Email", "SDT", "laShop",
                "isDisable"]
        });
        if (newCustomer) {
            res.json({
                result: 'ok',
                data: newCustomer
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                massage: `Insert a new Customer failed`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Insert a new Customer failed. Error: ${error}`
        });
    }
}

const updateCustomer = async (req, res) => {
    const { id } = req.params;
    const {
        HoTen,
        SinhNhat,
        GioiTinh,
        Username,
        Password,
        Avatar,
        Email,
        SDT,
        laShop,
    } = req.body;
    try {
        let customers = await Customer.findAll({
            attributes: [
                'id',
                'HoTen',
                'SinhNhat',
                'GioiTinh',
                'Username',
                'Password',
                'Avatar',
                'Email',
                'SDT',
                'laShop',
            ],
            where: {
                id,
                isDisable: false
            }
        });
        if (customers.length > 0) {
            customers.forEach(async (customer) => {
                await customer.update({
                    HoTen: HoTen ? HoTen : customer.HoTen,
                    SinhNhat: SinhNhat ? SinhNhat : customer.SinhNhat,
                    GioiTinh: GioiTinh ? GioiTinh : customer.GioiTinh,
                    Username: Username ? Username : customer.Username,
                    Password: Password ? Password : customer.Password,
                    Avatar: Avatar ? Avatar : customer.Avatar,
                    Email: Email ? Email : customer.Email,
                    SDT: SDT ? SDT : customer.SDT,
                    laShop: laShop ? laShop : customer.laShop,
                });
            });
            res.json({
                result: 'ok',
                data: customers,
                message: "Update customer profile successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: "Cannot find the customer to update"
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Cannot update customer. Error:${error}`
        });
    }

}

const disableCustomer = async (req, res) => {
    const { id } = req.params;

    try {
        let customers = await Customer.findAll({
            attributes: [
                'id',
                'HoTen',
                'SinhNhat',
                'GioiTinh',
                'Avatar',
                'Email',
                'SDT',
                'Username',
                'Password',
                'laShop',
            ],
            where: {
                id,
                isDisable: false
            }
        });
        if (customers.length > 0) {
            customers.forEach(async (customer) => {
                await customer.update({
                    isDisable: true
                });
            });
            res.json({
                result: 'ok',
                data: customers,
                message: "Disable customer profile successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: "Cannot find the customer to disable"
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Cannot disable customer. Error:${error}`
        });
    }

}

const enableCustomer = async (req, res) => {
    const { id } = req.params;

    try {
        let customers = await Customer.findAll({
            attributes: [
                'id',
                'HoTen',
                'SinhNhat',
                'GioiTinh',
                'Avatar',
                'Email',
                'SDT',
                'Username',
                'Password',
                'laShop',
            ],
            where: {
                id,
                isDisable: true
            }
        });
        if (customers.length > 0) {
            customers.forEach(async (customer) => {
                await customer.update({
                    isDisable: false
                });
            });
            res.json({
                result: 'ok',
                data: customers,
                message: "Enable customer profile successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: "Cannot find the customer to enable"
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Cannot enable customer. Error:${error}`
        });
    }

}

const getAllCustomer = async (req, res) => {
    try {
        const customers = await Customer.findAll({
            attributes: [
                'id',
                'HoTen',
                'SinhNhat',
                'GioiTinh',
                'Avatar',
                'Email',
                'SDT',
                'Username',
                'Password',
                'laShop',
            ],
            where: {
                isDisable: false
            }
        });
        res.json({
            result: 'ok',
            data: customers,
            length: customers.length,
            message: "List customer successfully"
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list customer. Error:${error}`
        });
    }
}

const getCustomerById = async (req, res) => {
    const { id } = req.params;
    try {
        const customers = await Customer.findAll({
            attributes: [
                'id',
                'HoTen',
                'SinhNhat',
                'GioiTinh',
                'Avatar',
                'Email',
                'SDT',
                'Username',
                'Password',
                'laShop',
            ],
            where: {
                id: id,
                isDisable: false

            },
        });
        if (customers.length > 0) {
            res.json({
                result: 'ok',
                data: customers[0],
                message: "List customer successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: `Cannot find list customer to show. Error:${error}`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list customer. Error:${error}`
        });
    }
}
//get customer by Email
const getCustomerByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const customers = await Customer.findAll({
            attributes: [
                'id',
                'HoTen',
                'SinhNhat',
                'GioiTinh',
                'Avatar',
                'Email',
                'SDT',
                'Username',
                'Password',
                'laShop',
            ],
            where: {
                Email: email,
                isDisable: false

            },
        });
        if (customers.length > 0) {
            res.json({
                result: 'ok',
                data: customers[0],
                message: "List customer successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: `Cannot find list customer to show. Error:${error}`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list customer. Error:${error}`
        });
    }
}
const getCustomerByUsername = async (req, res) => {
    const { username } = req.params;
    try {
        const customers = await Customer.findAll({
            attributes: [
                'id',
                'HoTen',
                'SinhNhat',
                'GioiTinh',
                'Avatar',
                'Email',
                'SDT',
                'Username',
                'Password',
                'laShop',
            ],
            where: {
                Username: username,
                isDisable: false

            },
        });
        if (customers.length > 0) {
            res.json({
                result: 'ok',
                data: customers[0],
                message: "List customer successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: `Cannot find list customer to show. Error:${error}`
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Cannot list customer. Error:${error}`
        });
    }
}

module.exports = {
    createCustomer,
    updateCustomer,
    disableCustomer,
    enableCustomer,
    getAllCustomer,
    getCustomerById,
    getCustomerByEmail,
    getCustomerByUsername
}