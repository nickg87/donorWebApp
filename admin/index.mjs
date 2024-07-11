// admin/index.mjs
import express from 'express';
import { PrismaClient } from '@prisma/client';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/prisma';

const prisma = new PrismaClient();
const app = express();

AdminJS.registerAdapter({ Database, Resource });

const adminJs = new AdminJS({
  resources: [
    { resource: prisma.pool, options: {} },
    { resource: prisma.donation, options: {} },
  ],
  rootPath: '/admin',
});

const adminRouter = AdminJSExpress.buildRouter(adminJs);

app.use(adminJs.options.rootPath, adminRouter);

const PORT = process.env.ADMIN_PORT || 3001; // Change to 3001 to avoid conflict with frontend
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`AdminJS is available at http://localhost:${PORT}/admin`);
});
