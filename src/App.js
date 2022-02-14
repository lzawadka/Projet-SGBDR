import './App.css';
import { Movies } from './Movies';
import { Link } from '@mui/material';

function App() {
  return (
    <div className="App">
      <h1 style={{textAlign: 'center'}}>Movie Project</h1>
      <Movies />
      <p style={{textAlign: 'center'}}>Made by Clément Jacquelet for <Link href="https://dev.glassworks.tech/">Kevin Glass's</Link> school project with HETIC</p>
    </div>
  );
}

export default App;
