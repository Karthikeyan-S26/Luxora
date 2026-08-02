import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { AuthLayout } from '@/layouts/AuthLayout';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export const Route = createFileRoute('/auth/register')({
  component: RegisterPage,
});

function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || 'new.user@novacart.store', 'customer');
    navigate({ to: '/' });
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Create an Account</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Join NovaCart Insider to receive complimentary shipping and early access drops.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Vance"
              className="rounded-xl h-11"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Email Address</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
              className="rounded-xl h-11"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="••••••••••••"
              className="rounded-xl h-11"
              required
            />
          </div>

          <Button type="submit" size="lg" className="w-full rounded-2xl font-bold h-12 shadow-xl shadow-primary/20">
            Create Account
          </Button>
        </form>

        <div className="pt-4 border-t border-border/40 text-center">
          <p className="text-xs text-muted-foreground">
            Already have an account?{' '}
            <Link to="/auth/login" className="font-bold text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
