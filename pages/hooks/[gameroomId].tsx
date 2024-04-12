import styles from "./hooks.module.css";
import React, { useEffect, useRef, useState } from "react";
import { useCurrentGame } from "@/lib/hooks";
import { useParams } from "next/navigation";
import LobbyHeader from "@/components/lobby-header";
export default function Hooks() {
  const {data, isLoading, error} = useCurrentGame("691633");
  if(error) return <div>Error al usar el hook</div>
  if(isLoading) return <div>Cargando...</div>
  const { currentGame, history, shortRoomId, players, gameroomId} = data;
  return (
    <main className={styles["hooks-page"]}>
      <LobbyHeader
        currentGame={
          {
            host: {name: currentGame.host.name, online: currentGame.host.online},
            guest: {name: currentGame.guest.name, online: currentGame.guest.online}
          }
        }
        history={history}
        shortRoomId={shortRoomId}
      />
    </main>
  )
}
