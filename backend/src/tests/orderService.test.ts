import { OrderService } from '../services/orderService.js';

/**
 * OrderService Test Suite
 * * Focus: Business Logic Validation & CRUD Lifecycle
 * Note: These tests interact with the Supabase instance defined in the config.
 */
describe('OrderService Logic', () => {
  
  // Track created IDs to clean up after tests if necessary
  let createdOrderId: string;

  /**
   * 1. VALIDATION TEST
   * Ensures the service layer blocks invalid business data before hitting the DB.
   */
  it('should throw an error if the order quantity is less than 1', async () => {
    const badOrder = {
      customer_name: "Test User",
      product_name: "Invalid Item",
      quantity: 0,
      unit_price: 100
    };

    await expect(OrderService.createOrder(badOrder))
      .rejects.toThrow("Quantity must be at least 1");
  });

  /**
   * 2. CREATE TEST (Happy Path)
   * Verifies that valid data is correctly persisted and returned.
   */
  it('should successfully create an order and return the record', async () => {
    const validOrder = {
      customer_name: "Automated Test",
      product_name: "Test Unit",
      quantity: 2,
      unit_price: 500
    };

    const result = await OrderService.createOrder(validOrder);
    
    expect(result).toBeDefined();
    expect(result.customer_name).toBe("Automated Test");
    expect(Number(result.total_price)).toBe(1000); // Verify DB calculation logic
    
    createdOrderId = result.id; // Store ID for subsequent lifecycle tests
  });

  /**
   * 3. UPDATE TEST
   * Verifies that existing records can be modified.
   */
  it('should successfully update an existing order', async () => {
    // Ensure we have an ID from the previous test
    if (!createdOrderId) return;

    const updates = { product_name: "Updated Test Unit" };
    const result = await OrderService.updateOrder(createdOrderId, updates);

    expect(result).toBeDefined();
    expect(result.product_name).toBe("Updated Test Unit");
  });

  /**
   * 4. DELETE TEST
   * Verifies the removal of records from the system.
   */
  it('should successfully delete an order', async () => {
    if (!createdOrderId) return;

    const result = await OrderService.deleteOrder(createdOrderId);
    expect(result).toBe(true);
  });

});