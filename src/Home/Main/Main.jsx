import { useState, useEffect } from "react";
import "./Main.css";
import reload from "../../assets/reload.png";

const Main = ({ isOpen }) => {
  const [words, setWords] = useState([]);
  const [input, setInput] = useState("");
  const [inputDisabled, setInputDisabled] = useState(false);
  const [timer, setTimer] = useState(60);
  const [timerStarted, setTimerStarted] = useState(false);
  const [correctWords, setCorrectWords] = useState(0);
  const [incorrectWords, setIncorrectWords] = useState(0);
  const totalWords = correctWords + incorrectWords;
  const accuracy =
    totalWords > 0 ? ((correctWords / totalWords) * 100).toFixed(1) : 0;
  const [isCorrect, setIsCorrect] = useState(null);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const shuffleArray = (array) => {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  };

  const fetchWords = () => {
    fetch("./words_en.txt")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.text();
      })
      .then((data) => {
        const wordsArray = data.split("\n").map((line) => line.trim());
        const shuffledWords = shuffleArray(wordsArray);
        setWords(shuffledWords);
      });
  };

  useEffect(() => {
    fetchWords();
  }, []);

  useEffect(() => {
    if (timerStarted && timer > 0) {
      const timerChanger = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => {
        clearInterval(timerChanger);
      };
    } else if (timer === 0) {
      setInputDisabled(true);
      setInput("");
    }
  }, [timer, timerStarted]);

  const handleInput = (e) => {
    setInput(e.target.value);
    if (!timerStarted) {
      setTimerStarted(true);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleKeyPress = (e) => {
    if (e.key === " ") {
      const currentWord = input.trim().split(" ").pop();
      setWords((prevWords) => prevWords.slice(1));
      setInput("");
      if (currentWord === words[0]) {
        setCorrectWords((prevCorrectWords) => prevCorrectWords + 1);
      } else {
        setIncorrectWords((prevIncorrectWords) => prevIncorrectWords + 1);
      }
    }
  };

  useEffect(() => {
    if (input === "") {
      setIsCorrect(null);
      setIsIncorrect(false);
    } else if (input.trim() === words[0]) {
      setIsCorrect(true);
      setIsIncorrect(false);
    } else if (!words[0].startsWith(input.trim())) {
      setIsCorrect(false);
      setIsIncorrect(true);
    } else {
      setIsCorrect(null);
      setIsIncorrect(false);
    }
  }, [input]);

  return (
    <div className="main">
      <div className={`settings ${isOpen ? "open" : ""}`}>123</div>
      <div className="timer">{formatTime(timer)}</div>
      <input
        type="text"
        placeholder="Start typing..."
        value={input}
        disabled={inputDisabled}
        onChange={handleInput}
        onKeyDown={handleKeyPress}
      ></input>
      <div className="wordcontainer">
        {words.map((words, index) => (
          <div
            key={index}
            className={`word ${index === 0 ? "first" : ""} ${
              isCorrect && index === 0 ? "correct" : ""
            } ${isIncorrect && index === 0 ? "incorrect" : ""}`}
          >
            {words}
          </div>
        ))}
      </div>
      <div className="utilitycontainer">
        <button
          className="reload"
          onClick={() => fetchWords()}
          disabled={timerStarted}
        >
          <img src={reload} alt="Reload" />
        </button>
        <div className="stats">
          <div className="statsitem">WPM: {correctWords}</div>
          <div className="statsitem">Accuracy: {accuracy}%</div>
          <div className="statsitem">Incorrect Words: {incorrectWords}</div>
        </div>
        <button
          className="playagain"
          onClick={() => {
            setCorrectWords(0);
            setIncorrectWords(0);
            setTimer(60);
            setInput("");
            setInputDisabled(false);
            setTimerStarted(false);
            fetchWords();
          }}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default Main;
