import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {createReduxStore, persistCreator} from "./storeToolkit/store";
import App from './components/App';
import './style/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const toolkit_store = createReduxStore();
const persist = persistCreator(toolkit_store);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(<Provider store={toolkit_store}>
    <PersistGate loading={null} persistor={persist}>
        <App/>
    </PersistGate>
</Provider>);
