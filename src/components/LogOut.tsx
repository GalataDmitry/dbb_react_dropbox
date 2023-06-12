import {SET_IS_AUTH} from "../storeToolkit/reducers/item_reducer/itemsActions";
import {useItems} from "../hooks/useItems";

const LogOut = () => {

    const {dispatch} = useItems();

    return <button
        onClick={() => {
            dispatch(SET_IS_AUTH(false))
            localStorage.clear()
        }}
        type="button"
        className="btn btn-sm btn-secondary mb-4 ms-2"
    > Log out
    </button>
};

export default LogOut;