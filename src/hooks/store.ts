import { RootState, AppDispatch } from '../store/index'
import { useSelector, useDispatch } from 'react-redux'
import { TypedUseSelectorHook } from 'react-redux'
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch
