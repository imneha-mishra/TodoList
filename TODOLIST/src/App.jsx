
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {
 
 const[todo,setTodo]= useState("")
 const [todos,setTodos]=useState([])

 useEffect(() =>{
  let todos =JSON.parse(localStorage.getItem("todos"))
  setTodos(todos)
 },[])

 const saveLocalStorage=()=>{
  localStorage.setItem("todos",JSON.stringify(todos))
 }

  const handleEdit = (e,id) => {
   let t= todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
        });
        setTodos(newTodos)
        saveLocalStorage()
  }

  const handleDelete = (e,id) => {
  
    let newTodos = todos.filter(item=>{
      return item.id!==id
        });
        setTodos(newTodos)
       saveLocalStorage()
  }
  const handleAdd = () => {
     setTodos([...todos,{id:Date.now() ,todo,isCompleted:false}])
     setTodo("")
     saveLocalStorage()
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

 const handleCheckbox=(e)=>{
  let id=e.target.name;
  let index=todos.findIndex(item=>{
    return item.id === id;
  })
  let newTodos=[...todos];
  newTodos[index].isCompleted = newTodos[index].isCompleted;
  setTodos(newTodos)
  saveLocalStorage()
 }


  return (
    
   
  <div className='  rounded-xl my-5 bg-violet-100 min-h-[70vh]'>
    <div className='addTodo '>
      <h2 className='text-lg font-bold '>Add Todo</h2>
      <input onChange={handleChange}  value={todo}type='text' className='w-1/2 h-[7vh] '  />
      <button onClick={handleAdd}className='bg-violet-800 hover:bg-violet-900 p-3 py-2 text-sm font-bold 
      text-white rounded-md mx-6'>Add</button>
    </div>
    <h2 className='text-lg font-bold'>Your Todo</h2>
    <div className='todos'>
      {todos.length===0 && <div>Nothing to Display</div>}
      {todos.map(item=>{
        
     return <div key={item.id} className='todo flex justify-center align-center rounded-lg px-3 py-1.5 gap-x-3 '>
     <input onChange={handleCheckbox} type='checkbox' value={item.id} name='' id='"' />

        <div className={` w-[60vh] ${item.isCompleted ? "line-through":"" }`} >
         
         {item.todo}
        </div>
        <div className='buttons'>
        
          <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-violet-800
           hover:bg-violet-900 mx-100 p-3 py-2 text-sm font-bold text-white rounded-md mx-6'>Edit</button>
          <button  onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-900 
          p-3 py-2 text-sm font-bold text-white rounded-md mx-6 m-5'>Delete</button>
        </div>

      </div>
      })};
    </div>
  </div>
       
    
  )
}

export default App;
