import { Button } from "@/ui/buttons";
import { TextField } from "@/ui/text-fields";
import { Move } from "@/components/move";
import { TextComp } from "@/ui/texts";
import styles from "./lobby.module.css";
import React, { useRef, useState } from "react";
import Router from "next/router";
import { useParams } from "next/navigation";
import { WaitingComp } from "@/components/waiting.tsx";
export default function Lobby() {
  const params = useParams();
  const gameRoomId = String(params.gameroomId);
  const [host, setHost] = useState<{connected: boolean, ready:boolean, name:string, wins:number}>({connected: true, ready: false, name: "Thiago", wins: 1});
  const [guest, setGuest] = useState<{connected: boolean, ready:boolean, name:string, wins:number}>({connected: false, ready: false, name: "Samay", wins: 3});
  return (
    <main className={styles["lobby-page"]}>
        <header className={styles["lobby-header"]}>
            <div className={styles["lobby-players"]}>
                <span className={styles["player"]}>{host.connected ? (<><WaitingComp connected={host.connected}/><TextComp tag="p" weight="bold">{host.name}: {host.wins.toString()}</TextComp></>) : (<><WaitingComp connected={host.connected}/><TextComp tag="p" weight="bold">{host.name}: {host.wins.toString()}</TextComp></>)}</span>
                <span className={styles["player"]}>{guest.connected ? (<><WaitingComp connected={guest.connected}/><TextComp tag="p" weight="bold" color="#FF6442">{guest.name}: {guest.wins.toString()}</TextComp></>) : (<><WaitingComp connected={guest.connected}/><TextComp tag="p" weight="bold" color="#FF6442">Guest: 0</TextComp></>)}</span>
            </div>
            <div className={styles["lobby-info"]}>
                <TextComp tag="p" weight="bold">Sala</TextComp>
                <TextComp tag="p">{gameRoomId ? gameRoomId : ""}</TextComp>
            </div>
        </header>
        <section className={styles["lobby-content"]}>
          {host.connected && guest.connected && !host.ready ? (
            <>
              <TextComp tag="p" align="center">Presioná jugar y elegí: piedra, papel ó tijera antes de que pasen 3 segundos.</TextComp>
              <Button onClick={()=>setHost({...host, ready: true})}>¡Jugar!</Button>
            </>
          ) : host.connected && host.ready ? (
            <>
              <TextComp tag="p" size="28px">Esperando a que <span style={{fontWeight: "bold"}}>{guest.name}</span> presione ¡Jugar!...</TextComp>
            </>
          ) : (
            <>
              <TextComp tag="p">Compartí el código:</TextComp>
              <TextComp tag="p" weight="bold" size="28px">{gameRoomId ? gameRoomId : ""}</TextComp>
              <TextComp tag="p">Con tu contrincante</TextComp>
            </>
          )}
        </section>
        <footer className={styles["footer"]}>
            <Move move="piedra" selected={null}/>
            <Move move="papel" selected={null}/>
            <Move move="tijera" selected={null}/>
      </footer>
    </main>
  )
}
