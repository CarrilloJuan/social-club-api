import { Router } from 'express';
import { ActivitiesService } from '../../services';
import { activities as schema } from '../../db/schemas';
import { asyncHandler, requestValidation, cache } from '../middlewares';

const router = Router();

router.post(
  '/',
  requestValidation(schema.create, 'body'),
  asyncHandler(async (req, res) => {
    const id = await ActivitiesService.create(req.body);
    res.status(201).json({ id });
  }),
);

router.patch(
  '/:id',
  requestValidation(schema.update, 'body'),
  requestValidation(schema.id, 'params'),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await ActivitiesService.update(id, req.body);
    res.status(204).end();
  }),
);

router.delete(
  '/:id',
  requestValidation(schema.id, 'params'),
  asyncHandler(async (req, res) => {
    ActivitiesService.remove(req.params.id);
    res.status(204).end();
  }),
);

router.get(
  '/',
  cache('10'),
  asyncHandler(async (_req, res) => {
    res.json(await ActivitiesService.getAll());
  }),
);

router.get(
  '/:id',
  cache('10'),
  requestValidation(schema.id, 'params'),
  asyncHandler(async (req, res) => {
    const activity = await ActivitiesService.get(req.params.id);
    res.json({ ...activity });
  }),
);

export default router;
