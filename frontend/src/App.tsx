import { useEffect, useState } from 'react';
import { getOrders, createOrder, deleteOrder, updateOrder } from './services/api';

// Interface for Type Safety
interface Order {
  id: string;
  customer_name: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  status: 'pending' | 'completed' | 'cancelled';
}

function App() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    customer_name: '',
    product_name: '',
    quantity: 1,
    unit_price: 0
  });

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        // UPDATE Existing Order
        await updateOrder(editingId, formData);
        setEditingId(null);
      } else {
        // CREATE New Order
        await createOrder(formData);
      }
      
      // Reset form and refresh list
      setFormData({ customer_name: '', product_name: '', quantity: 1, unit_price: 0 });
      await loadOrders();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleEdit = (order: Order) => {
    setEditingId(order.id);
    setFormData({
      customer_name: order.customer_name,
      product_name: order.product_name,
      quantity: order.quantity,
      unit_price: order.unit_price
    });
    // Scroll to form for better UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await deleteOrder(id);
        await loadOrders();
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  const handleStatusToggle = async (id: string, currentStatus: string) => {
    try {
      const nextStatus = currentStatus === 'pending' ? 'completed' : 'pending';
      await updateOrder(id, { status: nextStatus });
      await loadOrders();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Order Portal</h1>
            <p className="text-slate-500 mt-1 italic">Senior Developer Assessment / Sprint 5 Final</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100">
              Database Sync: Active
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Form (Handles both Create & Edit) */}
          <section className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200 h-fit sticky top-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">
                {editingId ? '📝 Edit Order' : '➕ New Order'}
              </h2>
              {editingId && (
                <button 
                  onClick={() => { setEditingId(null); setFormData({customer_name:'', product_name:'', quantity:1, unit_price:0}) }}
                  className="text-xs text-rose-500 font-bold hover:underline"
                >
                  Cancel
                </button>
              )}
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700">Customer Name</label>
                <input 
                  type="text" required
                  className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 p-2.5 border outline-none transition-all"
                  value={formData.customer_name}
                  onChange={e => setFormData({...formData, customer_name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700">Product Name</label>
                <input 
                  type="text" required
                  className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 p-2.5 border outline-none transition-all"
                  value={formData.product_name}
                  onChange={e => setFormData({...formData, product_name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700">Quantity</label>
                  <input 
                    type="number" min="1" required
                    className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 p-2.5 border outline-none transition-all"
                    value={formData.quantity}
                    onChange={e => setFormData({...formData, quantity: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700">Unit Price ($)</label>
                  <input 
                    type="number" step="0.01" required
                    className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 p-2.5 border outline-none transition-all"
                    value={formData.unit_price}
                    onChange={e => setFormData({...formData, unit_price: parseFloat(e.target.value)})}
                  />
                </div>
              </div>
              <button 
                type="submit" 
                className={`w-full text-white py-3 px-4 rounded-lg transform active:scale-95 transition-all font-bold shadow-lg ${editingId ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-100' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100'}`}
              >
                {editingId ? 'Update Order Details' : 'Submit New Order'}
              </button>
            </form>
          </section>

          {/* Orders Table */}
          <section className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Order Info</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Total Price</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {loading ? (
                    <tr><td colSpan={4} className="px-6 py-20 text-center text-slate-400 animate-pulse">Synchronizing with Cloud DB...</td></tr>
                  ) : orders.map((order) => (
                    <tr key={order.id} className={`hover:bg-slate-50 transition-colors ${editingId === order.id ? 'bg-amber-50' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-slate-900">{order.customer_name}</div>
                        <div className="text-xs text-slate-500 font-medium">{order.product_name} <span className="text-slate-300">|</span> Qty: {order.quantity}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-black text-slate-900">
                        ${Number(order.total_price).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button 
                          onClick={() => handleStatusToggle(order.id, order.status)}
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full transition-all hover:opacity-80 ${
                            order.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {order.status}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                        <button 
                          onClick={() => handleEdit(order)}
                          className="text-indigo-600 hover:text-indigo-900 font-bold"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(order.id)}
                          className="text-rose-500 hover:text-rose-700 font-bold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {!loading && orders.length === 0 && (
                    <tr><td colSpan={4} className="px-6 py-20 text-center text-slate-400 font-medium">No orders found in the system.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;