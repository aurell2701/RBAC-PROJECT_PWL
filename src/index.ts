import express from 'express';
import 'dotenv/config';
import path from 'path';
import userRoutes from './routers/userRoutes';
import roleRoutes from './routers/roleRoutes';
import permissionRoutes from './routers/permissionRoutes';
import { fakeAuth } from './middleware/rbacMiddleware';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Simulasi autentikasi (semua request dianggap login sebagai user id=1)
app.use(fakeAuth);

app.get('/', (req, res) => res.redirect('/users'));
app.use('/users', userRoutes);
app.use('/roles', roleRoutes);
app.use('/permissions', permissionRoutes);

app.listen(process.env.PORT, () => {
  console.log(`✅ Server running on http://localhost:${process.env.PORT}`);
});