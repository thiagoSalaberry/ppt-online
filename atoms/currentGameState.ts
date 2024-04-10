import { atom } from "recoil";

export const gameroomState = atom({
  key: "gameroom",
  default: {
    currentGame: {
      hostId: {
        host: true,
        move: null,
        name: "",
        online: false,
        ready: false,
      },
      guestId: {
        host: false,
        move: null,
        name: "",
        online: false,
        ready: false,
      },
    },
    gameroomId: "",
    history: {
      draws: 0,
      guestWins: 0,
      hostWins: 0,
    },
    players: {
      guest: {
        id: "",
        name: "",
      },
      host: {
        id: "",
        name: "",
      },
    },
    shortRoomId: 0,
    hostTest: "antes",
    guestTest: "antes",
  },
});
