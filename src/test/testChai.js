const request = require('supertest')('http://localhost:8080');
const expect = require('chai').expect

describe('Test de los 4 metodos', () => {

    it('(GET) Deberia retornar un status 200', async () => {
        let response = await request.get('/productos');
        expect(response.status).to.eql(200);
    });

    it('(POST) Deberia retornar un status 200', async () => {
        let response = await request.post('/productos').send({
            id: 1,
            title: 'Diccionario',
            price: 750,
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/bag-pack-container-school-512.png'
        });
        expect(response.status).to.eql(200);
    });

    it('(PUT) Deberia retornar un status 200', async () => {
        let response = await request.put('/productos').send({
            id: 23,
            title: 'Enciclopedia',
            price: 1350,
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/bag-pack-container-school-512.png'
        });
        expect(response.status).to.eql(200);
    });

    it('(DELETE) Deberia retornar un status 200', async () => {
        let response = await request.delete('/productos/22');
        expect(response.status).to.eql(200);
    });
})