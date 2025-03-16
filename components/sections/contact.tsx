"use client";

import React, { useState, useEffect } from "react";
import { Mail, Send, User, Bookmark, MessageSquare, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [activeField, setActiveField] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [glitchText, setGlitchText] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (fieldName: string) => {
    setActiveField(fieldName);
    setGlitchText(true);
    setTimeout(() => setGlitchText(false), 500);
  };

  const handleBlur = () => {
    setActiveField("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setGlitchText(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setGlitchText(false);

      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  useEffect(() => {
    const section = document.getElementById("contact");
    if (section) {
      section.classList.add("particles-bg");
    }
  }, []);

  return (
    <motion.section 
      id="contact" 
      className="w-full min-h-screen flex items-center justify-center py-16 px-6 bg-[#18141F] relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-2xl relative z-10"
      >
        <div className="relative bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-blue-400">Contact Us</h2>
            <p className="text-blue-300/80 mt-4 font-mono text-sm">Let's connect and build something amazing together!</p>
          </div>

          {isSubmitted && (
            <motion.div 
              className="border border-green-500/30 bg-green-500/10 text-green-400 p-4 mb-6 rounded-md text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              Your message has been sent successfully!
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-blue-400 text-xs">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} onFocus={() => handleFocus("name")} onBlur={handleBlur} required className="w-full p-3 rounded bg-gray-800 text-white" placeholder="Enter your name" />
              </div>
              <div>
                <label className="text-blue-400 text-xs">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} onFocus={() => handleFocus("email")} onBlur={handleBlur} required className="w-full p-3 rounded bg-gray-800 text-white" placeholder="Enter your email" />
              </div>
            </div>
            <div>
              <label className="text-blue-400 text-xs">Subject</label>
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} onFocus={() => handleFocus("subject")} onBlur={handleBlur} required className="w-full p-3 rounded bg-gray-800 text-white" placeholder="Enter subject" />
            </div>
            <div>
              <label className="text-blue-400 text-xs">Message</label>
              <textarea name="message" value={formData.message} onChange={handleChange} onFocus={() => handleFocus("message")} onBlur={handleBlur} required className="w-full p-3 rounded bg-gray-800 text-white" placeholder="Enter your message" rows={5}></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-500 transition">
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Contact;