import { DB } from '../Database';
import { MessageHandler } from '../MessageHandler';

async function onMessage(): Promise<any> {
  const songs = await DB.runQuery('get_songs');

  console.log('songs message');

  return { songs };
}

const schema = {};

export const GetSongsHandler = new MessageHandler(
  'get_songs',
  schema,
  onMessage,
);
