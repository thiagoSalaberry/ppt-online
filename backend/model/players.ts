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
  static async createNewPlayer(playerData: PlayerData) {
    const addNewRecord = await playersCollection.add(playerData);
    const newPlayer: Player = new Player(addNewRecord.id, playerData);
    return newPlayer;
  }
  static async getPlayerByNameAndPin(name: string, pin: number) {
    const querySnapshot = await playersCollection
      .where("name", "==", name)
      .where("pin", "==", pin)
      .get();
    if (querySnapshot.size === 0) return null;
    const docSnap = querySnapshot.docs[0];
    const player: Player = new Player(docSnap.id, docSnap.data() as PlayerData);
    return player;
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
