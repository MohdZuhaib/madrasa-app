import { useRoutes, RouteObject } from "react-router-dom";
import Home from '../containers/Home';
import DashboardLayout from '../layouts/DashboardLayout'; // Make sure you import this if not already
import React from "react";
import NotFound from "../containers/NotFound";

const Router: React.FC = () => {
    const routes: RouteObject[] = [
        {
            path: "/",
            element: <DashboardLayout />,
            children: [
                {
                    path: "",
                    element: <Home />,
                },
                {
                    path: "*", // wildcard route for any undefined path
                    element: <NotFound />,
                },
            ],
        },

    ];

    const element = useRoutes(routes);
    return element;
};

export default Router;
