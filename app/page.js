
"use client"




import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import menu from "./Menu/page";

export default function Home() {
  return (
    <>
      <section className="text-gray-700 body-font bg-linear-to-r from-[#d2ebb7] via-[#c6e6ba] to-[#8cd190]">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          {/* Text Section */}
          <div className="flex flex-wrap -mx-4 lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
            <div className="w-full sm:p-4 px-4 mb-6">
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                Taste Tradition. Savor Freshness.
              </h1>
              <p className="text-lg text-gray-800 mb-6">
                Welcome to <span className="font-semibold text-green-700">Peela Leaf</span> — where crispy dosas, fluffy idlis, and authentic chutneys bring South Indian flavors to life.
              </p>
              <div className="flex space-x-4">
                <Link href="/Menu">
                  <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
                    View Menu
                  </button></Link>
                <button className="border border-green-600 text-green-600 px-6 py-2 rounded hover:bg-green-50 transition">
                  Order Now
                </button>
              </div>
            </div>

            {[
              { value: "350+", label: "Happy Customers" },
              { value: "12K+", label: "Dosas Served" },
              { value: "8K+", label: "Idlis Steamed" },
              { value: "5+", label: "Years of Flavor" },
            ].map((stat, index) => (
              <div key={index} className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                <h2 className="title-font font-medium text-3xl text-gray-900">{stat.value}</h2>
                <p className="leading-relaxed">{stat.label}</p>
              </div>
            ))}

          </div>

          {/* Animated Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="lg:w-1/2 sm:w-1/3 w-full rounded-lg overflow-hidden mt-6 sm:mt-0"
          >
            <Image
              src="/main.jpg" // Make sure this image is in your public folder
              alt="Dosa and Idli on Banana Leaf"
              width={600}
              height={400}
              className="object-cover object-center w-full h-full"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}

