import { useState } from "react/cjs/react.development";

const ToDoForm = ({addTask}) => {

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
        <form onSubmit={handleSubmit}>
            <input 
                onChange={handleChange}
                value={userInput}
                type="text"
                placeholder="Enter task"
            />        
            <button>Save</button>
        </form>
    );
}

export default ToDoForm;