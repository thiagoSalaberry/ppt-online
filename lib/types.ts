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
  color: "white" | "black";
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
    pin: number;
  };
};
type IconsProps = {
  size: string;
};
type ResultCardProps = {
  winner: "host" | "guest" | "draw";
  img: "win" | "loss" | "draw";
};

//API
type PlayerAPIResponse = {
  playerData: {
    name: string;
    pin: number;
  };
  playerId: string;
};
type shortRoomIdAPIResponse = {
  shortRoomId: number;
};
type GameroomAPIResponse = {
  currentGame: {
    hostId: {
      host: boolean;
      move: null;
      name: string;
      online: boolean;
      ready: boolean;
    };
    guestId: {
      host: boolean;
      move: null;
      name: string;
      online: boolean;
      ready: boolean;
    };
  };
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
