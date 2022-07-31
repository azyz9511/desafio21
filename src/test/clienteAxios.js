const axios = require('axios');

class ClienteAxios{

    constructor(){

    }

    async getProducts(){
        try{
            const response = await axios.get('http://localhost:8080/productos');
            return response.data;
        }catch(e){
            console.log(e);
        }
    }    
    
    async newProduct(producto){
        try{
            const response = await axios.post('http://localhost:8080/productos', producto);
            return response.data;
        }catch(e){
            console.log(e);
        }
    }
    
    async updateProduct(producto){
        try{
            const response = await axios.put('http://localhost:8080/productos', producto);
            return response.data;
        }catch(e){
            console.log(e);
        }
    }
    
    async deleteProduct(id){
        try{
            const response = await axios.delete(`http://localhost:8080/productos/${id}`);
            return response.data;
        }catch(e){
            console.log(e);
        }
    }
    
}

const clienteAxios = new ClienteAxios();
    
module.exports = clienteAxios;
    
    
    
    // const axios = require('axios');
    
    // async function getProducts(){
        //     try{
            //         const response = await axios.get('http://localhost:8080/productos');
            //         console.log(response.data);
            //     }catch(e){
                //         console.log(e);
                //     }
                // }

                // async function newProduct(producto){
                    //     try{
                        //         const response = await axios.post('http://localhost:8080/productos', producto);
                        //         console.log(response.data);
                        //         console.log(producto);
                        //     }catch(e){
                            //         console.log(e);
                            //     }
                            // }
                            
                            // async function updateProduct(producto){
                                //     try{
                                    //         const response = await axios.put('http://localhost:8080/productos', producto);
                                    //         console.log(response.data);
                                    //         console.log(producto);
                                    //     }catch(e){
                                        //         console.log(e);
                                        //     }
                                        // }
                                        
                                        // async function deleteProduct(id){
                                            //     try{
                                                //         const response = await axios.delete(`http://localhost:8080/productos/${id}`);
                                                //         console.log(response.data);
                                                //     }catch(e){
                                                    //         console.log(e);
                                                    //     }
                                                    // }
                                                    
                                                    // const clienteAxios = { getProducts, newProduct, updateProduct, deleteProduct };
                                                    
                                                    // module.exports = clienteAxios;