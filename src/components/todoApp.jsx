
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
        console.log("ID: "+ docRef.id)
      } else {
        alert("Input Value");
      }
      
     
    
   
   
    // if (newTodo.trim() === "") return;
    // const docRef = await addDoc(collection(db, "todos"), { text: newTodo, completed: false });
    // setTodos([...todos, { id: docRef.id, text: newTodo, completed: false }]);
    // setNewTodo("");
  };

  // Toggle Completed
//   const toggleComplete = async (id, completed) => {
//     await updateDoc(doc(db, "todos", id), { completed: !completed });
//     setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !completed } : todo)));
//   };

  // Delete To-Do
//   const deleteTodo = async (id) => {
//     await deleteDoc(doc(db, "todos", id));
//     setTodos(todos.filter(todo => todo.id !== id));
//   };

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
            <span
              
              onClick={() => toggleComplete(todo.id, todo.completed)}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;













