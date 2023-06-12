import {v4 as uuidv4} from 'uuid';
import {useItems} from "../hooks/useItems";
import {setFoldersNavigationData, setMainNavigationData} from "../auxiliary_functions/auxiliary_functions";

const Navigation = () => {

    const {dispatch, folderNameForBC} = useItems();

    return <nav aria-label="breadcrumb" aria-current="page" className='ms-3 mt-3'>
        <ol className="breadcrumb">
            <a href="#"
               className="link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover"
               onClick={() => setMainNavigationData(dispatch)}
            > main
            </a>
            <li className="breadcrumb-item"/>
            {folderNameForBC?.map((el) =>
                <li key={uuidv4()} className="breadcrumb-item">
                    <a href="#"
                       className="link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover"
                       onClick={() => setFoldersNavigationData(el, dispatch, folderNameForBC)}
                    > {el.name}
                    </a>
                </li>
            )}
        </ol>
    </nav>
};

export default Navigation;