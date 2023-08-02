import "./app.scss";
import FileInput from "./component/FileInput";
import Header from "./component/header/Header.jsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {  
  
  return (
    <div className="app">
      <div className="main">
        <Header/>
        <div className="title">Add Candidates to Database</div>
        <FileInput />
      </div>
      <ToastContainer/>
    </div>
  );
}

export default App;
