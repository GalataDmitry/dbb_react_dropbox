import {createAction} from "@reduxjs/toolkit";
import {FolderNameForBCType} from "./types";
import {CutArrayTypes} from "./types";

export const SET_FOLDER_PATH = createAction<string>('setFolderPath');
export const SET_FOLDER_NAME_FOR_BC = createAction<Array<FolderNameForBCType>>('serFolderNameForBC');
export const CUT_ARRAY_FOLDER_NAME_FOR_BC = createAction<CutArrayTypes>('cutArray');
export const SET_NEW_FOLDER_NAME = createAction<string>('setNewFolderName');
export const SET_UPLOAD_FILE = createAction<File | string>('setUploadFile');
export const SET_FILE_NAME = createAction<string>('setFileName');
export const SET_REGISTRATION_CODE = createAction<string>('setRegistrationCode');
export const SET_IS_AUTH = createAction<boolean>('setIsAuth');
export const SET_ERROR_MESSAGE = createAction<string>('setErrorMessage');