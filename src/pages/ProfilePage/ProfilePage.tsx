import type { FC } from "react";

import { useUser } from "@/context/UserContext";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useFetchCoordinatesByAddress } from "@/services/geocoding";
import { Header } from "@/components/Layout/Header";

export const ProfilePage: FC = () => {
  const { currentUser, updateUser } = useUser();
  const navigate = useNavigate();

  const [nameValue, setNameValue] = useState<string>(currentUser?.name || "");
  const [addressValue, setAddressValue] = useState<string>(currentUser?.address || "");

  useEffect(() => {
    if (!currentUser) {
      navigate({ to: "/login" });
    }
  }, [currentUser, navigate]);

  const { data: coordinates, isLoading, isError } = useFetchCoordinatesByAddress(addressValue);

  const handleSave = () => {
    updateUser({
      name: nameValue,
      address: addressValue,
    });
  };

  if (!currentUser) {
    return <div>No user data available</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow rounded">
        <h2 className="text-2xl font-semibold mb-4">User Profile</h2>

        <div className="mb-4">
          <label className="block mb-1">Name:</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Address:</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            value={addressValue}
            onChange={(e) => setAddressValue(e.target.value)}
          />
        </div>

        <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          Save
        </button>

        <div className="mt-6">
          <p className="font-semibold">Coordinates (lat, lon):</p>
          {isLoading && <p className="text-gray-500">Loading...</p>}
          {isError && <p className="text-red-500">Error loading coordinates</p>}
          {coordinates ? (
            <p className="mt-2">
              {coordinates.lat}, {coordinates.lon}
            </p>
          ) : (
            !isLoading && <p className="mt-2">Coordinates not found</p>
          )}
        </div>
      </div>
    </div>
  );
};
