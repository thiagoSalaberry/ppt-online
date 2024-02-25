import { Player } from "../model/players";

export async function createPlayer(name: string, pin: number) {
  try {
    const newPlayer = await Player.createNewPlayer({ name, pin });
    return newPlayer;
  } catch (error) {
    throw new Error(
      "Error en la función createPlayer() de playerController.ts"
    );
  }
}

export async function getPlayer(name: string, pin: number) {
  try {
    const player = await Player.getPlayerByNameAndPin(name, pin);
    if (player) {
      return { playerData: player.data, playerId: player.id };
    } else {
      const newPlayer = await createPlayer(name, pin);
      return { playerData: newPlayer.data, playerId: newPlayer.id };
    }
  } catch (error) {
    throw new Error("Error en la función getPlayer() de playerControllers.ts");
  }
}

export async function getPlayerById(accessId: string) {
  try {
    const player = await Player.getPlayerById(accessId);
    if (player) {
      return { playerData: player.data, playerId: player.id };
    } else {
      throw new Error("No se ha encontrado al jugador con el ID proporcionado");
    }
  } catch (error) {
    throw new Error(
      "Error en la función getPlayerById() de playerControllers.ts"
    );
  }
}
