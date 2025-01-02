import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import js from '@eslint/js';
// ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [setShowfinished, setsetShowfinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem('todos')
    if (todoString) {

      let todos = JSON.parse(localStorage.getItem('todos'))
      setTodos(todos)
    }
  }, [])

  const savetoLocalStorage = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    savetoLocalStorage()

  }

  const handleDelete = (e, id) => {

    let newTodos = todos.filter(item => {
      return item.id !== id;
    })

    setTodos(newTodos)
    savetoLocalStorage()

  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    })

    setTodos(newTodos)
    savetoLocalStorage()

  }

  const handleChange = (e) => {
    setTodo(e.target.value)
    savetoLocalStorage()

  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    savetoLocalStorage()

  }

  const togleShowFinished = (e) => {
    setsetShowfinished(e.target.checked)



  }

  return (
    <>
      <Navbar />

      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">

        <div className="addTodo my-5">
          <h2 className='text-lg font-bold'> Add a todo</h2>
          <input onChange={ handleChange } value={ todo } type="text" className='border-2 border-gray-300 p-2 rounded-lg w-1/2' />
          <button onClick={ handleAdd } disabled={ todo.length < 3 } className='bg-violet-800 hover:bg-violet-950 p-4 py-1 text-white rounded-md mx-3'>Add</button>
        </div>
        <input onChange={ togleShowFinished } type="checkbox" checked={ setShowfinished } />  Show Finished
        <h2 className='text-xl font-bold'>Your Todo</h2>

        <div className="todos">
          { todos.length === 0 && <div className='text-center text-lg font-bold'>No todos yet</div> }
          { todos.map(item => {


            return (setShowfinished || !item.isCompleted) && <div key={ item.id } className="todo flex justify-between my-4 w-1/4 gap-5">
              <input onChange={ handleCheckbox } type="checkbox" checked={ item.isCompleted } name={ item.id } id='' />

              <div className={ item.isCompleted ? "line-through" : "" }>{ item.todo }</div>

              <div className="buttons flex h-full">
                <button onClick={ (e) => { handleDelete(e, item.id) } } className='bg-violet-800 hover:bg-violet-950 p-4 py-1 text-white rounded-md mx-1'><MdDeleteForever />
                </button>
                <button onClick={ (e) => { handleEdit(e, item.id) } } className='bg-violet-800 hover:bg-violet-950 p-4 py-1 text-white rounded-md mx-1'><FaEdit /></button>
              </div>

            </div>

          }) }


        </div>
      </div>

    </>
  )
}

export default App
