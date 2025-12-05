'use client';

import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleMagicLink(e) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    setLoading(false);
    if (error) {
      alert(error.message);
    } else {
      alert('Magic link sent. Check your email.');
      // Keep user on login or optionally redirect to dashboard
      router.push('/dashboard');
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Sign in</h1>
      <form onSubmit={handleMagicLink}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ display: 'block', marginTop: 8, marginBottom: 12 }}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Magic Link'}
        </button>
      </form>
      <p style={{ marginTop: 12 }}>
        No account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
}
