type ButtonProps = {
  type: "submit" | "button";
  color?: string;
  children: string;
  submitting?: boolean;
  onClick?: () => void;
};
type TextFieldProps = {
  type: "text" | "number";
  name: string;
  id: string;
  label: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  missing?: boolean;
  onChange?: (value: string) => void;
};
type MoveProps = {
  move: "piedra" | "papel" | "tijera" | null;
  selected?: "piedra" | "papel" | "tijera" | null;
  onClick?: (move: "piedra" | "papel" | "tijera") => void;
  size: "small" | "big";
  className?: string;
};
type TextProps = {
  tag: "h1" | "h2" | "label" | "p";
  size?: string;
  weight?: string;
  color?: string;
  children: any;
  height?: string;
  align?: "left" | "center" | "right";
};
type WaitingProps = {
  type: "lines" | "dots";
  connected?: boolean;
  color?: "white" | "black";
};
type GameroomCardProps = {
  gameroomId: string;
  players: {
    host: { name: string; id: string };
    guest: { name: string; id: string };
  };
  full: boolean;
  requester: {
    name: string;
    id: string;
  };
};
type IconsProps = {
  size: string;
};
type ResultCardProps = {
  result: "me" | "rival" | "draw";
};
type LobbyHeaderProps = {
  shortRoomId: string;
  currentGame: {
    host: {
      name: string;
      online: boolean;
    };
    guest: {
      name: string;
      online: boolean;
    };
  };
  history: {
    hostWins: number;
    guestWins: number;
  };
};
//API
type PlayerModelResponse = {
  status: 0 | 1 | 2;
  message: string;
  player?: PlayerData;
};
type PlayerAPIResponse = {
  message: string;
  playerData: PlayerData;
};
type shortRoomIdAPIResponse = {
  shortRoomId: number;
};
type GameroomAPIResponse = {
  currentGame: CurrentGame;
  gameroomId: string;
  history: {
    draws: number;
    guestWins: number;
    hostWins: number;
  };
  players: {
    guest: {
      id: string;
      name: string;
    };
    host: {
      id: string;
      name: string;
    };
  };
  shortRoomId: number;
};
type CurrentGame = {
  host: {
    host: true;
    name: string;
    online: boolean;
    ready: boolean;
    move: "piedra" | "papel" | "tijera" | "";
  };
  guest: {
    host: false;
    name: string;
    online: boolean;
    ready: boolean;
    move: "piedra" | "papel" | "tijera" | "";
  };
};
