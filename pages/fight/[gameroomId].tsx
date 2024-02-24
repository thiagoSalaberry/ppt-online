import { Button } from "@/ui/buttons";
import { TextField } from "@/ui/text-fields";
import { Move } from "@/components/move";
import { TextComp } from "@/ui/texts";
import styles from "./fight.module.css";
import React, { useRef, useState } from "react";
import Router from "next/router";
import { ResultCard } from "@/components/result-card";
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
      {<ResultCard winner="host" img="win"/>}
      <div className={styles["score"]}>
        <h2>HISTORIAL</h2>
        <p className={styles["result-option"]}>Rival: <span className={styles["bold"]}>0</span></p>
        <p className={styles["result-option"]}>Yo: <span className={styles["bold"]}>0</span></p>
        <p className={styles["result-option"]}>Empates: <span className={styles["bold"]}>0</span></p>
      </div>
      <Button color="black">Volver a jugar</Button>
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
