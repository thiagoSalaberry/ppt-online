type PlayerData = {
  id?: string;
  name: string;
  pin: number;
};

type GameroomData = {
  gameroomId: string;
  players: {
    host: {
      name: string;
      id: string;
    };
    guest: {
      name: string;
      id: string;
    };
  };
  history: {
    hostWins: number;
    guestWins: number;
    draws: number;
  };
  shortRoomId: number;
  currentGame: {
    [x: string]: {
      name: string;
      move: "piedra" | "papel" | "tijera" | null;
      online: boolean;
      host: boolean;
      ready: boolean;
    };
  };
};
