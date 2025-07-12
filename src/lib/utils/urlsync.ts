"use client";

import { useRouter, useSearchParams } from "next/navigation";

export const useUrlSync = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getParam = (key: string) => {
    const value = searchParams.get(key);
    return value ?? null;
  };

  const setParams = (params: Record<string, string | number | null>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        current.delete(key);
      } else {
        current.set(key, String(value));
      }
    });
    router.push(`?${current.toString()}`);
  };

  return { getParam, setParams };
};
