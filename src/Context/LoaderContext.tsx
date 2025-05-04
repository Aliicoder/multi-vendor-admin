import { PropsWithChildren, useState , createContext, SetStateAction, Dispatch} from 'react'
interface ThemeContextType {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const LoaderContext = createContext<ThemeContextType>({
  loading: false,
  setLoading: () => {}, 
});
interface LoaderProvider extends PropsWithChildren {}
function LoaderProvider({children}:LoaderProvider) {
  const [loading,setLoading] = useState(false);
  return (
    <LoaderContext.Provider value={{loading,setLoading}}>
      {children}
    </LoaderContext.Provider>
  )
}

export default LoaderProvider