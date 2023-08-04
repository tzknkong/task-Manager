import { useEffect, useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

interface TaskData {
    id: number;
    title: string;
    dueDate: string;
    category: string;
}

function App() {
    const [listdata, setListData] = useState<TaskData[]>();
    const [counter, setCounter] = useState(0);
    const [hasLoadedFromLocalStorage, setHasLoadedFromLocalStorage] = useState(false);

    useEffect(() => {
        if (!hasLoadedFromLocalStorage) {
            const checkdata = localStorage.getItem("listdata");
            if (checkdata != null) {
                const data = JSON.parse(checkdata);
                setListData(data);
                const maxid = data.reduce((maxId: number, task: any) => Math.max(maxId, task.id), 0);
                setCounter(maxid);
            }
            // console.log("listdata", listdata);
            setHasLoadedFromLocalStorage(true);
        }
    }, [hasLoadedFromLocalStorage]);

    useEffect(() => {
        if (listdata != undefined) localStorage.setItem("listdata", JSON.stringify(listdata));
    }, [listdata]);

    const handleAddTask = (value: any) => {
        if (value != null) {
            if (listdata != null) {
                const filteredListData = listdata.filter((task) => task.title == value.title);

                if (filteredListData.length > 0) {
                    alert("duplicate data");
                    return;
                }
            }
            const newId = counter + 1;
            const newItem = { ...value, id: newId };

            setListData((listdata) => (listdata ? [...listdata, newItem] : [newItem]));
            setCounter(newId);
        }
    };

    const handlecallback = (e: any) => {
        const a = listdata?.filter((item) => item.id !== e);
        setListData(a);
        // localStorage.setItem("listdata", JSON.stringify(listdata));
    };

    return (
        <>
            <TaskForm onSubmit={handleAddTask} />

            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Due Date</th>
                        <th>Category</th>
                        <th></th>
                    </tr>
                </thead>
                {listdata?.map((task, index) => (
                    <TaskList key={index} data={task} callBack={(e: any) => handlecallback(e)} />
                ))}
            </table>
        </>
    );
}

export default App;
