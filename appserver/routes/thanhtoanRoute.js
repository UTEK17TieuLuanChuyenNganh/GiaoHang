let express = require('express');
let router = express.Router();
let paypal = require('paypal-rest-sdk');

// let methodOverride = require('method-override');
// const e = require('method-override');
// router.use(methodOverride('_method'));

var total
var items
var shipping
var shippingAddress
var reciver
paypal.configure({
    'mode': 'sandbox',
    'client_id': 'AbGwB8R8bVwztvwz6x29HBkp1BnbD8SDucdOC1GsQdT1PtIWkDB4ea2dA0Y9I7lTL4L-KOHGX3wXITMF',
    'client_secret': 'EISX6t_t16u3qgNMWKQitx7qZ0zmORV-RbX2Iv3qzpKAVl8JtuPrZNUUdfA-6lDrBtc3w48SeEgS3hd2'
});

router.post('/pay', (req, res) => {
    items = req.body;
    total = 0;
    let itemsData = items.items;
    shipping = items.shipping
    shippingAddress = items.address
    reciver = items.reciver
    itemsData.forEach((e => {
        total += e.price * e.quantity;
    }));
    if (itemsData.length > 0) {
        let create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal",
            },
            "redirect_urls": {
                "return_url": "http://servertlcn.herokuapp.com/thanhtoan/execute",
                "cancel_url": "https://servertlcn.herokuapp.com"
            },
            "transactions": [{
                "item_list": {
                    "items": itemsData,
                    "shipping_address": {
                        "recipient_name": reciver,
                        "line1": shippingAddress,
                        "city": "Ho Chi Minh City",
                        "postal_code": "70000",
                        "country_code": "VN"
                    },
                },
                "amount": {
                    "currency": "USD",
                    "total": total + shipping,
                    "details": {
                        "shipping": shipping,
                        "subtotal": total
                    }
                },
                "description": "Thanh toán mặt hàng"
            }]
        };
        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                for (let i = 0; i < payment.links.length; i++) {
                    if (payment.links[i].rel == 'approval_url') {
                        res.json(
                            {
                                result: 'ok',
                                url: payment.links[i].href,
                                message: `Payment url`
                            });
                    }
                }
            }
        });
    }
    else {
        res.json({
            result: 'failed',
            message: `Payment failed`
        });
    }
})


router.get('/execute', (req, res) => {
    if (total != 0) {
        let payerId = req.query.PayerID;
        let paymentId = req.query.paymentId;

        let execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": total + shipping,
                    "details": {
                        "shipping": shipping,
                        "subtotal": total
                    }
                }
            }]
        };
        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                console.log(error)
                throw error;
            } else {
                res.json({
                    result: 'success',
                    message: `Payment successed`
                });
            }
        });
    }
    else {
        res.json({
            result: 'failed',
            message: `Payment failed`
        });
    }
});
module.exports = router;
