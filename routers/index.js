'use strict';

const express = require('express');
const app = express();
const router = express.Router();
const Controller = require('../controllers/controller');

router.get('/', Controller.home); // landing page 

router.get('/register', Controller.register) // register page => hanya untuk user

router.post('/register', Controller.register) // register page => hanya untuk user

router.get('/login', Controller.login) // login page => user dan admin

router.post('/login', Controller.login)

// router.get('/profile', Controller.);

router.get('/products', Controller.showProducts); // list product, untuk user dapat mengklik tombol detail produk untuk admin dapat menambah produk

// router.get('/products/add', Controller.showForm); // menampilkan form bagi admin untuk menambah product

// router.post('/products/add', Controller.addProduct); // menambahkan produk baru ke database

// router.get('/products/:id/detail'); // menampilkan detail produk, untuk admin dapat me-restock produk, untuk user dapat menambah ke keranjang

module.exports = router;