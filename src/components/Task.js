import { useState } from "react/cjs/react.development";
import { Checkbox } from 'antd';
import { Input } from 'antd';

function Task({ task, changeTask, getDone, deleteTask }) {

    const [editRegime, setEditRegime] = useState(false);
    const [taskText, setTaskText] = useState(task.task);
    let wasChanged = false;

    function handleOnBlur() {
        setEditRegime(false)
        if (!wasChanged)
            setTaskText(task.task);
        wasChanged = false;
    }

    const handleOnChange = (e) => {
        setTaskText(e.currentTarget.value);
    }

    const handleOnClick = () => {
        setEditRegime(true);
    }

    const handleKeyDown = (e) => {
        if (e.keyCode == 13) {
            changeTask(task.id, e.currentTarget.value);
            wasChanged = true;
            e.currentTarget.blur();
        }

        if (e.keyCode == 27) {
            setTaskText(task.task)
            e.currentTarget.blur();
        }
    }

    const look = (
        <div onClick={handleOnClick}>
            {taskText}
        </div>
    )

    const edit = (
        <Input
            value={taskText}
            autoFocus={true}
            onChange={handleOnChange}
            onKeyDown={handleKeyDown}
            onBlur={handleOnBlur}
        >

        </Input>
    )

    return (
        <div className="task" key={task.id}>
            <Checkbox
                type="checkbox"
                // id={task.id}
                onChange={() => getDone(task.id)}
                checked={task.complete}>
            </Checkbox>

            {/* <Input placeholder="default size" prefix={<UserOutlined />} /> */}

            <div>
                {editRegime ? edit : look}
            </div>

            <div className="time">
                {new Date(task.time).toLocaleString('ru-ru')}
            </div>

            <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
    )
}

export default Task;