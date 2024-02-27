import { Gameroom } from "../model/gamerooms";
import { getPlayer } from "./playerController";
import { rtdb } from "../lib/firestore";
import { v4 as uuidv4 } from "uuid";
import { Player } from "../model/players";

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

export async function getGameroom(shortRoomId: string) {
  try {
    const gameroom = await Gameroom.getGameroomById(shortRoomId);
    if (!gameroom) {
      return { status: 0, response: "La sala no existe" };
    } else {
      return { status: 1, response: gameroom.data };
    }
  } catch (error) {
    throw new Error(
      "Error en la función getGameroom() de gameroomControllers.ts"
    );
  }
}

export async function joinRoom(
  shortRoomId: string,
  playerName: string,
  playerPin: number
) {
  try {
    const gameroom = await Gameroom.getGameroomById(shortRoomId);
    //Devuelve gameroom o null
    if (!gameroom) return { status: 0, response: "La sala no existe" }; //
    const player = await Player.getPlayerByNameAndPin(playerName, playerPin);
    if (player) {
      const added = await gameroom?.addPlayer(playerName, player?.id);
      const gameroomRef = rtdb.ref(
        `/gamerooms/${gameroom?.data.gameroomId}/currentGame`
      );
      if (added?.response == 1) {
        await gameroomRef.update({
          [player.id]: {
            host: true,
            name: player.data.name,
            online: true,
            move: "",
            ready: false,
          },
        });
        return { status: 2, response: "El host ahora está online" }; //
      }
      if (added?.response == 2 || added?.response == 3) {
        await gameroomRef.update({
          [player.id]: {
            host: false,
            name: player.data.name,
            online: true,
            move: "",
            ready: false,
          },
        });
        return { status: 3, response: "El guest ahora está online" }; //
      }
      if (added?.response == 4)
        return { status: 1, response: "La sala está llena" }; //
    }
  } catch (error) {
    throw new Error(
      `Error en la función joinRoom() de gameroomControllers.ts:`
    );
  }
}

export async function listenRTDB(gameroomId: string) {
  const gameroomRef = rtdb.ref(`/gamerooms/${gameroomId}/currentGame`);
  try {
    let value;
    gameroomRef.on("value", (snapshot) => {
      const val = snapshot.val();
      console.log({ val });
      value = val;
    });
    return value;
  } catch (error) {
    throw new Error(
      `Error en la función listenRTDB() de gameroomControllers.ts:`
    );
  }
}
