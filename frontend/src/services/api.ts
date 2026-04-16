const API_URL = 'http://localhost:5000/api';

export const getOrders = async () => {
  const res = await fetch(`${API_URL}/orders`);
  return res.json();
};

export const createOrder = async (orderData: any) => {
  const res = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  return res.json();
};

export const deleteOrder = async (id: string) => {
  const res = await fetch(`${API_URL}/orders/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete');
};

export const updateOrder = async (id: string, data: any) => {
  const res = await fetch(`${API_URL}/orders/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};