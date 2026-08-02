import { createFileRoute, Link, useParams } from '@tanstack/react-router';
import { CustomerLayout } from '@/layouts/CustomerLayout';
import { formatCurrency } from '@/utils/currency';
import { Button } from '@/components/ui/button';
import { PackageCheck, Truck, ArrowLeft, Download, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { mockProducts } from '@/data/products';

export const Route = createFileRoute('/orders/$orderId')({
  component: OrderDetailPage,
});

function OrderDetailPage() {
  const { orderId } = useParams({ from: '/orders/$orderId' });

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/orders">
              <Button size="icon" variant="outline" className="rounded-xl">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Order #{orderId.toUpperCase()}</h2>
              <p className="text-xs text-muted-foreground badge-font">Placed on August 1, 2026</p>
            </div>
          </div>

          <Button variant="outline" size="sm" className="rounded-xl font-bold">
            <Download className="mr-1.5 h-4 w-4" /> Invoice PDF
          </Button>
        </div>

        {/* Status Tracker */}
        <div className="rounded-3xl border border-border/50 bg-card p-6 space-y-6 shadow-sm">
          <h3 className="text-base font-bold text-foreground">Delivery Timeline</h3>
          <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold badge-font uppercase">
            <div className="space-y-2 text-primary">
              <div className="h-2 rounded-full bg-primary" />
              <span>Order Placed</span>
            </div>
            <div className="space-y-2 text-primary">
              <div className="h-2 rounded-full bg-primary" />
              <span>Processing</span>
            </div>
            <div className="space-y-2 text-primary">
              <div className="h-2 rounded-full bg-primary" />
              <span>In Transit</span>
            </div>
            <div className="space-y-2 text-muted-foreground">
              <div className="h-2 rounded-full bg-muted" />
              <span>Delivered</span>
            </div>
          </div>
        </div>

        {/* Ordered Item Summary */}
        <div className="rounded-3xl border border-border/50 bg-card p-6 space-y-4 shadow-sm">
          <h3 className="text-base font-bold text-foreground border-b border-border/40 pb-3">Items Purchased</h3>
          <div className="flex items-center gap-4">
            <img src={mockProducts[0].thumbnail} alt={mockProducts[0].title} className="h-20 w-20 rounded-2xl object-cover bg-muted border border-border/40" />
            <div className="flex-1">
              <div className="text-base font-bold text-foreground">{mockProducts[0].title}</div>
              <div className="text-xs text-muted-foreground">Qty: 1 • Color: Space Black</div>
            </div>
            <div className="text-base font-extrabold text-foreground">{formatCurrency(mockProducts[0].price)}</div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
