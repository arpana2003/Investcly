import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaEdit, FaTrash, FaArrowLeft, FaArrowRight } from 'react-icons/fa';


const API =
  process.env.NODE_ENV === "production"
    ? "https://dynamicnewsbackend.vercel.app/api/stories"
    : "http://localhost:5000/api/stories";

const StoryForm = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const [formData, setFormData] = useState({
    title: '',
    authorName: '',
    category: '',
    storyType: 'text',
    slides: [{ text: '', imageUrl: '', ctaLink: '' }],
    tags: '',
    expiryTime: 'forever',
  });

  const [stories, setStories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Fetch stories
  const fetchStories = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setStories(data);
    } catch (error) {
      console.error("Failed to fetch stories:", error);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSlideChange = (index, field, value) => {
    const updatedSlides = [...formData.slides];
    updatedSlides[index][field] = value;
    setFormData(prev => ({ ...prev, slides: updatedSlides }));
  };

  const addSlide = () => {
    setFormData(prev => ({
      ...prev,
      slides: [...prev.slides, { text: '', imageUrl: '', ctaLink: '' }]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API}/${editingId}` : API;

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim())
      }),
    });

    setEditingId(null);
    setFormData({
      title: '',
      authorName: '',
      category: '',
      storyType: 'text',
      slides: [{ text: '', imageUrl: '', ctaLink: '' }],
      tags: '',
      expiryTime: 'forever',
    });
    fetchStories();
  };

  const handleEdit = (story) => {
    setEditingId(story._id);
    setFormData({
      title: story.title,
      authorName: story.authorName,
      category: story.category,
      storyType: story.storyType,
      slides: story.slides,
      tags: story.tags.join(', '),
      expiryTime: story.expiryTime,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this story?')) {
      await fetch(`${API}/${id}`, { method: 'DELETE' });
      fetchStories();
    }
  };

  // Pagination
  const totalPages = Math.ceil(stories.length / rowsPerPage);
  const currentRows = stories.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Styling
  const inputStyle = "p-2 rounded border w-full mb-3";
  const themeBg = isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black";
  const btnStyle = "bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded mt-2";

  return (
    <div className={`p-6 ${themeBg}`}>
      <h2 className="text-2xl font-bold mb-4 text-orange-500">
        {editingId ? 'Edit Story' : 'Add Story'}
      </h2>

      {/* Story Form */}
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input className={inputStyle} type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
        <input className={inputStyle} type="text" name="authorName" value={formData.authorName} onChange={handleChange} placeholder="Author Name" required />
        <input className={inputStyle} type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" />

        <select className={inputStyle} name="storyType" value={formData.storyType} onChange={handleChange}>
          <option value="text">Text</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>

        {formData.slides.map((slide, index) => (
          <div key={index} className="border p-3 rounded">
            <input className={inputStyle} type="text" placeholder="Slide Text" value={slide.text} onChange={(e) => handleSlideChange(index, 'text', e.target.value)} />
            <input className={inputStyle} type="text" placeholder="Image URL" value={slide.imageUrl} onChange={(e) => handleSlideChange(index, 'imageUrl', e.target.value)} />
            <input className={inputStyle} type="text" placeholder="CTA Link" value={slide.ctaLink} onChange={(e) => handleSlideChange(index, 'ctaLink', e.target.value)} />
          </div>
        ))}
        <button type="button" onClick={addSlide} className="text-orange-500 underline">+ Add Slide</button>

        <input className={inputStyle} type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags (comma separated)" />

        <select className={inputStyle} name="expiryTime" value={formData.expiryTime} onChange={handleChange}>
          <option value="forever">Forever</option>
          <option value="24h">24 Hours</option>
          <option value="48h">48 Hours</option>
        </select>

        <button type="submit" className={btnStyle}>
          {editingId ? 'Update Story' : 'Submit Story'}
        </button>
      </form>

      {/* Stories Table */}
      <h3 className="text-xl mt-8 mb-2 font-semibold text-orange-500">All Stories</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="p-2">Title</th>
              <th className="p-2">Author</th>
              <th className="p-2">Category</th>
              <th className="p-2">Type</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((story) => (
              <tr key={story._id} className="border-b hover:bg-orange-100 transition-all">
                <td className="p-2">{story.title}</td>
                <td className="p-2">{story.authorName}</td>
                <td className="p-2">{story.category}</td>
                <td className="p-2 capitalize">{story.storyType}</td>
                <td className="p-2 flex gap-2">
                  <button onClick={() => handleEdit(story)} className="text-blue-500"><FaEdit /></button>
                  <button onClick={() => handleDelete(story._id)} className="text-red-500"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4 gap-4 items-center text-orange-500">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            <FaArrowLeft />
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryForm;
