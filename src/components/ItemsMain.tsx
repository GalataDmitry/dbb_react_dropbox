import {useEffect} from "react";
import ModalAddFolder from "./modal_windows/ModalAddFolder";
import {getAllItems} from "../storeToolkit/reducers/item_reducer/itemsReducer";
import {useItems} from "../hooks/useItems";
import Navigation from "./Navigation";
import ItemsList from "./ItemsList";
import ModalUploadFile from "./modal_windows/ModalUploadFile";
import LogOut from "./LogOut";

const ItemsMain = () => {

    const {dispatch, folderPath} = useItems();

    useEffect(() => {
        dispatch(getAllItems(folderPath));
    }, []);

    return <div className='container'>
        <ModalAddFolder/>
        <ModalUploadFile/>
        <LogOut/>
        <div className="row">
            <div className="col">
                <div className="card radius-10 ">
                    <Navigation/>
                    <ItemsList/>
                </div>
            </div>
        </div>
    </div>
};

export default ItemsMain;