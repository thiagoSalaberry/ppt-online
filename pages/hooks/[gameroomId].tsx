import { Button } from "@/ui/buttons";
import styles from "./hooks.module.css";
import React, { useEffect, useRef, useState } from "react";
import { Move } from "@/components/move";
import { Header } from "@/components/header";
import Router from "next/router";
import { WaitingComp } from "@/components/waiting.tsx";
import useSWRMutation from "swr/mutation";
import { useJSONPlaceholder, useRoom } from "@/lib/hooks";
import { useParams } from "next/navigation";
import { setMove, setReady } from "@/lib/api-calls";
export default function Hooks() {
  const params = useParams();
  const gameRoomId = params?.gameroomId;
  const room = useRoom(gameRoomId ? String(gameRoomId) : "");
  const hostId = room?.players?.host.id
  const guestId = room?.players?.guest.id
  console.log(room?.players.host.id)
  const handleSetReady = async (who: "host" | "guest") => {
    const apiCall = await setReady(String(room.shortRoomId), room.players[who].id);
    if(apiCall) console.log(`${room.players[who].name} está listo`)
  };
  const handleSetMove = async (who: "host" | "guest", move: "piedra" | "papel" | "tijera") => {
    const apiCall = await setMove(String(room.shortRoomId), room.players[who].id, move);
    if(apiCall) console.log(`El jugador ${room.players[who].name} eligió ${move}`)
  }
  return (
    <main className={styles["hooks-page"]}>
      
    </main>
  )
}
