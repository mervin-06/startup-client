import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

interface PropsChild {
    children: React.ReactNode;
}

export default function PrivateRouter({ children }: PropsChild) {
    const location = useLocation();
    const stage1 = localStorage.getItem("stage1");

    if (!stage1) {
        toast.error("Please complete Stage 1 before continuing.");
        return <Navigate to="/" replace state={{ from: location }} />;
    }

    return <>{children}</>;
}