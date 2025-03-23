import { useState } from "react";
import axios from "axios";
import {
  FaRegCommentDots,
  FaUserCircle,
  FaPlus,
  FaSearch,
  FaBars,
} from "react-icons/fa";
import { motion } from "framer-motion";

function App() {
  const [questions, setQuestions] = useState("");
  const [answer, setAnswer] = useState("Hello Gemini Users ...");
  const [history, setHistory] = useState([]);

  async function generateAnswer() {
    if (!questions.trim()) return;
    setAnswer("Loading ..");
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyB3TsppcwanhQI5ElMN3mMEzaV34tvD1Gg",
      method: "post",
      data: {
        contents: [
          {
            parts: [{ text: questions }],
          },
        ],
      },
    });

    const rawText =
      response["data"]["candidates"][0]["content"]["parts"][0]["text"];
    setAnswer(formatText(cleanText(rawText)));
    setHistory((prev) => [questions, ...prev.slice(0, 4)]);
    setQuestions("");
  }

  function cleanText(text) {
    return text.replace(/\*\*(.*?)\*\*/g, "$1"); // Removes **bold** formatting
  }

  function formatText(text) {
    return text.replace(/\n\n/g, "\n").replace(/\n/g, "<br /><br />");
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      generateAnswer();
    }
  }

  function loadFromHistory(item) {
    setQuestions(item);
    generateAnswer();
  }

  function handleNewChat() {
    setQuestions("");
    setAnswer("Hello Gemini Users ...");
  }

  return (
    <div className="flex min-h-screen bg-gray-100 flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-4 shadow-md flex justify-between items-center w-full fixed top-0 left-0 right-0 z-10"
      >
        <FaBars className="text-gray-700 text-2xl cursor-pointer" />
        <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 font-bold text-2xl">
          Hello, Gemini SwiftChat
        </h2>
        <FaUserCircle className="text-gray-700 text-3xl cursor-pointer" />
      </motion.div>

      <div className="flex flex-grow mt-16">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-64 bg-gray-900 text-white p-6 flex flex-col space-y-4 shadow-lg"
        >
          <h2 className="text-xl font-bold text-center">Gemini AI SwiftChat</h2>
          <button
            className="flex items-center space-x-2 text-gray-300 hover:text-white"
            onClick={handleNewChat}
          >
            <FaPlus /> <span>New Chat</span>
          </button>
          <h3 className="text-gray-400 text-sm mt-4">Recent</h3>
          <ul className="space-y-2 text-gray-300">
            {history.map((item, index) => (
              <li
                key={index}
                className="hover:text-white flex items-center space-x-2 cursor-pointer"
                onClick={() => loadFromHistory(item)}
              >
                <FaRegCommentDots /> <span>{item.slice(0, 20)}...</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col flex-grow items-center justify-center px-6">
          {/* Welcome Message Box */}
          <div className="bg-white shadow-md rounded-xl p-6 mt-6 max-w-4xl w-full flex flex-col items-center space-y-4 text-center">
            <p className="text-lg font-semibold">
              Welcome to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 font-bold">
                Gemini SwiftChat
              </span>
              , your personal AI assistant
            </p>
            <p className="text-sm text-gray-600 mt-2">
              <a href="#" className="text-blue-500 hover:underline">
                Google Terms
              </a>{" "}
              and the{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Gemini Apps Privacy Notice
              </a>{" "}
              apply. Chats are reviewed and used to improve Google AI.{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Learn about your choices
              </a>
              . Gemini can make mistakes, so double-check it.{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Info about your location
              </a>{" "}
              is also stored with your Gemini Apps activity.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full max-w-4xl mt-6">
            <input
              type="text"
              placeholder="Ask Gemini"
              className="w-full p-6 border border-gray-300 rounded-lg pl-12 text-lg h-20"
              value={questions}
              onChange={(e) => setQuestions(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500 text-2xl" />
          </div>

          {/* Answer Display */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-8 mt-6 bg-white shadow-md rounded-lg border border-gray-700 w-full max-w-4xl text-lg text-gray-700 min-h-[300px]"
          >
            <div dangerouslySetInnerHTML={{ __html: answer }}></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default App;
