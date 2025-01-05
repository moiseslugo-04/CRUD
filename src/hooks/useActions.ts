import { deleted, create, update } from '../store/users/slice'
import { UpdateUser, User, UserId } from '../types'
import { useAppDispatch } from './store'
export function useAction() {
  const dispatch = useAppDispatch()

  const actions = {
    createUser: ({ name, email, github, id }: User) => {
      dispatch(create({ name, email, github, id }))
    },
    deletedUser: (id: UserId) => dispatch(deleted(id)),
    updateUser: ({ id, input }: { id: UserId; input: UpdateUser }) => {
      dispatch(update({ id, ...input }))
    },
  }

  return { ...actions }
}
