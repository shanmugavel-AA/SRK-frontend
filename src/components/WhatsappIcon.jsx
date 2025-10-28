import { FaWhatsapp } from "react-icons/fa";

export default function WhatsappIcon(){
    return(
        <a href="https://wa.me/919876543210?text=Hi!%20I%20have%20a%20query."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-28 right-1 md:bottom-12 md:right-16 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition"
        >
            <FaWhatsapp size={28}/>
        </a>
    )
}