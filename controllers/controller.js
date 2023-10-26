'use strict';
const { Product, Profile, User, Tag, ProducHasTag} = require('../models');


class Controller {
    static async showProducts(req, res) {
        try {
            const products = await Product.findAll({
                attributes: ['name', 'id', 'imgUrl', 'description']
            })
            // res.send(products);
            res.render('products', { products });
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
}

module.exports = Controller;