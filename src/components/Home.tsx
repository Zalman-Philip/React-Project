import { useRouter } from "../router/Router"

const Home = ():JSX.Element => {
    const {setPage} = useRouter()
    return (
        <>
        <h1>Welcome</h1>
        <button onClick={()=>setPage("Trips")}>All trips</button>
        <button onClick={()=>setPage("UserRegistration")}>Sign in</button>
        <button onClick={()=>setPage("UserLogin")}>Login</button>
        <button onClick={()=> localStorage.setItem("authorization", JSON.stringify(""))}>Log out</button>
        </>
    )
}

export default Home