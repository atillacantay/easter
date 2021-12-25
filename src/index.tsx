import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@mui/system";
import { theme } from "./theme";
import { CssBaseline } from "@mui/material";
import i18n from "localization/i18n";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from "components/BrowserRouter";
import { history } from "utils/history";

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <BrowserRouter history={history}>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
