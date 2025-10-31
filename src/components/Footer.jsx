"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Linkedin , Instagram, Facebook  } from "lucide-react";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();

  const handleSchedule = () => {
    router.push("/contact");
  };

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/sharathravikumar/",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/sharathravikumarr/",
      label: "Instagram",
    },
    {
      icon: Facebook,
      href: "https://www.facebook.com/share/1D39LkPUQe/?mibextid=wwXIfr",
      label: "Instagram",
    },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/social-media-expert-chennai-india" },
    { name: "Consult Sharath", href: "/digital-marketing-consultant-chennai-india" },
    { name: "Clients", href: "/clients" },
    { name: "Blog", href: "/blogs" },
    { name: "Contact", href: "/contact" },
  ];

  const Brand = [
    { name: "Webboombaa", href: "https://www.webboombaa.org/" },
    { name: "brandandmediaworks", href: "https://www.brandandmediaworks.com/" },
    { name: "greatindiansweets", href: "https://www.greatindiansweets.in/" },
    { name: "greatindianbeverages", href: "https://greatindianbeverages.com/" },
  ];

  return (
    <footer className="bg-[#0B63C8] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="w-40 h-40 rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/SRK-logo-White.png"
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <p className="text-gray-200 leading-relaxed -mt-12">
              Leading digital marketing consultant helping businesses and
              individuals achieve success through proven strategies and
              comprehensive training.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center no-underline-effect justify-center rounded-sm hover:bg-yellow-400 hover:text-[#0B63C8] transition"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-200 hover:text-yellow-400 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brands */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg">Brands</h3>
            <ul className="space-y-3">
              {Brand.map((brand, index) => (
                <li key={index}>
                  <a
                    href={brand.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-200 hover:text-yellow-400 transition-colors duration-300"
                  >
                    {brand.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg">Get In Touch</h3>
            <div className="space-y-4">
  <div className="flex items-center gap-3">
    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6">
      <Mail className="w-5 h-5 text-yellow-400" />
    </span>
    <a
      href="mailto:hello@sharathravikumar.com"
      className="text-gray-200 hover:underline"
      target="_blank"
    >
      hello@sharathravikumar.com
    </a>
  </div>

  <div className="flex items-center gap-3">
    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6">
      <Phone className="w-5 h-5 text-yellow-400" />
    </span>
    <a
      href="tel:+917200701455"
      className="text-gray-200 hover:underline"
      target="_blank"
    >
      +91 7200701455
    </a>
  </div>

  <div className="flex items-center gap-3">
    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6">
      <MapPin className="w-5 h-5 text-yellow-400" />
    </span>
    <a
      href="https://www.google.com/maps/place/Chennai,+Tamil+Nadu,+India"
      className="text-gray-200 hover:underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      Chennai, Tamil Nadu, India
    </a>
  </div>
</div>

            <button
              onClick={handleSchedule}
              className="w-full px-6 py-3 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-500 transition"
            >
              Schedule a Call
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-600 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-300 text-sm">
            © 2025 Sharath Ravikumar. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              href="/"
              className="text-gray-300 hover:text-yellow-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/"
              className="text-gray-300 hover:text-yellow-400 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
