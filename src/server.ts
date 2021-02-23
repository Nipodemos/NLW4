import express from 'express';

const app = express();

app.get('/users', (request, response) => response.send({ message: 'Hello World - NLW4' }));
app.post('/', (request, response) => response.json({ message: 'Os dados foram salvos com sucesso' }));
app.listen(3333, () => {
  console.log('Servidor aberto em http://localhost:3333');
});
