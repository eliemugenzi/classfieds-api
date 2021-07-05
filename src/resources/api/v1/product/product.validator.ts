import { celebrate, Joi } from 'celebrate';

export const createOneRule = celebrate({
  body: Joi.object().keys({
    category_id: Joi.number().integer().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().integer().min(100).required(),
    image: Joi.string().required(),
  }),
});
