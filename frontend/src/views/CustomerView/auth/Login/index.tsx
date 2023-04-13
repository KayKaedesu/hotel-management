import { Button, Group } from '@mantine/core'
import { useCustomerUserStore } from '../../shell'
import { Link } from 'react-router-dom'

function CustomerAuthLogin() {
  const { setImage, setLoggedIn, setName } = useCustomerUserStore()
  function setToDefaultUser() {
    setName('จอห์น โดว์')
    setLoggedIn(true)
    setImage(
      'https://sm.askmen.com/t/askmen_in/article/f/facebook-p/facebook-profile-picture-affects-chances-of-gettin_fr3n.1200.jpg'
    )
  }

  return (
    <Group>
      <Link to="/customer" style={{ textDecoration: 'none' }}>

      <Button onClick={setToDefaultUser}>login</Button>
      </Link>
    </Group>
  )
}
export default CustomerAuthLogin
