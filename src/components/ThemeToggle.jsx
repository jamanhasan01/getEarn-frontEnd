import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Check for saved theme in localStorage when the component mounts
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkTheme(true);
      document.body.classList.add("dark"); // Apply dark mode
    } else {
      setIsDarkTheme(false);
      document.body.classList.add("light"); // Apply light mode
    }
  }, []);

  // Switch to dark theme
  const switchToDark = () => {
    setIsDarkTheme(true);
    document.body.classList.replace("light", "dark"); // Replace light with dark
    localStorage.setItem("theme", "dark"); // Save theme preference
  };

  // Switch to light theme
  const switchToLight = () => {
    setIsDarkTheme(false);
    document.body.classList.replace("dark", "light"); // Replace dark with light
    localStorage.setItem("theme", "light"); // Save theme preference
  };

  return (
    <div className="text-3xl mt-[3px]">
      {isDarkTheme ? (
        <button onClick={switchToLight}>
          <FaMoon />
        </button>
      ) : (
        <button className=" text-white" onClick={switchToDark}>
          <FaSun />
        </button>
      )}
    </div>
  );
};

export default ThemeToggle;
