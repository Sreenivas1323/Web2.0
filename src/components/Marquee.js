const ITEMS = [
  "AI PRODUCTS",
  "DESIGN ENGINEERING",
  "END-TO-END OWNERSHIP",
  "DESIGN SYSTEMS",
  "FRONTEND ARCHITECTURE",
  "BRAND & IDENTITY",
  "RAPID PROTOTYPING",
];

const Half = () => (
  <div className="flex w-max items-center pr-10">
    {ITEMS.map((item) => (
      <span
        key={item}
        className="flex items-center font-mono text-[10px] tracking-[3px] text-ash"
      >
        {item}
        <span className="mx-10 bg-gradient-to-r from-pink to-blue bg-clip-text text-[9px] text-transparent">
          ✦
        </span>
      </span>
    ))}
  </div>
);

export default function Marquee() {
  return (
    <div
      aria-hidden
      className="marquee relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-y border-line py-3.5"
    >
      <div className="marquee-track flex w-max">
        <Half />
        <Half />
      </div>
    </div>
  );
}
