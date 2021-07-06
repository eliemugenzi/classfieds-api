import { Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import asyncHandler from 'middlewares/asyncHandler';
import jsonResponse from 'helpers/jsonResponse';
import Product from 'models/Product';
import { BAD_REQUEST, CREATED, NOT_FOUND, OK } from 'constants/statusCodes';
import User from 'models/User';
import Category from 'models/Category';

export const checkProduct = asyncHandler(
  async (req: any, res: Response, next: NextFunction): Promise<any> => {
    const { params } = req;

    const foundProduct = await Product.findByPk(params?.id);

    if (!foundProduct) {
      return jsonResponse({
        res,
        status: NOT_FOUND,
        message: 'A product you are looking for is not found',
      });
    }

    req.product = foundProduct;

    return next();
  },
);

export const getMany = asyncHandler(async (req: any, res: Response) => {
  const {
    query: { page = 1, limit = 10, search },
  } = req;

  const offset = limit * (page - 1);

  const filter: any = {};

  if (search) {
    filter[Op.or] = [];
    filter[Op.or].push({
      name: {
        [Op.iLike]: `%${search}%`,
      },
    });
  }

  const products = await Product.findAndCountAll({
    where: {
      ...filter,
    },
    offset,
    limit,
    order: [['name', 'ASC']],
    include: [
      {
        model: User,
        as: 'seller',
      },
      {
        model: Category,
        as: 'category',
      },
    ],
  });

  const total = products.count;
  const pages = Math.ceil(total / limit);

  return jsonResponse({
    res,
    status: OK,
    data: products.rows,
    meta: {
      page,
      pages,
      total,
    },
  });
});

export const getOne = asyncHandler(async (req: any, res: Response) => {
  const { product } = req;

  return jsonResponse({
    res,
    status: OK,
    data: {
      ...product?.get(),
    },
  });
});

export const createOne = asyncHandler(async (req: any, res: Response) => {
  const { body, currentUser } = req;

  const category = await Category.findByPk(body?.category_id);

  if (!category) {
    return jsonResponse({
      res,
      status: BAD_REQUEST,
      message: 'This category is invalid',
    });
  }

  const product = await Product.create({
    ...body,
    user_id: currentUser?.id,
  });

  return jsonResponse({
    res,
    status: CREATED,
    message: 'Product has been created',
    data: {
      ...product?.get(),
    },
  });
});

export const getMine = asyncHandler(async (req: any, res: Response) => {
  const {
    query: { page = 1, limit = 10, search },
    currentUser,
  } = req;

  const offset = limit * (page - 1);

  const filter: any = {};

  if (search) {
    filter[Op.or] = [];
    filter[Op.or].push({
      name: {
        [Op.iLike]: `%${search}%`,
      },
    });
  }

  const products = await Product.findAndCountAll({
    where: {
      ...filter,
      user_id: currentUser?.id,
    },
    offset,
    limit,
    order: [['name', 'ASC']],
    include: [
      {
        model: User,
        as: 'seller',
      },
      {
        model: Category,
        as: 'category',
      },
    ],
  });

  const total = products.count;
  const pages = Math.ceil(total / limit);

  return jsonResponse({
    res,
    status: OK,
    data: products.rows,
    meta: {
      page,
      pages,
      total,
    },
  });
});
