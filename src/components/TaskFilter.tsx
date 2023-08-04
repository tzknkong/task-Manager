import React from "react";
import style from "./TaskFilter.module.css";
import { useController, RegisterOptions } from "react-hook-form";
import categories from "../categories";

interface SelectInputProps {
    name: string;
    control: any;
    defaultValue: any;
    rules: RegisterOptions; // Define the type for the rules prop
}

const TaskFilter: React.FC<SelectInputProps> = ({ name, control, defaultValue, rules }) => {
    const {
        field: { value, onChange, onBlur },
        fieldState: { error },
    } = useController({ name, control, defaultValue, rules });

    return (
        <div>
            <select id={name} className={style.form_select} value={value} onChange={onChange} onBlur={onBlur}>
                <option value=""></option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
            {error && <span>{error.message}</span>}
        </div>
    );
};

export default TaskFilter;
