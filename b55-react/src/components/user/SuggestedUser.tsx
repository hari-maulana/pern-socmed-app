import React from 'react'
import UserBar from '../commons/UserBar'

const SuggestedUser = () => {
  return (
    <>
        <UserBar avatar="https://randomuser.me/api/portraits/women/2.jpg" name="Alice" username="alice" status=''/>
        <UserBar avatar="https://randomuser.me/api/portraits/men/3.jpg" name="Charlie" username="charlie" status=''/>
    </>
  )
}

export default SuggestedUser