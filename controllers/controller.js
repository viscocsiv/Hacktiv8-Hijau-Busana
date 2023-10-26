'use strict';
const { Product, Profile, User, Tag, ProducHasTag } = require('../models');


class Controller {
    static home(req, res) {
        res.render('home')
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
                return res.redirect('/products');
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
        const { email, password } = req.body;

        if (!email || !password) {
            res.locals.errorMessage = 'Username, email, and password are required';
            return res.render('register');
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({
                email,
                password: hashedPassword,
                role: 'User'
            });

            return res.redirect('/login');
        } catch (error) {
            console.error(error);
            res.locals.errorMessage = 'Registration failed';
            return res.render('register');
        }
    }


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