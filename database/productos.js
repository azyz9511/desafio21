const mongoose = require('mongoose');
const mensajeSchema = require('../database/models/mensajeSchema');
require('dotenv').config();

class Chat{
    
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
    
    async addNewMessage(mensaje){
        try{
            await this.connectDB();
            await mensajeSchema.create(mensaje);
            mongoose.disconnect();
        }catch (e){
            console.log(`Ha ocurrido el siguiente error: ${e}`);
        }
    }
    
    async getAllMessages(){
        try{
            await this.connectDB();
            const data = await mensajeSchema.find();
            mongoose.disconnect();
            return data;
        }catch (e){
            console.log(`Ha ocurrido el siguiente error: ${e}`);
        }
    }

}

const chatDB = new Chat();

module.exports = chatDB;

class Productos{

    constructor(table,options){
        this.table = table;
        this.options = options;
        this.knex = require('knex')(this.options);
    }

    newTable(){
        this.knex.schema.createTable(this.table,(table) => {
            table.increments('id');
            table.string('title',200);
            table.string('price',100);
            table.string('thumbnail',250);
        })
        .then(() => {
            console.log('tabla creada');
        })
        .catch((error) => {
            console.log('La tabla ya existe');
        });
    }

    addProduct(product){
        this.knex(this.table).insert(product)
        .then(() => {
            console.log('Producto guardado');
        })
        .catch((error) => {
            console.log(error);
        });
    }

    readProducts(){
        const productos = this.knex.from(this.table).select('*')
        .then((data) => {
            return data;
        })
        .catch((error) => {
            return false;
        });
        return productos;
    }

}

module.exports = Productos;