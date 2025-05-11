import './App.css'
import router from './routes';
import { RouterProvider } from 'react-router-dom';

function App() {
 
  return (
    <div className="bg-gray-200">
    <div className="mx-auto ">
      <div className="bg-white rounded-4xl shadow-lg mt-8 overflow-hidden">
        <RouterProvider router = {router} />
      </div>
    </div>
  </div>
  )
}

export default App
