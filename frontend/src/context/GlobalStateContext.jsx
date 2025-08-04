"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const GlobalStateContext = createContext();

export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};

export const GlobalStateProvider = ({ children }) => {
  // Initialize with sample data
  const [inventory, setInventory] = useState({
    stockCars: [
      {
        id: 1,
        title: "2018 KIA STINGER / SMART KEY, BACK CAMERA",
        price: "$10,330",
        totalPrice: "$12,464",
        image: "/4.jpg",
        stockNo: "BW803567",
        mileage: "162,182 km",
        year: "2018",
        engine: "3,342cc",
        transmission: "AT",
        location: "Korea",
        color: "Gray",
        fuel: "Petrol",
        drive: "4WD",
        seats: "5",
        doors: "4",
        features: ["Power Steering", "A/C", "Airbag", "Leather Seat", "Back Camera", "Alloy Wheels", "Sun Roof", "Radio", "Push Start", "Power Seat"]
      },
      {
        id: 2,
        title: "2018 KIA STINGER / SUN ROOF, SMART KEY, BACK CAMERA",
        price: "$10,771",
        totalPrice: "$12,905",
        image: "/5.jpeg",
        stockNo: "BX910689",
        mileage: "202,533 km",
        year: "2018",
        engine: "3,342cc",
        transmission: "AT",
        location: "Korea",
        color: "Black",
        fuel: "Petrol",
        drive: "2WD",
        seats: "5",
        doors: "4",
        features: ["Power Steering", "A/C", "Airbag", "Leather Seat", "Back Camera", "Alloy Wheels", "Sun Roof", "Radio", "Push Start", "Power Seat"]
      }
    ],
    salvageVehicles: [
      {
        id: 1,
        title: "2015 TOYOTA CAMRY SALVAGE",
        price: "$3,500",
        totalPrice: "$5,200",
        image: "/6.jpeg",
        stockNo: "SV001",
        mileage: "85,000 km",
        year: "2015",
        engine: "2,500cc",
        transmission: "AT",
        location: "Japan",
        color: "Silver",
        fuel: "Petrol",
        drive: "2WD",
        seats: "5",
        doors: "4",
        condition: "Front end damage, engine intact"
      }
    ],
    constructionMachinery: [
      {
        id: 1,
        title: "2019 CATERPILLAR EXCAVATOR 320",
        price: "$45,000",
        totalPrice: "$52,000",
        image: "/7.jpeg",
        stockNo: "CM001",
        mileage: "2,500 hours",
        year: "2019",
        engine: "6,000cc",
        transmission: "Hydraulic",
        location: "USA",
        color: "Yellow",
        fuel: "Diesel",
        capacity: "20 tons",
        condition: "Excellent working condition"
      }
    ],
    bikes: [
      {
        id: 1,
        title: "2020 HONDA CBR 600RR",
        price: "$12,000",
        totalPrice: "$14,500",
        image: "/4.jpg",
        stockNo: "BK001",
        mileage: "8,500 km",
        year: "2020",
        engine: "599cc",
        transmission: "6-speed",
        location: "Japan",
        color: "Red",
        fuel: "Petrol",
        condition: "Mint condition, low mileage"
      }
    ]
  });

  // Load inventory from localStorage on mount
  useEffect(() => {
    const savedInventory = localStorage.getItem('inventory');
    if (savedInventory) {
      setInventory(JSON.parse(savedInventory));
    }
  }, []);

  // Save inventory to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(inventory));
  }, [inventory]);

  const addProduct = (category, product) => {
    const newId = Math.max(...inventory[category].map(item => item.id), 0) + 1;
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
        item.id === productId ? { ...item, ...updatedProduct } : item
      )
    }));
  };

  const deleteProduct = (category, productId) => {
    setInventory(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item.id !== productId)
    }));
  };

  const value = {
    inventory,
    addProduct,
    updateProduct,
    deleteProduct
  };

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
}; 