
import React from 'react'

const ThemeToggle = ({theme,toggleTheme}) => {
  return (
    <div>
      <button onClick={toggleTheme} style={{background:'#fff',color:'#000'}}>
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>
    </div>
  );
}

export default ThemeToggle
