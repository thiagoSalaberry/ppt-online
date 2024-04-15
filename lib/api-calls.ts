const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000/api";
export async function getPlayer(
  name: string,
  pin: number
): Promise<PlayerAPIResponse | null> {
  try {
    const apiResponse = await fetch(
      // `https://ppt-online-react.vercel.app/api/player`,
      `${API_BASE_URL}/player`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, pin }),
      }
    );
    if (apiResponse.status < 400) {
      const apiData = await apiResponse.json();
      return apiData;
    } else if (apiResponse.status >= 400 && apiResponse.status < 500) {
      return null;
    } else {
      throw new Error("Internal server error");
    }
  } catch (error) {
    console.log("Error getting player data: ", error);
    return null;
  }
}
export async function getMe() {
  const accessToken = localStorage.getItem("accessToken");
  const apiResponse = await fetch(`${API_BASE_URL}/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  try {
    const apiData = await apiResponse.json();
    return apiData;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function usePlayer() {
  const accessId = localStorage.getItem("accessId");
  const apiResponse = await fetch(`${API_BASE_URL}/player/${accessId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  try {
    const apiData = await apiResponse.json();
    if (!apiData) return null;
    return apiData;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createGameroom() {
  const accessToken = localStorage.getItem("accessToken");
  const apiResponse = await fetch(`${API_BASE_URL}/gamerooms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
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
  const apiResponse = await fetch(`${API_BASE_URL}/gamerooms/${shortRoomId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  try {
    if (!apiResponse.ok) throw new Error("La sala no existe");
    const apiData = await apiResponse.json();
    return apiData;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

export async function joinRoom(shortRoomId: number, playerId: string) {
  const apiResponse = await fetch(`${API_BASE_URL}/gamerooms/${shortRoomId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ playerId }),
  });
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

export async function setReady(shortRoomId: string) {
  const accessToken = localStorage.getItem("accessToken");
  const apiResponse = await fetch(`${API_BASE_URL}/setReady/${shortRoomId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
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
  move: "piedra" | "papel" | "tijera"
) {
  const accessToken = localStorage.getItem("accessToken");
  const apiResponse = await fetch(`${API_BASE_URL}/setMove/${shortRoomId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ move }),
  });
  try {
    if (apiResponse.status == 200) {
      const apiData = await apiResponse.json();
      return apiData;
    }
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function pushToHistory(
  shortRoomId: string,
  result: "host" | "guest" | "draw"
) {
  const apiResponse = await fetch(`${API_BASE_URL}/history/${shortRoomId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ result }),
  });
  try {
    if (apiResponse.status == 200) {
      const apiData = await apiResponse.json();
      return apiData;
    }
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function endGame(shortRoomId: string) {
  const apiResponse = await fetch(`${API_BASE_URL}/endGame/${shortRoomId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  try {
    if (apiResponse.status == 200) {
      const apiData = await apiResponse.json();
      return apiData;
    }
  } catch (error: any) {
    throw new Error(error);
  }
}
