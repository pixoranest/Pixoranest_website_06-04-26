const WA_LINK =
  "https://wa.me/919460686266?text=Hi%20PixoraNest!%20I%20am%20interested%20in%20a%20free%20AI%20demo%20for%20my%20business.%20%5BSource%3A%20Website%20-%20Bottom%20CTA%5D";

export default function WhatsAppCTA() {
  return (
    <section className="relative py-24 px-6 text-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(37,211,102,0.08),transparent)]" />
      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="w-[72px] h-[72px] bg-[#25D366] rounded-full flex items-center justify-center text-[32px] mx-auto mb-6 shadow-[0_0_40px_rgba(37,211,102,0.4)]">
          💬
        </div>
        <h2 className="font-[Sora,sans-serif] text-[clamp(28px,4vw,42px)] font-extrabold tracking-[-1px] mb-4">
          Talk to Us Right Now.<br />We&apos;re Live on WhatsApp.
        </h2>
        <p className="text-[#94A3B8] text-[17px] mb-10 leading-[1.7]">
          No contact forms. No waiting. Our AI — and our team — are available 24/7 on WhatsApp. Ask anything, book your demo, or just say hi.
        </p>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3.5 bg-[#25D366] text-black font-bold text-lg px-10 py-5 rounded-full shadow-[0_0_48px_rgba(37,211,102,0.35)] hover:bg-[#20c45a] hover:-translate-y-[3px] hover:shadow-[0_0_64px_rgba(37,211,102,0.5)] transition"
        >
          <svg className="w-7 h-7 fill-black" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
          </svg>
          Chat on WhatsApp — It&apos;s Free
        </a>
        <div className="mt-5 text-[13px] text-[#94A3B8] flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full animate-[pulseGreen_1.5s_ease-in-out_infinite]" />
          Live now · Avg. response time under 5 minutes · +91 94606 86266
        </div>
      </div>
      <style>{`
        @keyframes pulseGreen {
          0%,100% { box-shadow: 0 0 0 0 rgba(37,211,102,0.6); }
          50%     { box-shadow: 0 0 0 6px rgba(37,211,102,0); }
        }
      `}</style>
    </section>
  );
}
