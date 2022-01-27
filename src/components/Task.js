import { useState } from "react/cjs/react.development";
import { Checkbox, Input, Button, Row, Col } from 'antd';

function Task({ task, changeTask, deleteTask }) {

    const [editRegime, setEditRegime] = useState(false);
    const [taskText, setTaskText] = useState(task.name);
    let wasChanged = false;

    function handleOnBlur() {
        setEditRegime(false)
        if (!wasChanged)
            setTaskText(task.name);
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
            changeTask(e.currentTarget.value, task.uuid);
            wasChanged = true;
            e.currentTarget.blur();
        }

        if (e.keyCode == 27) {
            setTaskText(task.name)
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
        />
    )

    // const handlerSubmit = (taskText) => {
    //     alert(task.text);
    // }

    const getDone = () => {
        task.done = !task.done;
        changeTask(task, task.uuid)
    }

    return (
        <Row align="middle" justify="space-between" key={task.uuid}>

            <Col span={1}>
                <Checkbox
                    type="checkbox"
                    onChange={getDone}
                    checked={task.done}>
                </Checkbox>
            </Col>

            <Col span={18}
            // onChange={handlerSubmit}
            >
                {editRegime ? edit : look}
            </Col>

            <Col span={2}>
                {new Date(task.createdAt).toLocaleString('ru-ru')}
            </Col>

            <Col span={1}>
                <Button onClick={(e) => deleteTask(e, task.uuid)}>Delete</Button>
            </Col>
        </Row>
    )
}

export default Task;