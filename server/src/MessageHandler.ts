import { Socket } from 'socket.io';
import { intoValidator, Schema } from './handlers/Schemas';

export class MessageHandler {
  readonly eventName: string;
  readonly schema: Schema;
  readonly onMessage: (msg: any, socket: Socket) => Promise<any | void>;

  constructor(
    eventName: string,
    schema: Schema,
    onMessage: (msg: any, socket: Socket) => Promise<Object | void>,
  ) {
    this.eventName = eventName;
    this.schema = schema;
    this.onMessage = onMessage;
  }

  public attach(socket: Socket) {
    const validator = intoValidator(this.schema);
    socket.on(this.eventName, async obj => {
      const validation = validator.validate(obj);

      if (validation.error) {
        console.error(
          `invalid message[${socket.id}][${this.eventName}]: ${validation.error.message}`,
        );
        socket.disconnect(true);
        return;
      }

      try {
        const success = await this.onMessage(obj, socket);
        if (success) {
          const { _id } = obj;
          socket.emit(`${this.eventName}.${_id}`, success);
        }
      } catch (err) {
        console.error(err);
        socket.disconnect(true);
      }
    });
  }
}
