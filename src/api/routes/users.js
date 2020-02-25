import { Router } from 'express';
import { usersService } from '../../services';
import schema from '../../models/users/schema';
import { asyncHandler, requestValidation } from '../middlewares';

const router = Router();

router.post(
  '/',
  requestValidation(schema.create, 'body'),
  asyncHandler(async (req, res) => {
    const userRecord = await usersService.create(req.body);
    res.status(201).json({ userId: userRecord.uid });
  }),
);

router.get(
  '/',
  asyncHandler(async (_req, res) => res.json(await usersService.getAll())),
);

router.get(
  '/:id',
  requestValidation(schema.uuid, 'params'),
  asyncHandler(async (req, res) => {
    const user = await usersService.get(req.params.id);
    res.json({ ...user });
  }),
);

router.patch(
  '/:id',
  requestValidation(schema.update, 'body'),
  requestValidation(schema.uuid, 'params'),
  asyncHandler(async (req, res) => {
    await usersService.update(req.params.id, req.body);
    res.status(204).end();
  }),
);

router.delete(
  '/:id',
  requestValidation(schema.uuid, 'params'),
  asyncHandler(async (req, res) => {
    await usersService.remove(req.params.id);
    res.status(204).end();
  }),
);

export default router;
