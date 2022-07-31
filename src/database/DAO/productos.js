const mongoose = require('mongoose');
const productoSchema = require('../models/productoSchema');
require('dotenv').config();

class Producto{
    
    constructor(){
        
    }

    async connectDB(){
        try{
            const URL = process.env.URLDB;
            let connect = await mongoose.connect(URL,{
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        }catch (e){
            console.log(e);
        }
    }
    
    async addNewProduct(producto){
        try{
            await this.connectDB();
            let lastId = await productoSchema.find().sort({id:-1}).limit(1);
            if(lastId.length !== 0){
                producto.id = lastId[0].id + 1;
            }else{
                producto.id = 1;
            }
            await productoSchema.create(producto);
            mongoose.disconnect();
            return 'Producto agregado con exito';
        }catch (e){
            console.log(`Ha ocurrido el siguiente error: ${e}`);
        }
    }

    async getAllProducts(){
        try{
            await this.connectDB();
            const data = await productoSchema.find();
            mongoose.disconnect();
            return data;
        }catch (e){
            return `Ha ocurrido el siguiente error: ${e}`;
        }
    }

    async updateOne(producto){
        try{
            let response;
            await this.connectDB();
            const prod = await productoSchema.find({id: producto.id});
            if(prod.length !== 0){
                await productoSchema.updateOne({id: producto.id}, {$set: producto});
                response = 'Producto actualizado con exito';
            }else{
                response = 'No existe un producto con ese id';
            }
            mongoose.disconnect();
            return response
        }catch (e){
            return `Ha ocurrido el siguiente error: ${e}`;
        }
    }

    async deleteOne(id){
        try{
            let response;
            await this.connectDB();
            const prod = await productoSchema.find({id: id});
            if(prod.length !== 0){
                await productoSchema.deleteOne({id: id});
                response = 'Producto eliminado con exito';
            }else{
                response = 'No existe un producto con ese id';
            }
            mongoose.disconnect();
            return response
        }catch (e){
            return `Ha ocurrido el siguiente error: ${e}`;
        }
    }

}

const productosDB = new Producto();

module.exports = productosDB;