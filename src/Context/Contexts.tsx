import { PropsWithChildren } from 'react'
import ThemeProvider from './ThemeContext'
import LoaderProvider from './LoaderContext'
import CategoriesProvider from './CategoriesContext'
import FilterProvider, { FilterContext } from './FilterProductsContext'
interface ThemeContext extends PropsWithChildren{}
function Contexts({children}:ThemeContext){
  return (
    <LoaderProvider>
    <ThemeProvider>
    <CategoriesProvider>  
    <FilterProvider>
      {children}
    </FilterProvider>
    </CategoriesProvider>
    </ThemeProvider>
    </LoaderProvider>
  )
}

export default Contexts