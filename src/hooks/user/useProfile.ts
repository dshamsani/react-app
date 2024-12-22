import type { Dispatch, SetStateAction } from "react";
import type { Coordinates } from "@/types/coords";

import { useUser } from "@/context/UserContext";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useDebounce } from "../useDebounce";
import { useFetchCoordinatesByAddress } from "@/services/geocoding";

import toast from "react-hot-toast";

interface UseProfile {
  nameValue: string;
  addressValue: string;
  isLoading: boolean;
  isError: boolean;
  coordinates: Coordinates[] | null | undefined;
  setNameValue: Dispatch<SetStateAction<string>>;
  setAddressValue: Dispatch<SetStateAction<string>>;
  handleSave: () => void;
}

export const useProfile = (): UseProfile => {
  const { currentUser, updateUser } = useUser();
  const navigate = useNavigate();

  const [nameValue, setNameValue] = useState<string>(currentUser?.name || "");
  const [addressValue, setAddressValue] = useState<string>(
    currentUser?.address || "",
  );

  const debouncedAddress = useDebounce(addressValue);

  useEffect(() => {
    if (!currentUser) {
      navigate({ to: "/login" });
    }
  }, [currentUser, navigate]);

  const {
    data: coordinates,
    isLoading,
    isError,
  } = useFetchCoordinatesByAddress(debouncedAddress);

  const handleSave = () => {
    updateUser({
      name: nameValue,
      address: addressValue,
    });

    toast.success("Profile has been updated successfully!");
  };

  return {
    addressValue,
    nameValue,
    coordinates,
    isError,
    isLoading,
    handleSave,
    setAddressValue,
    setNameValue,
  };
};
