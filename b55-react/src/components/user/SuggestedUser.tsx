import React, { useEffect, useState } from 'react';
import UserBar from './UserBar';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  profilePict?: string;
  username?: string;
  // Add other fields as necessary
}

const SuggestedUser = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUserData = async (): Promise<void> => {
    try {
      const response = await axios.get<User[]>(`${import.meta.env.VITE_API_URL}/users`); // Replace with your API endpoint
      const allUsers = response.data;

      // Example: Fetch only users at index 1, 3, and 5
      const specificIndexes: number[] = [1, 3, 5];
      const specificUsers: User[] = allUsers.filter((_, index) => specificIndexes.includes(index));

      setUsers(specificUsers);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []); // The empty dependency array ensures this runs only once

  return (
    <>
      {users.map((user: User) => (
        <div key={user.id}>
          <UserBar id={user.id} avatar={user.profilePict} name={user.name} username={user.username} />
        </div>
      ))}
    </>
  );
};

export default SuggestedUser;
