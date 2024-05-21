// pages/OrdersComponent.tsx
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Product } from '@/types';
import { useEffect, useState } from 'react';

interface Item {
  id: number;
  product: Product;
  quantity: number;
}

interface Order {
  id: number;
  order_number: string;
  items: Item[];
  // Define other properties of an order that you expect from the API
}

const OrdersComponent: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('No token found');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/ecoMarket/order-list/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        setOrders(data);
      } catch (error: any) {
        setError(error.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>;

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-white p-12">
      <h1 className="text-4xl font-bold mb-6 neon-text">Orders</h1>
      <ul className="space-y-4">
        {orders.filter(order => order.items.length > 0).map((order, index) => (
          <li key={`${order.id}-${index}`} className="bg-white p-4 rounded-lg border border-2 border-orange-text border-dashed shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">Order Number: {order.order_number}</h2>
            <div className="space-y-2">
              <h3 className="text-xl">Items:</h3>
              <ul className="pl-4">
                {order.items.map((item, index) => (
                  <li key={`${item.id}-${index}`} className="border-l-4 border-orange-text pl-2">
                    <p>Quantity: {item.quantity}</p>
                    <p>Product: {item.product.title}</p>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
    <Footer/>
    </>
  );
};

export default OrdersComponent;
