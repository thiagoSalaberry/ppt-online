import { Gameroom } from "../model/gamerooms";
import { getPlayer } from "./playerController";
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
  return { newGameroom: newGameroom.data };
}

export async function getGameroom(
  shortRoomId: string,
  name: string,
  pin: string
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
    const guest = await getPlayer(name, Number(pin));
    const addGuest = await gameroom.addGuest(
      guest.playerData.name,
      guest.playerId
    );
    if (addGuest.error) return { error: addGuest.error };
    await gameroom.push();
    return { message: addGuest.message };
  } catch (error) {
    throw new Error(
      "Error en la función getGameroom() de gameroomControllers.ts"
    );
  }
}
