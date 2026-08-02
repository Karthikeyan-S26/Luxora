import { createFileRoute } from '@tanstack/react-router';
import { AdminLayout } from '@/layouts/AdminLayout';
import { formatCurrency } from '@/utils/currency';
import { DollarSign, ShoppingCart, Users, Package, TrendingUp, Activity, CheckCircle2, AlertTriangle, Truck } from 'lucide-react';
import { mockProducts } from '@/data/products';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export const Route = createFileRoute('/admin/')({
  component: AdminDashboardPage,
});

const revenueData = [
  { month: 'Jan', revenue: 42000, orders: 480 },
  { month: 'Feb', revenue: 58000, orders: 620 },
  { month: 'Mar', revenue: 74000, orders: 810 },
  { month: 'Apr', revenue: 69000, orders: 750 },
  { month: 'May', revenue: 95000, orders: 1100 },
  { month: 'Jun', revenue: 112000, orders: 1320 },
  { month: 'Jul', revenue: 128450, orders: 1420 },
];

const categorySalesData = [
  { category: 'Audio', sales: 48200 },
  { category: 'Computing', sales: 62100 },
  { category: 'Wearables', sales: 29400 },
  { category: 'Footwear', sales: 38900 },
  { category: 'Fashion', sales: 18500 },
];

const activityTimeline = [
  { id: 1, title: 'Order NC-9482 dispatched via FedEx Express', time: '10 minutes ago', icon: Truck, color: 'text-indigo-500 bg-indigo-500/10' },
  { id: 2, title: 'NovaSound Pro Max inventory restocked (+50 units)', time: '1 hour ago', icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-500/10' },
  { id: 3, title: 'Low stock warning: NovaBook Ultra M3 Max (12 units remaining)', time: '3 hours ago', icon: AlertTriangle, color: 'text-amber-500 bg-amber-500/10' },
];

function AdminDashboardPage() {
  const stats = [
    { label: 'Total Revenue', value: formatCurrency(128450), change: '+14.2%', icon: DollarSign },
    { label: 'Total Orders', value: '1,420', change: '+8.4%', icon: ShoppingCart },
    { label: 'Active Customers', value: '3,890', change: '+18.6%', icon: Users },
    { label: 'Catalog Products', value: mockProducts.length.toString(), change: '+4.0%', icon: Package },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Platform Performance</h2>
          <p className="text-sm text-muted-foreground">Real-time revenue metrics, order velocity, and activity feed.</p>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((st) => {
            const Icon = st.icon;
            return (
              <div key={st.label} className="rounded-3xl border border-border/50 bg-card p-6 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold badge-font text-muted-foreground uppercase">{st.label}</span>
                  <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-foreground tracking-tight">{st.value}</div>
                <div className="flex items-center text-xs font-bold text-emerald-500 badge-font">
                  <TrendingUp className="h-3.5 w-3.5 mr-1" /> {st.change} from last month
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 rounded-3xl border border-border/50 bg-card p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-foreground">Revenue Trajectory</h3>
                <p className="text-xs text-muted-foreground">Monthly sales performance in USD</p>
              </div>
              <span className="text-xs font-bold badge-font text-primary bg-primary/10 px-3 py-1 rounded-full">
                Monthly
              </span>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} tickFormatter={(val) => `$${val / 1000}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', borderRadius: '12px', border: 'none', color: '#fff' }}
                    formatter={(value: any) => [`$${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-3xl border border-border/50 bg-card p-6 shadow-sm space-y-4">
            <div>
              <h3 className="text-lg font-bold text-foreground">Category Breakdown</h3>
              <p className="text-xs text-muted-foreground">Sales distribution</p>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categorySalesData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="category" stroke="#888888" fontSize={10} tickLine={false} />
                  <YAxis stroke="#888888" fontSize={10} tickLine={false} tickFormatter={(val) => `$${val / 1000}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', borderRadius: '12px', border: 'none', color: '#fff' }}
                    formatter={(val: any) => [`$${val.toLocaleString()}`, 'Sales']}
                  />
                  <Bar dataKey="sales" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="rounded-3xl border border-border/50 bg-card p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-border/40 pb-4">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" /> Live Activity Feed
            </h3>
            <span className="text-xs text-muted-foreground badge-font">System Audit</span>
          </div>

          <div className="space-y-3">
            {activityTimeline.map((act) => {
              const Icon = act.icon;
              return (
                <div key={act.id} className="flex items-start gap-4 p-3 rounded-2xl bg-muted/30">
                  <div className={`p-2 rounded-xl shrink-0 ${act.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-foreground">{act.title}</div>
                    <div className="text-xs text-muted-foreground">{act.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
