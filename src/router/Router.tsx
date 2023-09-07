

import {useState, createContext,FC, ReactNode, useContext} from "react"
type RouterContextType = {
    page: string;
    setPage: React.Dispatch<React.SetStateAction<string>>;
    }

 const RouterContext = createContext<RouterContextType|null>(null)

 const RouterContextProvider: FC<{children:ReactNode}> = ({children}) => {
    const [page, setPage] = useState<string>("Home")
    return <RouterContext.Provider value={{page , setPage}}>
    {children}
    </RouterContext.Provider>
 }


export const useRouter  = () => {
    const context = useContext(RouterContext)
    if (!context) throw new Error("no context")
    return context
 }

 
 export default RouterContextProvider
