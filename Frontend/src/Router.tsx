import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

import Root from './assets/pages/Root'
import NotFound from './assets/pages/NotFound'

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route path="/" element={<Root />}>
            <Route path="dashboard" element={<Root />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        </>
    )
);

function App() {
    return (
        <RouterProvider router={router}/>
    )
}

export default App
