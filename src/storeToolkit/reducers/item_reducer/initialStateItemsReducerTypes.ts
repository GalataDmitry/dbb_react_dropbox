import {FolderNameForBCType} from "./types";

export interface InitialStateItemsReducerTypes {
    items: {
        entries: [{
            ".tag": string
            id: string
            name: string
            path_display: string
            path_lower: string
        }]
        cursor: string
        has_more: boolean
    }
    folderPath: string
    folderNameForBC: FolderNameForBCType[]
    newFolderName: string
    uploadFile: File | string
    fileName: string
    isAuth: boolean
    registrationCode: string
    errorMassage: string
}