import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

import Root from './assets/pages/Root';
import NotFound from './assets/pages/NotFound';
import Quiz from "./assets/pages/Quiz";
import DashBoard from "./assets/pages/Dashboard";

const router = createBrowserRouter([

    { path: "/", element: <Root /> },
    /*{ path: "/", element: <Quiz /> },*/
    { path: "/dashboard", element: <DashBoard /> },
    { path: "quiz", element: <Quiz /> },
    { path: "/*", element: <NotFound /> }

]);

function App() {
    return (
        <RouterProvider router={router} />
    )
}

export default App
