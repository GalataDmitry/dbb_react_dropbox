import axios, {AxiosRequestConfig} from "axios";
import {createAsyncThunk, createReducer} from "@reduxjs/toolkit";
import {initialStateItemReducer} from "./initialStateItemReducer";
import {AddAndDeleteFolderDataTypes, GetPreviewTypes, UploadNewFileTypes} from "./types";
import {axiosApi} from "../../../axios/axios";
import {InitialStateItemsReducerTypes} from "./initialStateItemsReducerTypes";
import {getAllItemsConfig} from "./auxiliary_functions";
import {
    CUT_ARRAY_FOLDER_NAME_FOR_BC,
    SET_ERROR_MESSAGE,
    SET_FILE_NAME,
    SET_FOLDER_NAME_FOR_BC,
    SET_FOLDER_PATH,
    SET_IS_AUTH,
    SET_NEW_FOLDER_NAME,
    SET_REGISTRATION_CODE,
    SET_UPLOAD_FILE,
} from "./itemsActions";

export const getAccessToken = createAsyncThunk(
    'getAccessToken',
    async (registrationCode: string, {rejectWithValue}) => {

        const data = {
            code: registrationCode,
            grant_type: 'authorization_code',
            client_id: 'xa1r6sx4h2u4way',
            client_secret: '98cr69bkvski9av'
        };
        const config = {
            method: 'post',
            url: 'https://api.dropboxapi.com/oauth2/token',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data
        };

        return await axios.request(config).then((response) => {
            return response.data
        }).catch(() => {
            return rejectWithValue('Invalid registration code')
        });
    }
);

export const getAllItems = createAsyncThunk(
    'getAllItems',
    async (path: string) => {

        const data = {path};
        const config = {
            url: 'https://api.dropboxapi.com/2/files/list_folder',
            headers: {'Content-Type': 'application/json'},
            data
        };

        return await axiosApi(config).then((response) => {
            return response.data
        }).catch((error) => {
            console.log('getAllItems error', error);
        });
    }
);

export const addFolder = createAsyncThunk<InitialStateItemsReducerTypes['items'], AddAndDeleteFolderDataTypes>(
    'addFolder',
    async (addFolderData) => {

        const {path, folderPath} = addFolderData
        const data = {
            autorename: false,
            path
        }
        const config = {
            url: 'https://api.dropboxapi.com/2/files/create_folder_v2',
            headers: {'Content-Type': 'application/json'},
            data
        };

        return await axiosApi(config).then((response) => {
            if (response.status === 200)
                return axiosApi(getAllItemsConfig(folderPath)).then((response) => {
                    return response.data
                }).catch((error) => {
                    console.log('getAllItems error', error);
                });
        }).catch((error) => {
            console.log('addFolder error', error);
        });
    }
);

export const deleteItems = createAsyncThunk(
    'deleteItems',
    async (deleteItemsData: AddAndDeleteFolderDataTypes) => {

        const {path, folderPath} = deleteItemsData;
        const data = {path};
        const config = {
            url: 'https://api.dropboxapi.com/2/files/delete_v2',
            headers: {'Content-Type': 'application/json'},
            data
        };

        return await axiosApi(config).then((response) => {
            if (response.status === 200)
                return axiosApi(getAllItemsConfig(folderPath)).then((response) => {
                    return response.data
                }).catch((error) => {
                    console.log('getAllItems error', error);
                });
        }).catch((error) => {
            console.log('deleteItems error', error);
        });
    }
);

export const uploadNewFile = createAsyncThunk(
    'uploadFile',
    async (uploadFileData: UploadNewFileTypes) => {

        const {folderPath, fileName, uploadFile} = uploadFileData
        const config: AxiosRequestConfig = {
            url: 'https://content.dropboxapi.com/2/files/upload',
            headers: {
                'Content-Type': 'application/octet-stream',
                'Dropbox-API-Arg': `{"path":"${folderPath}/${fileName}"}`
            },
            data: uploadFile
        }

        return await axiosApi(config).then((response) => {
            if (response.status === 200)
                return axiosApi(getAllItemsConfig(folderPath)).then((response) => {
                    return response.data
                }).catch((error) => {
                    console.log('getAllItems error', error);
                });
        }).catch((error) => {
            console.log('uploadFile error', error);
        });
    }
);


export const getPreview = createAsyncThunk(
    'getPreview',
    async (getPreviewData: GetPreviewTypes) => {

        const {folderPath, name} = getPreviewData
        const config: AxiosRequestConfig = {
            url: 'https://content.dropboxapi.com/2/files/get_preview',
            headers: {
                'Dropbox-API-Arg': `{"path":"${folderPath}/${name}"}`,
            },
            responseType: 'blob'
        }

        return await axiosApi(config).then((response) => {
            const blob = new Blob([response.data], {type: response.headers['content-type']})
            const fileURL = URL.createObjectURL(blob)
            window.open(fileURL)
            URL.revokeObjectURL(fileURL)
        }).catch((error) => {
            console.log('getPreview error', error);
        });
    }
);

export const itemsReducer = createReducer(initialStateItemReducer, (builder) => {
    builder
        .addCase(getAccessToken.fulfilled, (state, action) => {
            if (action.payload) {
                state.isAuth = true
                localStorage.setItem('accessToken', action.payload.access_token)
                localStorage.setItem('refreshToken', action.payload.refresh_token)
            }
        })
        .addCase(getAccessToken.rejected, (state, action) => {
            state.errorMassage = action.payload as string
        })
        .addCase(getAllItems.fulfilled, (state, action) => {
            state.items = action.payload
        })
        .addCase(addFolder.fulfilled, (state, action) => {
            state.items = action.payload
        })
        .addCase(deleteItems.fulfilled, (state, action) => {
            state.items = action.payload
        })
        .addCase(uploadNewFile.fulfilled, (state, action) => {
            state.items = action.payload
        })
        .addCase(getPreview.fulfilled, (state, action) => {
        })
        .addCase(SET_FOLDER_PATH, (state, action) => {
            state.folderPath = action.payload
        })
        .addCase(SET_FOLDER_NAME_FOR_BC, (state, action) => {
            state.folderNameForBC = action.payload
        })
        .addCase(CUT_ARRAY_FOLDER_NAME_FOR_BC, (state, action) => {
            state.folderNameForBC = action.payload.array.slice(0, action.payload.findIdx + 1)
        })
        .addCase(SET_NEW_FOLDER_NAME, (state, action) => {
            state.newFolderName = action.payload
        })
        .addCase(SET_UPLOAD_FILE, (state, action) => {
            state.uploadFile = action.payload
        })
        .addCase(SET_FILE_NAME, (state, action) => {
            state.fileName = action.payload
        })
        .addCase(SET_REGISTRATION_CODE, (state, action) => {
            state.registrationCode = action.payload
        })
        .addCase(SET_IS_AUTH, (state, action) => {
            state.isAuth = action.payload
        })
        .addCase(SET_ERROR_MESSAGE, (state, action) => {
            state.errorMassage = action.payload
        })
})