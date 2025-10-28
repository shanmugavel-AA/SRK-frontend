"use client";

import {
  AlertTriangle,
  Lightbulb,
  Users,
  TrendingUp,
  SignalHigh,
  FileStack,
} from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const CaseStudyTwo = () => {
  return (
    <div className="flex flex-col">
      {/* Banner Section */}
      <section className="relative w-full h-[320px] md:h-[500px] mt-20">
        <img
          src="https://static.vecteezy.com/system/resources/previews/012/720/076/non_2x/remote-work-social-media-banner-freelancer-working-distant-on-pc-from-home-linkedin-cover-self-employed-occupation-header-cartoon-flat-illustration-vector.jpg"
          alt="Case Study Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 flex items-center justify-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-2xl md:text-6xl font-extrabold text-white text-center drop-shadow-lg"
          >
            Kauvery Hospital – SEO Transformation Story
          </motion.h1>
        </div>
      </section>

      {/* Overview */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="max-w-6xl mx-auto px-6 py-16 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          Project Overview
        </h2>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
          A data-driven SEO transformation that boosted Kauvery Hospital’s
          visibility, strengthened local search presence, and generated
          high-quality patient leads across multiple cities through precise
          optimization and content strategies.
        </p>
      </motion.section>

      {/* About Client */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              About the Client
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Kauvery Hospital is a leading multi-specialty healthcare brand in
              South India, known for its trusted medical expertise. They aimed
              to improve online discoverability and attract more patients
              digitally.
            </p>
          </motion.div>
          <motion.img
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            src="https://static.vecteezy.com/system/resources/previews/038/810/765/non_2x/ai-generated-a-warm-and-friendly-real-estate-agent-having-a-one-on-one-consultation-with-clients-free-photo.jpeg"
            alt="Client"
            className="rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="relative bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 space-y-20">
          {/* Challenge */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.img
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              src="https://cdn6.dissolve.com/p/D929_16_150/D929_16_150_1200.jpg"
              alt="Challenge Illustration"
              className="rounded-2xl shadow-lg"
            />
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="relative"
            >
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-red-100 rounded-full blur-2xl opacity-50"></div>
              <AlertTriangle className="w-14 h-14 text-red-500 mb-6" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                The Challenge
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Kauvery Hospital struggled with low search visibility, duplicate
                content, and unoptimized service pages. Competition from major
                hospital chains limited organic reach and patient acquisition
                across multiple cities.
              </p>
            </motion.div>
          </div>

          {/* Solution */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="relative"
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-green-100 rounded-full blur-2xl opacity-50"></div>
              <Lightbulb className="w-14 h-14 text-green-500 mb-6" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Our Solution
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We optimized 80+ service pages, fixed 120+ technical issues,
                built a strong backlink profile, and created a content strategy
                targeting city-specific healthcare keywords for higher
                visibility and patient engagement.
              </p>
            </motion.div>
            <motion.img
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              src="https://img.freepik.com/free-vector/solution-concept-illustration_114360-3891.jpg"
              alt="Solution Illustration"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="bg-gradient-to-r from-yellow-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-16"
          >
            Key Results
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: TrendingUp,
                stat: "+585%",
                desc: "Organic Traffic Growth",
              },
              { icon: Users,
                stat: "6x",
                desc: "Growth in Appointment Clicks" },
              {
                icon: SignalHigh,
                stat: "78+",
                desc: "Keywords Ranked in Top 10",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-yellow-100"
              >
                <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-md mb-6">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-5xl font-extrabold text-gray-800">
                  {item.stat}
                </h3>
                <p className="text-gray-600 mt-3 text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="max-w-6xl mx-auto px-6 py-20 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          Final Thoughts
        </h2>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
          Our SEO strategy empowered Kauvery Hospital to achieve top visibility,
          stronger authority, and higher patient conversions, transforming it
          into a digital-first healthcare brand with lasting organic growth.
        </p>
      </motion.section>
    </div>
  );
};

export default CaseStudyTwo;
