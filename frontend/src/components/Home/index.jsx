import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

import Header from "../Header";
import SearchForm from "../SearchForm";
import AddForm from "../AddForm";
import Cards from "../Cards";
import Footer from "../Footer";

import { getBottles, deleteBottle } from "../../../../backend/src/app/services/bottleService";

import introVideo from "../../assets/videos/presentation.mp4";

const Home = () => {
  const { user, token } = useAuth();
  const { t } = useTranslation();

  const [wines, setWines] = useState([]);
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState("");
  const [highlightId, setHighlightId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingWine, setEditingWine] = useState(null);
  const [mountKey] = useState(() => Date.now());
  const [initialLoad, setInitialLoad] = useState(true);

  const typeOrder = ["Rouge", "Blanc", "Rosé", "Pétillant", "Autre"];

  const fetchAllWines = async () => {
    try {
      const data = await getBottles(token);

      const sorted = [...data].sort((a, b) =>
        typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type)
      );

      setWines(sorted);

      if (!initialLoad && sorted.length > 0) {
        const last = sorted.reduce((max, b) => (b.id > max.id ? b : max), sorted[0]);
        setHighlightId(last.id);
        setTimeout(() => setHighlightId(null), 5000);
      }
    } catch (err) {
      console.error(t("home.loadError"), err);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchAllWines();
    setInitialLoad(false);
  }, [token]);

  useEffect(() => {
    if (!search.trim()) {
      setCards(wines);
      return;
    }

    const filtered = wines.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.owner?.toLowerCase().includes(search.toLowerCase()) ||
      item.link?.toLowerCase().includes(search.toLowerCase()) ||
      item.alt?.toLowerCase().includes(search.toLowerCase()) ||
      item.img?.toLowerCase().includes(search.toLowerCase())
    );

    setCards(filtered);
  }, [search, wines]);

  const handleEditWine = (wine) => {
    setEditingWine(wine);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateWine = (updatedWine) => {
    setWines((prev) =>
      prev.map((w) => (w.id === updatedWine.id ? updatedWine : w))
    );

    setEditingWine(null);
    setShowForm(false);

    setHighlightId(updatedWine.id);
    setTimeout(() => setHighlightId(null), 5000);
  };

  const handleDeleteBottle = async (id) => {
    if (!window.confirm(t("home.deleteConfirm"))) return;

    try {
      await deleteBottle(id, token);
      setWines((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error(err);
      alert(t("home.deleteError"));
    }
  };

  return (
    <>
      <Header />

      <section className="px-4 py-6 space-y-4">
        <SearchForm setSearch={setSearch} />

        {user && !showForm && (
          <button
            onClick={() => {
              setEditingWine(null);
              setShowForm(true);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="px-4 py-2 text-white rounded-md transition"
          >
            {t("home.addBottle")}
          </button>
        )}

        {showForm && (
          <AddForm
            fetchAllWines={fetchAllWines}
            editingWine={editingWine}
            updateWine={updateWine}
            onClose={() => {
              setShowForm(false);
              setEditingWine(null);
            }}
            token={token}
            userId={user?.id}
          />
        )}
      </section>

      {/* Vidéo visible uniquement si l'utilisateur n'est PAS connecté */}
      {!user && (
        <div className="w-full max-w-5xl mx-auto px-4 mt-24">
          <video
            src={introVideo}
            autoPlay
            muted
            loop
            playsInline
            controls
            className="w-full rounded-lg shadow-xl"
            aria-label={t("demoVideo.alt")}
          />

          <p className="text-center text-sm text-gray-500 mt-2">
            {t("demoVideo.caption")}
          </p>
        </div>
      )}

      <Cards
        key={mountKey}
        cards={cards}
        highlightId={highlightId}
        onEdit={handleEditWine}
        onDelete={handleDeleteBottle}
      />

      <Footer />
    </>
  );
};

export default Home;