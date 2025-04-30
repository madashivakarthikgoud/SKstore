import React, { useState, useMemo, useRef, useEffect } from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { backendUrl, currency } from '../App';

const statusOptions = ['Order Placed', 'Packing', 'Shipped', 'Out For Delivery', 'Delivered'];
const statusColors = {
  'Order Placed': 'bg-yellow-200 text-yellow-800',
  Packing: 'bg-purple-200 text-purple-800',
  Shipped: 'bg-blue-200 text-blue-800',
  'Out For Delivery': 'bg-indigo-200 text-indigo-800',
  Delivered: 'bg-green-200 text-green-800',
};

export default function Orders({ token }) {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState('');
  const [displayCount, setDisplayCount] = useState(10);
  const containerRef = useRef(null);

  const fetchOrders = async () => {
    const { data } = await axios.post(
      `${backendUrl}/api/order/list`,
      {},
      { headers: { token } }
    );
    return data?.data ?? [];
  };

  const { data: orders = [], isLoading, isError } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    enabled: Boolean(token),
    placeholderData: [],
  });

  const updateStatus = useMutation({
    mutationFn: ({ orderId, status }) =>
      axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status },
        { headers: { token } }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order status updated');
    },
    onError: err => {
      toast.error(err.response?.data?.message || 'Failed to update status');
    },
  });

  const filteredOrders = useMemo(() => {
    return statusFilter
      ? orders.filter(order => order.status === statusFilter)
      : orders;
  }, [orders, statusFilter]);

  const visibleOrders = filteredOrders.slice(0, displayCount);

  // Infinite scroll handling
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setDisplayCount(prev => Math.min(prev + 10, filteredOrders.length));
      }
    };
    const currentRef = containerRef.current;
    currentRef?.addEventListener('scroll', handleScroll);
    return () => currentRef?.removeEventListener('scroll', handleScroll);
  }, [filteredOrders.length]);

  if (!token) return null;
  if (isLoading) return <p className="p-4">Loading orders...</p>;
  if (isError) return <p className="p-4 text-red-600">Error loading orders</p>;

  return (
    <div className="space-y-6 p-4">
      {/* Header and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-3xl font-bold">Orders</h3>
        <div className="flex flex-wrap gap-3">
          <select
            value={statusFilter}
            onChange={e => {
              setStatusFilter(e.target.value);
              setDisplayCount(10);
            }}
            className="p-2 border rounded bg-white shadow-sm"
          >
            <option value="">All Statuses</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div
        ref={containerRef}
        className="max-h-[80vh] overflow-y-auto no-scrollbar bg-white rounded-lg shadow p-4 space-y-4"
      >
        {visibleOrders.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          visibleOrders.map(order => (
            <OrderCard key={order._id} order={order} updateStatus={updateStatus} />
          ))
        )}
      </div>
    </div>
  );
}

function OrderCard({ order, updateStatus }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition space-y-3">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h4 className="font-bold">{order.address.firstName} {order.address.lastName}</h4>
          <p className="text-sm text-gray-600">{order.address.email}</p>
          <p className="text-xs text-gray-500">{order.address.street}, {order.address.city}</p>
          <p className="text-xs text-gray-500">{order.address.state}, {order.address.country} - {order.address.zipcode}</p>
        </div>
        <div className="text-right space-y-1">
          <p className="text-sm">{currency} {order.amount.toFixed(2)}</p>
          <p className="text-xs">{new Date(order.date).toLocaleDateString('en-GB')}</p>
          <p className="text-xs font-semibold">
            {order.paymentMethod} • 
            <span className={order.payment ? 'text-green-600' : 'text-red-600'}>
              {order.payment ? ' Paid' : ' Pending'}
            </span>
          </p>
        </div>
      </div>

      <div className="space-y-1">
        {order.items.map((item, idx) => (
          <div key={idx} className="text-sm">
            {item.name} × {item.quantity} {item.size && <span className="italic text-xs">({item.size})</span>}
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-3 pt-3 border-t">
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
          {order.status}
        </div>

        <select
          value={order.status}
          onChange={e => updateStatus.mutate({ orderId: order._id, status: e.target.value })}
          disabled={updateStatus.isPending}
          className="p-2 border rounded bg-white shadow-sm w-full sm:w-auto"
        >
          {statusOptions.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
