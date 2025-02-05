import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-45 p-4 rounded-4xl border-neonGreen shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center px-40">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-neonGreen font-bold text-4xl"
        >
          CyberClipboard
        </motion.div>

        {/* Desktop Menu */}
        {/* <div className="hidden md:flex space-x-6 text-neon-green">
          <a href="#" className="hover:text-white transition">Home</a>
          <a href="#" className="hover:text-white transition">Projects</a>
          <a href="#" className="hover:text-white transition">Contact</a>
        </div> */}

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-neon-green focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-black bg-opacity-90 py-4 flex flex-col space-y-4 text-center text-neon-green"
        >
          <a href="#" className="hover:text-white transition" onClick={() => setIsOpen(false)}>Home</a>
          <a href="#" className="hover:text-white transition" onClick={() => setIsOpen(false)}>Projects</a>
          <a href="#" className="hover:text-white transition" onClick={() => setIsOpen(false)}>Contact</a>
        </motion.div>
      )}
    </nav>
  );
}
