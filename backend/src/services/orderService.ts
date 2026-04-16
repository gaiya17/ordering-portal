/**
 * Order Service Module
 * Provides business logic for order management operations using Supabase.
 */

import { supabase } from '../config/supabase.js';

/**
 * Interface defining the structure of an order request
 */
export interface OrderRequest {
  customer_name: string;
  product_name: string;
  quantity: number;
  unit_price: number;
}

/**
 * Service class for handling order-related operations
 * Provides methods to create, retrieve, update, and delete orders from the database
 */
export const OrderService = {
  /**
   * Creates a new order in the database
   * @param data - The order data to insert
   * @returns The created order record
   * @throws Error if quantity is invalid or database operation fails
   */
  async createOrder(data: OrderRequest) {
    if (data.quantity <= 0) throw new Error('Quantity must be at least 1');

    const { data: order, error } = await supabase
      .from('orders')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return order;
  },

  /**
   * Retrieves all orders from the database, ordered by creation date descending
   * @returns Array of order records
   * @throws Error if database operation fails
   */
  async getOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Updates an existing order by ID
   * @param id - The order ID to update
   * @param updates - Partial order data to update
   * @returns The updated order record
   * @throws Error if database operation fails
   */
  async updateOrder(id: string, updates: Partial<OrderRequest>) {
    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Deletes an order by ID
   * @param id - The order ID to delete
   * @returns True if deletion was successful
   * @throws Error if database operation fails
   */
  async deleteOrder(id: string) {
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};