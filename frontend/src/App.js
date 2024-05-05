import React from 'react';
import DeviceList from './components/DeviceList';
import Header from './components/Header'; // Importa el componente Header

function App() {
  return (
    <div className="App">
      <Header /> 
      <DeviceList />
    </div>
  );
}

export default App;
