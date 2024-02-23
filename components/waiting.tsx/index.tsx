import styles from "./waiting.module.css";
export function WaitingComp(props:WaitingProps) {
    return (
        <div className={styles["lines-container"]}>
            <div className={`${styles["line"]} ${props.connected ? styles["connected"] : ""}`}></div>
            <div className={`${styles["line"]} ${props.connected ? styles["connected"] : ""}`}></div>
            <div className={`${styles["line"]} ${props.connected ? styles["connected"] : ""}`}></div>
            <div className={`${styles["line"]} ${props.connected ? styles["connected"] : ""}`}></div>
        </div>
    )
}