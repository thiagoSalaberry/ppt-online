import { Player } from "../model/players";

export async function createPlayer(name: string, pin: number) {
  try {
    const newPlayer = await Player.createNewPlayer({ name, pin });
    return { playerData: newPlayer.data, playerId: newPlayer.id };
  } catch (error) {
    throw new Error(
      "Error en la función createPlayer() de playerController.ts"
    );
  }
}

export async function getPlayer(name: string, pin: number) {
  try {
    const player = await Player.getPlayerByNameAndPin(name, pin);
    if (!player)
      return {
        error: {
          message: "No se encontró al jugador",
          origin: "playerController.ts => getPlayer()",
        },
      };
    return { playerData: player.data, playerId: player.id };
  } catch (error) {
    throw new Error("Error en la función getPlayer() de playerControllers.ts");
  }
}
