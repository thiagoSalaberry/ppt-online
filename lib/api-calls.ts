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

export async function usePlayer() {
  const accessId = localStorage.getItem("accessId");
  const apiResponse = await fetch(
    `https://ppt-online-two.vercel.app/api/player/${accessId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  try {
    const apiData = await apiResponse.json();
    if (!apiData) return null;
    return apiData;
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
    if (!apiData) throw new Error("La sala no existe");
    return apiData;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

export async function joinRoom(shortRoomId: number, name: string, pin: number) {
  const apiResponse = await fetch(
    `https://ppt-online-two.vercel.app/api/gamerooms/${shortRoomId}`,
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
    console.log(apiResponse);
    if (!apiData) throw new Error("Acceso denegado");
    return apiData;
  } catch (error) {
    console.log(error);
    return null;
  }
}
