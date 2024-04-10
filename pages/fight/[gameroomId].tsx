import { Button } from "@/ui/buttons";
import { TextField } from "@/ui/text-fields";
import { Move } from "@/components/move";
import { TextComp } from "@/ui/texts";
import styles from "./fight.module.css";
import React, { useEffect, useRef, useState } from "react";
import Router from "next/router";
import { ResultCard } from "@/components/result-card";
import { useParams } from "next/navigation";
import { WaitingComp } from "@/components/waiting.tsx";
import { Timer } from "@/components/timer";
import { usePlayer } from "@/lib/api-calls";
import { useRoom } from "@/lib/hooks";
import { setWinner } from "@/lib/determineWinner";
export default function Fight() {
  const params = useParams();
  const gameRoomId = params?.gameroomId;
  const [player, setPlayer] = useState<PlayerAPIResponse>();
  const [rivalMove, setRivalMove] = useState<"piedra" | "papel" | "tijera">();
  const [myMove, setMy] = useState<"piedra" | "papel" | "tijera">();
  const [result, setResult] = useState<"host" | "guest" | "draw">();
  const room = useRoom(String(gameRoomId));
  const me = room && Object.values(room.players).find(p => p.id === player?.playerId);
  const rival = room && Object.values(room.players).find(p => p.id !== player?.playerId);
  useEffect(()=>{
    setTimeout(() => {
      const winner = setWinner(Object.values(room.currentGame).find(player => player.host)?.move!, Object.values(room.currentGame).find(player => !player.host)?.move!);
      setResult(winner);
    }, 2000);
  }, [])
  useEffect(()=>{
    usePlayer().then((p:PlayerAPIResponse) => setPlayer(p));
  }, []);
  const display:JSX.Element = (
    <div className={styles["result"]}>
      {result ? <ResultCard winner={result} img="win"/> : null}
      <div className={styles["score"]}>
        <h2>HISTORIAL</h2>
        <p className={styles["result-option"]}>Rival: <span className={styles["bold"]}>0</span></p>
        <p className={styles["result-option"]}>Yo: <span className={styles["bold"]}>0</span></p>
        <p className={styles["result-option"]}>Empates: <span className={styles["bold"]}>0</span></p>
      </div>
      <Button type="button" color="black" onClick={()=>Router.push(`/lobby/${gameRoomId}`)}>Volver a jugar</Button>
    </div>
  );
  console.log("Esto viene de /fight",room);
  console.log("Mi movimiento", room.currentGame[me!.id].move)
  console.log("Movimiento del rival", room.currentGame[rival!.id].move);
  return (
    <main className={styles["fight-page"]}>
      {room && player ? (
        <>
          <div className={styles["rival-move"]}>
            <Move move={room && room.currentGame[rival!.id].move} size="big"/>
          </div>
          <div className={styles["my-move"]}>
            <Move move={room && room.currentGame[me!.id].move} size="big"/>
          </div>
        </>
      ) : null}
      {result ? display : null}
    </main>
  )
}
