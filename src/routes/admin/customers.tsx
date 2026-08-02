import { createFileRoute } from '@tanstack/react-router';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Users } from 'lucide-react';

export const Route = createFileRoute('/admin/customers')({
  component: AdminCustomersPage,
});

function AdminCustomersPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Customer Directory</h2>
          <p className="text-sm text-muted-foreground">View registered customer profiles and lifetime value metrics.</p>
        </div>

        <div className="rounded-3xl border border-border/50 bg-card p-6 shadow-sm overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-muted-foreground badge-font uppercase border-b border-border/40">
              <tr>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4 text-right">Orders</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              <tr className="hover:bg-muted/30">
                <td className="py-3.5 px-4 font-bold text-foreground">Alex Vance</td>
                <td className="py-3.5 px-4 text-xs text-muted-foreground">alex.vance@novacart.store</td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary badge-font">
                    Verified Customer
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right font-bold text-foreground">2 Orders</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
