import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../../components/Button';
import { loginUser } from '../../services/UserService';

const inputClasses =
  'mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-50';

const actionButtonClassName =
  'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const SignInPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginUser({
        email,
        password,
      });

      // VIEWERS CANNOT LOGIN
      const userType = data.type?.toLowerCase();

if (userType === 'viewer') {
        setErrorMessage('Viewer accounts are not allowed to login.');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('type', userType);
      localStorage.setItem('firstName', data.firstName);

      navigate('/dashboard');
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Login failed'
      );
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-zinc-200 bg-white p-8 shadow-lg">
      
      <div className="mb-6 flex justify-center">
        <div className="w-14 h-14 flex items-center justify-center transition-transform duration-200 hover:scale-105">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect x="5" y="5" width="90" height="90" rx="20" fill="#18181b" />
            <rect x="20" y="20" width="25" height="25" fill="white" />
            <rect x="55" y="20" width="25" height="25" fill="white" />
            <rect x="20" y="55" width="60" height="25" fill="white" />
          </svg>
        </div>
      </div>

      <h1 className="text-center text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
        Log In
      </h1>

      <p className="mt-3 text-center text-sm leading-6 text-zinc-600">
        Please enter your details to sign in.
      </p>

      {errorMessage && (
        <div className="mt-4 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-600">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        
        <div>
          <label
            htmlFor="signin-email"
            className="text-sm font-medium text-zinc-700"
          >
            Email Address
          </label>

          <input
            id="signin-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className={inputClasses}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            htmlFor="signin-password"
            className="text-sm font-medium text-zinc-700"
          >
            Password
          </label>

          <input
            id="signin-password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            className={inputClasses}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <p className="mt-2 text-xs leading-5 text-zinc-500">
            It must be a combination of minimum 8 letters, numbers, and symbols.
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-2 text-zinc-600">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-zinc-300 accent-zinc-900"
            />
            <span>Remember me</span>
          </label>

          <button
            type="button"
            className="font-medium text-zinc-700 transition hover:text-zinc-900"
          >
            Forgot Password?
          </button>
        </div>

        <Button
          type="submit"
          variant="primary"
          className={actionButtonClassName}
        >
          Log In
        </Button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button
            type="button"
            variant="secondary"
            className={actionButtonClassName}
          >
            Log In with Google
          </Button>

          <Button
            type="button"
            variant="secondary"
            className={actionButtonClassName}
          >
            Log In with Apple
          </Button>
        </div>
      </form>

      <div className="mt-8 border-t border-zinc-200 pt-6 text-sm text-zinc-600">
        No account yet?{' '}
        <Link
          to="/auth/signup"
          className="font-semibold text-zinc-900 transition hover:text-zinc-600"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;