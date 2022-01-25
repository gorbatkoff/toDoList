import { useState } from "react/cjs/react.development";
import Task from "./Task";

const TaskList = ({currentTasks, changeTask, getDone, deleteTask}) => {

    return (
        currentTasks.map(task => <Task 
            task={task}
            key={task.id}
            changeTask={changeTask}
            deleteTask={deleteTask}
            getDone={getDone}
        />)
    );
}

export default TaskList;