import {useEffect} from "react";
import {useItems} from "../hooks/useItems";
import {setRegistrationData} from "../auxiliary_functions/auxiliary_functions";
import {
    SET_ERROR_MESSAGE,
    SET_REGISTRATION_CODE
} from "../storeToolkit/reducers/item_reducer/itemsActions";

const Registration = () => {

    const {dispatch, registrationCode, errorMassage} = useItems();

    useEffect(() => {
        dispatch(SET_ERROR_MESSAGE(''));
    }, []);

    return <>
        <span>{errorMassage}</span>
        <form onSubmit={event => event.preventDefault()}>
            <input
                onChange={(event) => dispatch(SET_REGISTRATION_CODE(event.target.value))}
                value={registrationCode}
                placeholder={'Enter registration code'}
            />
            <br/>
            <button
                onClick={() => setRegistrationData(dispatch, registrationCode)}
                type="button"
                className="btn btn-sm btn-secondary mt-2"
            > Registration
            </button>
        </form>
    </>
};

export default Registration;