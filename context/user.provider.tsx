import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { currentUser, CustomJwtPayload } from "../services/AuthService";

const UserContext = createContext<IContextValue | undefined>(undefined);

interface IContextValue {
  user: CustomJwtPayload | null;
  loading: boolean;
  setUser: (user: CustomJwtPayload | null) => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<CustomJwtPayload | null>(null);
  const [loading, setLoading] = useState(true);

  const handleUser = async () => {
    const user = await currentUser();
    setUser(user);
    setLoading(false);
  };

  useEffect(() => {
    handleUser();
  }, [loading]);

  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be within the UserProvider context");
  }
  return context;
};

export default UserProvider;
