import styles from "./buttons.module.css";
export function Button(props:ButtonProps) {
    const handleClick = () => {
        setTimeout(()=>{
            props.onClick && props.onClick();
        }, 600)
        
    }
    return <button className={`${styles["button"]} ${styles[props.color ? props.color : ""]}`} onClick={handleClick}>{props.children}</button>
}