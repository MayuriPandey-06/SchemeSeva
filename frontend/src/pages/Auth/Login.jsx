import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      await signIn(data.email, data.password);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gov-gradient px-4 py-10 text-white">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-950/95 p-8 shadow-panel backdrop-blur-md">
        <h1 className="text-3xl font-semibold">Citizen Login</h1>
        <p className="mt-2 text-slate-300">Access government scheme recommendations and track your applications.</p>
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
            placeholder="Enter password"
            {...register('password', { required: 'Password is required' })}
            className="w-full rounded-3xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-sky-400"
          />
          {errors.password && <p className="text-sm text-rose-400">{errors.password.message}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-3xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-600 disabled:opacity-50"
          >
            {isSubmitting ? 'Signing in…' : 'Login'}
          </button>
        </form>
        <p className="mt-6 text-sm text-slate-400">
          New citizen? <Link className="text-sky-300 hover:text-white" to="/signup">Create account</Link>
        </p>
      </div>
    </div>
  );
}
