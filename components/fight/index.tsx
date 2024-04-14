import styles from "./fight.module.css";
import { TextComp } from "@/ui/texts";
import { DoorOpenIcon } from "@/ui/icons/door-open";
import { DoorClosedIcon } from "@/ui/icons/door-closed";
import Router from "next/router";
import { joinRoom } from "@/lib/api-calls";
import { useEffect, useState } from "react";
export function Fight({gameroomId}: {gameroomId:string}) {
    useEffect(()=>{
        const timer = setTimeout(() => {
            Router.push(`/in-game/${gameroomId}`);
        }, 1500);
        return () => clearTimeout(timer)
    }, [])
    return (
        <div className={styles["gameroom-card"]}>
            <h2>¡A pelear!</h2>
        </div>
    )
}