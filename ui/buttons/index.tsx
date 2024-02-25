import styles from "./buttons.module.css";
export function Button(props:ButtonProps) {
    const handleClick = () => {
        setTimeout(()=>{
            props.onClick && props.onClick();
        }, 400)
        
    }
    return <button type={props.type} className={`${styles["button"]} ${styles[props.color ? props.color : ""]}`} onClick={handleClick}>{props.children}</button>
}