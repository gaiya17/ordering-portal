/**
 * Main entry point for the Ordering Portal backend server.
 * Sets up Express application with middleware, routes, and starts the server.
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createOrder, deleteOrder, getOrders, updateOrder } from './controllers/orderController.js';

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();

// Middleware configuration
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json());

// API Routes
app.post('/api/orders', createOrder);
app.get('/api/orders', getOrders);
app.patch('/api/orders/:id', updateOrder);
app.delete('/api/orders/:id', deleteOrder);

// Server configuration
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});