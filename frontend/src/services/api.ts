/**
 * API Service Module
 * Provides functions to interact with the backend order management API.
 */

const API_URL = 'http://localhost:5000/api';

/**
 * Order data interface for API operations
 */
interface OrderData {
  customer_name: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  status?: string;
}

/**
 * Fetches all orders from the API
 * @returns Promise resolving to array of orders
 */
export const getOrders = async () => {
  const res = await fetch(`${API_URL}/orders`);
  return res.json();
};

/**
 * Creates a new order via the API
 * @param orderData - The order data to create
 * @returns Promise resolving to the created order
 */
export const createOrder = async (orderData: OrderData) => {
  const res = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  return res.json();
};

/**
 * Deletes an order by ID
 * @param id - The order ID to delete
 * @throws Error if deletion fails
 */
export const deleteOrder = async (id: string) => {
  const res = await fetch(`${API_URL}/orders/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete');
};

/**
 * Updates an existing order
 * @param id - The order ID to update
 * @param data - The updated order data
 * @returns Promise resolving to the updated order
 */
export const updateOrder = async (id: string, data: Partial<OrderData>) => {
  const res = await fetch(`${API_URL}/orders/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};