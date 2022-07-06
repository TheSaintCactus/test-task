import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { App } from "./components/App";
import store from "./redux/store";

const Global = createGlobalStyle`
* {
  font-family: 'Roboto', sans-serif;
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
}



#root {
}

img {
  max-width: 100%;
}

pre {
  background-color: #363636;
  display: block;
  color: white;
  margin: 20px 0;
  padding: 15px;
  max-width: 100%;
  overflow: auto;
}

code:not(pre code) {
  background-color: hsl(210deg 4% 89%);
  display: inline-block;
  padding: 2px 4px 2px 4px;
  
  border-radius: 7px;;
}
`

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Global/>
            <App />
        </Router>
    </Provider>,
    document.getElementById("root")
)

