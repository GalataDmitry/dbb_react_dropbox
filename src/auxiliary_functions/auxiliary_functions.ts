import {ChangeEvent} from "react";
import {getAccessToken, getAllItems, getPreview} from "../storeToolkit/reducers/item_reducer/itemsReducer";
import {AppDispatch} from "../storeToolkit/hooks/hooks";
import {
    CUT_ARRAY_FOLDER_NAME_FOR_BC, SET_ERROR_MESSAGE, SET_FILE_NAME,
    SET_FOLDER_NAME_FOR_BC,
    SET_FOLDER_PATH, SET_REGISTRATION_CODE, SET_UPLOAD_FILE
} from "../storeToolkit/reducers/item_reducer/itemsActions";
import {
    CutArrayTypes,
    SetFoldersAndFilesDataTypes,
    SetFoldersNavigationDataTypes,
    ValueTypes
} from "../types/types";

const cutArray: CutArrayTypes = (array, name) => {
    const findIdx = array.findIndex(el => el.name === name);
    return {findIdx, array};
};

export const setMainNavigationData = (dispatch: AppDispatch) => {
    dispatch(SET_FOLDER_NAME_FOR_BC([]));
    dispatch(SET_FOLDER_PATH(''));
    dispatch(getAllItems(''));
};

export const setFoldersNavigationData: SetFoldersNavigationDataTypes = (el, dispatch, folderNameForBC) => {
    dispatch(CUT_ARRAY_FOLDER_NAME_FOR_BC(cutArray(folderNameForBC, el.name)));
    dispatch(SET_FOLDER_PATH(el.path));
    dispatch(getAllItems(`/${el.path}`));
};

export const setFoldersAndFilesData: SetFoldersAndFilesDataTypes = (el, dispatch, folderNameForBC, folderPath) => {
    if (el[".tag"] === 'folder') {
        dispatch(SET_FOLDER_PATH(el.path_lower));
        dispatch(SET_FOLDER_NAME_FOR_BC([...folderNameForBC, {
            name: el.name,
            path: el.path_lower
        }]));
        dispatch(getAllItems(`${el.path_lower}`));
    } else dispatch(getPreview({folderPath, name: el.name}));
};

export const setRegistrationData = (dispatch: AppDispatch, registrationCode: string) => {
    dispatch(getAccessToken(registrationCode));
    dispatch(SET_REGISTRATION_CODE(''));
    dispatch(SET_ERROR_MESSAGE(''));
};

export const value: ValueTypes = (uploadFile) => {
    if (typeof uploadFile === 'string') return uploadFile;
};

export const setUploadFileData = (dispatch: AppDispatch, event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
        dispatch(SET_UPLOAD_FILE(event.target.files[0]));
        dispatch(SET_FILE_NAME(event.target.files[0].name));
    }
};