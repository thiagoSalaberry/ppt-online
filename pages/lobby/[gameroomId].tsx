import styles from "./lobby.module.css";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { joinRoom, searchGameroom } from "@/lib/api-calls";
import { useRoom } from "@/lib/hooks";
import LobbyContent from "./lobby-content";
import { useRecoilState } from "recoil";
import { playerState } from "@/atoms/playerState";
import { gameroomState } from "@/atoms/currentGameState";
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
  const gameRoomId = params?.gameroomId!;
  const [loading, setLoading] = useState<boolean>(false);
  const [gameroom, setGameroom] = useRecoilState(gameroomState);
  const [player, setPlayer] = useRecoilState<PlayerData>(playerState);
  const [pageContent, setPageContent] = useState<number>(0);
  const room = useRoom(String(gameRoomId));
  // useEffect(()=>{
  //   if(player && gameroom) {
  //     joinRoom(Number(gameRoomId), player?.name, player?.pin)
  //       .then((res:string) => {
  //         setLoading(false);
  //         setPageContent(2);
  //       })
  //       .catch(() => {
  //         setLoading(false);
  //         setPageContent(1)
  //       })
  //   }
  // }, [player]);
  return (
    <main className={styles["lobby-page"]}>
      {loading ? (
          <CircularProgress color="inherit"/>
        ) : (
          <LobbyContent gameroom={gameroom!} gameroomId={String(gameRoomId)} index={pageContent} player={player!} room={room}/>
        )}
    </main>
  )
}