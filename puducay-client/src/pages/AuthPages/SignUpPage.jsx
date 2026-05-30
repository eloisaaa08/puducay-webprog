import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import { createUser } from '../../services/UserService';

const inputClasses =
  'mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-50';

const actionButtonClassName =
  'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const SignUpPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');

    if (Number(age) <= 0) {
      setErrorMessage('Age must start from 1 and cannot be negative.');
      return;
    }

    if (!/^\d{11}$/.test(contactNumber)) {
      setErrorMessage('Contact number must be exactly 11 digits.');
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/;

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        'Password must be at least 8 characters and include uppercase, lowercase, number, and symbol.'
      );
      return;
    }

    try {
      await createUser({
        firstName,
        lastName,
        age,
        gender,
        contactNumber,
        email,
        type: 'editor',
        username,
        password,
        address,
        isActive: true,
      });

      setSuccessMessage('Account created successfully!');

      setFirstName('');
      setLastName('');
      setAge('');
      setGender('');
      setContactNumber('');
      setEmail('');
      setUsername('');
      setPassword('');
      setAddress('');
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Signup failed'
      );
    }
  };

  return (
    <div className="mx-auto max-w-lg rounded-3xl border border-zinc-200 bg-white p-8 shadow-lg">
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
        Sign Up
      </h1>

      <p className="mt-3 text-center text-sm leading-6 text-zinc-600">
        Create your account with the same monochrome layout pattern and shared button treatment.
      </p>

       {errorMessage && (
  <div className="mt-4 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-600">
    {errorMessage}
  </div>
)}

{successMessage && (
  <div className="mt-4 rounded-xl border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-600">
    {successMessage}
  </div>
)}

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="text-sm font-medium text-zinc-700">
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              placeholder="John"
              autoComplete="given-name"
              className={inputClasses}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="last-name" className="text-sm font-medium text-zinc-700">
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              placeholder="Estrada"
              autoComplete="family-name"
              className={inputClasses}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="age" className="text-sm font-medium text-zinc-700">
              Age
            </label>
            <input
              id="age"
              type="number"
              min="1"
              placeholder="22"
              className={inputClasses}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="gender" className="text-sm font-medium text-zinc-700">
              Gender
            </label>
            <input
              id="gender"
              type="text"
              placeholder="Female"
              className={inputClasses}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact-number" className="text-sm font-medium text-zinc-700">
            Contact Number
          </label>
          <input
            id="contact-number"
            type="text"
            inputMode="numeric"
            maxLength="11"
            placeholder="09123456789"
            className={inputClasses}
            value={contactNumber}
            onChange={(e) =>
              setContactNumber(e.target.value.replace(/\D/g, ''))
            }
            required
          />
        </div>

        <div>
          <label htmlFor="signup-email" className="text-sm font-medium text-zinc-700">
            Email
          </label>
          <input
            id="signup-email"
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
          <label htmlFor="username" className="text-sm font-medium text-zinc-700">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="johnestrada"
            className={inputClasses}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="signup-password" className="text-sm font-medium text-zinc-700">
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            className={inputClasses}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <p className="mt-2 text-xs leading-5 text-zinc-500">
            Password must be at least 8 characters with uppercase, lowercase, number, and symbol.
          </p>
        </div>

        <div>
          <label htmlFor="address" className="text-sm font-medium text-zinc-700">
            Address
          </label>
          <input
            id="address"
            type="text"
            placeholder="Manila, Philippines"
            className={inputClasses}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <Button type="submit" variant="primary" className={actionButtonClassName}>
          Create Account
        </Button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button type="button" variant="secondary" className={actionButtonClassName}>
            Sign Up with Google
          </Button>

          <Button type="button" variant="secondary" className={actionButtonClassName}>
            Sign Up with Apple
          </Button>
        </div>
      </form>

      <div className="mt-8 border-t border-zinc-200 pt-6 text-sm text-zinc-600">
        Already have an account?{' '}
        <Link
          to="/auth/signin"
          className="font-semibold text-zinc-900 transition hover:text-zinc-600"
        >
          Log In
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;