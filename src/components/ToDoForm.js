import { useState } from "react/cjs/react.development";
import { Input } from 'antd';
import { Button, Row, Form } from "antd";

const { Search } = Input;

const ToDoForm = ({ addTask }) => {

    const [userInput, setUserInput] = useState('');

    function onEnter(text) {
        addTask(text);
        setUserInput("");
    }

    function OnEdit(e){
        setUserInput(e.target.value);
    }

    return (
        <Row align="middle" justify="space-around">
            <Input.Search
                placeholder='I want to...'
                onSearch={onEnter}
                enterButton='Add'
                allowClear
                onChange={OnEdit}
                value={userInput}
            ></Input.Search>
        </Row>
    );
}

export default ToDoForm;