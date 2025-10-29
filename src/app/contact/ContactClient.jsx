"use client";

import CalendlyEmbed from "../../components/CalendlyEmbed";
import { motion } from "framer-motion";
import { PhoneCall } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import WhatsappButton from "../../components/WhatsappIcon";

const clients = [
  "/assets/About-page/auto/Mercedez.webp",
  "/assets/About-page/ecommerce/Chennai Silks.webp",
  "/assets/About-page/food/Palmshore.webp",
  "/assets/About-page/real estate/VGN Homes.webp",
  "/assets/About-page/health care/kauvery_.webp",
  "/assets/About-page/mall webp/Palladium logo.webp",
  "/assets/About-page/real estate/hiranandani_.webp",
  "/assets/About-page/mall webp/Phoenix Marketcity logo300 resolution.webp",
  "/assets/About-page/auto/Volkwagen.webp",
];

const Contact = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    medium: "",
  });
  const [loading, setLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!captchaValue) {
      alert("Please verify that you are not a robot!");
      return;
    }

    try {
      // payload format matches backend model
      const payload = {
        formType: "general-contact",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        additionalData: {
          service: formData.service,
          message: formData.message,
          medium: formData.medium,
          captcha: captchaValue,
        },
      };

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/forms/submit`,
        payload
      ); // backend endpoint

      router.push("/thank-you");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setCaptchaValue(null);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        alert(err.response.data);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="w-full text-gray-800">
        {/* Banner */}
        <section className="w-full h-auto mt-20 md:h-[600px] flex flex-col md:flex-row">
          {/* Left Column: Blue Content */}
          <div className="w-full md:w-1/2 bg flex flex-col justify-center px-6 md:px-12 py-10 md:py-0 text-white text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Let’s Build Something Great Together
            </h1>
            <p className="text-base md:text-xl text-gray-200 mb-6">
              Have a project in mind or just want to say hello? Reach out — I’d
              love to hear from you.
            </p>

            {/* Call Numbers */}
            <div className="space-y-3">
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <PhoneCall className="w-6 h-6 text-blue-300" />
                <a
                  href="tel:+911234567890"
                  className="text-white text-lg font-medium hover:underline"
                >
                  +91 12345 67890
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <PhoneCall className="w-6 h-6 text-blue-300" />
                <a
                  href="tel:+919876543210"
                  className="text-white text-lg font-medium hover:underline"
                >
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Full Image */}
          <div className="w-full md:w-1/2 relative h-[400px] md:h-auto">
            <img
              src="/assets/about-us-hero.jpg"
              alt="Banner Image"
              className="object-cover object-contain w-full h-full"
            />
          </div>
        </section>

        <section className="max-w-7xl mx-auto overflow-hidden py-4">
          <h2 className="text-center text-4xl text-gray-700 font-bold mb-12">
            Our Clients
          </h2>
          <div className="relative w-full">
            <motion.div
              className="flex gap-10"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
            >
              {[...clients, ...clients, ...clients].map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-32 h-20 flex items-center justify-center"
                >
                  <img
                    src={logo}
                    alt={`Client ${index}`}
                    className="object-contain h-full w-full"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ===== Contact Info Section ===== */}
        <section className="w-full max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">
          {/* Left Column */}
          <div className="w-full md:w-1/2 flex items-center justify-center text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight text-gray-900">
              Reach Out & Collaborate
            </h2>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Left Sub-column: Single Card */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-xl p-8 flex flex-col order-2 sm:order-1 h-auto md:h-[400px] md:mt-40"
            >
              <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
                Get in Touch
              </h3>
              <p className="text-gray-600 text-base md:text-lg">
                Have questions? We are here to answer all your queries and help
                you get started.
              </p>
              <button className="text-gray-700 font-medium justify-center p-4 mt-auto bg rounded-lg">
                Reach us
              </button>
            </motion.div>

            {/* Right Sub-column: Two Stacked Cards */}
            <div className="flex flex-col gap-6 order-1 sm:order-2">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-2xl shadow-xl p-6 flex flex-col h-auto md:h-[300px]"
              >
                <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1">
                  Contact Our Team
                </h3>
                <p className="text-gray-700 text-base md:text-lg">
                  Our team is ready to provide guidance and support for all your
                  projects.
                </p>
                <button className="text-gray-700 font-medium justify-center p-4 mt-auto bg rounded-lg">
                  Reach us
                </button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-2xl shadow-xl p-6 flex flex-col h-auto md:h-[200px]"
              >
                <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1">
                  Schedule a Meeting
                </h3>
                <button className="text-gray-700 font-medium justify-center p-4 mt-auto bg rounded-lg">
                  Reach us
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="relative min-h-screen flex items-center justify-center bg-gray-50 overflow-hidden px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
            {/* Left Form - Contact Form */}
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-blue-700 mb-6">
                Contact Us
              </h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-gray-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-gray-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-gray-700">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-gray-700">
                    Select Service <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  >
                    <option value="">Select Service</option>
                    <option value="web">Web Development</option>
                    <option value="app">App Development</option>
                    <option value="seo">SEO Optimization</option>
                    <option value="design">UI/UX Design</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="font-medium text-gray-700">
                    How did you hear about us?{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="medium"
                    type="text"
                    placeholder="Google, Friend, Social Media..."
                    className="border rounded-lg p-3 w-full"
                    value={formData.medium}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-gray-700">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Your Message"
                    className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Google reCAPTCHA */}
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} // replace with your site key
                  onChange={(value) => setCaptchaValue(value)}
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Right Form - Invitation Form */}
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-blue-700 mb-6">
                Schedule an Event
              </h2>
              <CalendlyEmbed />
            </div>
          </div>
        </section>
      </div>
      <WhatsappButton />
    </>
  );
};

export default Contact;
