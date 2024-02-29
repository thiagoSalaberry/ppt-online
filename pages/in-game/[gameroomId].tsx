import { Button } from "@/ui/buttons";
import { TextField } from "@/ui/text-fields";
import { Move } from "@/components/move";
import { TextComp } from "@/ui/texts";
import styles from "./in-game.module.css";
import React, { useEffect, useRef, useState } from "react";
import Router from "next/router";
import { useParams } from "next/navigation";
import { WaitingComp } from "@/components/waiting.tsx";
import { Timer } from "@/components/timer";
import { setReady, usePlayer, setMove } from "@/lib/api-calls";
export default function InGame() {
  const params = useParams();
  const gameRoomId = params?.gameroomId;
  const [selected, setSelected] = useState<"piedra" | "papel" | "tijera" | null>(null);
  const [player, setPlayer] = useState<PlayerAPIResponse>();
  useEffect(()=>{
    usePlayer().then((p:PlayerAPIResponse) => setPlayer(p));
  }, []);
  useEffect(()=>{
    player && setReady(String(gameRoomId), player.playerId)
      .then((response)=>console.log(response))
      .catch(() => console.error("No se actaulizó"))
  },[selected]);
  const handleSelect = (move:"piedra" | "papel" | "tijera") => {
    setSelected(move);
    setMove(String(gameRoomId), String(player!.playerId), move);
  }
  return (
    <main className={styles["in-game-page"]}>
      <Timer/>
      <div className={styles["moves-container"]}>
        <Move size="big" move="piedra" selected={selected} onClick={handleSelect}/>
        <Move size="big" move="papel" selected={selected} onClick={handleSelect}/>
        <Move size="big" move="tijera" selected={selected} onClick={handleSelect}/>
      </div>
    </main>
  )
}
