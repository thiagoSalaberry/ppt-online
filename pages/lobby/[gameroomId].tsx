import styles from "./lobby.module.css";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { joinRoom, searchGameroom } from "@/lib/api-calls";
import { useCurrentGame, useRoom } from "@/lib/hooks";
import LobbyContent from "./lobby-content";
import { useRecoilState, useRecoilValue } from "recoil";
import { playerState } from "@/atoms/playerState";
import { gameroomState } from "@/atoms/currentGameState";
import LobbyHeader from "@/components/lobby-header";
/*
  Este componente representa la página del lobby. En este, debo obtener los datos de la gameroom correspondiente a través del shortRoomId
  En el header debo poner el shortRoomId, el nombre del host, si está conectado y sus victorias. Lo mismo con el guest.
  En el contenido de la página tengo 4 instancias:
    - Cuando el host crea la sala y el guest todavía no se ha unido (0: Compartir el shortRoomId con el contrincante)
    - Cuando el guest ingresa a la sala (1: Instrucciones y botón de ¡Jugar!)
    - Cuando yo ya apreté ¡Jugar! pero mi rival todavía no (2: Esperando a que el rival presiones ¡Jugar!)
    - Cuando ambos apretamos ¡Jugar! y estamos listos (3: ¡A pelear!)
  Para todo esto, debo estar constantemente escuchando a la gameroom.currentGame en firebase a través del hook useCurrentGame(shortRoomId)
  De esta forma, del hook voy a estar obteniendo los datos necesarios actualizados mediante SWR
 */
export default function Lobby() {
  const params = useParams();
  const paramsId = params?.gameroomId!;
  const { data, isLoading, error } = useCurrentGame(String(paramsId));
  const [pageContent, setPageContet] = useState<number>(0);
  const player = useRecoilValue(playerState);
  if(isLoading) return (
    <main className={styles["lobby-page"]}>
      <CircularProgress />
    </main>
  );
  if(error) return (
    <main className={styles["lobby-page"]}>
      <div>Error</div>
    </main>
  );
  const { shortRoomId, history, currentGame } = data;
  return (
    <main className={styles["lobby-page"]}>
      <LobbyContent
        gameroom={data}
        shortRoomId={shortRoomId.toString()}
        index={pageContent}
        player={player}
      />
    </main>
  )
}