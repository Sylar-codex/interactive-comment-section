import AllComments from './components/AllComments';
import UserComments from './components/UserComments';
import { Routes, Route, } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App bg-light-grayish-blue py-5 text-grayish-blue">
      <Routes>
        <Route path="/" element={[<AllComments />, <UserComments />]} />

      </Routes>
    </div>
  );
}

export default App;
