"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

export default function FormPopup() {
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);

  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    formType: "PopUp Form",
    additionalData: {
      service: "",
      otherService: "",
      message: "",
      source: "",
      captcha: captchaValue,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaValue) {
      alert("Please verify that you are not a robot!");
      return;
    }
    setLoading(true);
    try {
      let additionalData = {
        ...FormData.additionalData,
        service:
          FormData.additionalData.service === "others"
            ? FormData.additionalData.otherService
            : FormData.additionalData.service,
        captcha: captchaValue,
      };

      // If "others" is selected, remove the otherService field from payload
      if (FormData.additionalData.service === "others") {
        delete additionalData.otherService;
      }

      const payload = {
        ...FormData,
        additionalData,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/forms/submit`,
        payload
      );

      if (response.status === 200) {
        router.push("/thank-you");
        setShowForm(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          formType: "Popup Form",
          additionalData: {
            service: "",
            otherService: "",
            message: "",
            source: "",
          },
        });
      }
      setCaptchaValue(null);
      setShowForm(false);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        alert(err.response.data);
      } else {
        alert("error submitting form");
      }
    } finally {
      setLoading(false);
    }
  };

  // Show popup after 3 seconds
  useEffect(() => {
    setShowForm(false); // reset
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Lock/unlock background scroll
  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = "hidden"; // disable background scroll
    } else {
      document.body.style.overflow = "auto"; // restore normal scroll
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showForm]);

  return (
    <AnimatePresence>
      {showForm && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col backdrop-blur-md bg-white/50 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-black hover:text-blue-800"
            onClick={() => setShowForm(false)}
          >
            <X size={28} />
          </button>

          {/* Center container */}
          <div className="flex flex-1 items-center justify-center px-4 py-8">
            <motion.div
              className="bg-white text-gray-900 rounded-2xl shadow-xl w-full max-w-2xl"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              {/* Header */}
              <div className="bg-blue-700 text-white text-center rounded-t-2xl p-4">
                <h2 className="text-2xl font-bold">Get A Free Quote Now</h2>
                <p className="text-sm">
                  Send your requirement. We will get back to you within 24
                  hours.
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6"
              >
                {/* Row 1 */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="border rounded-lg p-3 w-full"
                    required
                    value={FormData.name}
                    onChange={(e) =>
                      setFormData({ ...FormData, name: e.target.value })
                    }
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Email ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    className="border rounded-lg p-3 w-full"
                    required
                    value={FormData.email}
                    onChange={(e) =>
                      setFormData({ ...FormData, email: e.target.value })
                    }
                  />
                </div>

                {/* Row 2 */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Phone No <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="border rounded-lg p-3 w-full"
                    required
                    value={FormData.phone}
                    onChange={(e) =>
                      setFormData({ ...FormData, phone: e.target.value })
                    }
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Select Service <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="border rounded-lg p-3 w-full"
                    required
                    value={FormData.additionalData.service}
                    onChange={(e) =>
                      setFormData({
                        ...FormData,
                        additionalData: {
                          ...FormData.additionalData,
                          service: e.target.value,
                        },
                      })
                    }
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
                    <option value="others">Others</option>
                  </select>
                  {FormData.additionalData.service === "others" && (
                    <input
                      type="text"
                      placeholder="Please specify your purpose"
                      className="border rounded-lg p-3 w-full mt-3"
                      required
                      value={FormData.additionalData.otherService}
                      onChange={(e) =>
                        setFormData({
                          ...FormData,
                          additionalData: {
                            ...FormData.additionalData,
                            otherService: e.target.value,
                          },
                        })
                      }
                    />
                  )}
                </div>

                {/* Row 4 */}
                <div className="flex flex-col md:col-span-2">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    placeholder="Write your message here..."
                    className="border rounded-lg p-3 w-full"
                    rows={3}
                    value={FormData.additionalData.message}
                    onChange={(e) =>
                      setFormData({
                        ...FormData,
                        additionalData: {
                          ...FormData.additionalData,
                          message: e.target.value,
                        },
                      })
                    }
                  ></textarea>
                </div>

                {/* Row 5 */}
                <div className="flex flex-col md:col-span-2">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    How did you hear about us?
                  </label>
                  <input
                    type="text"
                    placeholder="Google, Friend, Social Media..."
                    className="border rounded-lg p-3 w-full"
                    value={FormData.additionalData.source}
                    onChange={(e) =>
                      setFormData({
                        ...FormData,
                        additionalData: {
                          ...FormData.additionalData,
                          source: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                {/* Google reCAPTCHA */}
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                  onChange={(value) => {
                    setCaptchaValue(value);
                  }}
                />

                {/* Submit button */}
                <div className="md:col-span-2 flex justify-center">
                  <button
                    type="submit"
                    className="bg-yellow-400 text-gray-900 font-semibold px-10 py-3 rounded-full hover:bg-yellow-500 transition"
                    disabled={loading}
                  >
                    {loading ? "submitting" : "contact us"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
