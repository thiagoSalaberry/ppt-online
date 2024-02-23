import { useEffect, useRef, useState } from "react";
import styles from "./text-fields.module.css";
export function TextField(props:TextFieldProps) {
    const [value, setValue] = useState<boolean>(false);
    const handleChange = () => {
        if(props.compRef.current?.value === "" && props.type == "number") {
            setValue(false);
        } else {
            setValue(true);
        }
    };
    const handleSubmit = () => {
        if(props.onSubmit && props.compRef.current) props.onSubmit(props.compRef.current?.value);
    }
    return (
        <div className={styles["input-container"]}>
            <label className={styles["input-label"]} htmlFor={props.name}>{props.label}</label>
            <input className={`${styles["input"]} ${value ? styles["valued"] : ""}`} ref={props.compRef} type={props.type} name={props.name} id="" placeholder={props.placeholder} onChange={handleChange} required={props.required} onSubmit={handleSubmit}/>
        </div>
    );
}