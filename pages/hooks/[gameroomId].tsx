import { Button } from "@/ui/buttons";
import styles from "./hooks.module.css";
import React, { useEffect, useRef, useState } from "react";
import { Move } from "@/components/move";
import { Header } from "@/components/header";
import Router from "next/router";
import useSWRMutation from "swr/mutation";
import { useJSONPlaceholder, useRoom } from "@/lib/hooks";
import { useParams } from "next/navigation";
export default function Home() {
  const params = useParams();
  const gameRoomId = params?.gameroomId;
  const room = useRoom(gameRoomId ? String(gameRoomId) : "");
  const hostId = room?.players?.host.id
  const guestId = room?.players?.guest.id
  return (
    <main className={styles["hooks-page"]}>
      <Header/>
      <section className={styles["current-game"]}>
        <div className={styles["host"]}>
          <h3 className={styles["player-name"]}>{room?.players.host.name}</h3>
          <p className={styles["player-status"]}>{room?.currentGame[hostId].online ? "Online" : "Offline"}</p>
          <div className={styles["player-move"]}>
            {room?.currentGame[hostId].move && room.currentGame[room.players.host.id].online ? <Move size="small" move={room?.currentGame[hostId].move}></Move> : null}
          </div>
        </div>
        {room?.currentGame[guestId] ? (
          <div className={styles["guest"]}>
            <h3 className={styles["player-name"]}>{room?.players.guest.name}</h3>
            <p className={styles["player-status"]}>{room?.currentGame[guestId].online ? "Online" : "Offline"}</p>
            <div className={styles["player-move"]}>
              {room?.currentGame[guestId].move && room?.currentGame[guestId].online ? <Move size="small" move={room?.currentGame[guestId].move}></Move> : null}
            </div>
          </div>
        ) : null}
      </section>
    </main>
  )
}
