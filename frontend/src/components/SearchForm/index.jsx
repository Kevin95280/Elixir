import { useTranslation } from "react-i18next";

const SearchForm = ({ setSearch }) => {
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value;
    setSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar flex flex-col sm:flex-row gap-2 w-full">
      <label htmlFor="search" className="sr-only">
        {t("search.label")}
      </label>

      <input
        type="text"
        name="search"
        id="search"
        placeholder={t("search.placeholder")}
        className="flex-1 px-4 py-2 rounded-md bg-muted text-text placeholder:text-text/60 focus:outline-none focus:ring-2 focus:ring-accent"
      />

      <button
        type="submit"
        className="px-4 py-2 text-white rounded-md transition"
      >
        {t("search.button")}
      </button>
    </form>
  );
};

export default SearchForm;
