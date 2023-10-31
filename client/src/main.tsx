import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./sass/style.scss";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./state/index.ts";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
