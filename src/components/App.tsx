import Registration from "./Registration";
import ItemsMain from "./ItemsMain";
import {useItems} from "../hooks/useItems";
import '../style/App.css';

const App = () => {

    const {isAuth} = useItems()

    if (isAuth) return <div className="App">
        <header className="App-header ">
            <ItemsMain/>
        </header>
    </div>
    if (!isAuth && localStorage.getItem('accessToken') === null) return <div className="App">
        <header className="App-header">
            <Registration/>
        </header>
    </div>
    else return null
};

export default App;
