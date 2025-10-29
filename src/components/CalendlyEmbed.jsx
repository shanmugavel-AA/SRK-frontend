'use client';

const CalendlyEmbed = () => {
  return (
    <div className="w-full h-[700px] overflow-hidden rounded-xl shadow-lg">
      <iframe
        src="https://calendly.com/webboombaa-org/30min?hide_event_type_details=1&hide_gdpr_banner=1"
        width="100%"
        height="100%"
        frameBorder="0"
        loading="lazy"
        title="Schedule a call with Sharath Ravikumar"
        allow="camera; microphone; fullscreen"
      ></iframe>
    </div>
  );
};

export default CalendlyEmbed;
