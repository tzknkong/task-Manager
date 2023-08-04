import React, { Component } from "react";
import { useForm, Controller } from "react-hook-form";
import style from "./TaskForm.module.css";
import TaskFilter from "./TaskFilter";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import categories from "../categories";

const schema = z.object({
    title: z.string().min(3, { message: "Title should be at least 3 characters." }).max(50),
    dueDate: z.string().refine(
        (dateString) => {
            const date = new Date(dateString);
            return !isNaN(date.getTime()) && dateString === date.toISOString().slice(0, 10);
        },
        {
            message: "Invalid date. The format should be YYYY-MM-DD.",
        }
    ),
    category: z.enum(categories, {
        errorMap: () => ({ message: "Category is required." }),
    }),
});

type TaskFormData = z.infer<typeof schema>;

interface Props {
    onSubmit: (data: TaskFormData) => void;
}

const TaskForm = ({ onSubmit }: Props) => {
    const {
        handleSubmit,
        register,
        control,
        reset,
        formState: { errors },
    } = useForm<TaskFormData>({ resolver: zodResolver(schema) });

    return (
        <form
            onSubmit={handleSubmit((data) => {
                onSubmit(data);
                reset();
            })}
            className={style.container}
        >
            <div>
                <span>Title</span>
                <input
                    {...register("title", { required: true, maxLength: { value: 50, message: "Max Length 50" }, minLength: { value: 3, message: "Min Length 3" } })}
                    name="title"
                    id="title"
                    type="text"
                    className={style.form_control}
                />
            </div>
            <div>
                <span>Due Date</span>
                <input {...register("dueDate", { required: true })} name="dueDate" id="dueDate" type="date" className={style.form_control} />
            </div>
            <div>
                <span>Category</span>
                <TaskFilter name="category" control={control} defaultValue="" rules={{ required: "This field is required" }} />
            </div>

            <div className={style.flex}>
                <button type="submit" className={style.button}>
                    Submit
                </button>
            </div>
        </form>
    );
};

export default TaskForm;
