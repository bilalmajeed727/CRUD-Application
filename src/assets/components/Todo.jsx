
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
import { useState, useEffect } from "react";

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
      if (!newVAl) { return null }
      else {
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
      await addDoc(dbRef, { taskName: newTask })
      setNewTask('');
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
      <div className="h-screen w-screen p-4 bg-gradient-to-r from-[#2f80ed] to-[#1cb5e0] flex items-center justify-center">
        <div className="bg-slate-200 max-w-[500px] w-full m-auto rounded-md shadow-xl p-5">
          <form className=" flex flex-col">
            <h1 className="text-3xl text-center text-slate-800 font-bold">Task for Today!</h1>
            <div className="flex gap-4 my-4">
              <input
                className="px-4 py-4 rounded-md text-black placeholder-slate-500 outline-none text-xl w-full"
                type="text"
                placeholder="add task.."
                onChange={(e) => {
                  setNewTask(e.target.value);
                }}
                value={newTask}
              />
              <button className=" bg-gradient-to-r from-[#2f80ed] to-[#1cb5e0] rounded-md text-slate-100 p-2" type="submit" onClick={addTask} >
                <FaPlus size={40} />
              </button>
            </div>
          </form>

          {todos.map((task) => {
            return (
            <div className="flex items-center justify-between bg-slate-300 my-4 p-4">
                <p className="text-xl">{task.taskName}</p>
                <div className="flex gap-2 text-slate-800 ">
                <FaEdit
                className="cursor-pointer"
                size={20}
                  onClick={() => {
                    ubdateTask(task.id);
                  }}
                />
                <FaTrash className="cursor-pointer" size={20} onClick={() => deleteTask(task.id)} />
                </div>
            </div>

            );
          })}


        </div>






      </div>
    </>
  );
};

export default Todo;
