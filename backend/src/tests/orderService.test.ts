/**
 * OrderService Test Suite
 * Tests business logic validation and CRUD operations for order management.
 * Note: These tests interact with the configured Supabase instance.
 */

import { OrderService } from '../services/orderService.js';

describe('OrderService Logic', () => {
  // Track created order ID for cleanup in subsequent tests
  let createdOrderId: string;

  /**
   * Validation Test: Ensures service blocks invalid quantity values
   */
  it('should throw an error if the order quantity is less than 1', async () => {
    const invalidOrder = {
      customer_name: 'Test User',
      product_name: 'Invalid Item',
      quantity: 0,
      unit_price: 100
    };

    await expect(OrderService.createOrder(invalidOrder))
      .rejects.toThrow('Quantity must be at least 1');
  });

  /**
   * Create Test: Verifies successful order creation and data persistence
   */
  it('should successfully create an order and return the record', async () => {
    const validOrder = {
      customer_name: 'Automated Test',
      product_name: 'Test Unit',
      quantity: 2,
      unit_price: 500
    };

    const result = await OrderService.createOrder(validOrder);

    expect(result).toBeDefined();
    expect(result.customer_name).toBe('Automated Test');
    expect(Number(result.total_price)).toBe(1000); // Verify database calculation

    createdOrderId = result.id; // Store ID for subsequent tests
  });

  /**
   * Update Test: Verifies order modification functionality
   */
  it('should successfully update an existing order', async () => {
    if (!createdOrderId) return;

    const updates = { product_name: 'Updated Test Unit' };
    const result = await OrderService.updateOrder(createdOrderId, updates);

    expect(result).toBeDefined();
    expect(result.product_name).toBe('Updated Test Unit');
  });

  /**
   * Delete Test: Verifies order deletion functionality
   */
  it('should successfully delete an order', async () => {
    if (!createdOrderId) return;

    const result = await OrderService.deleteOrder(createdOrderId);
    expect(result).toBe(true);
  });
});