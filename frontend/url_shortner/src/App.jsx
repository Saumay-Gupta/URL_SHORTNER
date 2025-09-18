import { useState } from "react"
import axios from "axios";

function App() {
  const [url,setUrl] = useState("");
  const [ifEmpty, setIfEmpty] = useState("");

  const handleSubmit = () => {
    if(url.length == 0){
      setIfEmpty("Enter URL Please..");
      return;
    }
    axios.post("http://localhost:8001/url", {
      originalURL : url,
    }).then((res)=>{
      console.log("Response received from Backend..!!");
      console.log(res.data.msg);
      setUrl("http://localhost:8001/url/"+(res.data.msg));
    }).catch((err) => {
      console.log("Frontend Error: ", err);
    })
  }
  return (
    <>
      <div className="w-screen h-screen bg-gray-600 flex flex-col items-center">
        <h1 className="text-white mt-10">URL SHORTNER</h1>
        <div className="mt-5 flex justify-center">
          <input value={url} onChange={(e)=>setUrl(e.target.value)} className="bg-white p-1 rounded w-80" type="text" placeholder="Enter your URL"/>
          <button className="bg-blue-500 text-white p-1 ml-2 rounded hover:bg-blue-700 duration-200" onClick={handleSubmit} > Submit </button>
        </div>
          <p className="text-red-500 mt-3">{ifEmpty}</p>
      </div>
    </>
  )
}

export default App
