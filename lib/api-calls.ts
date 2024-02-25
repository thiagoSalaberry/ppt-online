export async function getPlayer(name: string, pin: number) {
  const apiResponse = await fetch(
    `https://ppt-online-two.vercel.app/api/player`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, pin }),
    }
  );
  try {
    const apiData = await apiResponse.json();
    if (!apiData) throw new Error("Failed to load player data");
    return apiData as PlayerAPIResponse;
  } catch (error) {
    console.log(error);
    return null;
  }
}
