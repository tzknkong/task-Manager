import { Component } from "react";
import "./TaskList.css";

interface TaskData {
    title: string;
    dueDate: string;
    category: string;
}

interface IProps {
    data?: TaskData[];
    callBack: (value: any) => string;
}

export default function TaskList(IProps: any) {
    const { data } = IProps;

    if (!data || data.length === 0) {
        return <div>No tasks available.</div>;
    }
    return (
        <>
            <tr>
                <td>{data.title}</td>
                <td>{data.dueDate}</td>
                <td>{data.category}</td>
                <td>
                    <button type="submit" className="delbtn" onClick={(e) => IProps.callBack(data.id)}>
                        Delete
                    </button>
                </td>
            </tr>
        </>
    );
}
