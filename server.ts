/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { DbService } from './server/services/db.service.ts';
import { StorageService } from './server/services/storage.service.ts';
import authRoutes from './server/routes/auth.routes.ts';
import fleetRoutes from './server/routes/fleet.routes.ts';
import tripsRoutes from './server/routes/trips.routes.ts';
import financeRoutes from './server/routes/finance.routes.ts';
import routingRoutes from './server/routes/routing.routes.ts';
import dbRoutes from './server/routes/db.routes.ts';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize DB JSON file persistence with verification & graceful fallback
  await DbService.verifyDatabaseConnection();

  // Initialize Supabase Storage Buckets
  await StorageService.initializeBuckets().catch((err: any) => {
    console.error('Failed to initialize Supabase storage buckets:', err.message);
  });

  // Express parser configuration
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Custom CORS implementation
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  // Custom Security Headers (Helmet equivalents)
  app.use((req, res, next) => {
    res.setHeader('X-DNS-Prefetch-Control', 'off');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('Strict-Transport-Security', 'max-age=15552000; includeSubDomains');
    res.setHeader('X-Download-Options', 'noopen');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });

  // Static serving for uploaded assets
  const uploadsDir = path.join(process.cwd(), 'server', 'uploads');
  app.use('/uploads', express.static(uploadsDir));

  // REST API Route Mounts
  app.use('/api/auth', authRoutes);
  app.use('/api/fleet', fleetRoutes);
  app.use('/api/trips', tripsRoutes);
  app.use('/api/finance', financeRoutes);
  app.use('/api/routing', routingRoutes);
  app.use('/api/db', dbRoutes);

  // Health endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Vite Assets Serving and SPA Fallback Routing
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Support SPA routing fallback
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`TransitOps Full-Stack Server listening on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal: Failed to start TransitOps server:', err);
});
