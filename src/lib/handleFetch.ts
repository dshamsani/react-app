import type { StringifiableRecord } from "query-string";

import { getUrl } from "@/utils/url";

interface FetchError extends Error {
  status?: number;
}

interface FetchOptions extends RequestInit {
  params?: StringifiableRecord;
  timeout?: number;
  retryCount?: number;
  headers?: HeadersInit;
  body?: BodyInit;
}

const fetchWithTimeout = (url: string, timeout: number, options?: RequestInit): Promise<Response> => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Request timed out")), timeout);
    fetch(url, { ...options })
      .then((response) => {
        clearTimeout(timer);
        resolve(response);
      })
      .catch((error) => {
        clearTimeout(timer);
        reject(error);
      });
  });
};

export const handleFetch = async <T>(options?: FetchOptions): Promise<T> => {
  const fullUrl = getUrl(options?.params);
  const timeout = options?.timeout ?? 30000;
  const retryCount = options?.retryCount ?? 2;
  const headers = options?.headers;
  const body = options?.body;
  const method = options?.method ?? "GET";

  for (let attempt = 0; attempt <= retryCount; attempt++) {
    try {
      const response = await fetchWithTimeout(fullUrl, timeout, {
        method,
        headers,
        body,
      });

      if (response.status !== 200) {
        const error: FetchError = new Error("The network response failed.");
        error.status = response.status;
        throw error;
      }

      const data: T = await response.json();

      return { ...data };
    } catch (error) {
      if (attempt !== retryCount) {
        console.warn(`Attempt ${attempt + 1} failed. Retrying...`);
        continue;
      }

      if (!(error instanceof Error)) {
        throw new Error("An unknown error occurred during fetch");
      }

      console.error("Fetch error:", error.message);
      throw error;
    }
  }

  throw new Error("Failed to fetch after retries");
};
