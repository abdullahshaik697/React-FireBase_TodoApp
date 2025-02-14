import "./todoApp.css"
import React, { useState, useEffect } from "react";
import {Button, TextField} from "@mui/material"

import { db, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "../firebase";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [check, setCheck] = useState(false);

  const [newTodo, setNewTodo] = useState("");

  // Fetch To-Dos from Firestore
  useEffect(() => {
    const fetchTodos = async () => {

      const querySnap = await getDocs(collection(db, "todos"));

      const allTodos = querySnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log(allTodos);
      setTodos(allTodos);
    };

    fetchTodos();
  }, []);

  // Add New To-Do
  const addTodo = async () => {
    if (newTodo) {
      const text = newTodo.toString(); // Ensure you're calling the method
      const docRef = await addDoc(collection(db, "todos"), {

        text: text // Pass it as an object with a 'text' field

      }

      );
      setTodos([{id: docRef.id, text: text}, ...todos]);
      console.log("ID: " + docRef.id)
      setNewTodo("");
    } else {
      alert("Input Value");
    }
  };


  // Delete To-Do
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    setTodos(todos.filter(todo => todo.id !== id))
  };

  // Edit To do
  const editTodo = async (id, text) =>{

      setEditId(id);       // Store ID to track which todo is being edited
      setNewTodo(text);    // Fill input with the selected todo's text
      setCheck(true)
      
    }
    const updateTodo = async () =>{
      
      const todoRef = doc(db, "todos", editId);
      await updateDoc (todoRef, {text: newTodo}); //update in firestore

      setTodos(todos.map((todo) =>
      todo.id == editId ? { ...todo, text: newTodo } : todo));  //update in UI


      setNewTodo("");
      setCheck(false)
    }
    
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
     
      <h1>To-Do App</h1>
      <TextField
        id="outlined-basic"
        type="text"
        label="Add Todo"
        variant="outlined"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Type your todo here"
      />
      { (check)?
        <Button variant="contained" onClick={updateTodo}>Update</Button>:
       
        <Button variant="contained" onClick={addTodo}>Add</Button>
      }
      <ul id="todoContainer">
        {todos.map(todo => (
          <div key={todo.id} id="todo">
            <label id="todoText">{todo.text}</label>
            <div >
            <Button variant="contained" style={{color:"white", background:"red"}} onClick={() => deleteTodo(todo.id)}>Delete</Button>
            <Button variant="contained" style={{color:"white", background:"purple"}} onClick={() => editTodo(todo.id, todo.text)}>Edit</Button>
            </div>
           
          </div>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;