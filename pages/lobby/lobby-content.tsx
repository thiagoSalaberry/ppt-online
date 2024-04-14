import styles from "./lobby.module.css";
import { Button } from "@/ui/buttons";
import { Move } from "@/components/move";
import { TextComp } from "@/ui/texts";
import { CircularProgress } from "@mui/material";
import { usePlayer, joinRoom, searchGameroom, setReady } from "@/lib/api-calls";
import { WaitingComp } from "@/components/waiting.tsx";
import { Fight } from "@/components/fight";
import Router from "next/router";
import { useState } from "react";
import LobbyHeader from "@/components/lobby-header";
export default function LobbyContent({shortRoomId, gameroom, player}: {shortRoomId:string, gameroom:GameroomData, player:PlayerData}) {
    const me = gameroom && Object.values(gameroom.currentGame).find(p => p.name === player.name);
    const rival = gameroom && Object.values(gameroom.currentGame).find(p => p.name !== player.name);
    return (
      <>
        <LobbyHeader shortRoomId={shortRoomId} currentGame={gameroom.currentGame} history={gameroom.history}/>
        <section className={styles["lobby-content"]}>
          {me && rival && me.online && !rival.online ? (
            <>
                  <TextComp tag="p">Compartí el código:</TextComp>
                  <TextComp tag="p" weight="bold" size="28px">{shortRoomId}</TextComp>
                  <TextComp tag="p">Con tu contrincante</TextComp>
              </>
          ) : me && rival && me.online && !me.ready && rival.online ? (
              <>
                  <TextComp tag="p" align="center">¡Presioná: <br/><span className={styles["bold"]}>PIEDRA</span>, <span className={styles["bold"]}>PAPEL</span> ó <span className={styles["bold"]}>TIJERA</span><br></br> antes de que pasen 3 segundos!</TextComp>
                  <Button type="button" onClick={()=>{setReady(shortRoomId)}} color="black">¡Jugar!</Button>                    
              </>
          ) : me && rival && me.online && me.ready && rival.online && !rival.ready ? (
              <>
                  <TextComp tag="p" size="28px" align="center">Esperando a que <span style={{fontWeight: "bold"}}>{rival?.name}</span> presione ¡Jugar!<span className={styles["inline-block"]}><WaitingComp type="dots" connected={false}></WaitingComp></span></TextComp>
              </>
          ) : <Fight gameroomId={shortRoomId}/>}
        </section>
        <footer className={styles["footer"]}>
            <Move size="small" move="piedra" selected={null}/>
            <Move size="small" move="papel" selected={null}/>
            <Move size="small" move="tijera" selected={null}/>
        </footer>
      </>
    );
}
