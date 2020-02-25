import { Router } from 'express';
import { MembersService } from '../../services';
import { members as schema } from '../../db/schemas';
import { asyncHandler, requestValidation, cache } from '../middlewares';

const router = Router();

router.post(
  '/',
  requestValidation(schema.create, 'body'),
  asyncHandler(async (req, res) => {
    const id = await MembersService.create(req.body);
    res.status(201).json({ id });
  }),
);

router.patch(
  '/:id',
  requestValidation(schema.update, 'body'),
  requestValidation(schema.uuid, 'params'),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await MembersService.update(id, req.body);
    res.status(204).end();
  }),
);

router.delete(
  '/:id',
  requestValidation(schema.uuid, 'params'),
  asyncHandler(async (req, res) => {
    await MembersService.remove(req.params.id);
    res.status(204).end();
  }),
);

router.get(
  '/',
  cache('1000'),
  asyncHandler(async (_req, res) => {
    res.json(await MembersService.getAll());
  }),
);

router.get(
  '/:id',
  cache('1000'),
  requestValidation(schema.uuid, 'params'),
  asyncHandler(async (req, res) => {
    const member = await MembersService.get(req.params.id);
    res.json({ ...member });
  }),
);

router.post(
  '/:id/subscribe-activities',
  requestValidation(schema.uuid, 'params'),
  requestValidation(schema.subscribeActivity, 'body'),
  asyncHandler(async (req, res) => {
    await MembersService.subscribeActivities(
      req.params.id,
      req.body.activities,
    );
    res.status(204).end();
  }),
);

router.delete(
  '/:id/unsubscribe-activities',
  requestValidation(schema.uuid, 'params'),
  requestValidation(schema.subscribeActivity, 'body'),
  asyncHandler(async (req, res) => {
    await MembersService.unsubscribeActivities(
      req.params.id,
      req.body.activities,
    );
    res.status(204).end();
  }),
);

router.post(
  '/:id/consume-activity',
  requestValidation(schema.uuid, 'params'),
  requestValidation(schema.consumeActivity, 'body'),
  asyncHandler(async (req, res) => {
    await MembersService.consumeActivity(req.params.id, req.body);
    res.status(204).end();
  }),
);

export default router;
