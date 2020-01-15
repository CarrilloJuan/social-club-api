import { Router } from 'express';
import { membersService } from '../../services';
import schema from '../../models/members/schema';
import requestValidation from '../middlewares/requestValidation';
import { asyncError } from '../../utils';

const router = Router();

router.post(
  '/',
  requestValidation(schema.create, 'body'),
  asyncError(async (req, res) => {
    const id = await membersService.create(req.body);
    res.status(201).json({ id });
  }),
);

router.patch(
  '/:id',
  requestValidation(schema.update, 'body'),
  requestValidation(schema.uuid, 'params'),
  asyncError(async (req, res) => {
    const { id } = req.params;
    await membersService.update(id, req.body);
    res.status(204).end();
  }),
);

router.delete(
  '/:id',
  requestValidation(schema.uuid, 'params'),
  asyncError(async (req, res) => {
    await membersService.remove(req.params.id);
    res.status(204).end();
  }),
);

router.get(
  '/',
  asyncError(async (_req, res) => res.json(await membersService.getAll())),
);

router.get(
  '/:id',
  requestValidation(schema.uuid, 'params'),
  asyncError(async (req, res) => {
    const member = await membersService.get(req.params.id);
    res.json({ ...member });
  }),
);

router.post(
  '/:id/subscribe-activities',
  requestValidation(schema.uuid, 'params'),
  requestValidation(schema.subscribeActivity, 'body'),
  asyncError(async (req, res) => {
    await membersService.subscribeActivities(
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
  asyncError(async (req, res) => {
    await membersService.unsubscribeActivities(
      req.params.id,
      req.body.activities,
    );
    res.status(204).end();
  }),
);

export default router;
