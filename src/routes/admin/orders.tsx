import { createFileRoute } from '@tanstack/react-router';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

export const Route = createFileRoute('/admin/orders')({
  component: AdminOrdersPage,
});

function AdminOrdersPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Customer Orders</h2>
          <p className="text-sm text-muted-foreground">Fulfill orders, issue tracking numbers, and view invoices.</p>
        </div>

        <div className="rounded-3xl border border-border/50 bg-card p-6 shadow-sm overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-muted-foreground badge-font uppercase border-b border-border/40">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              <tr className="hover:bg-muted/30">
                <td className="py-3.5 px-4 font-mono text-xs font-bold text-primary">NC-9482</td>
                <td className="py-3.5 px-4 font-bold text-foreground">Alex Vance</td>
                <td className="py-3.5 px-4 text-xs text-muted-foreground">1x NovaSound Pro Max</td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-bold text-indigo-500 badge-font">
                    In Transit
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right font-bold text-foreground">$399</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
