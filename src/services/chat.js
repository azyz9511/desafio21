const chatDao = require('../database/DAO/chat');
const ChatDto = require('../database/DTO/chat');

const chat = {
    addMessage: async (mensaje) => {
            try{
                await chatDao.addNewMessage(mensaje);
                console.log('mensaje guardado con exito');
            }catch (e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        },
    readMessages: async () => {
            try{
                const data = await chatDao.getAllMessages();
                const datos = data.map(item => {
                    const dto = new ChatDto(item)
                    return dto;
                });
                return datos;
            }catch (e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        }
}

module.exports = chat;