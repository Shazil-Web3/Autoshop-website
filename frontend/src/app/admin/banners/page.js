"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGlobalState } from '../../../context/GlobalStateContext';
import { PlusIcon, ArrowLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';

const BannersAdminPage = () => {
  const router = useRouter();
  const { siteContent, updateHeroBanners, updateAdGridImages, updateLeftSidebarAdImage } = useGlobalState();

  const [heroBanners, setHeroBanners] = useState(siteContent.heroBanners || []);
  const [adGridImages, setAdGridImages] = useState(siteContent.adGridImages || ["", "", "", ""]);
  const [leftSidebarAdImage, setLeftSidebarAdImage] = useState(siteContent.leftSidebarAdImage || "");
  const [message, setMessage] = useState("");

  const handleHeroImagesChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const readers = files.map((file) =>
      new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      })
    );
    Promise.all(readers).then((urls) => {
      setHeroBanners((prev) => [...prev, ...urls]);
    });
    e.target.value = '';
  };

  const removeHeroAt = (index) => {
    setHeroBanners((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAdGridChange = (slotIndex, e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setAdGridImages((prev) => {
        const next = prev.slice();
        next[slotIndex] = reader.result;
        return next;
      });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleLeftSidebarChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLeftSidebarAdImage(reader.result);
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleSave = () => {
    updateHeroBanners(heroBanners);
    updateAdGridImages(adGridImages);
    updateLeftSidebarAdImage(leftSidebarAdImage);
    setMessage('Homepage banners and ads updated');
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/admin" className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                <ArrowLeftIcon className="w-4 h-4" />
                <span>Back to Admin</span>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Homepage Banners & Ads</h1>
                <p className="text-gray-600">Manage hero carousel and advertisement images</p>
              </div>
            </div>
            <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
              <PlusIcon className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
          {message && (
            <div className="mt-4 p-3 rounded bg-green-50 border border-green-200 text-green-800">{message}</div>
          )}
        </div>

        {/* Hero Carousel Images */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-black mb-4">Hero Carousel Images</h2>
          <input id="heroUpload" type="file" accept="image/*" multiple className="sr-only" onChange={handleHeroImagesChange} />
          <label htmlFor="heroUpload" className="inline-flex items-center px-4 py-2 rounded-md text-white text-sm font-medium bg-blue-600 hover:bg-blue-700">
            <span className="mr-2">📷</span>
            <span>Add Images</span>
          </label>
          {heroBanners.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {heroBanners.map((src, idx) => (
                <div key={idx} className="relative group">
                  <img src={src} alt={`hero-${idx}`} className="w-full h-32 object-cover rounded" />
                  <button type="button" onClick={() => removeHeroAt(idx)} className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-600 rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Four Ad Grid Images */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-black mb-4">Homepage Ad Grid (4 images)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="border border-gray-200 rounded p-3">
                <div className="relative h-32 rounded overflow-hidden bg-gray-50">
                  {adGridImages[idx] ? (
                    <img src={adGridImages[idx]} alt={`ad-${idx}`} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No image</div>
                  )}
                </div>
                <input id={`adUpload-${idx}`} type="file" accept="image/*" className="sr-only" onChange={(e) => handleAdGridChange(idx, e)} />
                <label htmlFor={`adUpload-${idx}`} className="mt-3 inline-flex items-center px-3 py-2 rounded-md text-white text-sm font-medium bg-blue-600 hover:bg-blue-700">
                  <span className="mr-2">🖼️</span>
                  <span>Upload</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Left Sidebar Vertical Ad */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-black mb-4">Left Sidebar Vertical Ad</h2>
          <div className="flex items-start gap-4">
            <div className="relative w-48 h-64 rounded overflow-hidden bg-gray-50 border border-gray-200">
              {leftSidebarAdImage ? (
                <img src={leftSidebarAdImage} alt="sidebar-ad" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No image</div>
              )}
            </div>
            <div>
              <input id="leftSidebarUpload" type="file" accept="image/*" className="sr-only" onChange={handleLeftSidebarChange} />
              <label htmlFor="leftSidebarUpload" className="inline-flex items-center px-4 py-2 rounded-md text-white text-sm font-medium bg-blue-600 hover:bg-blue-700">
                <span className="mr-2">🖼️</span>
                <span>Upload</span>
              </label>
              <p className="text-xs text-gray-500 mt-2">This appears below the filters on the home page as a taller vertical ad.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannersAdminPage; 