import { Player } from "../model/players";

export async function findOrCreatePlayer(
  playerName: string,
  pin: number
): Promise<PlayerModelResponse> {
  try {
    const firebaseResponse = await Player.getPlayerByNameAndPin(
      playerName,
      pin
    );
    return firebaseResponse;
  } catch (error) {
    throw new Error(
      "Error en la función createPlayer() de playerController.ts"
    );
  }
}

// export async function createPlayer(
//   name: string,
//   pin: number
// ): Promise<PlayerData> {
//   try {
//     const newPlayer = await Player.createNewPlayer({ name, pin });
//     return newPlayer.data;
//   } catch (error) {
//     throw new Error(
//       "Error en la función createPlayer() de playerController.ts"
//     );
//   }
// }

// export async function getPlayer(name: string, pin: number) {
//   try {
//     const player = await Player.getPlayerByNameAndPin(name, pin);
//     if (player) {
//       return { playerData: player.data, playerId: player.id };
//     } else {
//       const newPlayer = await createPlayer(name, pin);
//       return { playerData: newPlayer.data, playerId: newPlayer.id };
//     }
//   } catch (error) {
//     throw new Error("Error en la función getPlayer() de playerControllers.ts");
//   }
// }

export async function getPlayerById(
  accessId: string
): Promise<PlayerData | null> {
  try {
    const firebaseResponse = await Player.getPlayerById(accessId);
    if (firebaseResponse) {
      return {
        id: firebaseResponse.id,
        name: firebaseResponse.data.name,
        pin: firebaseResponse.data.pin,
      };
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(
      "Error en la función getPlayerById() de playerControllers.ts"
    );
  }
}
