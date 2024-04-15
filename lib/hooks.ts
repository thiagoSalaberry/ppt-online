import { resolve } from "path";
import { use, useEffect, useState, useTransition } from "react";
import useSWR from "swr";
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000/api";
export async function fetchAPI2(endpoint: string) {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(
    // `https://ppt-online-react.vercel.app/api${endpoint}`,
    `${API_BASE_URL}${endpoint}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application-json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (res.status >= 200 && res.status < 300) {
    const data = await res.json();
    return data;
  } else if (res.status >= 400 && res.status < 500) {
    throw new Error("Error en el fetchAPI()");
  }
}

export function useJSONPlaceholder(productId: string) {
  const { data, error } = useSWR(`/users/${productId}`, fetchAPI2);
  return data;
}

export function useRoom(shortRoomId: string) {
  const { data, error } = useSWR(`/gamerooms/${shortRoomId}`, fetchAPI2, {
    refreshInterval: 100,
  });
  return data as GameroomData;
}

export function useCurrentGame(shortRoomId: string) {
  const { data, isLoading, error } = useSWR(
    `/gamerooms/${shortRoomId}`,
    fetchAPI2,
    {
      refreshInterval: 30,
    }
  );
  return {
    data: data as GameroomAPIResponse,
    isLoading,
    error,
  };
}
