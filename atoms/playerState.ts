import { atom } from "recoil";

export const playerState = atom<PlayerData>({
  key: "player",
  default: {
    id: "",
    name: "",
    pin: 0,
  },
});
