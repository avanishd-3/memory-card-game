import CardGrid from "@/components/ui/card_grid";
import { useState } from "react";

function ScoreBoard({bestScore, currentScore}: {bestScore: number, currentScore: number}) {
  // Have current score increment when right card is clicked
  // Best score is only for current session (not putitng in local storage or having accounts)

  return (
    <>
    {/* Items start aligns score and best score vertically */}
    <div className="flex flex-col items-start mb-4"> 
      <span className="text-lg text-center">Score: {currentScore}</span>
      <span className="text-lg text-center">Best Score: {bestScore}</span>
    </div>
    
    </>
  )
}

function App() {

  const [bestScore, setBestScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

  const handleCorrectCardClick = () => {
    setCurrentScore((prevScore) => (prevScore + 1));
  };

  // Update best score before reset -> this looks better than multiple increments when breaking streak
  const handleIncorrectCardClick = () => {
    if (currentScore > bestScore) {
      setBestScore(currentScore);
    }

    // Reset current score to 0 if incorrect card is clicked
    setCurrentScore(0);
  };

  return (
    <>
      <div className="flex justify-between items-center mt-4 px-8">
        <h1 className="text-2xl font-medium">Memory Card Game</h1>
        {/* Scoreboard should be at top right of screen */}
        <ScoreBoard
          bestScore={bestScore}
          currentScore={currentScore}/>
      </div>

        {/* Explanation paragrraph*/}
        <p className="text-sm text-gray-600 ml-8">
          Click on a card to score points. Don't click the same one twice.
        </p>

      <div className="flex justify-center mt-8">
        <CardGrid 
         incrementCurrentScore={handleCorrectCardClick}
         resetCurrentScore={handleIncorrectCardClick}
        />
      </div>
    </>
    
  )
}

export default App
