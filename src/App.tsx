import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Button } from 'carbon-components-react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
      <Button>Button</Button>
    </div>
  );
}

export default App;
