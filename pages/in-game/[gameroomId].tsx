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
import { useRecoilState } from "recoil";
import { gameroomState } from "@/atoms/gameroomState";
import { playerState } from "@/atoms/playerState";
import { useCurrentGame } from "@/lib/hooks";
export default function InGame() {
  const params = useParams();
  const gameRoomId = params?.gameroomId;
  const [selected, setSelected] = useState<"piedra" | "papel" | "tijera" | null>(null);
  const [player, _] = useRecoilState(playerState);
  const { data, isLoading, error } = useCurrentGame(String(gameRoomId));
  if(isLoading) return null;
  if(error) return null;
  // const [gameroom, setGameroom] = useRecoilState(gameroomState);
  const handleSetMove = (move: "piedra" | "papel" | "tijera") => {
    setSelected(move);
    setMove(String(gameRoomId), move);
  }
  useEffect(()=>{
    player && setReady(String(gameRoomId))
      .then((response)=>{
        console.log(response);
      })
      .catch(() => console.error("No se actaulizó"));
  },[]);
  useEffect(()=>{
    if(data.currentGame.host.move != "" && data.currentGame.guest.move != "") {
      Router.push(`/fight/${gameRoomId}`)
    }
  },[data.currentGame]);
  // useEffect(()=>{
  //   if(gameRoomId && selected) {
  //     const timeout = setTimeout(()=>{
  //       Router.push(`/fight/${gameRoomId}`)
  //     }, 4000)
  //     return () => clearTimeout(timeout)
  //   }
  // }, [selected]);
  return (
    <main className={styles["in-game-page"]}>
      <Timer/>
      <div className={styles["moves-container"]}>
        <Move size="big" move="piedra" selected={selected} onClick={()=>handleSetMove("piedra")}/>
        <Move size="big" move="papel" selected={selected} onClick={()=>handleSetMove("papel")}/>
        <Move size="big" move="tijera" selected={selected} onClick={()=>handleSetMove("tijera")}/>
      </div>
    </main>
  )
}
