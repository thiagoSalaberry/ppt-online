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
import { useCurrentGame } from "@/lib/hooks";
import { useRecoilValue } from "recoil";
import { playerState } from "@/atoms/playerState";
export default function Fight() {
  const params = useParams();
  const paramsId = params?.gameroomId;
  const { data, isLoading, error } = useCurrentGame(String(paramsId));
  if(isLoading) return null;
  if(error) return <div>Error...</div>
  // const player = useRecoilValue<PlayerData>(playerState);
  const me = Object.values(data.players).find(p => p.id == localStorage.getItem("accessToken"));
  const rival = Object.values(data.players).find(p => p.id !== localStorage.getItem("accessToken"));
  const myMove = Object.values(data.currentGame).find(p => p.name == me?.name)?.move;
  const rivalMove = Object.values(data.currentGame).find(p => p.name == rival?.name)?.move;
  const hostMove = Object.values(data.currentGame).find(p => p.host)!.move as "piedra" | "papel" | "tijera";
  const guestMove = Object.values(data.currentGame).find(p => !p.host)!.move as "piedra" | "papel" | "tijera";
  // const display:JSX.Element = (
  //   <div className={styles["result"]}>
  //     {result ? <ResultCard winner={result} img="win"/> : null}
  //     <div className={styles["score"]}>
  //       <h2>HISTORIAL</h2>
  //       <p className={styles["result-option"]}>Rival: <span className={styles["bold"]}>0</span></p>
  //       <p className={styles["result-option"]}>Yo: <span className={styles["bold"]}>0</span></p>
  //       <p className={styles["result-option"]}>Empates: <span className={styles["bold"]}>0</span></p>
  //     </div>
  //     <Button type="button" color="black" onClick={()=>Router.push(`/lobby/${gameRoomId}`)}>Volver a jugar</Button>
  //   </div>
  // );
  console.log("Yo:", me?.name)
  return (
    <main className={styles["fight-page"]}>
      <div className={styles["rival-move"]}>
        <Move move={rivalMove as "piedra" | "papel" | "tijera"} size="big"/>
      </div>
      <p>Ganador: <span style={{fontWeight: "bold"}}>{setWinner(hostMove, guestMove)}</span></p>
      <div className={styles["my-move"]}>
        <Move move={myMove as "piedra" | "papel" | "tijera"} size="big"/>
      </div>
    </main>
  )
}
