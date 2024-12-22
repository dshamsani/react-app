import type { Coordinates } from "@/types/coords";

import { handleFetch } from "../lib/handleFetch";
import { useQuery } from "@tanstack/react-query";

import { API_KEY } from "../constants/api";

export const fetchCoordinatesByAddress = async (address: string) => {
  const options = {
    params: {
      q: encodeURIComponent(address),
      limit: 1,
      appid: API_KEY,
    },
  };

  return handleFetch<Coordinates[]>(options);
};

export const useFetchCoordinatesByAddress = (address: string) => {
  return useQuery({
    queryKey: ["coordinates", address],
    queryFn: () => {
      if (!address) {
        return null;
      }

      return fetchCoordinatesByAddress(address);
    },
    enabled: Boolean(address),
  });
};
