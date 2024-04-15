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
  async addPlayer(
    name: string,
    id: string
  ): Promise<{ response: 0 | 1 | 2 | 3 }> {
    //Chequear si quien solicita el ingreso es el host
    if (this.data.players.host.id == id) {
      this.data.currentGame = {
        ...this.data.currentGame,
        host: {
          host: true,
          move: "",
          name,
          online: true,
          ready: false,
        },
      };
      await this.push();
      return { response: 0 }; //Setear online = true en firestore
    }
    //Chequear si la sala tiene guest
    if (this.data.players.guest.id == "") {
      this.data.players = { ...this.data.players, guest: { name, id } };
      this.data.currentGame = {
        ...this.data.currentGame,
        guest: {
          host: false,
          move: "",
          name,
          online: true,
          ready: false,
        },
      };
      await this.push();
      return { response: 1 }; //Agregar al guest en firestore y en firebase
    }
    //Chequear si quien solicita es el guest
    if (this.data.players.guest.id == id) {
      this.data.currentGame = {
        ...this.data.currentGame,
        guest: {
          host: false,
          move: "",
          name,
          online: true,
          ready: false,
        },
      };
      await this.push();
      return { response: 2 }; //Setear online = true en firebase
    }
    //Si no es ni el host ni el guest, la sala está llena
    else {
      return { response: 3 };
    }
  }
  async setReady(who: "host" | "guest") {
    const currentGameState = this.data.currentGame;
    this.data.currentGame = {
      ...currentGameState,
      [who]: {
        ...currentGameState[who],
        ready: !currentGameState[who].ready,
      },
    };
    await this.push();
    const player = currentGameState[who].name;
    return { message: `El jugador ${player} está listo` };
  }
  async setMove(who: "host" | "guest", move: "piedra" | "papel" | "tijera") {
    const currentGameState = this.data.currentGame;
    this.data.currentGame = {
      ...currentGameState,
      [who]: {
        ...currentGameState[who],
        move,
      },
    };
    await this.push();
    const player = currentGameState[who].name;
    return { message: `El jugador ${player} ha elegido ${move}` };
  }
  async pushToHistory(result: "host" | "guest" | "draw") {
    const key: "draws" | "guestWins" | "hostWins" =
      result == "draw" ? "draws" : `${result}Wins`;
    const history = this.data.history;
    this.data.history = {
      ...history,
      [key]: history[key] + 1,
    };
    await this.push();
    return { message: "El historial se actualizó correctamente" };
  }
  async endGame() {
    const gameHost = this.data.currentGame.host;
    const gameGuest = this.data.currentGame.guest;
    this.data.currentGame = {
      host: {
        host: gameHost.host,
        name: gameHost.name,
        ready: false,
        online: gameHost.online,
        move: "",
      },
      guest: {
        host: gameGuest.host,
        name: gameGuest.name,
        ready: false,
        online: gameGuest.online,
        move: "",
      },
    };
    await this.push();
  }
}
