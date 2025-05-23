/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { getCurrentUser } from "@/service/Auth";
import { IUser } from "@/types/user";


import {
     createContext,
     Dispatch,
     SetStateAction,
     useContext,
     useEffect,
     useState,
} from "react";

interface IUserProviderValues {
     [x: string]: any;
     user: IUser | null;
     isLoading: boolean;
     setUser: (user: IUser | null) => void;
     setIsLoading: Dispatch<SetStateAction<boolean>>;
     setReload: Dispatch<SetStateAction<boolean>>;
     handleUser:()=> void,
     setSearchQuery: Dispatch<SetStateAction<string>>,
     searchQuery:string
}

const UserContext = createContext<IUserProviderValues | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
     const [user, setUser] = useState<IUser | null>(null);
     const [isLoading, setIsLoading] = useState(true);
     const [reload, setReload] = useState(true);
     const [searchQuery,setSearchQuery]=useState('')
    

     const handleUser = async () => {
          const user = await getCurrentUser();
          setUser(user);
          setIsLoading(false);
     };

     useEffect(() => {
          handleUser();
     }, [isLoading, reload]);

     return (
          <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading, setReload, handleUser, setSearchQuery, searchQuery }}>
               {children}
          </UserContext.Provider>
     );
};

export const useUser = () => {
     const context = useContext(UserContext);

     if (context === undefined) {
          throw new Error("useUser must be used within the UserProvider context");
     }

     return context;
};

export default UserProvider;