import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Signup() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
  const password = watch('password', '');

  const onSubmit = async (data) => {
    try {
      await signUp(data.email, data.password);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gov-gradient px-4 py-10 text-white">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-950/95 p-8 shadow-panel backdrop-blur-md">
        <h1 className="text-3xl font-semibold">Citizen Registration</h1>
        <p className="mt-2 text-slate-300">Register once, apply to multiple schemes seamlessly.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <label className="block text-sm font-medium text-slate-200">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            {...register('email', { required: 'Email is required' })}
            className="w-full rounded-3xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-sky-400"
          />
          {errors.email && <p className="text-sm text-rose-400">{errors.email.message}</p>}
          <label className="block text-sm font-medium text-slate-200">Password</label>
          <input
            type="password"
            placeholder="Create a strong password"
            {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' } })}
            className="w-full rounded-3xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-sky-400"
          />
          {errors.password && <p className="text-sm text-rose-400">{errors.password.message}</p>}
          <label className="block text-sm font-medium text-slate-200">Confirm Password</label>
          <input
            type="password"
            {...register('confirmPassword', {
              required: 'Confirm your password',
              validate: (value) => value === password || 'Passwords do not match',
            })}
            className="w-full rounded-3xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-sky-400"
          />
          {errors.confirmPassword && <p className="text-sm text-rose-400">{errors.confirmPassword.message}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-3xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-600 disabled:opacity-50"
          >
            {isSubmitting ? 'Creating account…' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-6 text-sm text-slate-400">
          Already registered? <Link className="text-sky-300 hover:text-white" to="/login">Login now</Link>
        </p>
      </div>
    </div>
  );
}
