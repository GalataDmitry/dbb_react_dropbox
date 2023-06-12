import {AppDispatch} from "../storeToolkit/hooks/hooks";

export interface ItemsTypes {
    ".tag": string
    id: string
    name: string
    path_display: string
    path_lower: string
}

export interface FolderNameForBCType {
    name: string
    path: string
}

export interface CutArrayTypes {
    (array: FolderNameForBCType[], name: string): { findIdx: number, array: FolderNameForBCType[] }
}

export interface SetFoldersNavigationDataTypes {
    (el: FolderNameForBCType, dispatch: AppDispatch, folderNameForBC: FolderNameForBCType[]): void

}

export interface SetFoldersAndFilesDataTypes {
    (el: ItemsTypes, dispatch: AppDispatch, folderNameForBC: FolderNameForBCType[], folderPath: string): void
}

export interface ValueTypes {
    (uploadFile: string | File ): string | undefined
}