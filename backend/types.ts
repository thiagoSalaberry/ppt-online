type PlayerData = {
  id: string;
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
    host: {
      host: true;
      name: string;
      online: boolean;
      ready: boolean;
      move: "piedra" | "papel" | "tijera" | null;
    };
    guest: {
      host: false;
      name: string;
      online: boolean;
      ready: boolean;
      move: "piedra" | "papel" | "tijera" | null;
    };
  };
};
