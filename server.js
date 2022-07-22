// Importaciones
const express = require('express');
const {Server: HttpServer} = require('http');
const {Server: IOServer} = require('socket.io');
const yargs = require('yargs/yargs')(process.argv.slice(2))
const args = yargs.default({ puerto:8080, modo:'FORK' }).argv;
const cpus = require('os').cpus().length;
const cluster = require('cluster');
const PORT = process.env.PORT || 8080;

// importacion de los servicio chat y productos
const chat = require('./services/chat');
const productos = require('./services/productos');

// importacion de routers
const router = require('./routes/router');

// Inicializar express, http y socket.io
const app = express();
const httpserver = new HttpServer(app);
const io = new IOServer(httpserver);

// middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('view engine','ejs');
app.use(express.static("public"));
app.use('/',router);

// sockets
io.on('connection',async (socket) => {

    //mensaje de usuario conectado
    console.log('Usuario conectado'); 

    // socket para productos con faker
    socket.emit('productosFaker',productos.RandomProducts());

    // socket para productos
    socket.on('guardar', data => {
        console.log(data);
        const products = productos.readProducts();
        products.then(historialProductos => {
            io.sockets.emit('historialGuardar',historialProductos);
        });
    });

    const products = productos.readProducts();
    products.then(historialProductos => {
        if(historialProductos !== false){
            socket.emit('historialProductos',historialProductos);
        }else{
            console.log('La tabla no existe');
        }
    });

    //socket para chat
    socket.on('nuevoMensaje',async data => {
        try{
            await chat.addMessage(data);
            const mensajes = await chat.readMessages();
            io.sockets.emit('historialGlobal',mensajes);
        }catch (e){
            console.log(`Ha ocurrido el siguiente error: ${e}`);
        }
    });
    try{
        const mensajes = await chat.readMessages();
        socket.emit('historialChat',mensajes);
    }catch (e){
        console.log(`Ha ocurrido el siguiente error: ${e}`);
    }
});

//inicio de servidor

if(args.modo === 'CLUSTER' && cluster.isPrimary){
    console.log(`Master ${process.pid} is running`);
    for (let i = 0; i < cpus; i++) {
        cluster.fork();        
    }
    cluster.on('exit',(worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork();
    });
}else{
    httpserver.listen(PORT, () => {
        console.log(`proceso ${process.pid} corriendo en el puerto ${PORT}`);
    });   
    console.log(`worker ${process.pid} is running`);
}

module.exports = httpserver;