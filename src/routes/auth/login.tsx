import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { AuthLayout } from '@/layouts/AuthLayout';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export const Route = createFileRoute('/auth/login')({
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('alex.vance@novacart.store');
  const [password, setPassword] = useState('••••••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, 'customer');
    navigate({ to: '/' });
  };

  const handleAdminLogin = () => {
    login('admin@novacart.store', 'admin');
    navigate({ to: '/admin' });
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Welcome Back</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Sign in to access your saved wishlist, order history, and exclusive insider drops.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Email Address</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl h-11"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Password</Label>
              <a href="#" className="text-xs text-primary font-bold hover:underline">Forgot password?</a>
            </div>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl h-11"
              required
            />
          </div>

          <Button type="submit" size="lg" className="w-full rounded-2xl font-bold h-12 shadow-xl shadow-primary/20">
            Sign In to NovaCart
          </Button>
        </form>

        <div className="pt-4 border-t border-border/40 text-center space-y-3">
          <p className="text-xs text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/auth/register" className="font-bold text-primary hover:underline">
              Create an Account
            </Link>
          </p>

          <Button variant="outline" size="sm" onClick={handleAdminLogin} className="rounded-xl text-xs font-bold text-primary">
            Quick Admin Login Demo
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}
