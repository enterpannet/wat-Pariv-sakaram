// src/AppRoutes.jsx
import { createBrowserRouter } from "react-router-dom";
import RegisterForm from './components/RegisterForm';
import UserTable from './components/UserTable';
import Income from './components/Income';
import Expense from './components/Expense';
import Summary from './components/Summary';
import App from './App'

import RootLayout from "./layout";
import ErrorPage from "./error";
import DonationForm from "./components/DonationForm";
import DonationSummary from "./components/DonationSummary";

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <App />
            },
            {
                path: "/register",
                element: <RegisterForm />
            },
            {
                path: "/view",
                element: <UserTable />
            },
            {
                path: "/income",
                element: <Income />
            }
            , {
                path: "/expense",
                element: <Expense />
            }, {
                path: "/summary",
                element: <Summary />
            },
            {
                path: "/donation",
                element: <DonationForm />
            },
            {
                path: "/summarydonation",
                element: <DonationSummary />
            }
        ]
    }
])

