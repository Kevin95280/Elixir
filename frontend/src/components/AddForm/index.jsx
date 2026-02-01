import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { createBottle, updateBottle } from "../../../../backend/src/app/services/bottleService.js";

const AddForm = ({
  fetchAllWines,
  editingWine,
  updateWine,
  onClose,
  userId = 1,
  token = null
}) => {
  const { t } = useTranslation();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    year: "",
    type: "",
    owner: "",
    link: "",
    img: "",
    alt: "",
  });

  useEffect(() => {
    if (editingWine) {
      setFormData({
        name: editingWine.name || "",
        year: editingWine.year || "",
        type: editingWine.type || "",
        owner: editingWine.owner || "",
        link: editingWine.link || "",
        img: editingWine.img || "",
        alt: editingWine.alt || "",
        id: editingWine.id,
      });
    }
  }, [editingWine]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const resetForm = () => {
    setSubmitting(false);
    setError(null);
    setFormData({
      name: "",
      year: "",
      type: "",
      owner: "",
      link: "",
      img: "",
      alt: "",
    });
    onClose();
  };

  const saveForm = async () => {
    setError(null);

    const { name, year, type, link, img } = formData;
    const requiredFilled = name && type;

    if (!requiredFilled) {
      setError(t("addForm.errorRequired"));
      return;
    }

    try {
      setSubmitting(true);

      // MODE ÉDITION
      if (editingWine) {
        const payload = {
          ...formData,
          year: formData.year ? Number(formData.year) : null,
          userId: editingWine.userId ?? userId,
        };

        const updatedFromApi = await updateBottle(editingWine.id, payload, token);

        if (typeof updateWine === "function") {
          updateWine(updatedFromApi);
        } else if (typeof fetchAllWines === "function") {
          await fetchAllWines();
        }

        resetForm();
        return;
      }

      // MODE AJOUT
      const payload = {
        ...formData,
        year: formData.year.trim() !== "" ? Number(formData.year) : null,
        userId,
      };

      await createBottle(payload, token);

      if (typeof fetchAllWines === "function") {
        await fetchAllWines();
      }

      resetForm();
    } catch (err) {
      setError(err.message || t("addForm.errorSave"));
      setSubmitting(false);
    }
  };

  // Mapping propre entre champs techniques et labels visibles
  const fields = [
    { id: "name", label: t("addForm.name") },
    { id: "year", label: t("addForm.year") },
    { id: "type", label: t("addForm.type") },
    { id: "owner", label: t("addForm.owner") },
    { id: "link", label: t("addForm.link") },
    { id: "img", label: t("addForm.img") },
    { id: "alt", label: t("addForm.alt") },
  ];

  // Types de vin autorisés dans le select
  const allowedTypes = ["Rouge", "Blanc", "Rosé", "Pétillant", "Autre"];

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      id="form"
      className="space-y-4 bg-muted p-6 rounded-md shadow-vin animate-fade-in-up"
    >
      {error && <p className="text-red-600">{error}</p>}

      {fields.map(({ id, label }) => (
        <div key={id} className="flex flex-col">
          <label htmlFor={id} className="text-sm text-text mb-1">
            {label}
          </label>

          {id === "type" ? (
              <select
                id="type"
                value={formData.type}
                onChange={handleInputChange}
                style={{ backgroundColor: "var(--muted)"}}
                className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent !appearance-none"
              >
                <option value="">{t("addForm.selectType")}</option>
                {allowedTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
          ) : (
            <input
              id={id}
              type="text"
              inputMode={id === "year" ? "numeric" : "text"}
              pattern={id === "year" ? "[0-9]*" : undefined}
              value={formData[id]}
              onChange={handleInputChange}
              placeholder={label}
              className="px-3 py-2 rounded-md placeholder:text-text/60 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          )}
        </div>
      ))}

      <div className="flex gap-4">
        <button
          type="button"
          onClick={saveForm}
          disabled={submitting}
          className="px-4 py-2  text-text rounded-md transition disabled:opacity-60"
        >
          {editingWine
            ? submitting
              ? t("addForm.modifying")
              : t("addForm.modify")
            : submitting
            ? t("addForm.saving")
            : t("addForm.save")}
        </button>

        <button
          type="button"
          onClick={resetForm}
          className="btn-secondary"
        >
          {t("addForm.cancel")}
        </button>
      </div>
    </form>
  );
};

export default AddForm;
