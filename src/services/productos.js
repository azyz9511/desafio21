const productosDao = require('../database/DAO/productos');
const ProductoDto = require('../database/DTO/productos');

const productos = {
    addProduct: async (producto) => {
            try{
                const data = await productosDao.addNewProduct(producto);
                return data;
            }catch (e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        },
    readProducts: async () => {
            try{
                const data = await productosDao.getAllProducts();
                const datos = data.map( elemento => {
                    const dto = new ProductoDto(elemento);
                    return dto;
                })
                return datos;
            }catch (e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        },
    upProduct: async (producto) => {
            try{
                const data = await productosDao.updateOne(producto); 
                return data;
            }catch(e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        },
    delProduct: async (id) => {
            const idProd = parseInt(id);
            try{
                const data = await productosDao.deleteOne(idProd); 
                return data;
            }catch(e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        }
}

module.exports = productos;