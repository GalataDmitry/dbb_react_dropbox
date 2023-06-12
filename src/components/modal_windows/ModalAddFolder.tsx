import {useItems} from "../../hooks/useItems";
import {SET_NEW_FOLDER_NAME} from "../../storeToolkit/reducers/item_reducer/itemsActions";
import {addFolder} from "../../storeToolkit/reducers/item_reducer/itemsReducer";

const ModalAddFolder = () => {

    const {dispatch, newFolderName, folderPath} = useItems();

    return <>
        <button type="button" className="btn btn-sm btn-secondary mb-4 me-2" data-bs-toggle="modal"
                data-bs-target="#exampleModal">
            Add folder
        </button>
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 text-dark" id="exampleModalLabel">Add folder</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                onClick={() => dispatch(SET_NEW_FOLDER_NAME(''))}
                        />
                    </div>
                    <div className="modal-body">
                        <input
                            onChange={(e) => dispatch(SET_NEW_FOLDER_NAME(e.target.value))}
                            value={newFolderName}
                            placeholder={'Enter folder name'}
                        />
                    </div>
                    <div className="modal-footer">
                        <button
                            onClick={() => {
                                dispatch(addFolder({path: `${folderPath}/${newFolderName}`, folderPath}))
                                dispatch(SET_NEW_FOLDER_NAME(''))
                            }}
                            type="button"
                            className="btn btn-sm btn-secondary"
                            data-bs-dismiss="modal"
                        > Add folder
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
};

export default ModalAddFolder;