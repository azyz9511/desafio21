const products = require('../services/productos');

const productos = {
    newProduct : async ( req , res ) => {
        const data = await products.addProduct(req.body);
        res.send(data);
    },
    getProducts : async ( req , res ) => {
        const data = await products.readProducts();
        res.send(data);
    },
    updateProduct : async ( req , res ) => {
        console.log(req.body);
        const data = await products.upProduct(req.body);
        res.send(data);
    },
    deleteProduct : async ( req , res ) => {
        const data = await products.delProduct(req.params.id);
        res.send(data);
    }
}

module.exports = productos;