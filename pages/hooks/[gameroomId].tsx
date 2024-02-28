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
export default function Home() {
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
      <Header/>
      <section className={styles["current-game"]}>
        <div className={styles["host"]}>
          <h3 className={styles["player-name"]}>{room?.players.host.name}</h3>
          <p className={styles["player-status"]}>{<WaitingComp type="lines" connected={room?.currentGame[hostId].online}/>}</p>
          <div className={styles["player-move"]}>
            {room?.currentGame[hostId].move && room.currentGame[room.players.host.id].online ? <Move size="small" move={room?.currentGame[hostId].move}></Move> : null}
          </div>
          <Button type="button" color="black" onClick={()=>handleSetReady("host")}>¡Jugar!</Button>
        </div>
        {room?.currentGame[guestId] ? (
          <div className={styles["guest"]}>
            <h3 className={styles["player-name"]}>{room?.players.guest.name}</h3>
            <p className={styles["player-status"]}>{<WaitingComp type="lines" connected={room.currentGame[guestId].online}/>}</p>
            <div className={styles["player-move"]}>
              {room?.currentGame[guestId].move && room?.currentGame[guestId].online ? <Move size="small" move={room?.currentGame[guestId].move}></Move> : null}
            </div>
            <Button type="button" color="black" onClick={()=>handleSetReady("guest")}>¡Jugar!</Button>
          </div>
        ) : null}
      </section>
      <div>
        <div>
          <h3>Thiago: {room?.currentGame[hostId].ready ? "¡Está listo!" : "Le cuesta una banda"}</h3>
          <div>
            <Button type="submit" onClick={()=>handleSetMove("host", "piedra")}>Piedra</Button>
            <Button type="submit" onClick={()=>handleSetMove("host", "papel")}>Papel</Button>
            <Button type="submit" onClick={()=>handleSetMove("host", "tijera")}>Tijera</Button>
          </div>
        </div>
        <div>
          <h3>Franco: {room?.currentGame[guestId].ready ? "¡Está listo!" : "Le cuesta una banda"}</h3>
          <div>
            <Button type="submit" onClick={()=>handleSetMove("guest", "piedra")}>Piedra</Button>
            <Button type="submit" onClick={()=>handleSetMove("guest", "papel")}>Papel</Button>
            <Button type="submit" onClick={()=>handleSetMove("guest", "tijera")}>Tijera</Button>
          </div>
        </div>
      </div>
    </main>
  )
}
