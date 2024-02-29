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
export default function LobbyContent({index, gameroomId, gameroom, room, player}: {index:number, gameroomId:string, gameroom:GameroomData, room:GameroomData, player:PlayerAPIResponse}) {
    const me = gameroom && Object.values(gameroom.players).find(p => p.id === player?.playerId);
    const rival = gameroom && Object.values(gameroom.players).find(p => p.id !== player?.playerId);
    const contentList:JSX.Element[] = [
        (
            <div className={styles["no-gameroom"]}>
              <TextComp tag="p" weight="700" color="#2b2b2b">La sala {gameroomId} no existe.</TextComp>
              <Button type="button" color="black" onClick={()=>Router.push("/search")}>Buscar sala</Button>
            </div>
          ),
          (
            <div className={styles["unauhtorized"]}>
              <TextComp tag="p" weight="700" color="#2b2b2b">No estás autorizado a ingresar a esta sala.</TextComp>
              <Button type="button" color="black" onClick={()=>Router.push("/search")}>Buscar sala</Button>
            </div>
          ),
          (
            <>
              <header className={styles["lobby-header"]}>
                <div className={styles["lobby-players"]}>
                    <span className={styles["player"]}>{gameroom?.players.host ? (<><WaitingComp type="lines" connected={room?.currentGame[gameroom.players.host.id].online}/><TextComp tag="p" weight="bold" color="#2b2b2b">{gameroom?.players.host.name}: {gameroom?.history.hostWins}</TextComp></>) : (<><WaitingComp type="lines" connected={false}/><TextComp tag="p" weight="bold" color="#2b2b2b">Host: 0</TextComp></>)}</span>
                    <span className={styles["player"]}>{gameroom?.players.guest ? (<><WaitingComp type="lines" connected={room?.currentGame[gameroom.players.guest.id].online}/><TextComp tag="p" weight="bold" color="#2b2b2b">{gameroom?.players.guest.name}: {gameroom?.history.guestWins}</TextComp></>) : (<><WaitingComp type="lines" connected={false}/><TextComp tag="p" weight="bold" color="#2b2b2b">Guest: 0</TextComp></>)}</span>
                </div>
                <div className={styles["lobby-info"]}>
                    <TextComp tag="p" weight="700" color="#2b2b2b">SALA</TextComp>
                    <TextComp tag="p" color="#2b2b2b">{gameroomId ? gameroomId : ""}</TextComp>
                </div>
              </header>
              <section className={styles["lobby-content"]}>
                {me && rival && room?.currentGame[me.id].online && !room.currentGame[rival?.id].online ? (
                    <>
                        <TextComp tag="p">Compartí el código:</TextComp>
                        <TextComp tag="p" weight="bold" size="28px">{gameroomId ? gameroomId : ""}</TextComp>
                        <TextComp tag="p">Con tu contrincante</TextComp>
                    </>
                ) : me && rival && room?.currentGame[me.id].online && room.currentGame[rival.id].online && !room?.currentGame[me.id].ready ? (
                    <>
                        <TextComp tag="p" align="center">¡Presioná: <br/><span className={styles["bold"]}>PIEDRA</span>, <span className={styles["bold"]}>PAPEL</span> ó <span className={styles["bold"]}>TIJERA</span><br></br> antes de que pasen 3 segundos!</TextComp>
                        <Button type="button" onClick={()=>{setReady(String(gameroomId), String(player?.playerId))}} color="black">¡Jugar!</Button>                    
                    </>
                ) : me && rival && room?.currentGame[me.id].ready && !room?.currentGame[rival.id].ready ? (
                    <>
                        <TextComp tag="p" size="28px" align="center">Esperando a que <span style={{fontWeight: "bold"}}>{rival?.name}</span> presione ¡Jugar!<span className={styles["inline-block"]}><WaitingComp type="dots" connected={false}></WaitingComp></span></TextComp>
                    </>
                ) : <Fight gameroomId={gameroomId}/>}
              </section>
              <footer className={styles["footer"]}>
                  <Move size="small" move="piedra" selected={null}/>
                  <Move size="small" move="papel" selected={null}/>
                  <Move size="small" move="tijera" selected={null}/>
              </footer>
            </>
          ),
    ]
    return contentList[index];
}
