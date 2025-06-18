import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';



function App() {

  const [languages, setLanguages] = useState([
                                            {name: "Php", votes: 0},
                                            {name: "Python", votes: 0},
                                            {name: "JavaSript", votes: 0},
                                            {name: "Java", votes: 0}
                                          ])
  // Create a function that increases the state of the votes by one, when you click on a specific language button.
  const increaseVotes = (languageName) => {
    setLanguages(languages.map(lang =>
      lang.name === languageName ? {...lang, votes: lang.votes + 1} : lang
    ))
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Vote for your favorite programming language</h1>
      </header>
      <div className="language-list">
        {languages.map((language, index) => (
          <div key={index} className="language-item">
            <h2>{language.name}</h2>
            <p>Votes: {language.votes}</p>
            <button onClick={() => increaseVotes(language.name)}>Vote</button>
          </div>
        ))}
      </div>
     

    </div>
  );
}

export default App;
