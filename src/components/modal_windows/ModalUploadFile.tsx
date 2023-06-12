import {useItems} from "../../hooks/useItems";
import {SET_UPLOAD_FILE} from "../../storeToolkit/reducers/item_reducer/itemsActions";
import {uploadNewFile} from "../../storeToolkit/reducers/item_reducer/itemsReducer";
import {setUploadFileData, value} from "../../auxiliary_functions/auxiliary_functions";

const ModalUploadFile = () => {

    const {dispatch, uploadFile, folderPath, fileName} = useItems();

    return <>
        <button type="button" className="btn btn-sm btn-secondary mb-4" data-bs-toggle="modal"
                data-bs-target="#exampleModal1">
            Upload file
        </button>
        <div className="modal fade" id="exampleModal1" tabIndex={-1} aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 text-dark" id="exampleModalLabel">Upload file</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                onClick={() => dispatch(SET_UPLOAD_FILE(''))}
                        />
                    </div>
                    <div className="modal-body">
                        <input
                            onChange={(event) => setUploadFileData(dispatch, event)}
                            className="form-control"
                            type="file"
                            value={value(uploadFile)}
                        />
                    </div>
                    <div className="modal-footer">
                        <button
                            onClick={() => {
                                dispatch(uploadNewFile({folderPath, fileName, uploadFile}));
                                dispatch(SET_UPLOAD_FILE(''));
                            }}
                            type="button"
                            className="btn btn-sm btn-secondary"
                            data-bs-dismiss="modal"
                        > Upload file
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
};

export default ModalUploadFile;