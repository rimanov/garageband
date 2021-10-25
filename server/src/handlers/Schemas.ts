import Joi from 'joi';

const reasonableString = Joi.string().max(128, 'utf8').required();
const positiveInt = Joi.number().positive().required();

const username = reasonableString;
const id = positiveInt;

export type Schema = {
  [key: string]: Joi.AnySchema;
};

export default {
  username,
  id,
};

export function intoValidator(schema: Schema): Joi.ObjectSchema {
  return Joi.object({ _id: id, ...schema }).required();
}
