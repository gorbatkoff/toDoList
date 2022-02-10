import { Pagination, Row } from 'antd';
import React from 'react'
import Sort from './Sort';
import Task from './Task';
import TaskList from './TaskList';
import ToDoForm from './ToDoForm';


function Main({addTask, 
    sortByStatus, 
    sortByDate, 
    filteredTodos, 
    changeTask, 
    deleteTask, 
    total, 
    paginate, 
    current, 
    pageSize, 
    onChange
}) {

    if(total > 0){
        console.log(total);
    }

    if(total == undefined){
        console.log("Hello >>> total >>>", total);
    }

    return (
    <div>
        <main>
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
            total={total}
            onChange={onChange}
            hideOnSinglePage={true}
            current={current}
            pageSize={pageSize}
          />
        </Row>
      </main>
    </div>
  )
}

export default Main;