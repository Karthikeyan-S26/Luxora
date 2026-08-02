import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { AdminLayout } from '@/layouts/AdminLayout';
import { mockProducts } from '@/data/products';
import { formatCurrency } from '@/utils/currency';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Download, Edit, Trash2, SlidersHorizontal } from 'lucide-react';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/products')({
  component: AdminProductsPage,
});

function AdminProductsPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selectedIds.length === mockProducts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(mockProducts.map((p) => p.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleExportCSV = () => {
    toast.success(`Exported ${mockProducts.length} products to CSV report.`);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Catalog Products ({mockProducts.length})</h2>
            <p className="text-sm text-muted-foreground">Manage store inventory, prices, and product listings.</p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleExportCSV} className="rounded-xl font-bold">
              <Download className="mr-1.5 h-4 w-4" /> Export Catalog CSV
            </Button>
            <Button className="rounded-xl font-bold">
              <Plus className="mr-1.5 h-4 w-4" /> Add Product
            </Button>
          </div>
        </div>

        {/* Selected Bulk Actions Bar */}
        {selectedIds.length > 0 && (
          <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-between">
            <span className="text-xs font-bold badge-font text-primary">
              {selectedIds.length} items selected
            </span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="rounded-xl text-xs font-bold">Bulk Edit</Button>
              <Button size="sm" variant="destructive" className="rounded-xl text-xs font-bold">Delete Selected</Button>
            </div>
          </div>
        )}

        <div className="rounded-3xl border border-border/50 bg-card p-6 shadow-sm overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-muted-foreground badge-font uppercase border-b border-border/40">
              <tr>
                <th className="py-3 px-4 w-10">
                  <Checkbox
                    checked={selectedIds.length === mockProducts.length && mockProducts.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </th>
                <th className="py-3 px-4">Item</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {mockProducts.map((p) => (
                <tr key={p.id} className="hover:bg-muted/30">
                  <td className="py-3 px-4">
                    <Checkbox
                      checked={selectedIds.includes(p.id)}
                      onCheckedChange={() => toggleSelectOne(p.id)}
                    />
                  </td>
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img src={p.thumbnail} alt={p.title} className="h-10 w-10 rounded-xl object-cover bg-muted" />
                    <div>
                      <div className="font-bold text-foreground line-clamp-1">{p.title}</div>
                      <div className="text-xs text-muted-foreground">{p.brand}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium text-muted-foreground">{p.categoryName}</td>
                  <td className="py-3 px-4 font-bold text-foreground">{formatCurrency(p.price)}</td>
                  <td className="py-3 px-4 font-mono text-xs">{p.stock} units</td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg">
                      <Edit className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
