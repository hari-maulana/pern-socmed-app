import { createContext, useContext, useState, ReactNode } from 'react';



// TENTUKAN TIPE DARI CONTEXT (TS)
// inihubungannya dengan value dari authContext.Provider dibawah, bukan degan useState
interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    
}

// BUAT CONTEXT
const AuthContext = createContext<AuthContextType | null>(null);

//TENTUKAN TIPE PROPS YANG AKAN DI PASS KE COMPONENT YANG INGIN MENGGUNAKAN CONTEXT
interface AuthProviderProps {
    children: ReactNode;
}

// BUAT PROVIDER
const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

// BUAT FUNGSI hook UNTUK MENGGUNAKAN CONTEXT
const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuth };