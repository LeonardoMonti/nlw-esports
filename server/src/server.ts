import express from 'express';

const app = express();
const PORT = 3333;

app.get('/ads', (_request, response) => {
  return response.json([
    { id: 1, name: 'anuncio1'},
    { id: 2, name: 'anuncio2'}
  ])
})

app.listen(PORT, () => {
  console.log(`Server listering of port: ${PORT}`);
  
})