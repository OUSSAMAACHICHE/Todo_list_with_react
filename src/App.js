import "./App.css";

import { useReducer, useRef } from "react";

const reducer = (tasks, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...tasks,
        { task: action.payload.text, id: Date.now(), completed: false },
      ];
    case "DELETE":
      return tasks.filter((task) => task.id !== action.payload.id);
    case "DONE":
      return tasks.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case "DELETEALL":
      return [];
    default:
      return tasks;
  }
};
function TodoList() {
  const inputRef = useRef();
  const [tasks, dispatch] = useReducer(reducer, []);

  function addTask() {
    if (inputRef.current.value.trim()) {
      dispatch({ type: "ADD", payload: { text: inputRef.current.value } });
      inputRef.current.value = "";
    }
    inputRef.current.focus();
  }
  return (
    <div className="todo-parent">
      <input
        className="task-input"
        ref={inputRef}
        type="text"
        placeholder="Enter your task."
      />
      <button className="add-btn" onClick={addTask}>
        Add Task
      </button>
      <ul className="tasks-parent">
        {tasks.length === 0 ? (
          <p className="no-tasks">There are no tasks</p>
        ) : (
          tasks.map((task) => (
            <li className={`task ${task.completed ? 'done': ''}`} key={task.id} >
              <span className="task-text">{task.task}</span>
              <div className="btns-task">
                <button
                  className="del-btn"
                  onClick={() =>
                    dispatch({ type: "DELETE", payload: { id: task.id } })
                  }
                >
                  X
                </button>
                <button
                  className="done-btn"
                  onClick={() =>
                    dispatch({ type: "DONE", payload: { id: task.id } })
                  }
                >
                  ✔
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
      <button className="del-all" onClick={() => dispatch({ type: "DELETEALL" })}>
        Delete all
      </button>
    </div>
  );
}

export default TodoList;
