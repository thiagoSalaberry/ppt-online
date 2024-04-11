import styles from "./text-fields.module.css";
export function TextField(props:TextFieldProps) {
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        props.onChange && props.onChange(inputValue);
    };
    return (
        <div className={styles["input-container"]}>
            <label className={styles["input-label"]} htmlFor={props.name}>{props.label}</label>
            <input
                className={`${styles["input"]} ${props.value ? styles["valued"] : ""} ${props.missing ? styles["missing"] : ""} ${props.disabled ? styles["disabled"] : ""}`}
                type={props.type}
                value={props.value}
                name={props.name}
                id={props.id}
                placeholder={props.missing ? "Completá este campo" : ""}
                required={props.required}
                onChange={handleChange}
            />
        </div>
    );
}