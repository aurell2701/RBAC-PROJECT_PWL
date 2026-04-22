import { Response } from 'express';
import { AuthRequest } from '../middleware/rbacMiddleware';
import { getAllUsers, createUser, deleteUser } from '../models/userModel';
import { getAllRoles } from '../models/roleModel';

export const listUsers = async (req: AuthRequest, res: Response) => {
  const users = await getAllUsers();
  const roles = await getAllRoles();
  res.render('users/list', { title: 'User Management', users, roles, user: req.user });
};

export const storeUser = async (req: AuthRequest, res: Response) => {
  await createUser(req.body);
  res.redirect('/users');
};

export const removeUser = async (req: AuthRequest, res: Response) => {
  await deleteUser(parseInt(req.params.id));
  res.redirect('/users');
};