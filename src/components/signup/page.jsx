'use client';

import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignup(e) {
    e.preventDefault();
    setLoading(true);
    // signUp will send confirmation/magic link depending on your Supabase settings
    const { data, error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      alert(error.message);
    } else {
      alert('Check your email for confirmation.');
      router.push('/dashboard');
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Sign up</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label>
            Email
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
        </div>

        <div style={{ marginTop: 8 }}>
          <label>
            Password
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
        </div>

        <div style={{ marginTop: 14 }}>
          <button type="submit" disabled={loading}>
            {loading ? 'Signing up...' : 'Create account'}
          </button>
        </div>
      </form>

      <p style={{ marginTop: 12 }}>
        Already have an account? <a href="/login">Sign in</a>
      </p>
    </div>
  );
}
