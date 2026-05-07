import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import AnimeCard from "../components/element/AnimeCard";
import HistoryCard from "../components/element/HistoryCard";
import AnimeModal from "../components/element/AnimeModal";
import AddAnimeModal from "../components/element/AddAnimeModal";
import LoadingSpinner from "../components/element/LoadingSpinner";
import { getLeaderboardAnimes } from "../services/animeServices";
import { getCurrentUser } from "../services/authServices";

const Leaderboard = () => {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("rating_desc");

  const [selectedAnime, setSelectedAnime] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchLeaderboard();
    
    const handler = () => fetchLeaderboard();
    window.addEventListener("animesChanged", handler);
    return () => window.removeEventListener("animesChanged", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    const user = await getCurrentUser();
    if (!user) {
      setLoading(false);
      return;
    }
    const { data, error } = await getLeaderboardAnimes(user.id, sortBy);
    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }
    setAnimes(data || []);
    setLoading(false);
  };

  const top3 = animes.slice(0, 3);
  const rest = animes.slice(3);

  const renderPodium = () => {
    if (top3.length === 0) return null;

    const getPodiumClass = (rank) => {
      if (rank === 1) return "order-1 sm:order-2 z-10 sm:-mt-8 sm:scale-110";
      if (rank === 2) return "order-2 sm:order-1 sm:mt-8";
      if (rank === 3) return "order-3 sm:order-3 sm:mt-12";
      return "";
    };

    const getRankColors = (rank) => {
      if (rank === 1) return "bg-gradient-to-br from-amber-300 to-yellow-600 text-white shadow-yellow-500/50";
      if (rank === 2) return "bg-gradient-to-br from-slate-300 to-slate-500 text-white shadow-slate-500/50";
      if (rank === 3) return "bg-gradient-to-br from-orange-300 to-orange-700 text-white shadow-orange-500/50";
      return "bg-slate-200 text-slate-800";
    };

    return (
      <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-4 md:gap-8 pt-12 pb-8 px-4">
        {top3.map((anime, index) => {
          const rank = index + 1;
          return (
            <div
              key={anime.id}
              className={`relative flex-1 w-full max-w-[280px] sm:max-w-none transition-all duration-300 ${getPodiumClass(rank)}`}
            >
              <div className="relative group">
                {/* Glow effect */}
                <div className={`absolute -inset-1 rounded-[2rem] blur-md opacity-30 group-hover:opacity-60 transition duration-500 ${rank === 1 ? 'bg-yellow-400' : rank === 2 ? 'bg-slate-400' : 'bg-orange-500'}`}></div>
                
                {/* Ranking Badge */}
                <div className={`absolute -top-6 left-1/2 -translate-x-1/2 z-20 flex h-14 w-14 items-center justify-center rounded-full text-2xl font-black shadow-lg ${getRankColors(rank)} border-4 border-white`}>
                  #{rank}
                </div>
                
                {/* Wrapping AnimeCard */}
                <div className="relative rounded-[2rem] bg-white p-1.5 shadow-xl">
                  <div className="rounded-[1.7rem] overflow-hidden">
                    <AnimeCard
                      anime={anime}
                      onClick={(a) => {
                        setSelectedAnime(a);
                        setShowModal(true);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-mono text-slate-900">
      <Sidebar />
      <main className="mx-auto max-w-7xl px-4 pb-10 pt-6 sm:ml-64 sm:px-6 lg:px-8">
        
        {/* HEADER AREA */}
        <div className="mb-10">
          <div className="rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm sm:p-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-500/80">
                MyAnime
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                LEADERBOARD
              </h1>
              <p className="mt-2 text-slate-500 max-w-lg text-sm">
                Lihat peringkat anime terbaikmu berdasarkan rating tertinggi.
              </p>
            </div>

            {/* SORTING CONTROLS */}
            <div className="flex shrink-0 rounded-2xl bg-slate-100 p-1.5 shadow-inner">
              {[
                { id: "rating_desc", label: "Tertinggi" },
                { id: "rating_asc", label: "Terendah" },
                { id: "newest", label: "Terbaru" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSortBy(tab.id)}
                  className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${
                    sortBy === tab.id
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CONTENT AREA */}
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : animes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 mb-6 relative">
              <div className="absolute inset-0 bg-blue-50 rounded-full animate-ping opacity-20"></div>
              <span className="text-5xl relative z-10">🏆</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Belum Ada Anime</h3>
            <p className="mt-3 text-slate-500 max-w-md">
              Belum ada anime untuk ditampilkan di leaderboard. Tambahkan koleksimu dan beri rating untuk melihat peringkatnya!
            </p>
          </div>
        ) : (
          <div className="space-y-16">
            {/* TOP 3 PODIUM */}
            <section>
              {renderPodium()}
            </section>

            {/* REMAINING RANKING */}
            {rest.length > 0 && (
              <section className="mx-auto max-w-4xl">
                <div className="mb-6 flex items-center justify-between px-2">
                  <h2 className="text-xl font-bold text-slate-800">
                    Peringkat Lainnya
                  </h2>
                  <span className="text-sm font-medium text-slate-400">
                    {rest.length} Anime
                  </span>
                </div>
                <div className="flex flex-col gap-4">
                  {rest.map((anime, index) => (
                    <HistoryCard
                      key={anime.id}
                      anime={anime}
                      rank={index + 4}
                      onClick={(a) => {
                        setSelectedAnime(a);
                        setShowModal(true);
                      }}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* ANIME DETAIL */}
        <AnimeModal
          anime={selectedAnime}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onEdit={(item) => {
            setShowAddForm(true);
            setTimeout(
              () =>
                window.dispatchEvent(
                  new CustomEvent("openEditAnime", { detail: item }),
                ),
              100,
            );
          }}
          onDeleted={() => fetchLeaderboard()}
        />

        {/* ADD ANIME (if user edits from modal) */}
        <AddAnimeModal
          isOpen={showAddForm}
          onClose={() => setShowAddForm(false)}
        />
      </main>
    </div>
  );
};

export default Leaderboard;
