import type { FC } from "react";

import { Header } from "@/components/Layout/Header";

import { useUser } from "@/context/UserContext";
import { useProfile } from "@/hooks/user/useProfile";

export const ProfilePage: FC = () => {
  const { currentUser } = useUser();
  const {
    addressValue,
    nameValue,
    coordinates,
    isError,
    isLoading,
    handleSave,
    setAddressValue,
    setNameValue,
  } = useProfile();

  if (!currentUser) {
    return <div>No user data available</div>;
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />
      <div className='mx-auto mt-10 max-w-xl rounded bg-white p-6 shadow'>
        <h2 className='mb-4 text-2xl font-semibold'>User Profile</h2>

        <div className='mb-4'>
          <label className='mb-1 block'>Name:</label>
          <input
            type='text'
            className='w-full rounded border border-gray-300 px-3 py-2'
            value={nameValue}
            onChange={e => setNameValue(e.target.value)}
          />
        </div>

        <div className='mb-4'>
          <label className='mb-1 block'>Address:</label>
          <input
            type='text'
            className='w-full rounded border border-gray-300 px-3 py-2'
            value={addressValue}
            onChange={e => setAddressValue(e.target.value)}
          />
        </div>

        <button
          onClick={handleSave}
          className='rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600'
        >
          Save
        </button>

        <div className='mt-6'>
          <p className='font-semibold'>Coordinates (lat, lon):</p>
          {isLoading && <p className='text-gray-500'>Loading...</p>}
          {isError && <p className='text-red-500'>Error loading coordinates</p>}
          {coordinates ? (
            <p className='mt-2'>
              {coordinates[0]?.lat}, {coordinates[0]?.lon}
            </p>
          ) : (
            !isLoading && <p className='mt-2'>Coordinates not found</p>
          )}
        </div>
      </div>
    </div>
  );
};
