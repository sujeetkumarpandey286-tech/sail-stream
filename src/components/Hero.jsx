export default function Hero() {
  return (
    <section className="px-8 mt-8">
      <div className="max-w-7xl mx-auto">

        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            h-[520px]
            bg-gradient-to-br
            from-blue-900
            via-slate-900
            to-black
            shadow-2xl
          "
        >

          <div className="absolute inset-0 bg-black/45"></div>

          <div className="relative z-10 h-full flex items-end">

            <div className="p-12 max-w-3xl">

              <span className="inline-block bg-blue-600 px-4 py-2 rounded-full text-sm font-semibold tracking-wide">

                FEATURED INITIATIVE

              </span>

              <h1 className="text-6xl font-bold mt-6 leading-tight">

                Asset Health Monitoring

              </h1>

              <p className="text-slate-300 text-xl mt-6 leading-8">

                Monitoring of critical plant assets to predict failures
                before they occur, reducing downtime and enabling
                proactive maintenance across SAIL plants.

              </p>

              <div className="flex gap-5 mt-10">

                <button className="bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-xl font-semibold">

                  ▶ Watch Video

                </button>

                <button className="bg-white/10 hover:bg-white/20 transition px-8 py-4 rounded-xl">

                  More Information

                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}