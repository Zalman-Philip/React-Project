import { useRouter } from "../router/Router"
const PageNotFound = () => {
  const {setPage} = useRouter()

  return <><h1>Page not found 404</h1>
  <button onClick={()=> setPage("Home")}>Home</button>
  </>
};

export default PageNotFound;