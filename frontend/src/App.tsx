import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App flex flex-col items-center justify-center max-h-screen">
      <div className="flex justify-center items-center gap-4 p-8">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-fkin-manual">
        Click on the Vite and React logos to learn more
      </p>
      <div 
        className="
          mt-10
          bg-indigo-600 
          text-white 
          p-6 
          rounded-xl 
          shadow-2xl 
          border-4 
          border-pink-300
          transition 
          duration-500 
          hover:bg-indigo-700 
          hover:shadow-3xl
          transform 
          hover:scale-105
          max-w-md 
          w-full
        "
      >
        <h1 className="text-4xl font-extrabold mb-3 text-center">
          Hello, Tailwind!
        </h1>
        <p className="text-lg font-medium text-center">
          If you see this box styled, **Tailwind CSS is working** perfectly in your React app.
        </p>
        <div className="mt-4 text-center">
          <span 
            className="
              inline-block 
              bg-pink-300 
              text-indigo-900 
              px-3 
              py-1 
              rounded-full 
              text-sm 
              font-bold
            "
          >
            Success! 🎉
          </span>
        </div>
      </div>
    </div>
  )
}

export default App
