import { createFileRoute, Link } from '@tanstack/react-router';
import { CustomerLayout } from '@/layouts/CustomerLayout';
import { formatCurrency } from '@/utils/currency';
import { Button } from '@/components/ui/button';
import { PackageCheck, Truck, Clock, ArrowRight, ExternalLink } from 'lucide-react';
import { mockProducts } from '@/data/products';

export const Route = createFileRoute('/orders/')({
  component: OrdersPage,
});

const mockOrders = [
  {
    id: 'ord-101',
    orderNumber: 'NC-9482-2026',
    date: 'August 1, 2026',
    status: 'In Transit',
    total: 399,
    items: [
      { product: mockProducts[0], quantity: 1 }
    ],
    tracking: '1Z9999999999999999'
  },
  {
    id: 'ord-102',
    orderNumber: 'NC-8721-2026',
    date: 'July 24, 2026',
    status: 'Delivered',
    total: 189,
    items: [
      { product: mockProducts[3], quantity: 1 }
    ],
    tracking: '1Z8888888888888888'
  }
];

function OrdersPage() {
  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground tracking-tight">My Order History</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Track active shipments, view past receipts, and manage returns.
          </p>
        </div>

        <div className="space-y-4">
          {mockOrders.map((order) => (
            <div key={order.id} className="rounded-3xl border border-border/50 bg-card p-6 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-4">
                <div>
                  <span className="text-xs font-bold badge-font text-primary uppercase">{order.orderNumber}</span>
                  <div className="text-xs text-muted-foreground">Placed on {order.date}</div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold badge-font uppercase ${
                    order.status === 'Delivered'
                      ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                      : 'bg-indigo-500/10 text-indigo-500 border border-indigo-500/20'
                  }`}>
                    {order.status === 'Delivered' ? <PackageCheck className="h-3.5 w-3.5" /> : <Truck className="h-3.5 w-3.5" />}
                    {order.status}
                  </span>

                  <Link to={`/orders/${order.id}`}>
                    <Button variant="outline" size="sm" className="rounded-xl font-bold">
                      View Order <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Items Thumbnails */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {order.items.map((item, i) => (
                    <img key={i} src={item.product.thumbnail} alt={item.product.title} className="h-16 w-16 rounded-xl object-cover bg-muted border border-border/40" />
                  ))}
                  <div>
                    <div className="text-sm font-bold text-foreground">{order.items[0].product.title}</div>
                    <div className="text-xs text-muted-foreground">{order.items.length} item(s)</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Total Paid</div>
                  <div className="text-base font-extrabold text-foreground">{formatCurrency(order.total)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CustomerLayout>
  );
}
