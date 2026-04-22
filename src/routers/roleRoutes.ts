import { Router } from 'express';
import { listRoles, storeRole, removeRole } from '../controllers/roleController';
import { checkPermission } from '../middleware/rbacMiddleware';

const router = Router();
router.get('/', checkPermission('user:view'), listRoles);
router.post('/', checkPermission('user:create'), storeRole);
router.post('/:id/delete', checkPermission('user:delete'), removeRole);

export default router;