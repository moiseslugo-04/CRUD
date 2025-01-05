import { configureStore, type Middleware } from '@reduxjs/toolkit'
import userReducer, { rollbackUser } from './users/slice'
import { toast } from 'sonner'
import { Methods, UserId, User } from '../types'
interface Action {
  type: string
  payload: UserId | User
}
const localStorage: Middleware = (store) => (next) => (action) => {
  next(action as Action)
  window.localStorage.setItem('users', JSON.stringify(store.getState().users))
}
const syncWithDb: Middleware = (store) => (next) => (action) => {
  const messageError = () => toast.error('Something went wrong')
  const { type, payload } = action as Action
  next(action)
  if (type === 'Users/create' && typeof payload === 'object') {
    toast.success('User created successfully')
    if ('id' in payload) {
      fetch(`https://jsonplaceholder.typicode.com/users/`, {
        method: 'POST',
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (!res.ok) throw new Error('Error Trying create User')
        })
        .catch((err) => {
          messageError()
          store.dispatch(rollbackUser({ ...payload, method: Methods.CREATE }))
          console.log(err)
        })
    }

    return
  }
  const prevState = store.getState()
  if (type === 'Users/deleted') {
    const target = prevState.users.find((user: User) => user.id === payload)
    toast.success('User Deleted success') // Optimistic UI
    fetch(`https://jsonplaceholder.typicode.com/users/${payload}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error trying to delete a  User')
      })
      .catch((err) => {
        messageError()
        if (target) {
          store.dispatch(rollbackUser({ ...target, method: Methods.DELETE }))
        }
        console.log(err)
      })
  }
  if (type === 'Users/update') {
    if (typeof payload !== 'string' && 'id' in payload) {
      const target = prevState.users.find(
        (user: User) => user.id === payload.id
      )
      toast.success('User Update Success')
      fetch(`https://jsonplaceholder.typicode.com/users/${payload.id}`, {
        method: 'PATCH',
      })
        .then((res) => {
          if (!res.ok) throw new Error('Error trying to update a  User')
        })
        .catch((err) => {
          toast.error('Something went Wrong ,try again')
          if (target) {
            store.dispatch(rollbackUser({ ...target, method: Methods.UPDATE }))
          }
          console.log(err)
        })
    }
  }
}

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(syncWithDb).concat(localStorage),
})
// to handle the typing
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
