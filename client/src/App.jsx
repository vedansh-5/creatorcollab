import { useState } from 'react'
import './App.css'
import AddDeal from './pages/adddeal'
import Navbar from './pages/navbar';

function App() {
  const [title, setTitle] = useState("");
  const handleNext = () => {
    console.log("User entered title:", title);
    // move to next step...
  };
  return (
    <div className="bg-gray-200">
    <div className="mx-auto ">
      <div className="bg-white rounded-4xl shadow-lg mt-8 overflow-hidden">
        <Navbar />
        <AddDeal value={title} onChange={setTitle} onNext={handleNext}/>
      </div>
    </div>
  </div>
  )
}

export default App
