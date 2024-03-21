import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Welcome from './components/Welcome'
import Welcome2 from './components/Welcome2';
import './App.css';

function App() {
  // const [test, setTest] = useState(5);
  const [loaded, setLoaded] = useState(false)
  const [dataObj, setaDataObj] = useState()

  const getData = () => {
    // Load data into dataObj, flip the bit on loaded
    setaDataObj({
      title:"React is FUN!", 
      description:"lots and lots of words, something meaningful, yada yada...."
    })
    setLoaded(true)
  }

  if(!loaded) {
    return (
      <>
        <Welcome name="Jill" age="23"/>
        <Welcome name="Sam" age="54"/>
        <button onClick={getData}>Get Data</button>
      </>
    )
  }



  console.log('in the app');
  return (
    //this is a comment
    //we are now in JSX
    <>
      {/* inside of return, this is a comment */}
      {console.log("inside of JSX")}
      <h1>Data!</h1>
      <h3>{dataObj.title}</h3>
      <h5>{dataObj.description}</h5>
      <Welcome name="Jill"/>
      <hr/>
      <Welcome2 name="Dan" job="talk" myStyle="myStyle"/>
      <Welcome2 name="Dan" job="talk" myStyle="otherStyle"/>
    </>
  )
}

export default App