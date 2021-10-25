import { Server, Socket } from 'socket.io';
import { DB } from './Database';
import http from 'http';
import { MessageHandler } from './MessageHandler';
import { JoinHandler } from './handlers/JoinHandler';
import { GetMembersHandler } from './handlers/GetMembersHandler';

const VALID_ORIGINS = ['http://localhost:3000', 'http://localhost:3001'];
const PING_TIMEOUT_MS = 10000;
const PING_INTERVAL_MS = 10000;
const WS_PATH = '/ws';

// Add messages you'd like to support here
export const validMessages: MessageHandler[] = [JoinHandler, GetMembersHandler];

function disconnectHandler(socket: Socket): (reason: string) => void {
  return reason => {
    console.debug(`disconnect[${socket.id}]: ${reason}`);
  };
}

function connectHandler(socket: Socket) {
  socket.once('disconnect', disconnectHandler(socket));
  socket.onAny((event, msg) =>
    console.debug(`${event}[${socket.id}]: ${JSON.stringify(msg)}`),
  );
  validMessages.forEach(handler => handler.attach(socket));
}

export async function initServer(port: number): Promise<Server> {
  const httpServer = http.createServer();

  // FIXME: production release
  // httpServer.listen(port, 'localhost');
  httpServer.listen(3002, 'localhost');

  const server = new Server({
    path: WS_PATH,
    serveClient: false,
    pingTimeout: PING_TIMEOUT_MS,
    pingInterval: PING_INTERVAL_MS,
    cors: {
      origin: VALID_ORIGINS,
    },
    transports: ['websocket'],
  });

  console.debug(`opening socket on port ${port}`);

  server.on('connection', connectHandler);
  server.attach(httpServer);

  return server;
}
