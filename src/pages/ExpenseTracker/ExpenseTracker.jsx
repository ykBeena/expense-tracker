import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import useAddTransaction from "../../hooks/useAddTransaction";
import useGetTransactions from "../../hooks/useGetTransactions";
import useGetUserInfo from "../../hooks/useGetUserInfo";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase-config";
import { MdDarkMode } from "react-icons/md";
import { FaSun } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const { balance, income, expenses } = transactionTotals;


  const {theme, setTheme} = useTheme();
  console.log(theme);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });

    setDescription("");
    setTransactionAmount("");
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={`${theme === "light" ? "bg-gradient-to-r from-blue-500 to-purple-500" : "bg-gradient-to-r from-black to-blue-900"} h-full`}>
        <div className={`container mx-auto p-4 relative `}>
      <button onClick={toggleTheme} className="absolute top-7 right-6">
        {theme !== "dark" ? (
          <FaSun size={"2rem"} />
        ) : (
          <MdDarkMode size={"2rem"} />
        )}
      </button>
      <div className="bg-white p-4 rounded shadow-md mb-4">
        {profilePhoto && (
          <div className="flex items-center mb-4">
            <img
              className="w-10 h-10 rounded-full mr-2"
              src={profilePhoto}
              alt="Profile"
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={signUserOut}
            >
              Sign Out
            </button>
          </div>
        )}
        <h1 className="text-2xl font-bold mb-4">{name}'s Expense Tracker</h1>
        <div>
          <h3 className="text-lg font-semibold">Your Balance</h3>
          <h2 className={balance >= 0 ? "text-green-500" : "text-red-500"}>
            ₹{Math.abs(balance)}
          </h2>
        </div>
        <div className="flex justify-between mt-4">
          <div className="text-center">
            <h4 className="text-sm text-gray-500">Income</h4>
            <p className="text-lg font-semibold">₹{income}</p>
          </div>
          <div className="text-center">
            <h4 className="text-sm text-gray-500">Expenses</h4>
            <p className="text-lg font-semibold">₹{expenses}</p>
          </div>
        </div>
        <form className="mt-4" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Description"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full border p-2 mb-2"
          />
          <input
            type="number"
            placeholder="Amount"
            value={transactionAmount}
            required
            onChange={(e) => setTransactionAmount(e.target.value)}
            className="block w-full border p-2 mb-2"
          />
          <div className="mb-4">
            <input
              type="radio"
              id="expense"
              value="expense"
              checked={transactionType === "expense"}
              onChange={(e) => setTransactionType(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="expense" className="mr-4">
              Expense
            </label>
            <input
              type="radio"
              id="income"
              value="income"
              checked={transactionType === "income"}
              onChange={(e) => setTransactionType(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="income">Income</label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Transaction
          </button>
        </form>
      </div>
      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-xl font-bold mb-4">Transactions</h3>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Description</th>
              <th className="text-left">Amount</th>
              <th className="text-left">Type</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{transaction.description}</td>
                <td className="py-2">₹{transaction.transactionAmount}</td>
                <td className="py-2">
                  <span
                    className={
                      transaction.transactionType === "expense"
                        ? "text-red-500"
                        : "text-green-500"
                    }
                  >
                    {transaction.transactionType}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default ExpenseTracker;
