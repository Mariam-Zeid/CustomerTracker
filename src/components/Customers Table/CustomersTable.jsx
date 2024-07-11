import { createTheme, ThemeProvider } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function CustomersTable() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [customerTransactions, setCustomerTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      name: "id",
      label: "ID",
    },
    {
      name: "image",
      label: "Image",
      options: {
        customBodyRender: (value) => (
          <img src={value} alt="customer" className="w-12 h-12 rounded-full" />
        ),
      },
    },
    {
      name: "name",
      label: "Name",
    },
    {
      name: "gender",
      label: "Gender",
      options: {
        customBodyRender: (value) => (
          <p
            className={`capitalize px-3 py-1 inline-block rounded-full ${
              value === "male" ? "bg-blue-500" : "bg-pink-500"
            }`}
          >
            {value}
          </p>
        ),
      },
    },
    {
      name: "transactionAmount",
      label: "Transaction Amount",
    },
    {
      name: "transactionDate",
      label: "Transaction Date",
    },
    {
      name: "dashboard",
      label: "Dashboard",
      options: {
        customBodyRender: (value, tableMeta) => {
          const copiedTransactions = [...tableMeta.rowData];
          const customerId = copiedTransactions[copiedTransactions.length - 1];
          return (
            <Link
              to={`/dashboard/${customerId}`}
              className="bg-rose-600 px-3 py-1 rounded-md"
            >
              Dashboard
            </Link>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: "none",
    elevation: 0,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 20, 30],
    responsive: "standard",
  };

  const getMuiTheme = () =>
    createTheme({
      typography: {
        fontFamily: "Poppins",
      },
      palette: {
        background: {
          paper: "#1e293b",
          default: "#0f172a",
        },
        mode: "dark",
      },
      components: {
        MuiTableCell: {
          styleOverrides: {
            head: {
              padding: "10px 4px",
              textAlign: "center",
            },
            body: {
              padding: "7px 15px",
              color: "#e2e8f0",
              textAlign: "center",
            },
          },
        },
      },
    });

  // !npm install -g json-server
  // ! json-server --watch database.json
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/customers");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/transactions");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
    fetchTransactions();
  }, []);

  useEffect(() => {
    if (customers && transactions) {
      const mergedData = transactions.map((transaction) => {
        const customer = customers.find(
          (cust) => cust.id == transaction.customer_id
        );

        if (!customer) {
          return null;
        }
        return {
          id: transaction.id,
          image: customer.image,
          name: customer.name,
          gender: customer.gender,
          transactionAmount: transaction.amount,
          transactionDate: transaction.date,
          dashboard: customer.id,
        };
      });
      setCustomerTransactions(mergedData);
    }
  }, [customers, transactions]);

  return (
    <>
      {loading && <Loading />}
      <div className="bg-gray-900 py-10 min-h-screen grid place-items-center">
        <div className="w-10/12 max-w-6xl">
          <ThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              title={"Customer List"}
              data={customerTransactions}
              columns={columns}
              options={options}
            />
          </ThemeProvider>
        </div>
      </div>
    </>
  );
}
