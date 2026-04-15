import { supabase } from '../config/supabase.js';

export interface OrderRequest {
  customer_name: string;
  product_name: string;
  quantity: number;
  unit_price: number;
}

export const OrderService = {
  async createOrder(data: OrderRequest) {
    // Business logic check before DB hit
    if (data.quantity <= 0) throw new Error("Quantity must be at least 1");

    const { data: order, error } = await supabase
      .from('orders')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return order;
  },

  async getOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
};