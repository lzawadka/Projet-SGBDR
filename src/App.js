import './App.css';
import { Movies } from './Movies';

function App() {
  return (
    <div className="App">
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <h1 style={{textAlign: 'center', fontWeight: 'bold'}}>Movie Project SGBDR</h1>
      </div>
      <Movies />
    </div>
  );
}

export default App;