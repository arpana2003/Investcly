import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Loader, Share2, ChevronLeft, ChevronRight, MessageCircle, ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";
import DOMPurify from "dompurify";
import LeaveComment from "./common/LeaveComment";
import FinanceSection from "./home/FinanceSection";

const API = process.env.NODE_ENV === "production"
  ? "https://dynamicnewsbackend.vercel.app/admin/upload"
  : "http://localhost:5000/admin/upload";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const accent = "#ff8800";

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allArticles, setAllArticles] = useState([]);
  const [error, setError] = useState("");
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`${API}/${id}`).then((res) => res.json()),
      fetch(API).then((res) => res.json()),
    ])
      .then(([articleData, allData]) => {
        setArticle(articleData);
        setAllArticles(Array.isArray(allData) ? allData : []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load article.");
        setLoading(false);
      });
  }, [id]);

  const currIndex = allArticles.findIndex((a) => a._id === id);
  const prevBlog = currIndex > 0 ? allArticles[currIndex - 1] : null;
  const nextBlog = currIndex !== -1 && currIndex < allArticles.length - 1 ? allArticles[currIndex + 1] : null;

  const handleShare = () => {
    const shareData = {
      title: article?.title,
      text: article?.subcategory,
      url: window.location.href,
    };
    if (navigator.share) navigator.share(shareData);
    else {
      setShareOpen(true);
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const sharedButtonStyle = {
    background: isDarkMode ? "#23253b" : "#f2f2f7",
    color: isDarkMode ? "#f8fafc" : "#23253b",
    border: isDarkMode ? "1.5px solid #32344a" : "1.5px solid #ececec",
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]" style={{ background: isDarkMode ? "#181926" : "#fcfcfc" }}>
      <Loader className="animate-spin" size={38} color={accent} />
    </div>
  );

  if (error || !article) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center" style={{ background: isDarkMode ? "#181926" : "#fcfcfc", color: isDarkMode ? "#ff6b6b" : "#d32f2f" }}>
      <div className="font-bold text-xl mb-4">{error || "Article not found."}</div>
      <Link to="/" className="px-4 py-2 rounded font-bold bg-orange-500 hover:bg-orange-600 text-white">Go Home</Link>
    </div>
  );

  const sections = Array.isArray(article.sections) && article.sections.length > 0 ? article.sections : [{
    imageUrl: article.imageUrl,
    subtitle: article.subcategory,
    description: article.content,
  }];

  const titleStyle = {
    color: isDarkMode ? "#fff" : "#1a1a1a",
    letterSpacing: "-.01em",
    fontWeight: 800,
    fontSize: "2.2rem",
    textShadow: isDarkMode
      ? "0 2px 16px #ff880055, 0 1px 0 #32344a"
      : "0 2px 16px #ff880022, 0 1px 0 #ececec",
    lineHeight: 1.2,
  };

  return (
    <div className="flex" style={{ background: isDarkMode ? "#181926" : "#fcfcfc" }}>
      <aside className="hidden lg:block mt-15 ml-5 w-[260px]">
        <FinanceSection />
      </aside>
      <main className="flex-1 py-6 px-4 sm:px-8" style={{ color: isDarkMode ? "#f8fafc" : "#23253b" }}>
        <div className="max-w-4xl mx-auto">
          <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-sm font-semibold" style={{ color: accent }}>
            <ArrowLeft size={18} /> Back
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div className="flex-1">
              <h1 style={titleStyle}>{article.title}</h1>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="px-3 py-1 rounded-full text-sm font-semibold" style={{ background: isDarkMode ? "#32344a" : "#fff7ec", color: accent }}>{article.category}</span>
                {article.subcategory && <span className="text-sm px-3 py-1 rounded-full font-medium" style={{ background: isDarkMode ? "#2d2f46" : "#fff5e5", color: isDarkMode ? "#ffe0b2" : accent }}>{article.subcategory}</span>}
                {article.featured && <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold" style={{ background: "#ffe0b2", color: "#b45309" }}>Featured</span>}
                <span className="text-xs font-medium ml-auto" style={{ color: isDarkMode ? "#c6cad7" : "#707080" }}>{new Date(article.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <button onClick={handleShare} className="flex items-center gap-2 px-3 py-1.5 rounded font-semibold whitespace-nowrap" style={{ background: isDarkMode ? "#2d2f46" : "#fff7ec", color: accent, border: isDarkMode ? "1.5px solid #32344a" : "1.5px solid #ffe0b2" }}>
              <Share2 size={18} /> Share
            </button>
          </div>

          {sections.map((section, idx) => (
            <div key={idx} className="mb-8">
         
              <div className="w-72 sm:w-90 mx-auto overflow-hidden rounded-xl shadow mb-3 group">
                <img
                  src={section.imageUrl}
                  alt=""
                  className="w-full mx-auto rounded-xl transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
              </div>


              {section.subtitle && (
                <div className="text-center font-semibold mb-1" style={{ color: accent }}>{section.subtitle}</div>
              )}
              {section.description && (
                <div className="text-start sm:px-36 px-4  mb-4"
 style={{ color: isDarkMode ? "#f8fafc" : "#23253b" }}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      (section.description || "").replace(/\n/g, "<br/>")
                    ),
                  }}
                />
              )}
              
            </div>
          ))}

          <div className="flex items-center gap-4 mb-8">
            <a href="#comments" className="flex items-center gap-2 px-3 py-1.5 rounded font-semibold" style={sharedButtonStyle}>
              <MessageCircle size={18} /> Comment
            </a>
            {shareOpen && <span className="text-sm ml-2" style={{ color: "#0db16b" }}>Link copied!</span>}
          </div>

          <div className="flex items-center justify-between mb-10">
            {prevBlog ? <button onClick={() => navigate(`/blog/${prevBlog._id}`)} className="flex items-center gap-2 px-3 py-2 rounded font-semibold" style={sharedButtonStyle}><ChevronLeft size={18} /> Previous</button> : <span />}
            {nextBlog ? <button onClick={() => navigate(`/blog/${nextBlog._id}`)} className="flex items-center gap-2 px-3 py-2 rounded font-semibold" style={sharedButtonStyle}>Next <ChevronRight size={18} /></button> : <span />}
          </div>

          <div id="comments" className="mb-10">
            <h2 className="text-2xl font-bold mb-4" style={{ color: isDarkMode ? "#fff" : accent, letterSpacing: "-.01em" }}>Leave a Comment</h2>
            <LeaveComment blogId={article._id} />
          </div>
        </div>
      </main>
    </div>
  );
}
