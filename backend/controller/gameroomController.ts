import { Gameroom } from "../model/gamerooms";
import { getPlayerById } from "./playerController";
import { rtdb } from "../lib/firestore";
import { v4 as uuidv4 } from "uuid";
import { Player } from "../model/players";

export async function createGameroom(player: PlayerData) {
  const longId = uuidv4(),
    shortId = Math.ceil(Math.random() * 1000000),
    host = player,
    history = {
      hostWins: 0,
      guestWins: 0,
      draws: 0,
    };
  const newGameroom = await Gameroom.createNewRoom({
    gameroomId: longId,
    shortRoomId: shortId,
    players: {
      host: { name: host.name, id: host.id! },
      guest: { name: "", id: "" },
    },
    history,
    currentGame: {
      host: {
        host: true,
        online: true,
        name: host.name,
        ready: false,
        move: null,
      },
      guest: {
        host: false,
        online: false,
        name: "",
        ready: false,
        move: null,
      },
    },
  });
  //Create gameroom in rtdb
  // const gameroomRef = rtdb.ref(`/gamerooms/${longId}`);
  // const gameroomData = {
  //   shortRoomId: shortId,
  //   currentGame: {
  //     [host.playerId]: {
  //       name: host.playerData.name,
  //       online: true,
  //       move: "",
  //       host: true,
  //       ready: false,
  //     },
  //     winner: "",
  //   },
  // };
  // await gameroomRef.set(gameroomData);
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

export async function joinRoom(shortRoomId: string, playerId: string) {
  try {
    const player = await Player.getPlayerById(playerId);
    if (!player) return { status: 0, response: "El jugador no existe" };
    const gameroom = await Gameroom.getGameroomById(shortRoomId);
    if (!gameroom) return { status: 1, response: "La sala no existe" }; //
    const added = await gameroom.addPlayer(player.data.name, player.id);
    if (added.response == 0) {
      return { status: 2, response: "El host ahora está online" }; //
    }
    if (added.response == 1 || added?.response == 2) {
      return { status: 3, response: "El guest ahora está online" }; //
    }
    if (added.response == 3)
      return { status: 4, response: "La sala está llena" }; //
  } catch (error) {
    throw new Error(
      `Error en la función joinRoom() de gameroomControllers.ts:`
    );
  }
}

// export async function setMove(
//   shortRoomId: string,
//   playerId: string,
//   move: "piedra" | "papel" | "tijera"
// ) {
//   const gameroom = await Gameroom.getGameroomById(shortRoomId);
//   console.log(gameroom);
//   if (!gameroom) {
//     return { status: 0, response: "La sala no existe" };
//   } else {
//     const settingMove = await gameroom.setMove(move, playerId);
//     return settingMove.message;
//   }
// }

// export async function setReady(shortRoomId: string, playerId: string) {
//   const gameroom = await Gameroom.getGameroomById(shortRoomId);
//   if (!gameroom) {
//     return { status: 0, response: "La sala no existe" };
//   } else {
//     const settingMove = await gameroom.setReady(playerId);
//     return settingMove.message;
//   }
// }
