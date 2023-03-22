import React from "react"
import './App.css';
import ContextProvider from "./components/context";
import Table from "./components/table";

class App extends React.Component {
  render(){
    return (
      <div className="App">
        
        <ContextProvider>
          <Table/>
        </ContextProvider>

      </div>
    )
  }
}

export default App;
