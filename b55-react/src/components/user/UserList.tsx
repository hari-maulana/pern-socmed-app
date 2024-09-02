import React from 'react'
import UserBar from './UserBar'



const UserList = () => {
  return (
    <>
    <UserBar avatar="https://randomuser.me/api/portraits/men/1.jpg" name="John" username="john" status='God bless me'/>
    <UserBar avatar="https://randomuser.me/api/portraits/women/1.jpg" name="Jane" username="jane" status='🥶'/>
    <UserBar avatar="https://randomuser.me/api/portraits/men/2.jpg" name="Bob" username="bob" status='what the hell!'/>
    <UserBar avatar="https://randomuser.me/api/portraits/women/2.jpg" name="Alice" username="alice" status='Go 😎'/>
    <UserBar avatar="https://randomuser.me/api/portraits/men/3.jpg" name="Charlie" username="charlie" status='For bussiness please DM'/>
    
    </>
  )
}

export default UserList