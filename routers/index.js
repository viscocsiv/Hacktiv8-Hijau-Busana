'use strict';

const express = require('express');
const app = express();
const router = express.Router();
const Controller = require('../controllers/controller');

router.get('/', Controller.home); // halaman rumah

router.get('/register', Controller.register); // register page => hanya untuk user

router.post('/register', Controller.register);

router.get('/login', Controller.login); // login page => user dan admin

router.post('/login', Controller.login);

router.get('/store', Controller.store); // list produk untuk user membeli barang

// router.get('/store/:id/buy', Controller.buy) //

router.get('/products', Controller.showProducts); // list produk untuk admin merestok atau menghapus produk

router.get('/products/:id/restock', Controller.showRestockForm); // form restok

router.post('/products/:id/restock', Controller.restock); // restok produk

router.get('/products/:id/delete', Controller.deleteProduct); // menghapus produk

module.exports = router;