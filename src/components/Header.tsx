import { Title, Badge } from '@tremor/react'
import { User } from '../types'
export function Header({ users }: { users: User[] }) {
  return (
    <Title>
      Users
      <Badge
        style={{
          marginLeft: '8px',
          borderRadius: '20px',
          backgroundColor: '#a9bbda80',
        }}
      >
        {users.length}
      </Badge>
    </Title>
  )
}
