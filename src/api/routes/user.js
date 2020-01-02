import { Router } from 'express';
import { UserService } from '../../services';
import userSchema from '../../models/user/schema';
import validator from '../middlewares/validator';
import { asyncError } from '../../utils';

const router = Router();

router.post(
  '/',
  validator(userSchema.register, 'body'),
  asyncError(async (req, res) => {
    const { id } = await UserService.registerUser(req.body);
    res.status(201).json({ userId: id });
  }),
);

router.patch(
  '/',
  validator(userSchema.update, 'body'),
  asyncError(async (req, res) => {
    await UserService.updateUser(req.body);
    res.status(204).end();
  }),
);

router.delete(
  '/:id',
  validator(userSchema.remove, 'params'),
  asyncError(async (req, res) => {
    UserService.removeUser(req.params.id);
    res.status(204).end();
  }),
);

router.get(
  '/all',
  asyncError(async (req, res) => {
    const users = await UserService.getUsers();
    res.status(200).json(users);
  }),
);

router.get(
  '/:id',
  validator(userSchema.get, 'params'),
  asyncError(async (req, res) => {
    const user = await UserService.getUser(req.params.id);
    res.status(200).json({ user });
  }),
);

export default router;
