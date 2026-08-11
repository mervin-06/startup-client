import { createBrowserRouter } from "react-router-dom";
import Stage1 from "../components/Stage1Component/Stage1";
import Stage2 from "../components/Stage2Component/Stage2";
import SubmittedSuccess from "../Submited";

const router = createBrowserRouter([
    {
        path:"/",
        element:<Stage1/>
    },
    {
        path:"/stage2",
        element:(
                <Stage2/>
        )
    },
    {
        path:"/submit",
        element:(<SubmittedSuccess/>)
    }
])

export default router