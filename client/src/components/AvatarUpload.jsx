import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Camera, Loader2, UploadCloud, X } from 'lucide-react';

const AvatarUpload = ({ currentAvatar, onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(currentAvatar || 'https://ui-avatars.com/api/?name=User&background=random');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // 1. Validate File Type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(selectedFile.type)) {
      setError('Invalid file type. Please select a JPEG, PNG, or WebP image.');
      return;
    }

    // 2. Validate File Size (Max 2MB)
    if (selectedFile.size > 2 * 1024 * 1024) {
      setError('Image is too large. Please select a file under 2MB.');
      return;
    }

    setError(null);
    setFile(selectedFile);
    
    // Create a local preview URL so the user sees it immediately
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('avatar', file); // Matches upload.single('avatar') in your backend

    try {
      const response = await axios.post('/api/auth/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.ok) {
        setFile(null); // Clear the pending file state
        if (onUploadSuccess) {
          onUploadSuccess(response.data.data.avatar); // Pass the new Cloudinary URL to the parent
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload avatar. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const cancelSelection = () => {
    setFile(null);
    setPreview(currentAvatar || 'https://ui-avatars.com/api/?name=User&background=random');
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset the hidden input
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 transition-colors duration-300">
      {/* Avatar Preview & Clickable Area */}
      <div className="relative group cursor-pointer" onClick={() => !isUploading && fileInputRef.current.click()}>
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-50 dark:border-slate-800 shadow-md transition-colors duration-300">
          <img src={preview} alt="Profile Avatar" className="w-full h-full object-cover" />
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Camera className="text-white w-8 h-8" />
        </div>
      </div>

      <input type="file" accept="image/jpeg, image/png, image/webp" className="hidden" ref={fileInputRef} onChange={handleFileChange} />

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm text-center max-w-xs">{error}</p>}

      {/* Action Buttons (Only show when a new file is selected) */}
      {file && (
        <div className="flex gap-3 mt-2">
          <button onClick={cancelSelection} disabled={isUploading} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:opacity-50">
            <X size={16} /> Cancel
          </button>
          <button onClick={handleUpload} disabled={isUploading} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-sm">
            {isUploading ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
            {isUploading ? 'Uploading...' : 'Save Avatar'}
          </button>
        </div>
      )}
      
      {!file && (
        <p className="text-xs text-slate-500 dark:text-slate-400 text-center transition-colors duration-300">Click the image to upload a new avatar.<br/>(JPEG, PNG, WebP up to 2MB)</p>
      )}
    </div>
  );
};

export default AvatarUpload;