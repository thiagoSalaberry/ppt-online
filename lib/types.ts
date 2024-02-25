type ButtonProps = {
  color?: string;
  children: string;
  onClick?: Function;
  type: "submit" | "button";
};
type TextFieldProps = {
  type: "text" | "number" | "email";
  name: string;
  placeholder?: string;
  label: string;
  required?: boolean;
  onSubmit?: (input: string | number) => void;
  compRef: React.RefObject<HTMLInputElement>;
};
type MoveProps = {
  move: "piedra" | "papel" | "tijera";
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
  connected: boolean;
  type: "lines" | "dots";
};
type GameroomCardProps = {
  gameroomId: string;
  players: {
    host: { name: string; id: string };
    guest: { name: string; id: string };
  };
  full: boolean;
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
