import { Search, SlidersHorizontal } from "lucide-react";

export default function Header({ search, setSearch }) {
  return (
    <header className="sticky top-0 z-50 bg-[#050B16]/95 backdrop-blur-2xl">

      <div className="mx-auto flex h-24 max-w-[1700px] items-center justify-between px-10">

        {/* ---------------- Brand ---------------- */}

        <div className="flex items-center gap-4">

          <div className="relative flex h-20 w-20 items-center justify-center">

            {/* Soft Glow */}

            <div className="absolute h-16 w-16 rounded-full bg-sky-500/20 blur-2xl" />

            {/* Logo */}

            <img
              src="/logo.png"
              alt="SAIL"
              className="relative z-10 h-16 w-16 object-contain"
            />

          </div>

          <div>

            <div className="flex items-end gap-3">

              <h1 className="text-[44px] font-bold leading-none tracking-tight text-white">

                SAIL

              </h1>

              <h1 className="bg-gradient-to-r from-sky-300 via-sky-400 to-blue-500 bg-clip-text text-[44px] font-bold leading-none tracking-tight text-transparent">

                STREAM

              </h1>

            </div>

            <p className="mt-1 text-[12px] font-medium uppercase tracking-[0.35em] text-slate-400">

              Digital Transformation Visual Portal

            </p>

          </div>

        </div>

        {/* ---------------- Search ---------------- */}

        <div className="flex items-center gap-4">

          <div className="relative w-[560px]">

            <Search
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search initiatives, plants, domains..."
              className="
                h-14
                w-full
                rounded-full
                border
                border-slate-700
                bg-[#0B1627]
                pl-14
                pr-5
                text-[15px]
                text-white
                placeholder:text-slate-500
                outline-none
                transition-all
                duration-300
                focus:border-sky-500
                focus:ring-4
                focus:ring-sky-500/10
              "
            />

          </div>

          <button
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              border
              border-slate-700
              bg-[#0B1627]
              text-slate-400
              transition-all
              duration-300
              hover:border-sky-500
              hover:bg-sky-500/10
              hover:text-sky-400
            "
          >
            <SlidersHorizontal size={20} />
          </button>

        </div>

      </div>

      {/* Bottom Accent */}

      <div className="h-px bg-gradient-to-r from-transparent via-sky-500/70 to-transparent" />

    </header>
  );
}