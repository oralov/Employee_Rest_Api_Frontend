
import './App.css';
import { useState } from 'react';
import Employees from './employees';

function App() {
const [state, setState] = useState(false)
let container
if(state){
container = (<Employees/>)
}
else{
  container = (<button onClick={() => setState(true)}>GET</button>)
}
  return (
  <> 
  <h2 style={{display: 'flex',justifyContent: 'center'}}>Employees</h2>
  <div className="App" style={{display: 'flex',justifyContent: 'center'}}>
    {container}
  </div>
  </>
  );
}

export default App;
