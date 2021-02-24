import { createConnection } from 'typeorm';

createConnection().then(() => {
  console.log('Conectado ao banco com sucesso');
});
