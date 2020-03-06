import React from 'react';
import routes from "./routes"
import './App.scss';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="navbar">
          <ul>
            {
              routes.map((item, i)=>(
                <li key={'s'+i}>
                  <Link to={item.path}>{item.name}</Link>
                </li>
              ))
            }
          </ul>
        </nav>
        <main className="main">
            <Switch>
              {
                routes.map((item, i)=>(
                  <Route path={item.path} exact key={'path'+i}>
                    <item.component />
                  </Route>
                ))
              }
            </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
