import { FiSearch } from "react-icons/fi"
import { MdMenuBook } from "react-icons/md";
export default function Navbar() {
  return (
    <nav className="w-full bg-gradient-to-r from-[#060b1f] via-[#0b1230] to-[#060b1f] px-6 py-4 flex items-center justify-between shadow-lg">
      
      {/* Logo */}
      <div className="flex items-center gap-2 text-cyan-400 font-semibold tracking-wide">
        <span className="text-xl">📘</span>
        <span className="uppercase">Salon du livre</span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-xl mx-8">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Découvrez votre prochaine lecture..."
            className="w-full rounded-full bg-[#0e173d] text-white pl-12 pr-4 py-2 
                       placeholder:text-cyan-300/60 focus:outline-none 
                       focus:ring-2 focus:ring-cyan-400"
          />
        </div>
      </div>

      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-cyan-400 flex items-center justify-center shadow-md">
  <MdMenuBook className="text-black w-6 h-6" />
</div>
    </nav>
  );
}
