import { toast } from "react-toastify"
interface PropsChild{
    children : React.ReactNode
}

export default function PrivateRouter({children}:PropsChild){
    const email = localStorage.getItem("email")

    if(!email) {
        toast.error("All inputs Are required");
        return
    }

    return children
}