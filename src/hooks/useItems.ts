import {useAppDispatch, useAppSelector} from "../storeToolkit/hooks/hooks";
import {getItemsReducerData} from "../storeToolkit/reducers/item_reducer/itemsSelectors";

export const useItems = () => {

    const dispatch = useAppDispatch();
    const itemsTableHeaders = ['name', 'type', 'id', 'delete'];
    const {
        items,
        folderPath,
        folderNameForBC,
        newFolderName,
        uploadFile,
        fileName,
        isAuth,
        registrationCode,
        errorMassage,
    } = useAppSelector(getItemsReducerData);

    return {
        dispatch,
        itemsTableHeaders,
        items,
        folderPath,
        folderNameForBC,
        newFolderName,
        uploadFile,
        fileName,
        isAuth,
        registrationCode,
        errorMassage,
    };
};