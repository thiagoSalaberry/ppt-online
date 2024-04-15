import { Button } from "@/ui/buttons";
import { Move } from "@/components/move";
import styles from "./fight.module.css";
import React, { useEffect, useState } from "react";
import Router from "next/router";
import { ResultCard } from "@/components/result-card";
import { useParams } from "next/navigation";
import { determineWinner } from "@/lib/determineWinner";
import { useCurrentGame } from "@/lib/hooks";
import { playerState } from "@/atoms/playerState";
import { gameroomState } from "@/atoms/gameroomState";
import { endGame, pushToHistory } from "@/lib/api-calls";
export default function Fight() {
  const params = useParams();
  const paramsId = params?.gameroomId;
  const [now, setNow] = useState(false);
  const [result, setResult] = useState<"me" | "rival" | "draw">();
  // const player = useRecoilValue<PlayerData>(playerState);
  // const currentGameroom = useRecoilValue(gameroomState);
  const { data, isLoading, error } = useCurrentGame(String(paramsId));
  useEffect(()=>{
    if(!isLoading && !error) {
      const me = Object.values(data.players).find(p => p.id == localStorage.getItem("accessToken")); //reemplazar localhost con player.id
      const rival = Object.values(data.players).find(p => p.id !== localStorage.getItem("accessToken")); //reemplazar localhost con player.id
      const host = Object.values(data.currentGame).find(p => p.host);
      const guest = Object.values(data.currentGame).find(p => !p.host);
      const hostMove = host?.move as "piedra" | "papel" | "tijera";
      const guestMove = guest?.move as "piedra" | "papel" | "tijera";
      const consoleWinner = async () => {
        // const winner = determineWinner(hostMove, guestMove);
        me?.name == host?.name ? await pushToHistory(String(paramsId), determineWinner(hostMove,guestMove)) : null;
        if(determineWinner(hostMove, guestMove) == "draw") {
          return setResult("draw")
        };
        if((me?.name == host?.name && determineWinner(hostMove, guestMove) == "host") || (me?.name == guest?.name && determineWinner(hostMove, guestMove) == "guest")) {
          return setResult("me")
        };
        return setResult("rival")
      };
      consoleWinner();
      const timeout = setTimeout(()=>{
        setNow(true);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [isLoading, error])
  if(isLoading) return null;
  if(error) return <div>Error...</div>;
  
  const me = Object.values(data.players).find(p => p.id == localStorage.getItem("accessToken")); //reemplazar localhost con player.id
  const rival = Object.values(data.players).find(p => p.id !== localStorage.getItem("accessToken"));
  const host = Object.values(data.currentGame).find(p => p.host);
  const guest = Object.values(data.currentGame).find(p => !p.host);
  const myMove = Object.values(data.currentGame).find(p => p.name == me?.name)?.move;
  const rivalMove = Object.values(data.currentGame).find(p => p.name == rival?.name)?.move;
  console.log(me?.name == host?.name ? "Yo soy el host" : "Yo soy el guest")
  const handlePlayAgainClick = async (name:string) => {
    if(name !== host?.name) return Router.push(`/lobby/${data.shortRoomId}`);
    if(name == host.name) {
      await endGame(String(data.shortRoomId));
      Router.push(`/lobby/${data.shortRoomId}`);
    }
  }
  return (
    <main className={styles["fight-page"]}>
      <div className={styles["rival-move"]}>
        <Move move={rivalMove as "piedra" | "papel" | "tijera"} size="big"/>
      </div>
      <div className={styles["my-move"]}>
        <Move move={myMove as "piedra" | "papel" | "tijera"} size="big"/>
      </div>
      {result && now && (
        <div className={styles["result"]}>
          <ResultCard result={result}/>
          <div className={styles["score"]}>
            <h2>HISTORIAL</h2>
            <p className={styles["result-option"]}>{host?.name}: <span className={styles["bold"]}>{data.history.hostWins}</span></p>
            <p className={styles["result-option"]}>{guest?.name}: <span className={styles["bold"]}>{data.history.guestWins}</span></p>
            <p className={styles["result-option"]}>Empates: <span className={styles["bold"]}>{data.history.draws}</span></p>
          </div>
          <Button type="button" color="black" onClick={()=>handlePlayAgainClick(String(me?.name))}>Volver a jugar</Button>
        </div>
      )}
    </main>
  )
}
