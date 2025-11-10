"use client";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function BaggageCheck() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!image) return alert("Please select an image first!");
    setLoading(true);
    setResult("");

    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await axios.post("/api/v1/predict", formData);
      setResult(res.data.text);
    } catch (err) {
      console.error(err);
      setResult("Something went wrong. Try again!");
    }

    setLoading(false);
  };

  return (
    <div className="h-auto m-4 flex flex-col items-center justify-center bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center bg-white/20 p-6 rounded-2xl shadow-lg backdrop-blur-md text-white w-[90%] sm:w-[400px]"
      >
        <h2 className="text-2xl font-semibold mb-3 text-center">
          Check Your Baggage Condition
        </h2>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setImage(file);
            setPreview(file ? URL.createObjectURL(file) : null);
          }}
          className="my-2 text-sm text-white"
        />

        {preview && (
          <motion.img
            src={preview}
            alt="preview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-48 h-48 object-cover rounded-xl shadow-lg mt-3"
          />
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`mt-5 bg-orange-500 px-6 py-2 rounded-full hover:scale-105 transition-transform font-medium ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin" size={18} />
              Analyzing...
            </span>
          ) : (
            "Analyze"
          )}
        </button>

        {result && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-5 text-center font-semibold ${
              result.includes("⚠️") ? "text-red-200" : "text-green-200"
            }`}
          >
            {result}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
