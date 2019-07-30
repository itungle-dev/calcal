import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

const theme = createMuiTheme({});

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider theme={theme}>
			<App />
		</MuiThemeProvider>
	</Provider>,
	document.querySelector("#root")
);
