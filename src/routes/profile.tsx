import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { CustomerLayout } from '@/layouts/CustomerLayout';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { User, MapPin, KeyRound, Bell, Save, Plus, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = useAuth();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile information saved successfully.');
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Password updated successfully.');
  };

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Account Management</h2>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="rounded-2xl bg-card border border-border/50 p-1 mb-6">
            <TabsTrigger value="info" className="rounded-xl font-bold text-xs">Personal Info</TabsTrigger>
            <TabsTrigger value="addresses" className="rounded-xl font-bold text-xs">Address Book</TabsTrigger>
            <TabsTrigger value="security" className="rounded-xl font-bold text-xs">Security & Password</TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-xl font-bold text-xs">Notifications</TabsTrigger>
          </TabsList>

          {/* Tab 1: Personal Info */}
          <TabsContent value="info">
            <form onSubmit={handleSaveProfile} className="rounded-3xl border border-border/50 bg-card p-6 space-y-6 shadow-sm">
              <div className="flex items-center gap-2 border-b border-border/40 pb-4">
                <User className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">Personal Details</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input defaultValue={user?.name} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input defaultValue={user?.email} className="rounded-xl" disabled />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Phone Number</Label>
                  <Input defaultValue={user?.phone || '+1 (555) 234-5678'} className="rounded-xl" />
                </div>
              </div>

              <Button type="submit" className="rounded-2xl font-bold">
                <Save className="mr-2 h-4 w-4" /> Save Profile Changes
              </Button>
            </form>
          </TabsContent>

          {/* Tab 2: Addresses */}
          <TabsContent value="addresses">
            <div className="rounded-3xl border border-border/50 bg-card p-6 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-border/40 pb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-bold text-foreground">Saved Address Book</h3>
                </div>
                <Button size="sm" variant="outline" onClick={() => toast.info('Add new address modal')} className="rounded-xl font-bold">
                  <Plus className="mr-1 h-3.5 w-3.5" /> Add Address
                </Button>
              </div>

              <div className="p-4 rounded-2xl border border-primary/20 bg-primary/5 flex justify-between items-center">
                <div>
                  <div className="font-bold text-foreground flex items-center gap-2">
                    Home (Default Address) <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    742 Evergreen Terrace, San Francisco, CA 94107
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="text-xs text-primary font-bold">Edit</Button>
              </div>
            </div>
          </TabsContent>

          {/* Tab 3: Security */}
          <TabsContent value="security">
            <form onSubmit={handleSaveSecurity} className="rounded-3xl border border-border/50 bg-card p-6 space-y-6 shadow-sm">
              <div className="flex items-center gap-2 border-b border-border/40 pb-4">
                <KeyRound className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">Password & Security</h3>
              </div>

              <div className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label>Current Password</Label>
                  <Input type="password" placeholder="••••••••••••" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>New Password</Label>
                  <Input type="password" placeholder="••••••••••••" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Confirm New Password</Label>
                  <Input type="password" placeholder="••••••••••••" className="rounded-xl" />
                </div>
              </div>

              <Button type="submit" className="rounded-2xl font-bold">
                Update Password
              </Button>
            </form>
          </TabsContent>

          {/* Tab 4: Notifications */}
          <TabsContent value="notifications">
            <div className="rounded-3xl border border-border/50 bg-card p-6 space-y-6 shadow-sm">
              <div className="flex items-center gap-2 border-b border-border/40 pb-4">
                <Bell className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">Notification Preferences</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/30">
                  <div>
                    <div className="font-bold text-sm text-foreground">Email Notifications</div>
                    <div className="text-xs text-muted-foreground">Receive order status updates and insider drops.</div>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/30">
                  <div>
                    <div className="font-bold text-sm text-foreground">SMS Shipping Alerts</div>
                    <div className="text-xs text-muted-foreground">Get real-time tracking updates sent to your phone.</div>
                  </div>
                  <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </CustomerLayout>
  );
}
