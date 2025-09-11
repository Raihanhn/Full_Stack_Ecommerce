import "@/styles/globals.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store";
import Navbar from "@/components/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
      <Navbar />
      <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
