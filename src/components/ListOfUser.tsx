import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react'
import { IconEdit, IconTrash } from './Icons'
import { useAppSelector } from '../hooks/store'
import { useAction } from '../hooks/useActions'
import { Header } from './Header'
import Modal from './Modal'
import useModal from '../hooks/useModal'
import { UserId } from '../types'
import { useState } from 'react'
export function ListOfUser() {
  const [userId, setUserId] = useState<UserId | null>(null)
  const { deletedUser, updateUser } = useAction()
  const users = useAppSelector((state) => state.users)
  const { openModal, closeModal, isOpen } = useModal()

  const handleUpdateUser = (userId: UserId) => {
    setUserId(userId)
    openModal()
  }
  const handleCloseModal = () => {
    setUserId(null) // reset user ID
    closeModal()
  }
  return (
    <Card>
      <Header users={users} />
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell> Index</TableHeaderCell>
            <TableHeaderCell> Name </TableHeaderCell>
            <TableHeaderCell> Email </TableHeaderCell>
            <TableHeaderCell> Actions </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user.name}>
              <TableCell>{index + 1}</TableCell>
              <TableCell style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    marginRight: '8px',
                  }}
                  src={`https://unavatar.io/github/${user.github}`}
                  alt={user.name}
                />
                {user.name}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <button type='button' onClick={() => handleUpdateUser(user.id)}>
                  <IconEdit />
                </button>
                <button type='button' onClick={() => deletedUser(user.id)}>
                  <IconTrash />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        isOpenModal={isOpen}
        onClose={handleCloseModal}
        userId={userId}
        onUpdate={updateUser}
      />
    </Card>
  )
}
