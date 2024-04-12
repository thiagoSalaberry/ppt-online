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
import { gameroomState } from "@/atoms/currentGameState";
import { playerState } from "@/atoms/playerState";
export default function InGame() {
  // const params = useParams();
  // const gameRoomId = params?.gameroomId;
  // const [selected, setSelected] = useState<"piedra" | "papel" | "tijera" | null>(null);
  // const [player, setPlayer] = useRecoilState(playerState);
  // // const [gameroom, setGameroom] = useRecoilState(gameroomState);
  // // const handleSetMove = (move: "piedra" | "papel" | "tijera") => {
  // //   setMove(String(gameRoomId), player.playerId, move);
  // //   setSelected(move);
  // //   setPlayer
  // // }
  // useEffect(()=>{
  //   player && setReady(String(gameRoomId), player.playerId)
  //     .then((response)=>{
  //       console.log(response);
  //     })
  //     .catch(() => console.error("No se actaulizó"));
  // },[]);
  // useEffect(()=>{
  //   setTimeout(() => {
  //     Router.push(`/fight/${gameRoomId}`)
  //   }, 4000);
  // }, []);
  return (
    <main className={styles["in-game-page"]}>
      {/* <Timer/>
      <div className={styles["moves-container"]}>
        <Move size="big" move="piedra" selected={selected} onClick={()=>{player && setMove(String(gameRoomId), player?.playerId, "piedra"); setSelected("piedra")}}/>
        <Move size="big" move="papel" selected={selected} onClick={()=>{player && setMove(String(gameRoomId), player?.playerId, "papel"); setSelected("papel")}}/>
        <Move size="big" move="tijera" selected={selected} onClick={()=>{player && setMove(String(gameRoomId), player?.playerId, "tijera"); setSelected("tijera")}}/>
      </div> */}
    </main>
  )
}
