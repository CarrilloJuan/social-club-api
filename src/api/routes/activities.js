import { Router } from 'express';
import { activitiesService } from '../../services';
import schema from '../../models/activities/schema';
import { asyncHandler, requestValidation } from '../middlewares';

const router = Router();

router.post(
  '/',
  requestValidation(schema.create, 'body'),
  asyncHandler(async (req, res) => {
    const id = await activitiesService.create(req.body);
    res.status(201).json({ id });
  }),
);

router.patch(
  '/:id',
  requestValidation(schema.update, 'body'),
  requestValidation(schema.id, 'params'),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await activitiesService.update(id, req.body);
    res.status(204).end();
  }),
);

router.delete(
  '/:id',
  requestValidation(schema.id, 'params'),
  asyncHandler(async (req, res) => {
    activitiesService.remove(req.params.id);
    res.status(204).end();
  }),
);

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    res.json(await activitiesService.getAll());
  }),
);

router.get(
  '/:id',
  requestValidation(schema.id, 'params'),
  asyncHandler(async (req, res) => {
    const activity = await activitiesService.get(req.params.id);
    res.json({ ...activity });
  }),
);

export default router;
