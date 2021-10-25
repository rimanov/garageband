import { io as newSocket, Socket as SocketIO } from 'socket.io-client';

const SOCKET_URL = 'ws://localhost:3001';

const SOCKET_OPTS = {
  transports: ['websocket'],
  path: '/ws',
  autoConnect: true,
  reconnection: true,
  timeout: 10000,
};

let idCounter = 1;

export async function send(
  socket: Socket,
  name: string,
  msg: any,
): Promise<any> {
  const _id = idCounter++;

  return new Promise((resolve, reject) => {
    socket.once(`${name}.${_id}`, resp => {
      const { error, ...success } = resp;
      if (success) {
        resolve(success);
      } else {
        reject(error);
      }
    });
    socket.emit(name, { _id, ...msg });
  });
}


export type Socket = SocketIO;

export function initializeSocket(
  onConnect: (socket: Socket) => void,
  onDisconnect: () => void,
): Socket {
  const socket = newSocket(SOCKET_URL, SOCKET_OPTS);

  socket.on('connect', () => onConnect(socket));
  socket.on('disconnect', onDisconnect);

  return socket;
}
