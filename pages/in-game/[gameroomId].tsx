import { Button } from "@/ui/buttons";
import { TextField } from "@/ui/text-fields";
import { Move } from "@/components/move";
import { TextComp } from "@/ui/texts";
import styles from "./in-game.module.css";
import React, { useRef, useState } from "react";
import Router from "next/router";
import { useParams } from "next/navigation";
import { WaitingComp } from "@/components/waiting.tsx";
import { Timer } from "@/components/timer";
export default function InGame() {
  const params = useParams();
  const gameRoomId = params?.gameroomId;
  const [host, setHost] = useState<{connected: boolean, ready:boolean, name:string, wins:number}>({connected: true, ready: false, name: "Thiago", wins: 1});
  const [guest, setGuest] = useState<{connected: boolean, ready:boolean, name:string, wins:number}>({connected: false, ready: false, name: "Samay", wins: 3});
  const [selected, setSelected] = useState<"piedra" | "papel" | "tijera" | null>(null);
  return (
    <main className={styles["in-game-page"]}>
      <Timer/>
      <div className={styles["moves-container"]}>
        <Move size="big" move="piedra" selected={selected} onClick={()=>setSelected("piedra")}/>
        <Move size="big" move="papel" selected={selected} onClick={()=>setSelected("papel")}/>
        <Move size="big" move="tijera" selected={selected} onClick={()=>setSelected("tijera")}/>
      </div>
    </main>
  )
}
