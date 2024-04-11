import { firestore } from "../lib/firestore";

const playersCollection = firestore.collection("players");

export class Player {
  ref: FirebaseFirestore.DocumentReference;
  data: PlayerData;
  id: string;
  constructor(id: string, data: PlayerData) {
    this.id = id;
    this.data = data;
    this.ref = playersCollection.doc(id);
  }
  async pullData() {
    const docSnap = await this.ref.get();
    this.data = docSnap.data() as PlayerData;
  }
  async pushData() {
    await this.ref.update(this.data);
  }
  static async createNewPlayer(playerData: PlayerData): Promise<Player> {
    const addNewRecord = await playersCollection.add(playerData);
    const newPlayer: Player = new Player(addNewRecord.id, playerData);
    return newPlayer;
  }
  static async getPlayerByNameAndPin(
    name: string,
    pin: number
  ): Promise<{ status: 0 | 1 | 2; message: string; player?: PlayerData }> {
    const querySnapshot = await playersCollection
      .where("name", "==", name)
      .get();
    if (querySnapshot.empty) {
      const newPlayer = await Player.createNewPlayer({ name, pin });
      return {
        status: 0,
        message: `Bienvenido ${newPlayer.data.name}`,
        player: newPlayer.data,
      };
    } else {
      const docSnap = querySnapshot.docs[0];
      const player: Player = new Player(
        docSnap.id,
        docSnap.data() as PlayerData
      );
      if (player.data.pin === pin) {
        return {
          status: 1,
          message: `Hola de nuevo ${player.data.name}`,
          player: player.data,
        };
      } else {
        return {
          status: 2,
          message: "El pin es incorrecto.",
        };
      }
    }
  }
  static async getPlayerById(accessId: string) {
    const querySnapshot = await playersCollection.doc(accessId).get();
    if (!querySnapshot.exists) throw Error(`No such document: ${accessId}`);
    const player = new Player(
      querySnapshot.id,
      querySnapshot.data() as PlayerData
    );
    return player;
  }
}
