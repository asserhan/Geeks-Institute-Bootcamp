import React, { useState } from 'react';

function App() {
  const [languages, setLanguages] = useState([
    {name: "Php", votes: 0},
    {name: "Python", votes: 0},
    {name: "JavaScript", votes: 0},
    {name: "Java", votes: 0}
  ]);

  const increaseVotes = (languageName) => {
    setLanguages(languages.map(lang =>
      lang.name === languageName ? {...lang, votes: lang.votes + 1} : lang
    ));
  };

  return (
    
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-black text-center mb-8">
          Vote Your Language!
        </h1>
        
        <div className="border-2 border-black">
          {languages.map((language, index) => (
            <div 
              key={index} 
              className={`flex ${index !== languages.length - 1 ? 'border-b-2 border-black' : ''}`}
            >
              {/* Vote count column */}
              <div className="w-16 bg-orange-200 border-r-2 border-black flex items-center justify-center py-4">
                <span className="text-xl font-bold text-black">
                  {language.votes}
                </span>
              </div>
              
              {/* Language name column */}
              <div className="flex-1 bg-orange-200 border-r-2 border-black flex items-center justify-center py-4">
                <span className="text-xl font-bold text-black">
                  {language.name}
                </span>
              </div>
              
              {/* Button column */}
              <div className="w-32 bg-orange-200 flex items-center justify-center py-4">
                <button
                  onClick={() => increaseVotes(language.name)}
                  className="text-green-600 text-lg font-bold hover:text-green-700 transition-colors bg-transparent border-none cursor-pointer"
                >
                  Click Here
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;