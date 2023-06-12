export interface FolderNameForBCType {
    name: string
    path: string
}

export interface AddAndDeleteFolderDataTypes {
    path: string
    folderPath: string
}

export interface CutArrayTypes {
    findIdx: number
    array: FolderNameForBCType[]
}

export interface UploadNewFileTypes {
    folderPath: string
    fileName?: string
    uploadFile: File | string
}

export interface GetPreviewTypes {
    folderPath: string
    name: string
}