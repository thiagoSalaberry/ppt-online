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

export async function createGameroom(name: string, pin: number) {
  const apiResponse = await fetch(
    "https://ppt-online-two.vercel.app/api/gamerooms",
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
    if (!apiData) throw new Error("Failed to create room");
    return apiData as shortRoomIdAPIResponse;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function searchGameroom(shortRoomId: number) {
  const apiResponse = await fetch(
    `https://ppt-online-two.vercel.app/api/gamerooms/${shortRoomId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  try {
    const apiData = await apiResponse.json();
    console.log({ apiData });
    if (!apiData) throw new Error("Failed to search gameroom.");
    return apiData;
  } catch (error) {
    console.log(error);
    return null;
  }
}
