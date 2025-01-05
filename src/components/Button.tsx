export default function Button({ children, action = '' }) {
  const handleClick = () => {
    console.log(action)
  }
  return <button onClick={handleClick}>{children}</button>
}
