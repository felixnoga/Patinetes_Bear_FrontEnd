import './App.css';
import Map from './Components/Map';
import Map2 from './Components/Map2';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Patinetes Bear</h1>
        <Map/>
      </header>
      <h2>React-map-gl</h2>
      <Map2/>
    </div>
  );
}

export default App;
