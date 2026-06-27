import { Search } from "lucide-react";

export default function Header({ search, setSearch }) {
  return (
    <header className="sticky top-0 z-50 bg-[#08111F]/95 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        <div className="flex items-center gap-5">

          <img
            src="/logo.png"
            alt="SAIL Logo"
            className="w-16 h-16 object-contain"
          />

          <div>

            <h1 className="text-4xl font-bold text-white tracking-wide">
              SAIL Stream
            </h1>

            <p className="text-sky-400 leading-6 text-lg">
              Digital Transformation
              <br />
              Visual Portal
            </p>

          </div>

        </div>

        <div className="relative w-[430px]">

          <Search
            size={20}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search initiatives..."
            className="w-full h-14 rounded-full bg-slate-900 border border-slate-700 pl-14 pr-5 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition-all"
          />

        </div>

      </div>
    </header>
  );
}