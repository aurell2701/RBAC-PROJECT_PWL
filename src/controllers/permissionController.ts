import { Response } from 'express';
import { AuthRequest } from '../middleware/rbacMiddleware';
import { getAllPermissions, assignPermissionToRole } from '../models/permissionModel';
import { getAllRoles } from '../models/roleModel';

export const listPermissions = async (req: AuthRequest, res: Response) => {
  const permissions = await getAllPermissions();
  const roles = await getAllRoles();
  res.render('permissions/list', { title: 'Permission Management', permissions, roles, user: req.user });
};

export const assignPermission = async (req: AuthRequest, res: Response) => {
  const { role_id, permission_id } = req.body;
  await assignPermissionToRole(parseInt(role_id), parseInt(permission_id));
  res.redirect('/permissions');
};