import { Response } from 'express';
import asyncHandler from 'middlewares/asyncHandler';
import jsonResponse from 'helpers/jsonResponse';
import { OK } from 'constants/statusCodes';

export const getCurrentUser = asyncHandler(async (req: any, res: Response) => {
  const { currentUser } = req;

  return jsonResponse({
    res,
    status: OK,
    data: {
      ...currentUser?.get(),
    },
  });
});
