import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from './types';
// mennggunakan {}, karena module yang di import memiliki multiple export, kita bisa
// mengakses secara individu dengan {}

////////////////////////CONTEXT


//interface pada typescript berguna seperti blueprint yang menetukan proprties dan method apa saja yang harus dimliki object


// ini adalah tipe yang akan di provide
interface UserContextType {
  user: User | null; // property yang tipenya dari User types
  setUser: (user: User | null) => void; // method dengan argumen user dengan tipe User(types) dan null
  // 
}

const UserContext = createContext<UserContextType | undefined>(undefined);
////////////////////////////PROVIDER
 
interface UserProviderProps { //ini adalah tipe dari children provider dibawah
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children /* props yang diturunkan oleh UserProvider */ }) => {
  const [user, setUser] = useState<User | null>(null); //semua children bisa mengakses state ini

  return (
    <UserContext.Provider value={{ user, setUser }}> {/*ini mem passing user dan setUser  ke semua anaknya*/}
      {children}
    </UserContext.Provider>
  );
};
// untuk melihat bagaimana anaknya mengakses ini coba buka RightSidebar.tsx

/////////////////////////CUSTOM HOOK

const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUser };

/* FLOW:
1. anaknya di rightsidebar mengakses state usernya aja diatas dengan menambahkan
const { user } = useUser();

2. useUser sebenarnya ada di custom hook jadi sebenarnya adalah const { user } = useContext(UserContext);

3. 













*/
