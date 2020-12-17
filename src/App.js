import React, { useEffect, useState } from "react";
import "./styles.css";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import storage from "local-storage-fallback";
import style from "styled-theming";

const getBackground = style("mode", {
  light: "#EEE",
  dark: "#111"
});

const getForeground = style("mode", {
  light: "#111",
  dark: "#EEE"
});

const getFontSize = style("textZoom", {
  normal: "1em",
  magnify: "1.5em"
});

const GlobalStyle = createGlobalStyle`
body {
  background-color: ${getBackground};
  color: ${getForeground};
  font-size: ${getFontSize}
}
`;

function getInitialTheme() {
  const savedTheme = storage.getItem("theme");
  return savedTheme ? JSON.parse(savedTheme) : { mode: "light" };
}

function getInitialText() {
  const savedText = storage.getItem("text");
  return savedText ? JSON.parse(savedText) : { textZoom: "normal" };
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [text, setText] = useState(getInitialTheme);

  useEffect(() => {
    storage.setItem("theme", JSON.stringify(theme));
  }, [theme]);
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <div className="App">
          <button
            onClick={() =>
              theme.mode === "light"
                ? setTheme({ mode: "dark" })
                : setTheme({ mode: "light" })
            }
          >
            {theme.mode === "light"
              ? "Change to Dark Mode"
              : "Change to light mode"}
          </button>

          {/* <button
            onClick={() =>
              text.textZoom === "normal"
                ? setText({ textZoom: "zoom" })
                : setText({ textZoom: "normal" })
            }
          >
            {text.textZoom === "normal"
              ? "Change to Normal Mode"
              : "Change to Zoom mode"}
          </button> */}

          <h1>Hello CodeSandbox</h1>
          <h2>Start editing to see some magic happen!</h2>
        </div>
      </>
    </ThemeProvider>
  );
}
