import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {toolkit_store} from "../../index";

export type AppDispatch = typeof toolkit_store.dispatch;
export type RootState = ReturnType<typeof toolkit_store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;