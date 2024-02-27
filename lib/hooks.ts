import useSWR from "swr";
export async function fetchAPI(endpoint: string) {
  const res = await fetch(
    `https://desafio-e-commerce-five.vercel.app/api${endpoint}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application-json",
      },
    }
  );
  console.log({ res });
  if (res.status >= 200 && res.status < 300) {
    const data = await res.json();
    return data;
  } else if (res.status >= 400 && res.status < 500) {
    throw new Error("Error en el fetchAPI()");
  }
}

export async function useRTDB(gameroomId: string) {
  const { data, error } = useSWR(`/gamerooms/${gameroomId}`, fetchAPI);
  if (error) return error;
  if (data) return data;
}
