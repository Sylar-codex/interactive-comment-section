import AllComments from './components/AllComments';
import CommentsReplies from './components/CommentsReplies';
import './App.css';

function App() {
  return (
    <div className="App desktop:bg-light-grayish-blue py-12 desktop:text-grayish-blue mobile:bg-soft-red">
      <AllComments />
      <CommentsReplies />
    </div>
  );
}

export default App;
