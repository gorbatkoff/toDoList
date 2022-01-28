import { useState, useEffect } from 'react';
import ToDoForm from './components/ToDoForm';
import TaskList from './components/TaskList';
import Sort from './components/Sort';
import { Pagination, Row, Divider, message } from 'antd';
import axios from 'axios';

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

  const api = axios.create({
    baseURL: 'https://todo-api-learning.herokuapp.com/v1/',
  });

  // useEffect in which we get an array of current Tasks 
  useEffect(() => {
    getTodos(); // here we call function to get an array of current Tasks
  }, [status, date, currentPage]); // here i announced states, which need to us for re-render page


  const getTodos = async () => { // async function to get an array of tasks from API

    const response = await api.get(`/tasks/5`, { // The start of response
      params: { // here we add values to our states
        filterBy: status === 'all' ? '' : status, // here sorting by status
        order: date, // here sorting by date
        pp: todosPerPage, // here we add value to postsPerPage
        page: currentPage // here we add currentPage
      }
    })
    if (response.data.tasks.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }; // setting current page 
    setTodosCount(response.data.count); // set response.data.count to our tasks count
    setFilteredTodos(response.data.tasks); // set tasks to FilteredTodos State
  };

  const addTask = async (input) => { // here i declarate function for creating new Task and post it to server
    try {
      const newTask = { // newTask object
        name: input, // input which user write in input form
        done: false // done false 'cause it's logic
      };

      await api.post(`task/5`, newTask); // sending a post request to the server
      await getTodos(); // get updated list of Tasks
    }
    catch {
      info("This task already exist")
    }
  }

  const deleteTask = async (e, id) => {
    e.currentTarget.disabled = true;
    await api.delete(`/task/5/${id}`);
    await getTodos();
  }

  const changeTask = async (id, text) => {
    try {
      let req = await api.patch(`/task/5/${id}`, text); // sending new task to API
      await getTodos(); // rerendering
      console.log(req.data)
      console.log(id);
      return req;
    }

    catch {
      info("Error with update task")
      await getTodos();
    }
  }

  const sortByStatus = async (val) => setStatus(val);

  const sortByDate = async (val) => setDate(val)

  const paginate = (num) => {
    getTodos();
    setCurrentPage(num);
  }

  return (
    <div className="App">
      <Divider><h3>TO DO LIST</h3></Divider>

      <ToDoForm addTask={addTask} />

      <Sort
        sortByStatus={sortByStatus}
        sortByDate={sortByDate}
      />

      <TaskList
        filteredTodos={filteredTodos}
        changeTask={changeTask}
        deleteTask={deleteTask}
      />

      <Row justify="center">
        <Pagination
          defaultCurrent={1}
          total={todosCount}
          onChange={paginate}
          hideOnSinglePage={true}
          current={currentPage}
          pageSize={todosPerPage}
        />
      </Row>

    </div>
  );
}

export default App;