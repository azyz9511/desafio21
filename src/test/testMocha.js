const productos = require('./clienteAxios');
const assert = require('assert').strict;

before( () => {
    console.log('-----------------------------INICIO DEL TEST------------------------------\n');
});

after( () => {
    console.log('-----------------------------FIN DEL TEST------------------------------\n');
});

describe('Test de agregar, leer, actualizar y eliminar productos', () => {
    
    it('Deberia crear un producto nuevo correctamente sin repetirse el id ', async () => {
        
        let prod1 = await productos.getProducts();
        prod1 = prod1.length;

        await productos.newProduct({
            id: 1,
            title: 'Diccionario',
            price: 750,
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/bag-pack-container-school-512.png'
        });
            
        let prod2 = await productos.getProducts();
        prod2 = prod2.length;
        
        assert.notStrictEqual(prod1, prod2);
    });

    it('Deberia listar todos los productos', async () => {
        let prod = await productos.getProducts();
        prod = prod.length;
        assert.notStrictEqual(prod,0);
    });

    it('Deberia actualizar un producto por su id, si este existiera', async () => {
        const prod1 = await productos.getProducts();
        await productos.updateProduct({
            id: 22,
            title: 'Enciclopedia',
            price: 1350,
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/bag-pack-container-school-512.png'
        });
        const prod2 = await productos.getProducts();
        assert.notDeepStrictEqual(prod1,prod2);
    });

    it('Deberia eliminar un producto por su id', async () => {
        const prod1 = await productos.getProducts();
        await productos.deleteProduct(21);
        const prod2 = await productos.getProducts();
        assert.notDeepStrictEqual(prod1,prod2);
    })

});

describe('Comprobar errores al crear, leer, actualizar o eliminar productos', () => {

    it('Deberia dar error si el id del producto enviado no existia al querer actualizar un producto', async () => {
        const prod1 = await productos.getProducts();
        await productos.updateProduct({
            id: 154789797,
            title: 'Enciclopedia',
            price: 1350,
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/bag-pack-container-school-512.png'
        });
        const prod2 = await productos.getProducts();
        assert.deepStrictEqual(prod1,prod2);
    });

    it('Debera dar error si el id enviado no coincide con ninguno de los productos al querer eliminar uno', async () => {
        const prod1 = await productos.getProducts();
        await productos.deleteProduct(142342343);
        const prod2 = await productos.getProducts();
        assert.deepStrictEqual(prod1,prod2);
    })

});