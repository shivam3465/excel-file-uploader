import { useRef, useState } from "react";
import "./app.scss";
import axios from "axios";
import FileInput from "./component/FileInput";

//yaha pe do chij ka issue hai first ki ek aisa div bana takki uss mein kahi bhi click kare toh file select karne ka option khul jaye dusra ki new formdaat ka use karna hai
function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleBoxClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/upload/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: false,
        }
      );
      console.log(data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };


  //bas styling sahi kar dena aur baaki sab sahi kaam kar raha hai
  return (
    <div className="app">
      <div className="file-input-div" onClick={handleBoxClick}>
        <p>Click anywhere in this box to select a file.</p>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => setSelectedFile(e.target.files[0])}
          accept=".xlsx"
        />
        <p>{selectedFile?.name}</p>
      </div>
        {selectedFile && <button onClick={handleSubmit} style={{position: "absolute", bottom: "10px",left: "50%"}}>Upload</button>}
    </div>
  );
}

export default App;
