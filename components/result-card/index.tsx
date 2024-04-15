import styles from "./result-card.module.css";
import { TextComp } from "@/ui/texts";
import { DoorOpenIcon } from "@/ui/icons/door-open";
import { DoorClosedIcon } from "@/ui/icons/door-closed";
import Router from "next/router";
export function ResultCard(props:ResultCardProps) {
    const translation = {
        me: "GANASTE",
        rival: "PERDISTE",
        draw: "EMPATE"
    }
    return (
        <div className={styles["result-card"]}>
            <div className={styles["img-container"]}>
                <img src={`/${props.result}.png`} alt="result.png" className={styles["img"]}/>
            </div>
            <div className={`${styles["result-label-container"]} ${styles[props.result]}`}>
                <p className={styles["result-label"]}>{translation[props.result]}</p>
            </div>
        </div>
    )
}