import { Router } from 'express';
import { UsersService } from '../../services';
import { users as schema } from '../../db/schemas';
import { asyncHandler, requestValidation } from '../middlewares';

const router = Router();

router.post(
  '/',
  requestValidation(schema.create, 'body'),
  asyncHandler(async (req, res) => {
    const userRecord = await UsersService.create(req.body);
    res.status(201).json({ userId: userRecord.uid });
  }),
);

router.get(
  '/',
  asyncHandler(async (_req, res) => res.json(await UsersService.getAll())),
);

router.get(
  '/:id',
  requestValidation(schema.uuid, 'params'),
  asyncHandler(async (req, res) => {
    const user = await UsersService.get(req.params.id);
    res.json({ ...user });
  }),
);

router.patch(
  '/:id',
  requestValidation(schema.update, 'body'),
  requestValidation(schema.uuid, 'params'),
  asyncHandler(async (req, res) => {
    await UsersService.update(req.params.id, req.body);
    res.status(204).end();
  }),
);

router.delete(
  '/:id',
  requestValidation(schema.uuid, 'params'),
  asyncHandler(async (req, res) => {
    await UsersService.remove(req.params.id);
    res.status(204).end();
  }),
);

export default router;
