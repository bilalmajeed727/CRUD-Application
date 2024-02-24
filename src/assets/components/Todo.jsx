import React, { useEffect, useRef, useState } from "react";
import "./Todo.css";
import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase config";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const dbRef = collection(db, "todos");

  // Function to ubdate the todo..
  const ubdateTask = async (id) => {
    const userDoc = doc(db, "todos", id);
    const newVAl = prompt("edit task");
    const newData = { taskName: newVAl };
    try {
      if(!newVAl){return null}
      else{
        await updateDoc(userDoc, newData);
      }
        
      
    } catch (error) {
      console.log(error);
    }
  };

  // Function to delete the particular task..
  const deleteTask = async (id) => {
    const userDoc = doc(db, "todos", id);
    try {
      await deleteDoc(userDoc);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Function to add new task in the Todo..
  const addTask = async (event) => {
    event.preventDefault();
    if (!newTask) {
      alert("Enter todo");
    } else {
      await addDoc(dbRef, { taskName: newTask });
    }
  };

  useEffect(() => {
    const readDb = async () => {
      try {
        const data = await getDocs(dbRef);
        const dataRef = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setTodos(dataRef);
      } catch (error) {
        console.log(error.message);
      }
    };
    readDb();
  }, [todos]);

  return (
    <>
      <div className="container">
        <h1>Task for Today!</h1>

        <div className="input_btn">
          <input
            type="text"
            placeholder="add task.."
            onChange={(e) => {
              setNewTask(e.target.value);
            }}
            value={newTask}
          />
          <button type="submit" onClick={addTask}>
            <FaPlus />
          </button>
        </div>

        {todos.map((task) => {
          return (
            <>
              <div className="li">
                <p>{task.taskName}</p>
                <div className="icons">
                  <FaEdit
                    onClick={() => {
                      ubdateTask(task.id);
                    }}
                  />
                  <FaTrash onClick={() => deleteTask(task.id)} />
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Todo;
