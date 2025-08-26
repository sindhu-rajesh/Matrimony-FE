import React, { useState } from "react";

export default function AdminSuccessStory() {
  const [images, setImages] = useState([]);

  const handleAddImages = (e) => {
    const files = Array.from(e.target.files);
    // Limit to max 10 images total
    if (images.length + files.length > 10) {
      alert("You can only upload up to 10 images.");
      return;
    }

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prev) => [
          ...prev,
          { id: Date.now() + Math.random(), url: reader.result, name: file.name },
        ]);
      };
      reader.readAsDataURL(file);
    });
    // Reset input to allow re-upload of same file if needed
    e.target.value = null;
  };

  const handleDeleteImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Admin Success Story Images</h2>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleAddImages}
        className="mb-6"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {images.length === 0 && (
          <p className="col-span-full text-gray-500">No images uploaded yet.</p>
        )}
        {images.map((img) => (
          <div key={img.id} className="relative border rounded overflow-hidden group">
            <img
              src={img.url}
              alt={img.name}
              className="w-full h-32 object-cover"
            />
            <button
              onClick={() => handleDeleteImage(img.id)}
              className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
              aria-label="Delete image"
              title="Delete image"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
