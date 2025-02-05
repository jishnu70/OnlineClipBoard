import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Nav from "./navComponent"; // ✅ Import Navbar
import backGroundImage from "./assets/abstract_timekeeper_new.svg";
import { toast, ToastContainer } from "react-toastify"; // Importing toast functionality
import "react-toastify/dist/ReactToastify.css"; // Importing toast CSS

const API_URL = import.meta.env.VITE_API_URL; // Change to your FastAPI backend URL

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: "easeIn" } },
};

export default function App() {
  const [mode, setMode] = useState("send");
  const [data, setData] = useState("");
  const [code, setCode] = useState(["", "", "", ""]);
  const [retrievedData, setRetrievedData] = useState("");

  const handleSend = async () => {
    if (!data) return toast.error("Enter some data to send"); // Tailwind toast error
    try {
      const response = await axios.post(`${API_URL}/content/create`, { content: data });
      toast.success(`Your code: ${response.data.Code}`); // Tailwind toast success
      setData("");
    } catch (error) {
      toast.error("Error sending data"); // Tailwind toast error
    }
  };

  const handleRetrieve = async () => {
    const fullCode = code.join("");
    if (fullCode.length !== 4) return toast.error("Enter a 4-digit code"); // Tailwind toast error
    try {
      const response = await axios.get(`${API_URL}/content/${fullCode}`);
      setRetrievedData(response.data.content.replace(/\\n/g, "\n"));
    } catch (error) {
      toast.error("Invalid code or data not found"); // Tailwind toast error
    }
  };

  return (
    <div className="min-h-screen bg-forestGreen text-white" style={{ backgroundImage: `url(${backGroundImage})`, backgroundSize: '120%', backgroundPosition: 'center' }}>
      <Nav /> {/* ✅ Navbar Added Here */}

      <div className="flex flex-col items-center justify-center p-6 space-y-6 pt-28">
        {/* Title */}
        <motion.h1
          className="text-5xl font-bold text-neonGreen rounded-3xl px-4 py-2 bg-darkGreenBg shadow-3xl"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          CyberClipboard
        </motion.h1>

        {/* Mode Container */}
        <AnimatePresence mode="wait">
          {mode === "send" ? (
            <motion.div
              key="send"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-2xl bg-forestGreen rounded-3xl p-8 shadow-2xl"
            >
              <textarea
                className="w-full h-56 p-4 text-xl bg-darkGreenBg text-neonGreen border-2 border-neonGreen rounded-3xl focus:outline-none focus:ring-4 focus:ring-limeGreen transition-all"
                placeholder="Enter data here..."
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="retrieve"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-2xl bg-forestGreen rounded-3xl p-8 shadow-2xl flex flex-col items-center"
            >
              <div className="flex gap-4 mb-6">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    className="w-16 h-16 text-3xl text-center bg-darkGreenBg text-neonGreen border-2 border-neonGreen rounded-3xl transition focus:ring-4 focus:ring-limeGreen"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => {
                      const newCode = [...code];
                      newCode[index] = e.target.value.slice(0, 1);
                      setCode(newCode);
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Buttons Container */}
        <div className="flex gap-6 mt-4">
          {mode === "send" ? (
            <>
              <motion.button
                className="px-8 py-3 text-xl bg-neonGreen text-darkGreenBg rounded-full shadow-lg border-2 border-neonGreen transition-all"
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(168, 224, 99, 0.8)" }}
                onClick={handleSend}
              >
                Send
              </motion.button>
              <motion.button
                className="px-8 py-3 text-xl bg-forestGreen text-neonGreen rounded-full shadow-lg border-2 border-neonGreen transition-all"
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(168, 224, 99, 0.8)" }}
                onClick={() => setMode("retrieve")}
              >
                Retrieve Mode
              </motion.button>
            </>
          ) : (
            <>
              <motion.button
                className="px-8 py-3 text-xl bg-neonGreen text-darkGreenBg rounded-full shadow-lg border-2 border-neonGreen transition-all"
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(168, 224, 99, 0.8)" }}
                onClick={handleRetrieve}
              >
                Retrieve
              </motion.button>
              <motion.button
                className="px-8 py-3 text-xl bg-forestGreen text-neonGreen rounded-full shadow-lg border-2 border-neonGreen transition-all"
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(168, 224, 99, 0.8)" }}
                onClick={() => {
                  setMode("send");
                  setRetrievedData(""); // Hide retrieved data block when switching to Send Mode
                }}
              >
                Send Mode
              </motion.button>
            </>
          )}
        </div>

        {/* Display Retrieved Data */}
        <AnimatePresence>
          {retrievedData && (
            <motion.div
              className="mt-8 w-full max-w-2xl bg-darkGreenBg rounded-3xl p-6 border-2 border-neonGreen shadow-2xl text-neonGreen whitespace-pre-wrap text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {retrievedData}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tailwind CSS Styled Toasts */}
      <ToastContainer
        position="top-center"
        autoClose={5000} // Extend toast display time to 5 seconds
        hideProgressBar={false} // Show progress bar
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progressClassName="bg-limeGreen" // Tailwind class for progress bar
        toastClassName="bg-darkGreenBg text-neonGreen border-2 border-neonGreen rounded-3xl shadow-xl p-4 text-lg font-semibold" // Tailwind classes for styling
      />
    </div>
  );
}
