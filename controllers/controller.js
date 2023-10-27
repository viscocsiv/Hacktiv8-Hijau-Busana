'use strict';
const { Product, Profile, User, Category, UserHasProduct } = require('../models');
const formatCurrency = require('../helpers/formatCurrency')
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize')


class Controller {
    static home(req, res) {
        res.render('home');
    }

    static async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            res.locals.errorMessage = 'Email and password are required';
            return res.render('login');
        }

        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                res.locals.errorMessage = 'User not found';
                return res.render('login');
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                if (user.role === "User") {
                    res.redirect('/store');
                } else if (user.role === "Admin") {
                    res.redirect('/products')
                }
            } else {
                res.locals.errorMessage = 'Invalid password';
                return res.render('login');
            }
        } catch (error) {
            console.error(error);
            res.locals.errorMessage = 'Internal Server Error';
            return res.render('login');
        }
    }

    static async register(req, res) {
        const { email, password, name, birthDate } = req.body;

        if (!email || !password) {
            res.locals.errorMessage = 'Username, email, and password are required';
            return res.render('register');
        }

        try {
            const profile = await Profile.create({
                name, birthDate
            });
            // console.log(profile);
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({
                email,
                password: hashedPassword,
                ProfileId: profile.id
            });

            return res.redirect('/login');
        } catch (error) {
            console.error(error);
            res.locals.errorMessage = 'Registration failed';
            return res.render('register');
        }
    }

    static async store(req, res) {
        try {
            const { sortBy } = req.query;
            const products = await Product.getAllProductsAvailable(sortBy);
            // res.send(products);
            res.render('store', { products, formatCurrency });
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }

    // static async buy(req, res) {
    //     try {

    //     } catch (error) {
    //         console.log(error);
    //         res.send(error.message);
    //     }
    // }

    static async showProducts(req, res) {
        try {
            const { restock, deleted } = req.query
            const products = await Product.findAll({
                attributes: ['id', 'name', 'stock', 'price', 'updatedAt'],
                include: {
                    model: Category,
                    attributes: [
                        'id', 'name'
                    ]
                },
                order: [['stock', 'ASC']]
            });
            // res.send(products);
            res.render('products', { products, formatCurrency, restock, deleted });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async showRestockForm(req, res) {
        try {
            let errorMessage = req.query.error;

            if (errorMessage) {
                errorMessage = errorMessage.split(',');
            }
            const { id } = req.params;
            const product = await Product.findOne({
                attributes: [
                    'id', 'name', 'stock'
                ],
                where: { id }
            })
            // res.send(product);
            res.render('restockForm', { product, errorMessage });
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }

    static async restock(req, res) {
        const { id } = req.params;
        try {
            const { stock } = req.body;
            const product = await Product.findByPk(id, {
                attributes: ['name']
            })
            await Product.update({ stock }, {
                where: { id }
            });
            console.log(product);
            // res.send(products);
            res.redirect(`/products?restock=${product.name} has been restocked to ${stock}`)
        } catch (error) {
            if (error.name = `SequelizeValidationError`) {
                let errorMessage = [];
                error.errors.forEach((el) => {
                    errorMessage.push(el.message);
                });
                res.redirect(`/products/${id}/restock?error=${errorMessage}`);
            } else {
                console.log(error);
                res.send(error.message);
            }
        }
    }

    static async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.findByPk(id, {
                attributes: ['name']
            });
            await Product.destroy({
                where: { id }
            });
            console.log(product);
            // res.send(products);
            res.redirect(`/products?deleted=${product.name} has been deleted`)
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
}

module.exports = Controller;