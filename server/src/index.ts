import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import path from 'path';
import fs from 'fs';
import authRoutes from './routes/auth.routes';
import patientRoutes from './routes/patient.routes';
import scanRoutes from './routes/scan.routes';
import { ScanController } from './controllers/scan.controller';
import prisma from './config/database';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

const UPLOADS_DIR = path.join(__dirname, '../uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  console.log('Uploads directory created');
}

app.use('/uploads', express.static(UPLOADS_DIR));

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/scans', scanRoutes);

app.get('/api/info', ScanController.info);

app.get('/', (req, res) => {
  res.send('Plaque App API is running. Professional Edition (Local Storage).');
});

async function seedInitialData() {
  const instrCount = await prisma.instruction.count();
  if (instrCount === 0) {
    await prisma.instruction.createMany({
      data: [
        { title: 'Good Light', description: 'Ensure no harsh shadows or glare on tooth surfaces.', order: 1 },
        { title: 'Lips Pulled Back', description: 'Check that the lips and cheeks are fully pulled back.', order: 2 },
        { title: 'Bite Naturally', description: 'The patient must bite down naturally on back teeth.', order: 3 },
      ],
    });
    console.log('Instructions seeded');
  }

  const userCount = await prisma.user.count();
  if (userCount === 0) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.user.create({
      data: {
        email: 'admin',
        password: hashedPassword,
        name: 'Administrator',
        role: 'admin',
      },
    });
    console.log('Admin user seeded (admin / admin123)');
  }

  const patientCount = await prisma.patient.count();
  if (patientCount === 0) {
    const patient = await prisma.patient.create({
      data: {
        id: '8821',
        name: 'John Doe',
        notes: 'Initial patient',
      }
    });
    await prisma.visit.create({
      data: {
        id: 'v1-placeholder',
        patientId: patient.id,
        date: '23/11/2025',
        notes: 'Initial visit',
      }
    });
    console.log('Initial patient and visit seeded');
  }
}

async function start() {
  try {
    await seedInitialData();

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Fatal error during startup:', error);
    process.exit(1);
  }
}

start();
