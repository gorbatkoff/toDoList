import { useState, useEffect } from 'react';

import { Routes, Route, Link, useNavigate } from 'react-router-dom';


import Main from './components/Main';
import Login from './components/Login';
import Register from './components/Register';
import { Pagination, Row, Divider, message } from 'antd';
import axios from 'axios';

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

  let navigate = useNavigate();

  const info = (err) => {
    message.info(err);
  }


  // useEffect in which we get an array of current Tasks 
  useEffect(() => {
    getTodos(); // here we call function to get an array of current Tasks
  }, [status, date, currentPage, todosCount]); // here i announced states, which need to us for re-render page


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
    try {

      setTodosCount(response.data.todos.count); // set response.data.count to our tasks count

      setFilteredTodos(response.data.todos.rows); // set tasks to FilteredTodos State

    }

    catch (e) {
      info("Something gone wrong")
    }
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
      info("Error! This task already exist");
      await getTodos();
    }
  }

  const deleteTask = async (e, id) => { // function for deleting task
    e.currentTarget.disabled = true; // here we make current button disable 'cause user can spam by it
    await api.delete(`/tasks/${id}`); // deleting task from api
    await getTodos(); // rerendering list of tasks
  }

  const changeTask = async (id, task) => { // function for changing task
    try {
      let req = await api.patch(`/tasks/${id}`, task); // sending new task to API
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

  const addUser = async (login, password) => {

    try {
      const newUser = { // Declarate new user
        login: login, // login which user enter
        password: password // password which user enter
      };

      await api.post(`/register/`, newUser); // sending a post request to the server


      navigate('/register'); // change current page to ./register
    }

    catch (e) {
      info("Something gone wrong")
    }
  }

  return (


    <div className="App">
      <Divider><h3>TO DO LIST</h3></Divider>

      <Divider orientation="right" plain>
        <div style={{ width: "100px" }}>
          <Row justify="space-between">
            <Link to='./login'>Log In</Link>
            <Link to='./register'>Sign Up</Link>
          </Row>
        </div>
      </Divider>

      <Routes>
        <Route path="/" element={<Main
          addTask={addTask}
          sortByStatus={sortByStatus}
          sortByDate={sortByDate}
          filteredTodos={filteredTodos}
          changeTask={changeTask}
          deleteTask={deleteTask}
          defaultCurrent={1}
          total={todosCount}
          onChange={paginate}
          hideOnSinglePage={true}
          current={currentPage}
          pageSize={todosPerPage}
        />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register addUser={addUser} />} />

      </Routes>

    </div >
  );
}

export default App;