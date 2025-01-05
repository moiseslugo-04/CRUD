import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  Methods,
  RollbackInterface,
  UpdateUser,
  UserId,
  User,
} from '../../types'
import { DEFAULT_STATE } from '../../constants'
const initialState: User[] = (() => {
  const data = localStorage.getItem('users')
  return data ? JSON.parse(data) : DEFAULT_STATE
})()

export const userSlice = createSlice({
  name: 'Users',
  initialState: initialState,
  reducers: {
    create: (state, action: PayloadAction<User>) => {
      state.push({ ...action.payload })
    },
    deleted: (state, action: PayloadAction<UserId>) => {
      const id = action.payload
      return state.filter((user) => user.id !== id)
    },
    update: (state, action: PayloadAction<UpdateUser>) => {
      const { id, ...input } = action.payload
      const user = state.find((user) => user.id === id)

      if (user) Object.assign(user, input)
    },
    rollbackUser: (state, action: PayloadAction<RollbackInterface>) => {
      const { method, ...user } = action.payload
      const target = state.find(({ id }) => id === user.id)

      // rollback if something went wrong
      if (method === Methods.DELETE && !target) {
        state.push(user)
      }

      //rollback if something went wrong
      if (method === Methods.UPDATE && target) {
        const hasChangeD =
          target.name !== user.name ||
          target.email !== user.email ||
          target.github !== user.github
        if (hasChangeD) {
          Object.assign(target, user)
        }
      }

      if (method === Methods.CREATE) {
        console.log(user.id)
        console.log(state.map((user) => user.id))
        return state.filter(({ id }) => id !== user.id)
      }
    },
  },
})
export default userSlice.reducer
export const { deleted, create, rollbackUser, update } = userSlice.actions
