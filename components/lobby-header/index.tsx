import styles from "./lobby-header.module.css";
import { WaitingComp } from "../waiting.tsx";
import { TextComp } from "@/ui/texts";
export default function LobbyHeader(props:LobbyHeaderProps) {
    console.log("esto viene del comp:", props)
    return (
        <header className={styles["lobby-header"]}>
            <div className={styles["lobby-players"]}>
                <span
                    className={styles["player"]}
                >{props.currentGame.host.name !== "" ? (
                    <>
                        <WaitingComp type="lines" color="black" connected={props.currentGame.host.online}/>
                        <TextComp tag="p" weight="bold" color="#2b2b2b">{props.currentGame.host.name}: {props.history.hostWins}</TextComp>
                    </>
                    ) : (
                    <>
                        <WaitingComp type="lines" color="black" connected={false}/>
                        <TextComp tag="p" weight="bold" color="#2b2b2b">Host: 0</TextComp>
                    </>
                    )}</span>
                <span
                    className={styles["player"]}
                >{props.currentGame.guest.name !== "" ? (
                    <>
                        <WaitingComp type="lines" color="black" connected={props.currentGame.guest.online}/>
                        <TextComp tag="p" weight="bold" color="#2b2b2b">{props.currentGame.guest.name}: {props.history.guestWins}</TextComp>
                    </>
                    ) : (
                    <>
                        <WaitingComp type="lines" color="black" connected={false}/>
                        <TextComp tag="p" weight="bold" color="#2b2b2b">Guest: 0</TextComp>
                    </>
                    )}</span>
            </div>
            <div className={styles["lobby-info"]}>
                <TextComp tag="p" weight="700" color="#2b2b2b">SALA</TextComp>
                <TextComp tag="p" color="#2b2b2b">{props.shortRoomId}</TextComp>
            </div>
        </header>
    )
}