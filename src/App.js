import { useState, useEffect } from 'react';
import Header from './components/Header';
import ToDoForm from './components/ToDoForm';
import TaskList from './components/TaskList';
import Sort from './components/Sort';

import { Pagination, Row } from 'antd';
import { Divider } from 'antd';

function App() {

  const [todos, setTodos] = useState([]); // Array of the tasks
  const [currentTasks, setCurrentTasks] = useState(todos); // Copy of array

  const [type, setType] = useState('All'); // Types of sort by status 
  const [sortType, setSortType] = useState('reverse'); // Types of sort by date

  const [currentPage, setCurrentPage] = useState(1); // State of current page
  const [amountPages, setAmountPages] = useState(1); // Amount of pages

  const maxTasks = 5; // Max tasks on any page

  // =-------------------------------------------------------------------------=

  useEffect(() => {
    const filtredTasks = todos.filter(task => selectOption(task, type));

    const outputTasks = filtredTasks
      .sort((a, b) => sortByDate(a, b, sortType))
      .slice((currentPage - 1) * maxTasks, currentPage * maxTasks);

    const pagesFraction = filtredTasks.length / maxTasks;

    let amountPages = filtredTasks.length % maxTasks === 0 ? pagesFraction : Math.floor(pagesFraction) + 1;

    if (amountPages < 1) {
      setType('All')
      amountPages = 1;
    }

    if (amountPages < currentPage) {
      setCurrentPage(amountPages)
    }

    setAmountPages(amountPages);
    setCurrentTasks(outputTasks);

  }, [todos, type, sortType, currentPage]);

  function selectOption(task, type) {
    switch (type) {
      case 'All':
        return true

      case 'Done':
        if (task.complete)
          return true;
        return false;

      case "Undone":
        if (task.complete)
          return false;
        return true;
    }
  }
  function sortByStatus(arg) {
    setType(arg);
    // console.log(arg)
  }
  function sortingTasks(arg) {
    setSortType(arg);
  }
  function sortByDate(a, b, sortType) {
    if (sortType === 'standart') {
      if (a < b)
        return 1;
      return -1;
    }

    if (sortType === 'reverse') {
      if (a > b)
        return -1;
      return 1;
    }
  }
  function deleteTask(id) {
    setTodos([...todos.filter((todo) => todo.id !== id)])
  }
  function getDone(taskId) {
    setTodos([...todos.map(item => item.id === taskId ? { ...item, complete: !item.complete } : item)])
  }
  function changeTask(taskId, text) {
    setTodos([...todos.map(task => task.id === taskId ? { ...task, task: text } : task)]);
  }
  function addTask(userInput) {
    if (userInput) {
      const newTask = {
        id: Math.random().toString(10).substring(2, 9),
        task: userInput,
        complete: false,
        time: +new Date()
      }
      setTodos([newTask, ...todos]);
    }
  }
  function changeCurrentPage(pageNumber) {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="App">
      <Divider><h3>TO DO LIST</h3></Divider>

      <ToDoForm addTask={addTask} />

      <Sort
        sortByStatus={sortByStatus}
        sortingTasks={sortingTasks}
      />

      <TaskList
        currentTasks={currentTasks}
        changeTask={changeTask}
        deleteTask={deleteTask}
        getDone={getDone}
      />

      {/* <Pagination
        amountPages={amountPages}
        changeCurrentPage={changeCurrentPage}
        currentPage={currentPage}
      /> */}

      <Row justify="center">
        <Pagination
          defaultCurrent={1}
          total={50}
          onChange={changeCurrentPage}
        />
      </Row>

    </div>
  );
}

export default App;
