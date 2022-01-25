import { useState } from "react/cjs/react.development";
import { Input } from 'antd';
import { Button, Row } from "antd";


const ToDoForm = ({ addTask }) => {

    const [userInput, setUserInput] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        addTask(userInput);
        setUserInput("");
    }

    function handleChange(e) {
        setUserInput(e.target.value);
    }

    return (
        <Row display="flex">
            <form onSubmit={handleSubmit}>
                <Input
                    onChange={handleChange}
                    value={userInput}
                    type="text"
                    placeholder="Enter task">
                </Input>
                <Button>Save</Button>
            </form>
        </Row>
    );
}

export default ToDoForm;