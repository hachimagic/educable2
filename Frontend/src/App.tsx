import RouterComponent from './Router'

function App() {
  //dont assign this with anything but router it breaks the web
  return (
    <div className='h-screen w-full flex justify-center '>
      <RouterComponent />
    </div>
  )
}

export default App