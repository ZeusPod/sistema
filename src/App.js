import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/router/AppRouter";
import { store } from "./redux/store/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
