import React, {useState} from 'react';
import './App.css';
import Login from "./components/Login"

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="App">
      helo world
    </div>
  );
}
export default App;
