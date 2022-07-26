import logo from "./logo.svg";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const Todos = ({ todos }) => {
    return (
      <div className="todos">
        {todos.map((todo) => {
          return (
            <div className="todo">

              <p>{todo.name}</p>
              <button onClick={() => handleWithEditButtonClick(todo)}>
                <AiOutlineEdit size={20} color={"#64697b"}></AiOutlineEdit>
              </button>
              <button onClick={() => deleteTodo(todo)}>
                <AiOutlineDelete size={20} color={"#64697b"}></AiOutlineDelete>
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  async function handleWithNewButton() {

    setInputVisility(!inputVisbility);
  }
  async function handleWithEditButtonClick(todo) {
    setSelectedTodo(todo);
    setInputVisility(true);
  }
  async function getTodos() {
    const response = await axios.get("https://herokubackendtrab.herokuapp.com/anime");
    setTodos(response.data);
    //console.log(response.data);
  }
  async function editTodo() {
    let aux = inputValue.split(",");
    let name = aux[0];
    let episodio = aux[1];
    let id = selectedTodo.id;

    const response = await axios.put("https://herokubackendtrab.herokuapp.com/anime" + id, {
      episodio: episodio,
      name: name

    });
    setSelectedTodo();
    setInputVisility(false);
    getTodos();
    setInputValue("");
  }
  async function deleteTodo(todo) {
    const response = await axios.delete(
      `https://herokubackendtrab.herokuapp.com/anime${todo.id}`
    );
    getTodos();
  }

  async function createTodo() {
    let aux = inputValue.split(",");
    let name = aux[0];
    let episodio = aux[1];
    const response = await axios.post("https://herokubackendtrab.herokuapp.com/anime", {
      name: name,
      episodio: episodio
    });
    getTodos();
    setInputVisility(!inputVisbility);
    setInputValue("");
  }

  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputVisbility, setInputVisility] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState();

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="App">
      <header className="container">
        <div className="header">
          <h1>Lista de Animes</h1>
        </div>
        <Todos todos={todos}></Todos>
        <input
          value={inputValue}
          style={{ display: inputVisbility ? "block" : "none" }}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
          className="inputName"
        ></input>
        <button
          onClick={
            inputVisbility
              ? selectedTodo
                ? editTodo
                : createTodo
              : handleWithNewButton
          }
          className="newTaskButton"
        >
          {inputVisbility ? "Confirmar" : "Adicionar novo Anime"}
        </button>
      </header>
    </div>
  );
}

export default App;



