import { applyMiddleware, compose, createStore } from "redux";
import reduxThunk from "redux-thunk";
import { reducer } from "./reducer";

const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
          })
        : compose;

const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(reduxThunk))
);

export default store;
