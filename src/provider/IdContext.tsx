import {useState, createContext,FC, ReactNode, useContext} from "react"
type IdContextType = {
    id: string;
    setId: React.Dispatch<React.SetStateAction<string>>;
    }

    const IdContext = createContext<IdContextType|null>(null)

    const IdContextProvider: FC<{children:ReactNode}> = ({children}) => {
        const [id, setId] = useState<string>("Home")
        return <IdContext.Provider value={{id , setId}}>
        {children}
        </IdContext.Provider>
     }

export default IdContextProvider
 
export const useId = () => {
const context = useContext(IdContext)
if (!context) throw new Error(" no context")
return context
}