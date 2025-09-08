import { useState } from 'react'
import './App.css'
import { useTodo } from './contexts/TodoContext.jsx'

function App() {
  const { todos, addTodo, toggleTodo, editTodo, deleteTodo } = useTodo()
  const [text, setText] = useState('')

  const handleAdd = (e) => {
    e.preventDefault()
    addTodo(text)
    setText('')
  }

  return (
    <div className="min-h-screen bg-[#0f1b2d] text-white flex flex-col items-center py-12">
      <h1 className="text-3xl font-semibold mb-8">Manage Your Todos</h1>

      <form onSubmit={handleAdd} className="w-full max-w-2xl flex gap-3">
        <input
          className="flex-1 rounded-md bg-[#1b2b43] placeholder-gray-400 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Write Todo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 transition-colors rounded-md px-5 py-3"
        >
          Add
        </button>
      </form>

      <ul className="w-full max-w-2xl mt-6 space-y-3">
        {todos.length === 0 && (
          <li className="text-center text-gray-300 py-6">No todos yet. Add one above!</li>
        )}
        {todos.map((t) => (
          <li key={t.id} className="bg-[#d8c8ff1a] border border-[#ffffff22] rounded-md px-4 py-3 flex items-center gap-3">
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleTodo(t.id)}
              className="size-4"
            />
            <span className={`flex-1 text-left ${t.completed ? 'line-through text-gray-400' : ''}`}>{t.text}</span>
            <button
              onClick={() => {
                const next = prompt('Edit todo', t.text)
                if (next !== null) editTodo(t.id, next)
              }}
              className="bg-yellow-500 hover:bg-yellow-600 text-black rounded-md px-3 py-1"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTodo(t.id)}
              className="bg-rose-600 hover:bg-rose-700 rounded-md px-3 py-1"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
