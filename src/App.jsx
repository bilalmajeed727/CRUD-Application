import React, { useEffect, useState } from "react";
import "./App.css";
import './index.css';
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase config";
import Todo from "./assets/components/Todo";

const App = () => {
  return (
<Todo/>
  )
  
}

export default App;
