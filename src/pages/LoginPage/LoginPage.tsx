import type { FC } from "react";

import { useLogin } from "@/hooks/user/useLogin";

export const LoginPage: FC = () => {
  const {
    error,
    loginValue,
    passwordValue,
    handleSubmit,
    setLoginValue,
    setPasswordValue,
  } = useLogin();

  return (
    <div className='flex h-screen flex-col items-center justify-center bg-gray-100'>
      <div className='w-80 rounded bg-white p-6 shadow-md'>
        <h1 className='mb-4 text-center text-xl font-bold'>Login</h1>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='mb-1 block'>Login:</label>
            <input
              type='text'
              className='w-full rounded border border-gray-300 px-3 py-2'
              value={loginValue}
              onChange={e => setLoginValue(e.target.value)}
            />
          </div>
          <div>
            <label className='mb-1 block'>Password:</label>
            <input
              type='password'
              className='w-full rounded border border-gray-300 px-3 py-2'
              value={passwordValue}
              onChange={e => setPasswordValue(e.target.value)}
            />
          </div>
          {error && <p className='text-sm text-red-500'>{error}</p>}
          <button
            type='submit'
            className='w-full rounded bg-blue-500 py-2 text-white transition hover:bg-blue-600'
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};
