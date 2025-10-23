'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";

export default function InviteSection() {
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    stakeholder: "",
    purpose: "",
    message: "",
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaValue) {
      alert("Please verify that you are not a robot!");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        formType: "invite-guest-speaker",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        additionalData: {
          stakeholder: formData.stakeholder,
          purpose: formData.purpose,
          message: formData.message,
          captcha: captchaValue,
        },
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/forms/submit`,
        payload
      );

      router.push("/thank-you"); // Navigate to thank-you page
      setOpenForm(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        stakeholder: "",
        purpose: "",
        message: "",
      });
      setCaptchaValue(null);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        alert(err.response.data);
      } else {
        alert("Server error! Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative bg-white px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Column: Image with animation */}
        <motion.div
          className="flex justify-center md:justify-start"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://sharathravikumar.com/wp-content/uploads/2024/12/sharath.png"
            alt="Guest Speaker"
            className="w-full max-w-sm"
          />
        </motion.div>

        {/* Right Column: Text + Button with animation */}
        <motion.div
          className="flex flex-col items-center md:items-start text-center md:text-left gap-6"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h2
            className="text-4xl font-bold text-gray-800"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Host a guest speaker to gain expert insights
          </motion.h2>

          <motion.p
            className="text-gray-400 max-w-lg font-medium"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Feature Sharath Ravikumar at your event as a guest speaker, where
            his industry insights, innovative digital strategies, and proven
            leadership excellence inspire audiences to unlock their true
            potential.
          </motion.p>

          <motion.button
            onClick={handleOpenForm}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-400 text-gray-800 px-8 py-3 rounded-lg mb-2 md:mb-0 font-semibold shadow-md"
          >
            Host Sharath Ravikumar
          </motion.button>
        </motion.div>
      </div>

      {/* Centered Popup Form */}
      <AnimatePresence>
        {openForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            {/* Background overlay */}
            <motion.div
              onClick={() => setOpenForm(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black"
            />

            {/* Form Card */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="relative bg-white rounded-2xl p-6 md:p-10 w-full max-w-lg md:max-w-2xl shadow-xl z-50 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setOpenForm(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              >
                ✕
              </button>

              <h3 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">
                Guest Speaker Form
              </h3>

              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                onSubmit={handleSubmit}
              >
                {/* Inputs */}
                {[
                  { label: "Name", name: "name", type: "text" },
                  { label: "Email", name: "email", type: "email" },
                  { label: "Phone", name: "phone", type: "text" },
                  { label: "Stakeholder", name: "stakeholder", type: "text" },
                ].map((field) => (
                  <label
                    key={field.name}
                    className="flex flex-col text-sm font-medium text-gray-700"
                  >
                    {field.label} *
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required
                      className="mt-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 outline-none"
                    />
                  </label>
                ))}

                {/* Purpose Dropdown */}
                <label className="flex flex-col text-sm font-medium text-gray-700 col-span-1 md:col-span-2">
                  Purpose *
                  <select
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    required
                    className="mt-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="" disabled>
                      -- Select Purpose --
                    </option>
                    <option value="consultation">Consultation</option>
                    <option value="chief guest">Chief Guest</option>
                    <option value="jury">Jury</option>
                    <option value="speaker">Speaker</option>
                    <option value="workshop">Workshop</option>
                    <option value="guest professor">Guest Professor</option>
                    <option value="one on one discussion">
                      One on One Discussion
                    </option>
                    <option value="career guidance individual">
                      Career Guidance Individual
                    </option>
                  </select>
                </label>

                {/* Message */}
                <label className="flex flex-col text-sm font-medium text-gray-700 col-span-1 md:col-span-2">
                  Message *
                  <textarea
                    name="message"
                    placeholder="Write your message here"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="mt-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 outline-none"
                  />
                </label>

                {/* Google reCAPTCHA */}
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                  onChange={(value) => setCaptchaValue(value)}
                />

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={loading}
                  className="col-span-1 md:col-span-2 bg-yellow-400 text-gray-800 rounded-lg py-3 font-semibold shadow-md"
                >
                  {loading ? "Submitting..." : "Submit"}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
