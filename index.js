import http from 'http';
import app from './app';
import { port } from './config';

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
