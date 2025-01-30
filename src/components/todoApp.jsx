
import React, { useState, useEffect } from "react";
import { db, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "../firebase";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
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
      setTodos([...todos, {id: docRef.id, text: text}]);
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
  const editTodo = (id) =>{
      // newTodo = todo.id
  
    }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>To-Do App</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <label >{todo.text}</label>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            <button onClick={() => editTodo(todo.id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;













