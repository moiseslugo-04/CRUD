import { CreateNewUser } from './components/CreateNewUser'
import { ListOfUser } from './components/ListOfUser'
import { Toaster } from 'sonner'
function App() {
  return (
    <main>
      <ListOfUser />
      <CreateNewUser />
      <Toaster richColors />
    </main>
  )
}

export default App
