import styles from "./buttons.module.css";
import { WaitingComp } from "@/components/waiting.tsx";
export function Button(props:ButtonProps) {
    const handleClick = () => {
        setTimeout(()=>{
            props.onClick && props.onClick();
        }, 400)
        
    }
    return <button
                type={props.type}
                className={`${styles["button"]} ${styles[props.color ? props.color : ""]} ${props.submitting ? styles["submitting"] : ""}`}
                onClick={handleClick}
                >{!props.submitting ? props.children : <WaitingComp type="dots" color="white"/>}</button>
}