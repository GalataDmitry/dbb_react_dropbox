
export const getAllItemsConfig = (path: string) => {
    const data = {path};
    return {
        url: 'https://api.dropboxapi.com/2/files/list_folder',
        headers: {'Content-Type': 'application/json'},
        data
    };
};
