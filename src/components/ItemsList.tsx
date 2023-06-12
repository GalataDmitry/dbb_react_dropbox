import {v4 as uuidv4} from 'uuid';
import {deleteItems} from "../storeToolkit/reducers/item_reducer/itemsReducer";
import {useItems} from "../hooks/useItems";
import {setFoldersAndFilesData} from "../auxiliary_functions/auxiliary_functions";

const ItemsList = () => {

    const {dispatch, itemsTableHeaders, items, folderPath, folderNameForBC} = useItems()

    return <div className="card-body">
        <hr/>
        <div className="table-responsive">
            <table className="table align-middle mb-0">
                <thead className="table-light">
                <tr>{itemsTableHeaders.map((el) => {
                    return <th key={uuidv4()} className='text-center'
                    > {el}
                    </th>
                })}
                </tr>
                </thead>
                <tbody>
                {items?.entries?.map((el) => {
                    return <tr key={uuidv4()} className='text-center'>
                        <td>
                            <button
                                onClick={() => setFoldersAndFilesData(el, dispatch, folderNameForBC, folderPath)}
                                type="button"
                                className="btn btn-sm btn-secondary"
                            > {el.name}
                            </button>
                        </td>
                        <td>{el['.tag']}</td>
                        <td>{el.id}</td>
                        <td>
                            <button
                                onClick={() => dispatch(deleteItems({path: el.path_lower, folderPath}))}
                                type="button"
                                className="btn btn-sm btn-secondary"
                            > delete
                            </button>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    </div>
};

export default ItemsList;