"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [todo, setTodo] = useState<any>([
    {
      name: "Master Task",
      checked: false,
      subTask: [
        { name: "Sub1", checked: false },
        { name: "Sub2", checked: false },
        { name: "Sub3", checked: false },
      ],
    },
    {
      name: "Master Task2",
      checked: false,
      subTask: [
        { name: "Sub1", checked: false },
        { name: "Sub2", checked: false },
        { name: "Sub3", checked: false },
      ],
    },
  ]);
  const [newTask, setNewTask] = useState<string>("");
  useEffect(() => {}, [todo]);
  const element = todo.map((item: any, index: number) => {
    console.log(item);
    return (
      <div className="flex flex-col gap-2" key={index}>
        <div>
          <input type="checkbox" onChange={() => onCheckMasterTask(index)} checked={item.checked} />
          <label>{item.name}</label>
          {item.checked === true && (
            <>
              <button
                className="bg-green-400 text-white border rounded-md p-1"
                onClick={() => createSubTask(index)}
              >
                AddSubtask
              </button>
              <button
                className="bg-blue-400 text-white border rounded-md p-1"
                onClick={() => editMasterTask(index)}
              >
                Edit
              </button>
              <button
                className="bg-red-400 text-white border rounded-md p-1"
                onClick={() => deleteMasterTask(index)}
              >
                Delete
              </button>
            </>
          )}
        </div>
        {item.subTask.map((sub: any, subIndex: number) => (
          <div key={sub.index}>
            <input
              type="checkbox"
              onChange={() => onCheckSubTask(index, subIndex)}
              checked={sub.checked}
            />
            <label>{sub.name}</label>
            {sub.checked === true && (
              <>
                <button
                  className="bg-blue-400 text-white border rounded-md p-1"
                  onClick={() => editSubTask(index, subIndex)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-400 text-white border rounded-md p-1"
                  onClick={() => deleteSub(index, subIndex)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    );
  });

  function onCheckMasterTask(index: number) {
    const task = [...todo];
    task[index].checked = !task[index].checked;
    setTodo(task);
  }
  function onCheckSubTask(index: number, subIndex: number) {
    const task = [...todo];
    task[index].subTask[subIndex].checked = !task[index].subTask[subIndex].checked;
    setTodo(task);
  }

  function createSubTask(index: number) {
    const task = [...todo];
    task[index].subTask.push({ name: "New Subtask" });
    setTodo(task);
  }
  function editMasterTask(index: number) {
    const task = [...todo];
    task[index].name = "Edit Master Task";
    setTodo(task);
  }
  function editSubTask(index: number, subIndex: number) {
    const task = [...todo];
    task[index].subTask[subIndex].name = "Edit Sub Task";
    setTodo(task);
  }

  function deleteMasterTask(index: number) {
    const task = [...todo];
    task.splice(index, 1);
    setTodo(task);
  }
  function deleteSub(index: number, subIndex: number) {
    const task = [...todo];
    task[index].subTask.splice(subIndex, 1);
    setTodo(task);
  }

  function createTask() {
    const task = { name: newTask, subTask: [] };
    setTodo([...todo, task]);
    setNewTask("");
  }
  return (
    <>
      <div className="text-center py-4">
        <div>
          <h1>Master Task</h1>
        </div>

        <div className="inline-flex gap-2 items-center py-4">
          Create New Task
          <input
            type="text"
            className="border"
            placeholder="Enter your task"
            onChange={(e) => setNewTask(e.target.value)}
            value={newTask}
          />
          <button className="bg-slate-200 border rounded-md p-2" onClick={createTask}>
            Add Task
          </button>
        </div>

        {element}
      </div>
    </>
  );
}
