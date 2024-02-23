import styles from "./buttons.module.css";
export function Button(props:ButtonProps) {
    const handleClick = () => {
        props.onClick && props.onClick();
    }
    return <button className={`${styles["button"]} ${styles[props.color ? props.color : ""]}`} onClick={handleClick}>{props.children}</button>
}