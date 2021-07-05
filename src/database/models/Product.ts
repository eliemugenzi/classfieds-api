import { Model, DataTypes } from 'sequelize';
import { sequelize } from '.';
import Category from './Category';
import User from './User';

/**
 * Job Class Model
 */

class Product extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public image!: string;
  public price!: number;
  public status!: 'available' | 'sold';
  public category_id!: number;
  public user_id!: number;

  public readonly category?: Category;
  public readonly seller?: User;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'available',
    },
    price: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.0,
    },
    image: {
      type: DataTypes.STRING,
    },
    category_id: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    underscored: true,
    tableName: 'products',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

export default Product;
