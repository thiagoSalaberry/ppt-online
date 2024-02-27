import useSWR from "swr";
export async function fetchAPI(endpoint: string) {
  const apiResponse = await fetch(
    `https://ppt-online-two.vercel.app/api/${endpoint}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log("Api response de fetchAPI", apiResponse);
  console.log("apiData de fetchAPI", await apiResponse.json());

  return await apiResponse.json();
}

export async function useRTDB(gameroomId: string) {
  const { data, error } = useSWR(`rtdb/${gameroomId}`, fetchAPI);
  console.log("esta data viene de useRTDB", data);
  return data;
}
