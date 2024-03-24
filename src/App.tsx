import React, {useState} from 'react';
import './App.css';
import Login from "./components/Login"
import { BrowserRouter as Router, Route,redirect } from 'react-router-dom';
import Redirect from "./Utils/Redirect";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="App">
        <Router>
            <Route path="/"  element={(
                isAuthenticated ? (
                    userRole === 'admin' ? (
                        <Redirect linc={"/admin"}/>
                    ) : (
                        <Redirect linc={"/user"}/>
                    )
                ) : (
                    <Redirect linc={"/login"}/>
                )
            )} />

        </Router>

    </div>
  );
}
export default App;
