// app/payment/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingBag, CheckCircle } from 'lucide-react';

export default function PaymentPage() {
  const [cart, setCart] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('peela-cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const delivery = 30;
  const grandTotal = total + delivery;

  const handlePayment = () => {
    setShowSuccess(true);
    setTimeout(() => {
      localStorage.removeItem('peela-cart');
      window.location.href = '/';
    }, 3000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to bottom, #C6E6BA, #C4EB9D)' }}>
        <div className="text-center p-10 bg-white rounded-3xl shadow-xl">
          <ShoppingBag className="w-16 h-16 text-[#8CD190] mx-auto mb-4" />
          <p className="text-xl font-bold text-[#2D6A2F] mb-2">Cart is Empty</p>
          <Link href="/menu">
            <button className="px-8 py-3 rounded-full text-white font-bold shadow-lg"
              style={{ background: 'linear-gradient(135deg, #8CD190, #6FB677)' }}>
              Go to Menu
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen pb-24" style={{ background: 'linear-gradient(to bottom, #C6E6BA, #C4EB9D)' }}>

        {/* Header */}
        <div className="bg-white shadow-lg py-6 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#2D6A2F]">Checkout</h1>
            <Link href="/menu" className="text-[#8CD190] font-semibold hover:underline">← Menu</Link>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="grid md:grid-cols-2 gap-8">

            {/* CART SUMMARY */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-xl font-bold text-[#2D6A2F] mb-4 flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-[#8CD190]" />
                Your Order
              </h2>
              {cart.map(item => (
                <div key={item.id} className="flex justify-between py-3 border-b">
                  <div>
                    <p className="font-medium text-[#2D6A2F]">{item.name}</p>
                    <p className="text-sm text-[#4A7C59]">₹{item.price} × {item.qty}</p>
                  </div>
                  <p className="font-bold text-[#8CD190]">₹{item.price * item.qty}</p>
                </div>
              ))}
            </div>

            {/* PAYMENT */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <h2 className="text-xl font-bold text-[#2D6A2F] mb-4">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>₹{delivery}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between text-xl font-bold text-[#2D6A2F]">
                    <span>Total</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePayment}
                className="w-full py-4 rounded-full text-white font-bold text-lg shadow-xl transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #8CD190, #6FB677)' }}
              >
                Pay ₹{grandTotal} (Cash on Delivery)
              </button>
            </div>
          </div>
        </div>

        {/* SUCCESS MODAL */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-md"
            >
              <CheckCircle className="w-16 h-16 text-[#8CD190] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#2D6A2F] mb-2">Order Confirmed!</h3>
              <p className="text-[#4A7C59]">Your meal is being prepared. Arriving in 30 mins.</p>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
}