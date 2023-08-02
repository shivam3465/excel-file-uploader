import React, { useRef, useState } from "react";
import uploadIcon from "../assests/upload.png";
import successImg from "../assests/check.png";
import axios from "axios";
import { toast } from "react-toastify";

const FileInput = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading,setLoading] = useState(false);
  const fileInputRef = useRef(null);

  //will be called when Submit button is clicked
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);

    setLoading(true);
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
      setSuccess(true);
      setLoading(false)
      toast.success("File Upload Successfully")
    } catch (error) {
      toast.error(error.response.data.name+ " Please upload file with required fields only");      
      console.error(error.response.data.message);
      setLoading(false)
      setSuccess(false);
    }
  };

  return (
    <div className="input-container">
      <div
        className="file-input-div"
        onClick={() => fileInputRef.current.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => setSelectedFile(e.target.files[0])}
          accept=".xlsx"
          disabled={loading || success}
        />

        {success ? (
          <div className="result">
            <p>Thank You!</p>
            <div className="result-mid">
              <img src={successImg} alt="" />
              <span>File Successfully uploaded.</span>
            </div>
            <div>Your records will be processed shortly.</div>
          </div>
        ) : (
          <>
            <div className="upload">
              <img src={uploadIcon} alt="" />
            </div>

            <p style={{ marginBottom: "10px" }}>
              {selectedFile?.name
                ? selectedFile.name
                : "Upload a .xlsx .xls file here "}
            </p>
            {selectedFile && <div style={{ height: "2rem" }}></div>}
          </>
        )}
      </div>

      {selectedFile && !success && (
        <button className="btn" onClick={handleSubmit} disabled={loading}>
          Submit
        </button>
      )}
    </div>
  );
};

export default FileInput;
