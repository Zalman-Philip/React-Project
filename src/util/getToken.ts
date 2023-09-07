const getToken = () => {
    let token = localStorage.getItem("authorization")
    if(!token) throw new Error("please login!")
    token = JSON.parse(token)
    return token
}

export default getToken