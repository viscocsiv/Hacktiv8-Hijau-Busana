const { User } = require('../models/index')
const { Profile } = require('../models/index')
const { Product } = require('../models/index')
const { Tag } = require('../models/index')
const { ProductHasTag } = require('../models/index')
const bcrypt = require('bcryptjs');

class Controller {
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });

            // if (!user) {
            //     res.locals.errorMessage = 'User not found';
            //     return res.redirect('/login');
            // }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                res.locals.errorMessage = 'Invalid password';
                return res.redirect('/login');
            }

            req.session.user = user;
            return res.redirect('/dashboard');
        } catch (error) {
            console.error(error);
            res.locals.errorMessage = 'Internal Server Error';
            return res.redirect('/login');
        }
    }

    static logout(req, res) {
        try {
            req.session.destroy((err) => {
                if (err) {
                    console.error(err);
                } else {
                    res.locals.successMessage = 'Logged out successfully';
                }
                return res.redirect('/login');
            });
        } catch (error) {
            console.error(error);
            res.locals.errorMessage = 'Internal Server Error';
            return res.redirect('/login');
        }
    }

    static showDashboard(req, res) {
        const user = req.session.user;
        if (!user) {
            res.locals.errorMessage = 'Please log in to access the dashboard';
            return res.redirect('/login');
        }

        return res.render('dashboard', { user });
    }
}

module.exports = Controller;
