/* eslint-disable no-console */
const { spawn } = require('child_process');
const path = require('path');

// Node 18+ has global fetch, FormData, Blob
if (typeof fetch !== 'function') {
  console.error('This script requires Node.js v18+ with global fetch.');
  process.exit(1);
}

const API_BASE = process.env.API_BASE || 'http://localhost:5000/api';
const ADMIN_EMAIL = process.env.TEST_ADMIN_EMAIL || 'admin@autoshop.com';
const ADMIN_PASS = process.env.TEST_ADMIN_PASS || 'admin123';

const waitForServer = () => {
  return new Promise((resolve, reject) => {
    const server = spawn('node', ['server.js'], {
      cwd: path.join(__dirname, '..'),
      env: process.env,
      stdio: ['ignore', 'pipe', 'pipe']
    });

    let ready = false;

    const onData = (data) => {
      const text = data.toString();
      process.stdout.write(text);
      if (!ready && (/Server running on port/i).test(text)) {
        ready = true;
        resolve(server);
      }
    };

    server.stdout.on('data', onData);
    server.stderr.on('data', onData);

    server.on('exit', (code) => {
      if (!ready) {
        reject(new Error(`Server exited early with code ${code}`));
      }
    });

    // Failsafe timeout
    setTimeout(() => {
      if (!ready) {
        reject(new Error('Timeout waiting for server to start'));
      }
    }, 15000);
  });
};

async function loginAdmin() {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASS })
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Login failed: ${res.status} ${text}`);
  const data = JSON.parse(text);
  if (!data.token) throw new Error('No token in login response');
  return data.token;
}

async function createVehicle(token) {
  // Remote demo image to upload to Cloudinary via backend
  const imageUrl = 'https://cloudinary-devs.github.io/cld-docs-assets/assets/images/happy_people.jpg';
  const imgRes = await fetch(imageUrl);
  if (!imgRes.ok) throw new Error('Failed to download test image');
  const imgArrayBuffer = await imgRes.arrayBuffer();
  const imgBlob = new Blob([Buffer.from(imgArrayBuffer)], { type: 'image/jpeg' });

  const form = new FormData();
  form.append('category', 'stockCars');
  form.append('title', 'E2E Test Vehicle / CLOUDINARY UPLOAD (ADMIN)');
  form.append('price', '$10,330');
  form.append('totalPrice', '$12,464');
  form.append('stockNo', 'E2E-ADMIN-001');
  form.append('mileage', '162,182 km');
  form.append('year', '2018');
  form.append('engine', '3,342cc');
  form.append('transmission', 'AT');
  form.append('location', 'Korea');
  form.append('color', 'Gray');
  form.append('fuel', 'Petrol');
  form.append('drive', '4WD');
  form.append('seats', '5');
  form.append('doors', '4');
  form.append('features', JSON.stringify([
    'Power Steering','A/C','Airbag','Leather Seat','Back Camera','Alloy Wheels','Sun Roof','Radio','Push Start','Power Seat'
  ]));
  form.append('images', imgBlob, 'test.jpg');

  const res = await fetch(`${API_BASE}/vehicles`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: form
  });
  const text = await res.text();
  let body;
  try { body = JSON.parse(text); } catch { body = { raw: text }; }
  if (!res.ok) {
    throw new Error(`Create vehicle failed: ${res.status} ${body?.message || text}`);
  }
  if (!body || !body._id) throw new Error('No _id returned for created vehicle');
  if (!body.image || !String(body.image).includes('res.cloudinary.com')) {
    throw new Error(`Vehicle image is not a Cloudinary URL: ${body.image}`);
  }
  return body;
}

async function verifyInventoryContains(createdId) {
  const res = await fetch(`${API_BASE}/vehicles/inventory`);
  if (!res.ok) throw new Error(`Inventory fetch failed: ${res.status}`);
  const data = await res.json();
  const found = Array.isArray(data?.stockCars) && data.stockCars.find(v => String(v._id) === String(createdId));
  if (!found) throw new Error('Created vehicle not found in stockCars inventory');
}

(async () => {
  let server;
  try {
    console.log('Starting server...');
    server = await waitForServer();
    console.log('Server is ready. Logging in as admin...');
    const token = await loginAdmin();
    console.log('Logged in. Creating vehicle with Cloudinary image...');
    const created = await createVehicle(token);
    console.log('Created vehicle id:', created._id);
    console.log('Image URL:', created.image);
    await verifyInventoryContains(created._id);
    console.log('Inventory verification passed. E2E test successful.');
    process.exitCode = 0;
  } catch (err) {
    console.error('E2E test failed:', err);
    process.exitCode = 1;
  } finally {
    // Give logs time to flush, then kill server if started
    setTimeout(() => {
      if (server && !server.killed) {
        try { server.kill('SIGTERM'); } catch (_) {}
      }
      process.exit();
    }, 1000);
  }
})(); 