import React, { useState, useRef, useEffect } from 'react';

// ✅ Orange Circular Loader Spinner
const Loader = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded border border-orange-200 z-10">
    <div className="w-10 h-10 border-[4px] border-orange-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const CloudinaryUploader = ({
  onUpload,
  value = "",
  previewClassName = "",
  overlayClassName = ""
}) => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    setPreview(value || null);
    setFileName("");
  }, [value]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const tempURL = URL.createObjectURL(file);
    setPreview(tempURL);
    setLoading(true);

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        onUpload(data.secure_url);
        setPreview(data.secure_url);
      }
    } catch (err) {
      console.error('Cloudinary Upload Error:', err);
      setPreview(value || null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`relative w-full max-w-xs min-h-[120px] flex flex-col items-center justify-center border-2 border-dashed border-orange-300 rounded bg-orange-50 hover:bg-orange-100 transition-colors ${overlayClassName}`}
      onClick={() => !loading && inputRef.current?.click()}
      style={{ cursor: loading ? "not-allowed" : "pointer" }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleImageUpload}
        disabled={loading}
        className="hidden"
      />

      {loading && <Loader />}

      {!preview && !loading && (
        <span className="text-orange-400 font-medium">Click or tap to upload image</span>
      )}

      {preview && !loading && (
        <>
          <img
            src={preview}
            alt="Preview"
            className={`max-h-28 object-contain mx-auto rounded shadow ${previewClassName}`}
          />
          {fileName && (
            <span className="block text-xs text-gray-500 mt-2 break-all">{fileName}</span>
          )}
        </>
      )}

      {!preview && fileName && !loading && (
        <span className="block text-xs text-gray-500 mt-2 break-all">{fileName}</span>
      )}
    </div>
  );
};

export default CloudinaryUploader;
