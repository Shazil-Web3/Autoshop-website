"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { vehicleService } from '../services/vehicleService';

const GlobalStateContext = createContext();

export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};

export const GlobalStateProvider = ({ children }) => {
  // Initialize with empty data; will fetch from backend
  const [inventory, setInventory] = useState({
    stockCars: [],
    salvageVehicles: [],
    constructionMachinery: [],
    bikes: [],
    // New category for auto parts managed via admin add-product
    autoParts: []
  });

  // New: Site content for homepage banners and ads
  const [siteContent, setSiteContent] = useState({
    heroBanners: ["/8.jpg", "/9.jpg", "/10.jpg", "/11.jpg", "/12.jpg"],
    adGridImages: ["/3.jpg", "/3.jpg", "/3.jpg", "/3.jpg"],
    leftSidebarAdImage: "/1.jpg"
  });

  // Load inventory from backend on mount
  useEffect(() => {
    let mounted = true;
    const loadInventory = async () => {
      try {
        const data = await vehicleService.getInventory();
        if (mounted) {
          setInventory(prev => ({ ...prev, ...data }));
        }
      } catch (err) {
        // Fallback to localStorage seed if backend not available
        const savedInventory = typeof window !== 'undefined' ? localStorage.getItem('inventory') : null;
        if (savedInventory && mounted) {
          setInventory(JSON.parse(savedInventory));
        }
      }
    };
    loadInventory();
    return () => { mounted = false; };
  }, []);

  // Load siteContent from localStorage on mount
  useEffect(() => {
    const savedSiteContent = typeof window !== 'undefined' ? localStorage.getItem('siteContent') : null;
    if (savedSiteContent) {
      setSiteContent(JSON.parse(savedSiteContent));
    }
  }, []);

  // Save inventory and siteContent to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('inventory', JSON.stringify(inventory));
    }
  }, [inventory]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('siteContent', JSON.stringify(siteContent));
    }
  }, [siteContent]);

  const addProduct = (category, product) => {
    const newId = Math.max(...inventory[category].map(item => item.id || 0), 0) + 1;
    const newProduct = { ...product, id: newId };
    
    setInventory(prev => ({
      ...prev,
      [category]: [...prev[category], newProduct]
    }));
  };

  const updateProduct = (category, productId, updatedProduct) => {
    setInventory(prev => ({
      ...prev,
      [category]: prev[category].map(item => 
        (item.id === productId || String(item._id) === String(productId)) ? { ...item, ...updatedProduct } : item
      )
    }));
  };

  const deleteProduct = (category, productId) => {
    setInventory(prev => ({
      ...prev,
      [category]: prev[category].filter(item => (item.id || String(item._id)) !== String(productId))
    }));
  };

  // New: Updaters for site content
  const updateHeroBanners = (images) => {
    setSiteContent(prev => ({ ...prev, heroBanners: images }));
  };

  const updateAdGridImages = (images) => {
    setSiteContent(prev => ({ ...prev, adGridImages: images }));
  };

  const updateLeftSidebarAdImage = (image) => {
    setSiteContent(prev => ({ ...prev, leftSidebarAdImage: image }));
  };

  const value = {
    inventory,
    addProduct,
    updateProduct,
    deleteProduct,
    siteContent,
    updateHeroBanners,
    updateAdGridImages,
    updateLeftSidebarAdImage
  };

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
}; 