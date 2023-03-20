import React from "react";
import AuthNavigation from "./AuthNavigation";
import { Provider } from "react-redux";
import { store } from "./components/store";

export default function App() {
  return (
    <Provider store={store}>
      <AuthNavigation />
    </Provider>
  );
}
