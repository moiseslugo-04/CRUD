import { Badge, Button, Card, TextInput, Title } from '@tremor/react'
import { useAction } from '../hooks/useActions'
import { useState } from 'react'
export function CreateNewUser() {
  const { createUser } = useAction()
  const [result, setResult] = useState<'ok' | 'error' | null>(null)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const github = formData.get('github') as string
    if (!name || !email || !github) {
      return setResult('error')
    }
    setResult('ok')
    const temId = crypto.randomUUID()
    createUser({ name, email, github, id: temId })
    form.reset()
  }
  return (
    <Card style={{ width: '300px', margin: 'auto', marginTop: '50px' }}>
      <Title>Create a new User</Title>
      <form onSubmit={handleSubmit}>
        <TextInput placeholder='Name of user' name='name' />
        <TextInput placeholder='Email of user' name='email' />
        <TextInput placeholder='UserName of Github' name='github' />
        <div>
          <Button>Create</Button>
        </div>
        <span>
          {result === 'ok' && <Badge color='green'>saved correctly </Badge>}
          {result === 'error' && (
            <Badge color='red'>Something was Wrong </Badge>
          )}
        </span>
      </form>
    </Card>
  )
}
