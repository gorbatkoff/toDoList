import { useState, useEffect } from 'react';
import ToDoForm from './components/ToDoForm';
import TaskList from './components/TaskList';
import Sort from './components/Sort';
import { Pagination, Row, Divider, message } from 'antd';
import axios from 'axios';
import Login from './components/Login';

const api = axios.create({ // declaration of API connection
  // baseURL: 'https://gorbatkoffapinodejs.herokuapp.com',
  baseURL: 'http://localhost:4001'
});

api.interceptors.response.use(null, error => {
  console.log('INTERCEPTOR CALLED');

  const response = error.request.response;
  let textOfError;

  if (!response) {
    textOfError = "Internal Error"
  }

  try {
    textOfError = JSON.parse(response).message;
  }

  catch (e) {
    textOfError = "JSON contains no error";
  }

  message.error(textOfError);

})

function App() {

  const [filteredTodos, setFilteredTodos] = useState([]); // Array of the tasks
  const [currentPage, setCurrentPage] = useState(1); // State of current page
  const [status, setStatus] = useState('') // State for sorting by status
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
        filterBy: status === '' ? '' : status, // here sorting by status
        order: date, // here sorting by date
        pp: todosPerPage, // here we add value to postsPerPage
        page: currentPage // here we set currentPage  
      }
    });
    
    if (response.data.todos.rows.length === 0 && currentPage > 1) { // if amount of tasks equals to zero and current page > 1 then
      setCurrentPage(currentPage - 1) // i change current page to previous

    }; // setting current page 
    console.log(response.data); 
    setTodosCount(response.data.todos.count); // set response.data.count to our tasks count
    setFilteredTodos(response.data.todos.rows); // set tasks to FilteredTodos State


  };

  const addTask = async (input) => { // here i declarate function for creating new Task and posting it to the server
    try {
      const newTask = { // newTask object
        name: input, // input which user write in input form
        done: false // done false 'cause it's logic
      };

      await api.post(`/tasks/`, newTask); // sending a post request to the server
 // get updated list of Tasks
    }
    catch (e) {
      // info(e.name) // alerting message of error
      console.log(e)
      await getTodos();
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

  const sortByStatus = async (val) => setStatus(val); // here sorting by status (''', done, undone)

  const sortByDate = async (val) => setDate(val); // here sorting by date (asc, desc)

  const paginate = (num) => { // Pagination
    getTodos(); // rerendering current tasks
    setCurrentPage(num); // changing current page
  }

  return (
    <div className="App">
      <Divider><h3>TO DO LIST</h3></Divider>

      <Divider orientation="right" plain>
        <div style={{width: "100px"}}>
          <Row justify="space-between">
          <a href='./login'>Log In</a>
          <a href='./register'>Sign Up</a>
          </Row>
        </div>
      </Divider>

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

      {/* <Login></Login> */}

    </div >
  );
}

export default App;