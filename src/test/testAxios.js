const axios = require('./clienteAxios');

const productoNuevo = {
    id: 1,
    title: 'Diccionario',
    price: 750,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/bag-pack-container-school-512.png'
}

const productUpdate = {
    id: 21,
    title: 'Enciclopedia',
    price: 1350,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/bag-pack-container-school-512.png'
}

const prodDelete = 20;

async function test(){
    
    // Ir descomentando para poder ejecutar y probar
    // console.log(await axios.getProducts());
    // console.log(await axios.newProduct(productoNuevo));
    // console.log(await axios.updateProduct(productUpdate));
    console.log(await axios.deleteProduct(prodDelete));

}

test();