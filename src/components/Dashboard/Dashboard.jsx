import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { LineChart, Line, XAxis, YAxis } from "recharts";
export default function Dashboard() {
  const { customerId } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

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
    fetchTransactions();
  }, []);

  const customerTransactions = transactions.filter(
    (transaction) => transaction.customer_id == customerId
  );

  console.log(customerTransactions);
  return (
    <>
      {loading && <Loading />}
      {!loading && customerTransactions.length > 0 ? (
        <div className="bg-gray-900 py-10 min-h-screen grid place-items-center text-white">
          <div className="wrapper text-center">
            <h1 className="text-4xl mb-20 text-center">
              Transactions Dashboard
            </h1>
            <LineChart width={600} height={300} data={customerTransactions}>
              <Line type="monotone" dataKey="amount" stroke="#8884d8" />
              <XAxis dataKey="date" />
              <YAxis />
            </LineChart>
            <Link
              to="/"
              className="bg-sky-600 px-3 py-1 rounded-md mt-10 inline-block "
            >
              Return to Customers
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-gray-900 py-10 min-h-screen grid place-items-center text-white">
          <div className="wrapper text-center">
            <h1 className="text-4xl mb-10 text-center">
              No transactions found for this customer
            </h1>
            <Link
              to="/"
              className="bg-sky-600 px-3 py-1 rounded-md inline-block "
            >
              Return to Customers
            </Link>
          </div>
        </div>
      )}
    </>
  );
}