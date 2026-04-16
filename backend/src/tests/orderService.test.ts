import { OrderService } from '../services/orderService.js';

/**
 * Test suite for OrderService
 * This suite tests the business logic of the OrderService, including validation and error handling.
 */
describe('OrderService Logic', () => {
  /**
   * Test case: Validates that an error is thrown when the order quantity is less than 1
   * This ensures data integrity by preventing invalid orders from being created.
   */
  it('should throw an error if the order quantity is less than 1', async () => {
    // Define an invalid order with quantity 0
    const badOrder = {
      customer_name: "Gayantha",
      product_name: "Framework Laptop",
      quantity: 0,
      unit_price: 1500
    };

    // Assert that the createOrder method rejects with the expected error message
    await expect(OrderService.createOrder(badOrder)).rejects.toThrow("Quantity must be at least 1");
  });

  it('should return the order object when data is valid', async () => {
  const validOrder = {
    customer_name: "Gayantha",
    product_name: "MacBook Pro",
    quantity: 1,
    unit_price: 2000
  };

  const result = await OrderService.createOrder(validOrder);

  expect(result).toBeDefined();
  expect(result.customer_name).toBe("Gayantha");
});
});