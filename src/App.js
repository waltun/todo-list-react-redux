// import components
import Todo from "./components/todo";

// import redux
import { Provider } from "react-redux";
import { store } from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <Todo />
    </Provider>
  );
}
