import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createOrder, deleteOrder, getOrders, updateOrder } from './controllers/orderController.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173' 
}));
app.use(express.json());

// Routes
app.post('/api/orders', createOrder);
app.get('/api/orders', getOrders);
app.patch('/api/orders/:id', updateOrder);
app.delete('/api/orders/:id', deleteOrder);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});