import { useState } from "react/cjs/react.development";
import Task from "./Task";

const TaskList = ({filteredTodos, changeTask, deleteTask}) => {

    return (
        filteredTodos.map(task => <Task 
            task={task}
            key={task.uuid}
            changeTask={changeTask}
            deleteTask={deleteTask}
        />)
    );
}

export default TaskList;