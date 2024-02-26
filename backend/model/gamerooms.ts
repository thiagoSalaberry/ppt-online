import { firestore } from "../lib/firestore";

const gameroomsCollection = firestore.collection("gamerooms");

export class Gameroom {
  id: string;
  data: GameroomData;
  ref: FirebaseFirestore.DocumentReference;
  constructor(id: string, data: GameroomData) {
    this.id = id;
    this.data = data;
    this.ref = gameroomsCollection.doc(this.id);
  }
  async pull() {
    const docSnap = await this.ref.get();
    this.data = docSnap.data() as GameroomData;
  }
  async push() {
    await this.ref.update(this.data);
  }
  static async createNewRoom(gameroomData: GameroomData) {
    const addNewRecord = await gameroomsCollection.add(gameroomData);
    const newGameroom: Gameroom = new Gameroom(addNewRecord.id, gameroomData);
    return newGameroom;
  }
  static async getGameroomById(shortRoomId: string) {
    const querySnapshot = await gameroomsCollection
      .where("shortRoomId", "==", parseInt(shortRoomId))
      .get();
    if (querySnapshot.size === 0) return null;
    const docSnap = querySnapshot.docs[0];
    const gameroom = new Gameroom(docSnap.id, docSnap.data() as GameroomData);
    return gameroom;
  }
  async addPlayer(name: string, id: string) {
    //Chequear si quien solicita el ingreso es el host
    if (this.data.players.host.id == id) return { response: 1 }; //Setear online = true en firebase
    //Chequear si la sala tiene guest
    if (this.data.players.guest.id == "") {
      this.data.players = { ...this.data.players, guest: { name, id } };
      await this.push();
      return { response: 2 }; //Agregar al guest en firestore y en firebase
    }
    //Chequear si quien solicita es el guest
    if (this.data.players.guest.id == id)
      return { response: 3 }; //Setear online = true en firebase
    //Si no es ni el host ni el guest, la sala está llena
    else {
      return { response: 4 };
    }
  }
}
