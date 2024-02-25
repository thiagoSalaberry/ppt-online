import { Gameroom } from "../model/gamerooms";
import { getPlayer } from "./playerController";
import { rtdb } from "../lib/firestore";
import { v4 as uuidv4 } from "uuid";

export async function createGameroom(player: PlayerData) {
  const longId = uuidv4(),
    shortId = Math.ceil(Math.random() * 1000000),
    host = await getPlayer(player.name, player.pin),
    history = {
      hostWins: 0,
      guestWins: 0,
      draws: 0,
    };
  const newGameroom = await Gameroom.createNewRoom({
    gameroomId: longId,
    shortRoomId: shortId,
    players: {
      host: { name: host.playerData.name, id: host.playerId },
      guest: { name: "", id: "" },
    },
    history,
  });
  //Create gameroom in rtdb
  const gameroomRef = rtdb.ref(`/gamerooms/${longId}`);
  const gameroomData = {
    shortRoomId: shortId,
    currentGame: {
      [host.playerId]: {
        name: host.playerData.name,
        online: true,
        move: "",
        host: true,
        ready: false,
      },
      winner: "",
    },
  };
  await gameroomRef.set(gameroomData);
  return { newGameroom: newGameroom.data };
}

export async function getGameroom(
  shortRoomId: string
  // name: string,
  // pin: string
) {
  try {
    const gameroom = await Gameroom.getGameroomById(shortRoomId);
    if (!gameroom)
      return {
        error: {
          message: "No se encontró la sala.",
          origin: "gameroomControllers.ts => getGameroom()",
        },
      };
    return { gameroom: gameroom.data };
    // const guest = await getPlayer(name, Number(pin));
    // const addGuest = await gameroom.addPlayer(
    //   guest.playerData.name,
    //   guest.playerId
    // );
    // if (addGuest.error) return { error: addGuest.error };
    // await gameroom.push();
    // return { message: addGuest.message };
  } catch (error) {
    throw new Error(
      "Error en la función getGameroom() de gameroomControllers.ts"
    );
  }
}
