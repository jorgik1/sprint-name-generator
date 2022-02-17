import React, { useState, useEffect } from 'react'
import './App.scss';
import Result from './components/Result';
import { adjectives } from './words/adjectives'
import { nouns } from './words/nouns'

export default function App() {

  const [adjectivesList, setAdjectivesList] = useState<string[]>([]);
  const [nounsList, setNounsList] = useState<string[]>([]);
  const [sprintName, setSprintName] = useState<string>("");

  useEffect(() => {
    setAdjectivesList(adjectives);
    setNounsList(nouns);
  }, [])

  const handleGenerate = () => {
    const selectedAdjIndex = Math.floor(Math.random() * adjectivesList.length)
    const selectedNounIndex = Math.floor(Math.random() * nounsList.length)

    setSprintName(`${adjectivesList[selectedAdjIndex]} ${nounsList[selectedNounIndex]}`)
}


  return (
    <div className="App">
      <div className="content">
         <h3>Sprint Name Generator</h3>
        <button className='btn-prime' onClick={handleGenerate}>Generate</button>
        <Result text={sprintName}/>
      </div>
    </div>
  );
}
