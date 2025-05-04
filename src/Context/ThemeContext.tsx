import { PropsWithChildren, useState , createContext, SetStateAction, Dispatch} from 'react'
interface ThemeContextType {
  darkTheme: boolean;
  setDarkTheme: Dispatch<SetStateAction<boolean>>;
}

export const ThemeContext = createContext<ThemeContextType>({
  darkTheme: false,
  setDarkTheme: () => {}, 
});
interface ThemeProvider extends PropsWithChildren {}
function ThemeProvider({children}:ThemeProvider) {
  const [darkTheme,setDarkTheme] = useState(false);
  return (
    <ThemeContext.Provider value={{darkTheme,setDarkTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider