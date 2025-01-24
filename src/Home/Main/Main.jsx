import { useState, useEffect, useRef } from "react";
import "./Main.css";
import ThemeToggle from "../../components/ThemeToggle";
import reload from "../../assets/reload.png";
import left_arrow from "../../assets/left-arrow.png";
import down_arrow from "../../assets/down-arrow.png";

const Main = ({ setIsOpen, isOpen, toggleButtonRef }) => {
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
  const [language, setLanguage] = useState("English");

  const shuffleArray = (array) => {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  };

  const fetchWords = () => {
    fetch(language === "English" ? "./words_en.txt" : "./words_ro.txt")
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
      setInput("");
      setInputDisabled(false);
      setTimerStarted(false);
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

  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  useEffect(() => {
    fetchWords();
  }, [language]);

  const { toggleTheme, theme } = ThemeToggle();

  const settingsRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target) &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="main">
      <div className={`settings ${isOpen ? "open" : ""}`} ref={settingsRef}>
        <div className="menu-item" onClick={() => toggleCategory("theme")}>
          <p>Theme</p>
          {openCategory === "theme" ? (
            <img src={left_arrow} alt="left arrow"></img>
          ) : (
            <img src={down_arrow} alt="down arrow"></img>
          )}
        </div>
        {openCategory === "theme" && (
          <div className="submenu">
            <label>
              Light
              <input
                type="radio"
                checked={theme === "light"}
                onChange={toggleTheme}
              />
            </label>
            <label>
              Dark
              <input
                type="radio"
                checked={theme === "dark"}
                onChange={toggleTheme}
              />
            </label>
          </div>
        )}
        <div className="menu-item" onClick={() => toggleCategory("language")}>
          <p>Language</p>
          {openCategory === "language" ? (
            <img src={left_arrow} alt="left arrow"></img>
          ) : (
            <img src={down_arrow} alt="down arrow"></img>
          )}
        </div>
        {openCategory === "language" && (
          <div className="submenu">
            <label>
              English
              <input
                type="radio"
                checked={language === "English"}
                onChange={() => {
                  setLanguage("English");
                  setCorrectWords(0);
                  setIncorrectWords(0);
                  setInput("");
                  setTimerStarted(false);
                }}
                disabled={timerStarted}
              />
            </label>
            <label>
              Romanian
              <input
                type="radio"
                checked={language === "Romanian"}
                onChange={() => {
                  setLanguage("Romanian");
                  setCorrectWords(0);
                  setIncorrectWords(0);
                  setInput("");
                  setTimerStarted(false);
                }}
                disabled={timerStarted}
              />
            </label>
          </div>
        )}
        <div className="menu-item" onClick={() => toggleCategory("time")}>
          <p>Time</p>
          {openCategory === "time" ? (
            <img src={left_arrow} alt="left arrow"></img>
          ) : (
            <img src={down_arrow} alt="down arrow"></img>
          )}
        </div>
        {openCategory === "time" && (
          <div className="submenu">
            <label>
              0:30
              <input
                type="radio"
                checked={timer === 30}
                onChange={() => {
                  setTimer(30);
                  setCorrectWords(0);
                  setIncorrectWords(0);
                  setInput("");
                  setTimerStarted(false);
                  fetchWords();
                }}
                disabled={timerStarted}
              />
            </label>
            <label>
              1:00
              <input
                type="radio"
                checked={timer === 60}
                onChange={() => {
                  setTimer(60);
                  setCorrectWords(0);
                  setIncorrectWords(0);
                  setInput("");
                  setTimerStarted(false);
                  fetchWords();
                }}
                disabled={timerStarted}
              />
            </label>
            <label>
              2:00
              <input
                type="radio"
                checked={timer === 120}
                onChange={() => {
                  setTimer(120);
                  setCorrectWords(0);
                  setIncorrectWords(0);
                  setInput("");
                  setTimerStarted(false);
                  fetchWords();
                }}
                disabled={timerStarted}
              />
            </label>
          </div>
        )}
      </div>
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
