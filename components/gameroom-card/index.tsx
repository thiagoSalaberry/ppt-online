import styles from "./gameroom-card.module.css";
import { TextComp } from "@/ui/texts";
import { DoorOpenIcon } from "@/ui/icons/door-open";
import { DoorClosedIcon } from "@/ui/icons/door-closed";
import Router from "next/router";
export function GameroomCard(props:GameroomCardProps) {
    return (
        <div className={styles["gameroom-card"]}>
            <div className={styles["gameroom"]}><TextComp size="20px" tag="p" weight="700">SALA: {props.gameroomId}</TextComp></div>
            <div className={styles["host"]}><TextComp size="20px" tag="p" weight="700">HOST: {props.players.host.name}</TextComp></div>
            <button className={`${styles["button"]} ${props.full ? styles["full"] : ""}`} onClick={()=>Router.push(`/lobby/${props.gameroomId}`)}>{props.full ? <DoorClosedIcon size="36"/> : <DoorOpenIcon size="36"/>}</button>
        </div>
    )
}