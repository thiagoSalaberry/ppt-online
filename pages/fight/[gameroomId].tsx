import { Button } from "@/ui/buttons";
import { TextField } from "@/ui/text-fields";
import { Move } from "@/components/move";
import { TextComp } from "@/ui/texts";
import styles from "./fight.module.css";
import React, { useRef, useState } from "react";
import Router from "next/router";
import { useParams } from "next/navigation";
import { WaitingComp } from "@/components/waiting.tsx";
import { Timer } from "@/components/timer";
export default function Fight() {
  const params = useParams();
  const gameRoomId = params?.gameroomId;
  const [rival, setRival] = useState<"piedra" | "papel" | "tijera">();
  const [my, setMy] = useState<"piedra" | "papel" | "tijera">();
  const [result, setResult] = useState<"host" | "guest" | "draw">();
  const display:JSX.Element = (
    <div className={styles["result"]}>
      <h2>Ganaste | Perdiste | Empate</h2>
      <div className={styles["score"]}>
        <h2>Score</h2>
        <p>Rival: 0</p>
        <p>Yo: 0</p>
      </div>
      <Button>Volver a jugar</Button>
    </div>
  )
  return (
    <main className={styles["fight-page"]}>
      <div className={styles["rival-move"]}>
        <Move move={rival || "tijera"} size="big"/>
      </div>
      <div className={styles["my-move"]}>
        <Move move={my || "piedra"} size="big"/>
      </div>
      {!result ? display : null}
    </main>
  )
}
