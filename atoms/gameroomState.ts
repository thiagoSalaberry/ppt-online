import { atom } from "recoil";

export const gameroomState = atom<GameroomAPIResponse>({
  key: "gameroom",
  default: {
    currentGame: {
      host: {
        host: true,
        move: "",
        name: "",
        online: false,
        ready: false,
      },
      guest: {
        host: false,
        move: "",
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
  },
});
