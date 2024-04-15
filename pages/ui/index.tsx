import styles from "./page.module.css";
import { Button } from "@/ui/buttons";
import { Timer } from "@/components/timer";
import { TextField } from "@/ui/text-fields";
import { Move } from "@/components/move";
import { useState } from "react";
import { WaitingComp } from "@/components/waiting.tsx";
export default function UIPage() {
  const [turn, setTurn] = useState<"X" | "O">("X");
  const [selected, setSelected] = useState<{
    0: "X" | "O" | null,
    1: "X" | "O" | null,
    2: "X" | "O" | null,
    3: "X" | "O" | null,
    4: "X" | "O" | null,
    5: "X" | "O" | null,
    6: "X" | "O" | null,
    7: "X" | "O" | null,
    8: "X" | "O" | null,
  }>({
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
  });
  const tablero = [
    [0,0,0],
    [0,0,0],
    [0,0,0],
  ];
  const handleClick = (tile: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8, who: "X" | "O") => {
    if(selected[tile] !== null) return;
    setSelected({
      ...selected,
      [tile]: who
    });
    setTurn(who == "X" ? "O" : "X");
  };
  const trues = Object.entries(selected).filter(([key, value]) => {
    return value !== null;
  }).map(celda => celda[0]);
  return (
    <main className={styles["ui-page"]}>
      <div className={styles["tablero"]}>
        {tablero.map((row, rowIndex) => {
          return (
            <div className={styles["row"]} key={rowIndex}>
              {row.map((_, index) => {
                const coord = rowIndex == 0 ? index : rowIndex == 1 ? index + 3 : index + 6;
                return (
                  <div 
                    className={`${styles["tile"]}`}
                    key={index}
                    onClick={()=>{handleClick(coord as any, turn)}}
                    //@ts-ignore
                  >{selected[coord] ? selected[coord] : ""}</div>
                )
              })}
            </div>
          )
        })}
      </div>
      <p>Turno de: {turn}</p>
      <p>Seleccionados: {trues}</p>
    </main>
  )
}  