import styles from "./gameroom-card.module.css";
import { TextComp } from "@/ui/texts";
import { DoorOpenIcon } from "@/ui/icons/door-open";
import { DoorClosedIcon } from "@/ui/icons/door-closed";
import Router from "next/router";
import { joinRoom } from "@/lib/api-calls";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
export function GameroomCard(props:GameroomCardProps) {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleErrorClick = () => {
        setError(true);
        setTimeout(() => {
            setError(false);
        }, 2000);
    };
    const handleJoinRoom = async () => {
        if (loading) return;
        setLoading(true);
        const apiCall = await joinRoom(Number(props.gameroomId), props.requester.id);
        if(apiCall) {
            Router.push(`/lobby/${props.gameroomId}`);
        } else {
            console.log("Ocurrió un error ingresando a la sala")
        }
    }
    return (
        <div className={styles["gameroom-card"]}>
            <div className={styles["gameroom"]}><TextComp size="20px" tag="p" weight="700">SALA: {props.gameroomId}</TextComp></div>
            <div className={styles["host"]}><TextComp size="20px" tag="p" weight="700">HOST: {props.players?.host?.name}</TextComp></div>
            <button
                className={`${styles["button"]} ${!props.full ? styles["full"] : ""}`}
                onClick={props.full ? handleJoinRoom : handleErrorClick}
            >{loading ? <CircularProgress color="inherit"/> : props.full ? <DoorOpenIcon size="36"/> : <DoorClosedIcon size="36"/>}</button>
            {error && <p className={styles["error-message"]}>La sala está llena</p>}            
        </div>
    )
}