'use strict'
function formatCurrency(value) {
    let rupiah = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    });
    return rupiah.format(value);
};

module.exports = formatCurrency;