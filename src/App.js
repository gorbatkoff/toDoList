import { useState, useEffect } from 'react';
import ToDoForm from './components/ToDoForm';
import TaskList from './components/TaskList';
import Sort from './components/Sort';
import { Pagination, Row, Divider, message, Space } from 'antd';
import axios from 'axios';

const api = axios.create({ // here declaration of API connection
  baseURL: 'https://gorbatkoffapinodejs.herokuapp.com',
});

function App() {

  const [filteredTodos, setFilteredTodos] = useState([]); // Array of the tasks
  const [currentPage, setCurrentPage] = useState(1); // State of current page
  const [status, setStatus] = useState('all') // State for sorting by status
  const [date, setDate] = useState('desc'); // State for sorting by date
  const [todosCount, setTodosCount] = useState(0); // State of amount tasks
  const [todosPerPage] = useState(5); // Const of max tasks per page

  const info = (err) => {
    message.info(err);
  }


  // useEffect in which we get an array of current Tasks 
  useEffect(() => {
    getTodos(); // here we call function to get an array of current Tasks
  }, [status, date, currentPage]); // here i announced states, which need to us for re-render page


  const getTodos = async () => { // async function to get an array of tasks from API

    const response = await api.get(`/tasks/`, { // The start of getting tasks
      params: { // here we add values to our states
        filterBy: status === 'all' ? '' : status, // here sorting by status
        order: date, // here sorting by date
        pp: todosPerPage, // here we add value to postsPerPage
        page: currentPage // here we add currentPage  
      }
    })

    if (response.data.todos.length === 0 && currentPage > 1) { // if amount of tasks equals to zero and current page > 1 then
      setCurrentPage(currentPage - 1) // i change current page to previous

    }; // setting current page 
    console.log(response.data);
    setTodosCount(response.data.numberOfTasks); // set response.data.count to our tasks count
    setFilteredTodos(response.data.todos); // set tasks to FilteredTodos State
    

  };

  const addTask = async (input) => { // here i declarate function for creating new Task and post it to server
    try {
      const newTask = { // newTask object
        name: input, // input which user write in input form
        done: false // done false 'cause it's logic
      };

      await api.post(`/tasks/`, newTask); // sending a post request to the server
      await getTodos(); // get updated list of Tasks
    }
    catch {
      info("This task already exist") // alerting message of error
      // console.log(e)
    }
  }

  const deleteTask = async (e, id) => { // function for deleting task
    e.currentTarget.disabled = true; // here we make current button disable 'cause user can spam by it
    await api.delete(`/tasks/${id}`); // deleting task from api
    await getTodos(); // rerendering list of tasks
  }

  const changeTask = async (id, text) => { // function for changing task
    try {
      let req = await api.patch(`/tasks/${id}`, text); // sending new task to API
      await getTodos(); // rerendering
      return req;
    }

    catch { // handler of Errors
      info("Error with update task")
      await getTodos(); // rerendering of current tasks
    }
  }

  const sortByStatus = async (val) => setStatus(val); // here sorting by status (all, done, undone)

  const sortByDate = async (val) => setDate(val); // here sorting by date (asc, desc)

  const paginate = (num) => { // Pagination
    getTodos(); // rerendering current tasks
    setCurrentPage(num); // changing current page
  }

  return (
    <div className="App">
      <Divider><h3>TO DO LIST</h3></Divider>

      <div className="wrapper">
        <div style={{ marginBottom: "1em" }}>
          <ToDoForm // Here input to create new task 
            addTask={addTask}
          />
        </div>

        <div style={{ marginBottom: "1em" }}>
          <Sort // sorting
            sortByStatus={sortByStatus}
            sortByDate={sortByDate}
          />
        </div>
        <TaskList // list of tasks
          filteredTodos={filteredTodos}
          changeTask={changeTask}
          deleteTask={deleteTask}
        />
      </div>

      <Row justify="center">
        <Pagination // pagination
          defaultCurrent={1}
          total={todosCount}
          onChange={paginate}
          hideOnSinglePage={true}
          current={currentPage}
          pageSize={todosPerPage}
        />
      </Row>

    </div >
  );
}

export default App;