export async function getPlayer(
  name: string,
  pin: number
): Promise<PlayerAPIResponse | null> {
  try {
    const apiResponse = await fetch(
      `https://ppt-online-react.vercel.app/api/player`,
      // `http://localhost:3000/api/player`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, pin }),
      }
    );
    if (apiResponse.status < 400) {
      console.log("Salió todo bien");
      const apiData = await apiResponse.json();
      console.log("Esto viene del api-call", apiData);
      return apiData;
    } else if (apiResponse.status >= 400 && apiResponse.status < 500) {
      console.log("La petición es mala o el pin es incorrecto");
      return null;
    } else {
      console.log("Salió todo mal");
      throw new Error("Internal server error");
    }
  } catch (error) {
    console.log("Error getting player data: ", error);
    return null;
  }
}

export async function usePlayer() {
  const accessId = localStorage.getItem("accessId");
  const apiResponse = await fetch(
    `https://ppt-online-react.vercel.app/api/player/${accessId}`,
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
    "https://ppt-online-react.vercel.app/api/gamerooms",
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
    `https://ppt-online-react.vercel.app/api/gamerooms/${shortRoomId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  try {
    if (!apiResponse.ok) throw new Error("La sala no existe");
    const apiData = await apiResponse.json();
    return apiData;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

export async function joinRoom(shortRoomId: number, name: string, pin: number) {
  const apiResponse = await fetch(
    `https://ppt-online-react.vercel.app/api/gamerooms/${shortRoomId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, pin }),
    }
  );
  try {
    if (apiResponse.status == 404) throw new Error("La sala no existe");
    if (apiResponse.status == 403) throw new Error("La sala está llena");
    if (apiResponse.status == 200) {
      const apiData = await apiResponse.json();
      return apiData;
    }
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function setReady(shortRoomId: string, playerId: string) {
  const apiResponse = await fetch(
    `https://ppt-online-react.vercel.app/api/setReady/${shortRoomId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ playerId }),
    }
  );
  try {
    if (apiResponse.status == 200) {
      const apiData = await apiResponse.json();
      return apiData;
    }
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function setMove(
  shortRoomId: string,
  playerId: string,
  move: "piedra" | "papel" | "tijera"
) {
  const apiResponse = await fetch(
    `https://ppt-online-react.vercel.app/api/setMove/${shortRoomId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ playerId, move }),
    }
  );
  try {
    if (apiResponse.status == 200) {
      const apiData = await apiResponse.json();
      return apiData;
    }
  } catch (error: any) {
    throw new Error(error);
  }
}
