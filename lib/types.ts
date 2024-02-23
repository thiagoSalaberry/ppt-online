type ButtonProps = {
  color?: string;
  children: string;
  onClick?: Function;
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
};
