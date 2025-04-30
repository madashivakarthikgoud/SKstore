import React, { useState, useEffect, useContext, useMemo, useRef } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Title } from '../components/Title';
import axios from 'axios';

const PAGE_SIZE = 10;

const statusColor = {
  'Order Placed': 'bg-purple-500',
  Packing: 'bg-blue-400',
  Shipped: 'bg-blue-500',
  'Out For Delivery': 'bg-yellow-500',
  Delivered: 'bg-green-500',
};

const nextStatus = {
  'Order Placed': 'Packing',
  Packing: 'Shipped',
  Shipped: 'Out For Delivery',
  'Out For Delivery': 'Delivered',
};

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);

  const containerRef = useRef();

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = Array.isArray(res.data.data) ? res.data.data : [];
      setOrders(
        data.map(o => ({
          ...o,
          _ts: typeof o.date === 'number' ? o.date : new Date(o.date).getTime(),
        }))
      );
    } catch (err) {
      console.error('Failed to load orders:', err);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchOrders();
  }, [backendUrl, token]);

  // Group orders by Month-Year
  const grouped = useMemo(() => {
    return orders.reduce((acc, order) => {
      const monthKey = new Date(order._ts).toLocaleString(undefined, {
        month: 'long',
        year: 'numeric',
      });
      (acc[monthKey] = acc[monthKey] || []).push(order);
      return acc;
    }, {});
  }, [orders]);

  const months = useMemo(() => {
    return Object.keys(grouped).sort(
      (a, b) => grouped[b][0]._ts - grouped[a][0]._ts
    );
  }, [grouped]);

  const pagedMonths = months.slice(
    page * PAGE_SIZE,
    (page + 1) * PAGE_SIZE
  );

  const handleTrackOrder = async (orderId, currentStatus) => {
    try {
      const newStatus = nextStatus[currentStatus] || currentStatus;
      // Update status in backend
      await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Refetch orders
      await fetchOrders();
    } catch (err) {
      console.error('Failed to update order status:', err);
    }
  };

  if (!token) {
    return (
      <div className="p-4 text-center text-gray-500">
        Please login to view your orders.
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="text-2xl font-semibold">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {months.length === 0 ? (
        <p className="text-gray-500">You have no orders yet.</p>
      ) : (
        <div
          ref={containerRef}
          className="max-h-[80vh] overflow-y-auto no-scrollbar space-y-6 pr-2"
        >
          {pagedMonths.map(month => (
            <section key={month} className="space-y-4">
              <h2 className="text-xl font-medium">{month}</h2>
              <div className="space-y-4">
                {grouped[month].map(order => (
                  <details
                    key={order._id}
                    className="border rounded-lg overflow-hidden"
                  >
                    <summary className="flex justify-between items-center p-4 bg-gray-100 cursor-pointer">
                      <span>
                        {new Date(order._ts).toLocaleDateString(undefined, {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                        {' • '}
                        {order.items.length} item(s) • Total: {currency}{order.amount.toFixed(2)}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${statusColor[order.status] || 'bg-gray-400'}`} />
                        <span>{order.status}</span>
                      </div>
                    </summary>

                    <div className="p-4 space-y-4">
                      <div className="text-sm text-gray-600 space-y-1">
                        <div><strong>Payment Method:</strong> {order.paymentMethod}</div>
                        <div><strong>Payment Status:</strong> {order.payment ? 'Paid' : 'Pending'}</div>
                        <div>
                          <strong>Shipping Address:</strong> {order.address?.street}, {order.address?.city}, {order.address?.state} - {order.address?.zipcode}
                        </div>
                      </div>

                      {order.items.map((item, idx) => {
                        const img = Array.isArray(item.images) && item.images[0];
                        const src = img?.url || img || '';
                        return (
                          <div key={idx} className="flex items-start gap-4 pt-4 border-t">
                            <img
                              src={src || 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'}
                              alt={item.name}
                              className="w-20 h-20 object-cover object-top rounded"
                            />
                            <div className="flex-1">
                              <h3 className="text-lg font-medium">{item.name}</h3>
                              <div className="flex flex-wrap gap-4 text-gray-600 text-sm mt-1">
                                <span>Price: {currency}{item.price.toFixed(2)}</span>
                                <span>Qty: {item.quantity}</span>
                                {item.size && <span>Size: {item.size}</span>}
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      <div className="flex justify-end gap-4 pt-4 border-t">
                        {order.status !== 'Delivered' && (
                          <button
                            onClick={() => handleTrackOrder(order._id, order.status)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                          >
                            Track Order
                          </button>
                        )}
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {months.length > PAGE_SIZE && (
        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>Page {page + 1} of {Math.ceil(months.length / PAGE_SIZE)}</span>
          <button
            onClick={() => setPage(p => Math.min(p + 1, Math.floor((months.length - 1) / PAGE_SIZE)))}
            disabled={(page + 1) * PAGE_SIZE >= months.length}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Orders;
