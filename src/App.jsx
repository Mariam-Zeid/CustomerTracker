import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CustomersTable from "./components/Customers Table/CustomersTable";
import Dashboard from "./components/Dashboard/Dashboard";
import RootLayout from "./components/Root Layout/RootLayout";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <CustomersTable />,
        },
        {
          path: "/dashboard/:customerId",
          element: <Dashboard />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
