import { Response } from 'express';
import { OK } from 'constants/statusCodes';
import User from 'models/User';

interface ResponseParams {
  res: Response;
  status?: number;
  data?: any;
  token?: string;
  message?: string;
  errorCode?: string;
  errors?: any;
  meta?: {
    total?: number;
    page?: number;
    pages?: number;
    user?: User;
  };
  [key: string]: any;
}
/**
 * @param  {Object} data
 * @param  {ServerResponse} res
 * @return {ServerResponse} Response
 */
const jsonResponse = ({ status = OK, res, ...data }: ResponseParams): Response => {
  return res.status(status).json({
    status,
    ...data,
  });
};

export default jsonResponse;
