const movesMap = {
  piedra: 1,
  tijera: 2,
  papel: 3,
};

const results = {
  host: [-1, 2],
  draw: [0],
  guest: [-2, 1],
};

export const determineWinner = (
  hostMove: "piedra" | "papel" | "tijera",
  guestMove: "piedra" | "papel" | "tijera"
): "host" | "guest" | "draw" => {
  console.log({ hostMove, guestMove });
  const jugada = movesMap[hostMove] - movesMap[guestMove];
  const result = Object.entries(results).find((r) => r[1].includes(jugada))!;
  console.log("Esto viene de determineWinner", result);
  const winner = result[0];
  return winner as "host" | "guest" | "draw";
};
