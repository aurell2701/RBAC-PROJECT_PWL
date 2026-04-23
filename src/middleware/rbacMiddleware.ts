import { Request, Response, NextFunction } from 'express';
import pool from '../config/database';

export interface AuthRequest extends Request {
  user?: { id: number; role_id: number; username: string; permissions: string[] };
}

export const fakeAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const userId = 3; // 1=admin, 2=editor, 3=viewer

  const [userRows] = await pool.query(
    'SELECT id, username, role_id FROM users WHERE id = ?', [userId]
  );
  const u = (userRows as any[])[0];

  const [permRows] = await pool.query(`
    SELECT p.name FROM users u
    JOIN roles r ON u.role_id = r.id
    JOIN role_permissions rp ON r.id = rp.role_id
    JOIN permissions p ON rp.permission_id = p.id
    WHERE u.id = ?
  `, [userId]);

  const permissions = (permRows as any[]).map(row => row.name);

  req.user = {
    id: u.id,
    role_id: u.role_id,
    username: u.username,
    permissions: permissions
  };

  next();
};

export const checkPermission = (requiredPermission: string) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    const permissions = req.user?.permissions || [];
    if (permissions.includes(requiredPermission)) {
      next();
    } else {
      res.status(403).send('403 Forbidden: Anda tidak punya izin untuk aksi ini');
    }
  };
};