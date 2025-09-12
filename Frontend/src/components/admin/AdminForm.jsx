import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { categories, subcategoriesMap } from "@constants/index";
import CloudinaryUploader from "../common/Cloudinary";

const API = `${import.meta.env.VITE_BACKEND_URL}/admin/upload`;

const PAGE_SIZE = 8, MAX_PAGES = 10;
const initialSection = { subtitle: "", description: "", imageUrl: "" };
const initialForm = {
  title: "",
  category: "",
  subcategory: "",
  section: "",
  featured: false,
  sections: [{ ...initialSection }],
};

export default function AdminForm() {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [editSectionIdx, setEditSectionIdx] = useState(0);

  const currentSubcategories = subcategoriesMap[form.category] || [];

  useEffect(() => { fetchArticles(); }, []);

  async function fetchArticles() {
    setLoading(true);
    try {
      const { data } = await axios.get(API);
      setArticles(Array.isArray(data) ? data : []);
      setError("");
    } catch {
      setError("Could not fetch articles.");
    }
    setLoading(false);
  }

  const filteredArticles = useMemo(
    () => articles.filter((a) => a.title?.toLowerCase().includes(search.toLowerCase())),
    [articles, search]
  );
  const totalPages = Math.min(MAX_PAGES, Math.ceil(filteredArticles.length / PAGE_SIZE) || 1);
  const pagedArticles = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredArticles.slice(start, start + PAGE_SIZE);
  }, [filteredArticles, page]);

  // --- Handlers ---
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSectionChange = (e, idx) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const sections = prev.sections.map((s, i) =>
        i === idx ? { ...s, [name]: value } : s
      );
      return { ...prev, sections };
    });
  };

  const handleSectionImage = (url, idx) => {
    setForm((prev) => {
      const sections = prev.sections.map((s, i) =>
        i === idx ? { ...s, imageUrl: url } : s
      );
      return { ...prev, sections };
    });
  };

  const handleAddSection = () => {
    setForm((prev) => ({
      ...prev,
      sections: [...prev.sections, { ...initialSection }],
    }));
    setEditSectionIdx(form.sections.length);
  };

  const handleRemoveSection = (idx) => {
    if (form.sections.length === 1) return;
    setForm((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== idx),
    }));
    setEditSectionIdx((cur) => {
      if (cur > 0 && cur === idx) return cur - 1;
      if (cur > idx) return cur - 1;
      return 0;
    });
  };

  const handleChangeSection = setEditSectionIdx;

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form, sections: form.sections.map(({ subtitle, description, imageUrl }) => ({ subtitle, description, imageUrl })) };
      if (editingId) {
        // Assume backend returns updated article
        const { data: updatedArticle } = await axios.put(`${API}/${editingId}`, payload);
        setArticles((prev) =>
          prev.map((a) => (a._id === editingId ? updatedArticle : a))
        );
      } else {
        const { data } = await axios.post(API, payload);
        setArticles((prev) => [...prev, data]);
      }
      setForm(initialForm);
      setEditingId(null);
      setError("");
      setEditSectionIdx(0);
    } catch {
      setError("Submission failed.");
    }
    setLoading(false);
  }

  const handleEdit = (item) => {
    setForm({
      title: item.title || "",
      category: item.category || "",
      subcategory: item.subcategory || "",
      section: item.section || "",
      featured: item.featured || false,
      sections: item.sections?.map((s) => ({
        subtitle: s.subtitle || "",
        description: s.description || "",
        imageUrl: s.imageUrl || "",
      })) || [{ ...initialSection }],
    });
    setEditingId(item._id);
    setEditSectionIdx(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this article?")) return;
    setLoading(true);
    try {
      await axios.delete(`${API}/${id}`);
      setArticles((prev) => prev.filter((a) => a._id !== id));
      setError("");
    } catch {
      setError("Delete failed.");
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setForm(initialForm);
    setEditingId(null);
    setError("");
    setEditSectionIdx(0);
  };

  // --- UI Classes ---
  const inputClass = `rounded border px-2 py-1 w-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 ${isDarkMode
    ? "bg-gray-900 border-gray-600 text-white"
    : "bg-white border-gray-300 text-gray-900"
    }`;
  const labelClass = `${isDarkMode ? "text-gray-200" : "text-gray-700"} font-medium mb-1`;
  const btnClass = `px-4 py-2 rounded font-semibold transition-colors disabled:opacity-60 ${isDarkMode
    ? "bg-orange-600 text-white hover:bg-orange-700"
    : "bg-orange-500 text-white hover:bg-orange-600"
    }`;
  const tableClass = `min-w-full divide-y ${isDarkMode ? "divide-gray-600" : "divide-gray-200"}`;
  const thClass = `px-2 py-2 text-left text-xs font-bold uppercase ${isDarkMode ? "text-orange-400 bg-gray-800" : "text-orange-600 bg-orange-50"
    }`;
  const tdClass = `px-2 py-2 whitespace-nowrap text-sm ${isDarkMode ? "text-gray-200" : "text-gray-800"
    }`;
  const rowHover = `transition-colors ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-orange-50"}`;
  const cardBg = isDarkMode ? "bg-gray-900" : "bg-white";
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-200";

  // Section navigation UI
  function SectionTabs() {
    return (
      <div className="flex gap-2 mb-3">
        {form.sections.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`px-3 py-1 rounded font-semibold border ${idx === editSectionIdx
              ? "bg-orange-400 text-white"
              : isDarkMode
                ? "bg-gray-800 text-gray-300"
                : "bg-gray-100 text-gray-700"
              }`}
            onClick={() => handleChangeSection(idx)}
          >
            Section {idx + 1}
          </button>
        ))}
        <button
          type="button"
          onClick={handleAddSection}
          className="ml-2 px-3 py-1 rounded bg-green-500 text-white font-bold hover:bg-green-600"
        >
          + Add Section
        </button>
        {form.sections.length > 1 && (
          <button
            type="button"
            className="ml-2 px-2 py-1 rounded bg-red-500 text-white font-bold hover:bg-red-600"
            onClick={() => handleRemoveSection(editSectionIdx)}
          >
            Remove Section
          </button>
        )}
      </div>
    );
  }

  // --- Render ---
  return (
    <div className="max-w-5xl mx-auto px-2 py-8">
      <form className={`mb-8 p-6 rounded shadow ${cardBg} border ${borderColor} space-y-4`} onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold text-orange-500 mb-2">{editingId ? "Edit Article" : "Create Article"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col">
            <span className={labelClass}>Title *</span>
            <input name="title" value={form.title} onChange={handleChange} className={inputClass} required />
          </label>
          <label className="flex flex-col">
            <span className={labelClass}>Category *</span>
            <select name="category" value={form.category} onChange={handleChange} className={inputClass} required>
              <option value="" disabled>Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col">
            <span className={labelClass}>Subcategory *</span>
            <select name="subcategory" value={form.subcategory} onChange={handleChange} className={inputClass} required>
              <option value="" disabled>Select subcategory</option>
              {currentSubcategories.map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col md:col-span-2">
            <span className={labelClass}>Section *</span>
            <div className="flex gap-4 pt-1">
              {["featured", "main", "bottom","headline"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 text-sm">
                  <input type="radio" name="section" value={opt} checked={form.section === opt} onChange={handleChange} />
                  <span className={isDarkMode ? "text-white" : "text-gray-800"}>{opt}</span>
                </label>
              ))}
            </div>
          </label>
        </div>
        {/* Sections */}
        <div className="pt-4">
          <SectionTabs />
          <div className={`p-4 rounded border ${borderColor} ${isDarkMode ? "bg-gray-800" : "bg-gray-50"} mb-4`}>
            <label className="flex flex-col mb-3">
              <span className={labelClass}>Subtitle</span>
              <input
                name="subtitle"
                value={form.sections[editSectionIdx]?.subtitle || ""}
                onChange={e => handleSectionChange(e, editSectionIdx)}
                className={inputClass}
                placeholder="Subtitle for this section"
              />
            </label>
            <CloudinaryUploader
              value={form.sections[editSectionIdx]?.imageUrl}
              onUpload={url => handleSectionImage(url, editSectionIdx)}
            />
            <label className="flex flex-col">
              <span className={labelClass}>Description *</span>
              <textarea
                name="description"
                value={form.sections[editSectionIdx]?.description || ""}
                onChange={e => handleSectionChange(e, editSectionIdx)}
                required
                className={inputClass + " min-h-[100px]"}
                placeholder="Description for this section"
              />
            </label>
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <button type="submit" disabled={loading} className={btnClass}>
            {loading ? (editingId ? "Updating..." : "Creating...") : (editingId ? "Update" : "Create")}
          </button>
          <button type="button" onClick={handleCancel} className="text-sm text-gray-500 underline">
            Cancel
          </button>
        </div>
        {error && <div className="text-red-500 font-semibold text-sm">{error}</div>}
      </form>
      {/* Search bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-2">
        <input
          className={`rounded px-3 py-2 border ${borderColor} w-full md:w-1/2${isDarkMode ? " bg-gray-900" : "  bg-white "}`}
          placeholder="Search by title..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 md:mt-0 text-right">
          {filteredArticles.length} result{filteredArticles.length !== 1 ? "s" : ""}
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className={`${tableClass} w-full text-sm table-fixed`}>
          <thead>
            <tr>
              <th className={thClass + " w-20"}>Image</th>
              <th className={thClass + " w-36"}>Title</th>
              <th className={thClass + " w-24"}>Category</th>
              <th className={thClass + " w-36"}>Subcategory</th>
              <th className={thClass + " w-16"}>Section</th>
              <th className={thClass + " w-28"}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pagedArticles.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-400">
                  {loading ? "Loading..." : "No articles found."}
                </td>
              </tr>
            ) : (
              pagedArticles.map((a) => (
                <tr key={a._id} className={`${rowHover} border-b ${borderColor}`}>
                  <td className={tdClass}>
                    {a.sections?.[0]?.imageUrl ? (
                      <img src={a.sections[0].imageUrl} alt="" className="w-10 h-10 object-cover rounded" />
                    ) : (
                      <span className="text-gray-400 text-xs">No image</span>
                    )}
                  </td>
                  <td className={tdClass + " truncate"} title={a.title}>{a.title}</td>
                  <td className={tdClass}>{a.category}</td>
                  <td className={tdClass + " truncate"} title={a.subcategory}>{a.subcategory}</td>
                  <td className={tdClass}>{a.section}</td>
                  <td className={tdClass}>
                    <button
                      className="mr-2 px-2 py-1 rounded bg-orange-100 text-orange-700 hover:bg-orange-200 text-xs font-semibold"
                      onClick={() => handleEdit(a)}
                      disabled={loading}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 text-xs font-semibold"
                      onClick={() => handleDelete(a._id)}
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <nav className="flex items-center justify-center gap-2 mt-6">
        <button
          className={`${btnClass} bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300`}
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`w-8 h-8 rounded-full mx-1 ${page === i + 1
              ? "bg-orange-500 text-white font-bold"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              }`}
            onClick={() => setPage(i + 1)}
            disabled={page === i + 1}
          >
            {i + 1}
          </button>
        ))}
        <button
          className={`${btnClass} bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300`}
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Next
        </button>
      </nav>
    </div>
  );
}