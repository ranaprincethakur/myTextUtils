import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import About from './components/About';
import React,{useState} from 'react';
import Alert from './components/Alert';
import {
  BrowserRouter,
  Routes,
  Route,
  // Link
} from 'react-router-dom';

function App() {
  const [mode, setmode] = useState('light');//whether dark mode is enabled or not
  const [alert, setalert] = useState(null);

  const showAlert= (message,type)=>{
    setalert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setalert(null);
    }, 1500);
  }
  const toggleMode=()=>{
    if(mode==='light'){
      setmode('dark');
      document.body.style.backgroundColor='rgb(4, 39, 67';
      showAlert("Dark mode has been enabled","success");
    }
    else{
    setmode('light');
    document.body.style.backgroundColor='white';
    showAlert("Light mode has been enabled","success");
    }
  }
  return (
    <> 
    <BrowserRouter> 
      <Navbar title= "TextUtils" aboutText="aboutTextUtils" mode={mode} toggleModes={toggleMode}/>
      <Alert alert={alert}/>

      <div className="container my-3">
      <Routes>
          <Route exact path="/about" element={<About mode={mode}/>}>
          </Route>
          <Route path="/" element={<TextForm heading="Enter the text to analyze below" mode={mode} showAlert={showAlert}/>}>
         </Route>
        </Routes>
      </div>
    </BrowserRouter>
    </>
  );
}

export default App;
