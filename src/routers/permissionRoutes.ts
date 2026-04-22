import { Router } from 'express';
import { listPermissions, assignPermission } from '../controllers/permissionController';
import { checkPermission } from '../middleware/rbacMiddleware';

const router = Router();
router.get('/', checkPermission('user:view'), listPermissions);
router.post('/assign', checkPermission('user:create'), assignPermission);

export default router;