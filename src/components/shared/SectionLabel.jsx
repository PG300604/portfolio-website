export default function SectionLabel({ label, title }) {
  return (
    <div className="mb-12">
      <div className="font-mono text-[11px] text-[#4fcea6] uppercase tracking-widest mb-3">
        // {label}
      </div>
      <h2 className="text-4xl md:text-5xl font-sora font-extrabold text-[#f0f6ff]">
        {title}
      </h2>
    </div>
  );
}
