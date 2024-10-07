import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex flex-col justify-center content-center gap-2'>
      <h1 className="text-3xl font-bold underline">
        Tailwind Bold Underline Largetext
      </h1>
      <div className='flex shadow-xl rounded-xl p-5 m-2'>
        Card
      </div>

      <div className='flex flex-col border border-slate-200 shadow-xl rounded-xl p-5 m-2 gap-2'>
        Card
      </div>

      <div className='flex flex-col border border-slate-200 shadow-xl rounded-xl p-5 m-2 gap-2'>
        <p className='text-xl'>Insert Placeholder Page</p>
        <button className='p-2 transition ease-in-out border border-slate-400 shadow-xl 
            rounded-xl hover:border-transparent hover:text-gray-50 hover:scale-105 hover:bg-indigo-500 
            active:bg-green-600 active:scale-90 duration-300'
          onClick={() => setCount(cnt => cnt += 1)}
        >
          Click me!
        </button>
        <p className='text-2xl font-bold'>Numbers {count}</p>
      </div>
    </div>
  )
}

export default App
