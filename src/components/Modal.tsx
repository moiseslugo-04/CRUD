import { useEffect, useState } from 'react'
import { UpdateUser, UserId } from '../types'
import { useAppSelector } from '../hooks/store'
interface Modal {
  userId: UserId | null
  isOpenModal: boolean
  onClose: () => void
  onUpdate: ({ id, input }: { id: UserId; input: UpdateUser }) => void
}
export default function Modal({
  userId,
  isOpenModal,
  onUpdate,
  onClose,
}: Modal) {
  //get all users
  const users = useAppSelector((state) => state.users)
  //look for the user ti update
  const userToUpdate = users.find((user) => user.id === userId)

  const [formData, setFromData] = useState<UpdateUser>({
    name: userToUpdate?.name || '',
    email: userToUpdate?.email || '',
    github: userToUpdate?.github || '',
  })
  useEffect(() => {
    if (userToUpdate) {
      setFromData((prev) => ({ ...prev, ...userToUpdate })) // if there changes update formData
    }
  }, [userToUpdate])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFromData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (userId && userToUpdate) {
      onUpdate({ id: userId, input: formData })
      onClose()
    }
  }
  if (!isOpenModal) return null

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <h2>Update user</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='github'>GitHub</label>
            <input
              type='text'
              id='github'
              name='github'
              value={formData.github}
              onChange={handleChange}
            />
          </div>
          <div>
            <button type='submit'>Update</button>
            <button type='button' onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
