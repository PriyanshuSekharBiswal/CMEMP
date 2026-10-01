CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  phone TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'customer',
  password TEXT,
  address TEXT NOT NULL DEFAULT '',
  pincode TEXT NOT NULL DEFAULT '',
  points INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  userId TEXT NOT NULL REFERENCES users(id),
  expires INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS otps (
  phone TEXT PRIMARY KEY,
  hash TEXT NOT NULL,
  expires INTEGER NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  sku TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL,
  unit TEXT NOT NULL,
  price INTEGER NOT NULL,
  gst REAL NOT NULL,
  specs TEXT NOT NULL,
  discount REAL NOT NULL DEFAULT 0,
  active INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS suppliers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  location TEXT NOT NULL,
  pincode TEXT NOT NULL,
  rating REAL NOT NULL,
  terms TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS requests (
  id TEXT PRIMARY KEY,
  customerId TEXT NOT NULL REFERENCES users(id),
  project TEXT NOT NULL,
  address TEXT NOT NULL,
  pincode TEXT NOT NULL,
  notes TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Requested',
  createdAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS request_items (
  requestId TEXT NOT NULL REFERENCES requests(id),
  productId TEXT NOT NULL REFERENCES products(id),
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  unit TEXT NOT NULL,
  qty REAL NOT NULL,
  gst REAL NOT NULL,
  rate INTEGER NOT NULL,
  PRIMARY KEY(requestId,
  productId)
);

CREATE TABLE IF NOT EXISTS quotes (
  id TEXT PRIMARY KEY,
  requestId TEXT NOT NULL REFERENCES requests(id),
  supplierId TEXT NOT NULL REFERENCES suppliers(id),
  supplierName TEXT NOT NULL,
  items TEXT NOT NULL,
  subtotal INTEGER NOT NULL,
  tax INTEGER NOT NULL,
  freight INTEGER NOT NULL,
  total INTEGER NOT NULL,
  validUntil TEXT NOT NULL,
  deliveryDays INTEGER NOT NULL,
  terms TEXT NOT NULL,
  createdAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  requestId TEXT UNIQUE NOT NULL REFERENCES requests(id),
  quoteId TEXT UNIQUE NOT NULL REFERENCES quotes(id),
  customerId TEXT NOT NULL REFERENCES users(id),
  status TEXT NOT NULL DEFAULT 'Confirmed',
  vehicle TEXT NOT NULL DEFAULT '',
  driver TEXT NOT NULL DEFAULT '',
  paymentStatus TEXT NOT NULL DEFAULT 'Unpaid',
  paymentReference TEXT NOT NULL DEFAULT '',
  internalNotes TEXT NOT NULL DEFAULT '',
  createdAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS order_events (
  id TEXT PRIMARY KEY,
  orderId TEXT NOT NULL REFERENCES orders(id),
  status TEXT NOT NULL,
  createdAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS notifications (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL REFERENCES users(id),
  message TEXT NOT NULL,
  createdAt TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS requests_customer ON requests(customerId);
CREATE INDEX IF NOT EXISTS orders_customer ON orders(customerId);
CREATE INDEX IF NOT EXISTS quotes_request ON quotes(requestId);
