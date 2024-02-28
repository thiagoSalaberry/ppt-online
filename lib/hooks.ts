import { useEffect, useState } from "react";
import useSWR from "swr";

export const useRoom = (shortRoomId: string) => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(`https://ppt-online-two.vercel.app/api/gamerooms/${shortRoomId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((apiResponse) => {
      setLoading(true);
      apiResponse
        .json()
        .then((data) => {
          return setApiData(data);
        })
        .catch((err) => {
          return setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  });
  return { apiData, loading, error };
};
