import { Sequelize } from 'sequelize';

import User from './User';
import Token from './Token';
import Category from './Category';
import Product from './Product';

import 'dotenv/config';
import DBConfig from '../config/config';

const env = process.env.NODE_ENV || 'development';
const config: any = DBConfig[env];

Token.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

Product.belongsTo(Category, {
  as: 'category',
  foreignKey: 'category_id',
});

Product.belongsTo(User, {
  as: 'seller',
  foreignKey: 'user_id',
});

User.hasMany(Product, {
  as: 'products',
  foreignKey: 'user_id',
});

interface Database {
  sequelize: Sequelize;
}

export const sequelize = new Sequelize(process.env[config.use_env_variable] as string, config);

const db: Database = {
  sequelize,
};

export default db;
