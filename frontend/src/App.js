import {
  HashRouter as Router,
  Route
} from "react-router-dom";


import './App.css';
import Header from './components/Header'
import NotesListPage from './pages/NotesListPage'
import NotePage from './pages/NotePage'
import  SnakeGame from './components/About_us'
import AboutMe from "./components/About_me";

function App() {
  return (
    <Router>
      <Header />

      <div className="container dark">
        <div className="app">         
          <Route path="/" exact component={NotesListPage} />
          <Route path="/note/:id" component={NotePage} />
          <Route path="/about" exact component={SnakeGame} />
          <Route path="/aboutme" exat component={AboutMe}/>
        </div>
      </div>
    </Router>
  );
}

export default App;
