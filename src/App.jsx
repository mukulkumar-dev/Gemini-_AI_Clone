import { useState } from 'react'
import axios from 'axios';

function App() {
  const [questions, setQuestions] = useState("");
  const [answer, setAnswer] =useState("Hello Gemini Users ...");

  async function generateAnswer(){
    setAnswer('Loading ..')
    const response = await axios({
      url:"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyB3TsppcwanhQI5ElMN3mMEzaV34tvD1Gg",
      method:"post",
      data:{
        contents: [{
          parts:[{text: questions}]
        },],
      },
    });
    setAnswer(response['data']['candidates'][0]['content']['parts'][0]['text']);
  }



  return (
    <div className="flex flex-col min-h-screen">
  {/* Header */}
  <div className="bg-gradient-to-r from-indigo-600 to-purple-900 p-6 text-center shadow-lg">
    <p className="text-2xl font-bold text-white">Welcome To Gemini AI</p>
  </div>

  {/* Main Content with Background Image */}
  <div className="flex-grow flex flex-col items-center py-10">
    {/* Content Overlay for better readability */}
    <div className="bg-gray-300 bg-opacity-50 shadow-lg rounded-xl p-10 w-full max-w-3xl space-y-8">
      
      {/* Input Section */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <textarea
          className="w-full md:w-3/4 h-24 p-4 border-2 border-gray-300 rounded-lg resize-none focus:border-indigo-600 focus:ring focus:ring-indigo-200 transition"
          value={questions}
          onChange={(e) => setQuestions(e.target.value)}
          placeholder="Type your question here..."
        ></textarea>
        <button
          className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg border-2 border-indigo-700 hover:bg-indigo-700 transition"
          onClick={generateAnswer}
        >
          Generate Answer
        </button>
      </div>

      {/* Answer Display */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-inner border border-gray-300 text-gray-700">
        <pre className="font-semibold whitespace-pre-wrap">{answer}</pre>
      </div>
    </div>
  </div>

  {/* Footer */}
  <div className="bg-gray-900 p-4 text-center text-gray-400">
    <p className="text-sm">Developed by @MK</p>
  </div>
</div>

  )
}


export default App
