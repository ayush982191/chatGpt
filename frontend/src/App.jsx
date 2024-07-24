import React, { useState, useEffect } from "react";
import chatGptIcon from "./assets/chatgptIcon.png";
import { SiAeroflot } from "react-icons/si";
import { FaCode } from "react-icons/fa";
import { RiShoppingBag3Line } from "react-icons/ri";
import { IoPencil } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import MicrophoneOn from "./assets/Microphone.gif";
import axios from "axios";

const App = () => {
  const [text, setText] = useState("");
  const [mikeOn, setMikeOn] = useState(false);
  const [sentMessages, setSentMessages] = useState([]);
// temp changes 
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (listening) {
      setText(transcript);
    }
  }, [transcript, listening]);

  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: "en-IN" });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleMicrophoneOnClick = () => {
    resetTranscript();
    startListening();
    setMikeOn(true);
  };

  const handleMicrophoneOffClick = () => {
    SpeechRecognition.stopListening();
    setMikeOn(false);
    setText(transcript);
  };
const handleComponentClick  =(text)=>{
  setText(text);
  // handleSubmit();
}
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSentMessages((prev) => [...prev, { type: "user", message: text }]);
      const userText = text;
      setText("");
      const response = await axios.post("http://localhost:3000/user/getMessage",{
        text : userText
      });
      const data = response.data; 
      
      
      setSentMessages((prev) => [...prev, { type: "chatGpt", message: data }]);
      
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <header className="w-full py-4 flex justify-center items-center px-8 ">
        <div className="text-xl font-bold">
          <img src={chatGptIcon} className="w-30 h-20" alt="ChatGPT Icon" />
        </div>
      </header>
      <div className="flex flex-col items-center mt-8">
        <div className="flex gap-10">
          <div className="" >
          <div onClick={()=>handleComponentClick( "Python script for daily email reports")} className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer mb-10">
            <div className="flex justify-center">
              <SiAeroflot className="text-yellow-400 text-3xl" />
            </div>
            <p> Python script for daily email reports</p>
          </div>
          <div onClick={()=>handleComponentClick( "Write a story in my favorite genre ")} className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer">
            <div className="flex justify-center">
              <FaCode className="text-red-400 text-3xl" />
            </div>
            <p> Write a story in my favorite genre</p>
          </div>
          </div>
          <div>
          <div onClick={()=>handleComponentClick( "Fun fact about the Roman Empire")} className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer mb-10">
            <div className="flex justify-center">
              <RiShoppingBag3Line className="text-purple-400 text-3xl" />
            </div>
            <p> Fun fact about the Roman Empire</p>
          </div>
          <div onClick={()=>handleComponentClick("Explain superconductors")} className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer">
            <div className="flex justify-center">
              <IoPencil className="text-orange-400 text-3xl" />
            </div>
            <p> Explain superconductors</p>
          </div>
          </div>
        </div>
      </div>
      <div className="w-full px-4">
        {sentMessages.map((item, index) => (
          <div
            key={index}
            className={`flex ${item.type === "user" ? "justify-start" : "justify-end"} my-2`}
          >
            <div className={`p-3 rounded-lg ${item.type === "user" ? "bg-blue-200" : "bg-green-200"} max-w-md`}>
              {item.message}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex mt-auto mb-10 ">
  <div className="flex items-center mb-4 md:mb-0">
    {!mikeOn ? (
      <FaMicrophone
        onClick={handleMicrophoneOnClick}
        className="text-3xl cursor-pointer text-gray-600 hover:text-gray-800 transition-colors duration-300"
      />
    ) : (
      <img
        src={MicrophoneOn}
        onClick={handleMicrophoneOffClick}
        className="w-[50px] h-[50px] cursor-pointer"
        alt="Microphone On"
      />
    )}
  </div>
  <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-2 w-full">
    <input
      type="text"
      onFocus={handleMicrophoneOffClick}
      value={text}
      onChange={(e) => setText(e.target.value)}
      className="bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-2 w-full md:w-[50vw] h-12 focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-200 transition-all duration-300"
      placeholder="Message ChatGPT"
    />
    <button
      type="submit"
      className="flex items-center justify-center bg-blue-500 text-white rounded-lg px-4 py-2 h-12 w-full md:w-auto mt-2 md:mt-0 hover:bg-blue-600 transition-colors duration-300"
    >
      <IoMdSend className="text-2xl" />
    </button>
  </form>
</div>

    </div>
  );
};

export default App;

