import { atom } from "recoil";

export const playerState = atom({
  key: "player",
  default: {
    playerData: {
      name: "",
      pin: 0,
    },
    playerId: "",
  },
});
