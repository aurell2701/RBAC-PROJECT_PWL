import { Response } from 'express';
import { AuthRequest } from '../middleware/rbacMiddleware';
import { getAllRoles, createRole, deleteRole } from '../models/roleModel';

export const listRoles = async (req: AuthRequest, res: Response) => {
  const roles = await getAllRoles();
  res.render('roles/list', { title: 'Role Management', roles, user: req.user });
};

export const storeRole = async (req: AuthRequest, res: Response) => {
  await createRole(req.body.name);
  res.redirect('/roles');
};

export const removeRole = async (req: AuthRequest, res: Response) => {
  await deleteRole(parseInt(req.params.id));
  res.redirect('/roles');
};