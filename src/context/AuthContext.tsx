import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {checkToken} from "../helpers/Utils.ts";

interface UserData {
    userId: number;
    username: string;
    avatarUrl: string;
    permission: string;
}

interface AuthContextProps {
    userData: UserData | null;
    isAuth: boolean;
    isAdmin: boolean;
    isRef: boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({children}: { children: ReactNode }) {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isAuth, setIsAuth] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isRef, setIsRef] = useState(false);

    useEffect(() => {
        const checkAuthToken = async () => {
            const token = localStorage.getItem('authToken');
            if (token) {
                const data = await checkToken(token);
                if (data) {
                    setIsAuth(true);
                    setUserData({
                        userId: data.user_id,
                        username: data.username,
                        avatarUrl: data.avatar,
                        permission: data.permission,
                    });
                    if (data.permission === 'admin') {
                        setIsAdmin(true);
                    }
                    if (data.permission === 'ref') {
                        setIsRef(true);
                    }
                } else {
                    setIsAuth(false);
                    localStorage.removeItem('authToken');
                }
            }
        };
        checkAuthToken().then();
    }, []);

    const logout = async () => {
        localStorage.removeItem('authToken');
        setIsAuth(false);
        setUserData(null);
        setIsAdmin(false);
        setIsRef(false);
    };

    return (
        <AuthContext.Provider value={{userData, isAuth, isAdmin, isRef, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}