import {InitialStateItemsReducerTypes} from "./initialStateItemsReducerTypes";

export const initialStateItemReducer: InitialStateItemsReducerTypes = {
    items: {} as InitialStateItemsReducerTypes['items'],
    folderPath: '',
    folderNameForBC: [],
    newFolderName: '',
    uploadFile: '',
    fileName: '',
    isAuth: false,
    registrationCode: '',
    errorMassage: '',
};