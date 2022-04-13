import AllComments from './components/AllComments';
import UserComments from './components/UserComments'
import './App.css';

function App() {
  return (
    <div className="App bg-light-grayish-blue py-5 text-grayish-blue">
      <AllComments />
      <UserComments />
    </div>
  );
}

export default App;
