// app/menu/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';

const menuData = [
  { id: 1, name: "Masala Dosa", price: 85, desc: "Crispy dosa with spicy potato filling", category: "Dosa", spicy: true, veg: true },
  { id: 2, name: "Plain Dosa", price: 65, desc: "Classic crispy dosa", category: "Dosa", veg: true },
  { id: 3, name: "Idli (2 pcs)", price: 55, desc: "Steamed rice cakes with sambar", category: "Idli", veg: true },
  { id: 4, name: "Vada (2 pcs)", price: 60, desc: "Crispy lentil fritters", category: "Tiffin", veg: true },
  { id: 5, name: "Filter Coffee", price: 30, desc: "Strong South Indian brew", category: "Beverages", veg: true },
  { id: 6, name: "Meals", price: 150, desc: "Rice, sambar, rasam, curries, papad", category: "Meals", veg: true },
  { id: 7, name: "Mysore Masala Dosa", price: 95, desc: "With red chutney & ghee", category: "Dosa", spicy: true, veg: true },
  { id: 8, name: "Pongal", price: 80, desc: "Khara & sweet versions", category: "Breakfast", veg: true },
];

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);

  const categories = ["All", "Dosa", "Idli", "Tiffin", "Meals", "Beverages", "Breakfast"];

  // Load cart from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('peela-cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // Save cart
  useEffect(() => {
    localStorage.setItem('peela-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev
      .map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
      .filter(i => i.qty > 0)
    );
  };

  const removeItem = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const itemCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const filtered = selectedCategory === "All"
    ? menuData
    : menuData.filter(item => item.category === selectedCategory);

  return (
    <>
      <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #C6E6BA, #C4EB9D)' }}>

        {/* CATEGORY TABS */}
        <div className="sticky top-0 bg-white shadow-lg z-20 py-5 overflow-x-auto">
          <div className="flex gap-3 justify-center px-4 min-w-max">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full font-semibold text-sm md:text-base transition-all duration-300 whitespace-nowrap
                  ${selectedCategory === cat
                    ? 'bg-[#8CD190] text-white shadow-md'
                    : 'bg-[#C4EB9D] text-[#2D6A2F] hover:bg-[#C6E6BA] hover:shadow-sm'
                  }`}
                style={{
                  backgroundColor: selectedCategory === cat ? '#8CD190' : '#C4EB9D',
                  color: selectedCategory === cat ? 'white' : '#2D6A2F'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* MENU GRID */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(item => (
              <motion.div
                key={item.id}
                whileHover={{ y: -12, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-3xl overflow-hidden shadow-xl cursor-pointer border border-[#C6E6BA]/30"
              >
                <div className="h-48 bg-linear-to-br from-[#C6E6BA] to-[#C4EB9D] p-6 flex items-center justify-center">
                  <div className="bg-white/60 backdrop-blur-sm border-2 border-dashed border-[#8CD190] rounded-2xl w-36 h-36 flex items-center justify-center">
                    <span className="text-5xl text-[#8CD190] font-bold">{item.name[0]}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-[#2D6A2F]">{item.name}</h3>
                    <div className="flex gap-1">
                      {item.spicy && <span className="text-red-600 text-xl">Hot</span>}
                      {item.veg && <span className="text-green-700 text-xl">Veg</span>}
                    </div>
                  </div>
                  <p className="text-sm text-[#4A7C59] mb-4 leading-relaxed">{item.desc}</p>

                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold" style={{ color: '#8CD190' }}>₹{item.price}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addToCart(item)}
                      className="px-5 py-2.5 rounded-full text-white font-semibold text-sm shadow-md"
                      style={{ background: 'linear-gradient(135deg, #8CD190, #6FB677)' }}
                    >
                      Add to Plate
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* BOTTOM CART BAR */}
        {cart.length > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl p-4 z-30"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-[#8CD190]" />
                <span className="font-bold text-[#2D6A2F]">
                  {itemCount} items • ₹{total}
                </span>
              </div>

              <Link href="/Payment">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-full text-white font-bold shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #8CD190, #6FB677)' }}
                >
                  Checkout
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        button { transition: all 0.3s ease; }
        button:hover { transform: translateY(-3px); }
      `}</style>
    </>
  );
}