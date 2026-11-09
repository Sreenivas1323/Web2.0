import Reveal from "../../src/components/Reveal";

export const metadata = {
  title: "Extras",
  description:
    "The stuff that isn't work: places I've been, photos I've taken, and the trips that reset my head.",
  alternates: { canonical: "/extras" },
};

// Photos are exports from my own Lightroom library, resized and with all
// metadata stripped. Width/height are the real pixel sizes so nothing shifts
// while they load.
const TRIPS = [
  {
    id: "ladakh",
    name: "Ladakh",
    when: "Sep 2026",
    length: "8 nights",
    coords: "32°54′N 78°18′E",
    route: ["Leh", "Nubra", "Pangong", "Hanle", "Tso Moriri"],
    story: [
      "Eight nights on the roof of the world. Fly into Leh, let your lungs catch up, then go: over the passes to Nubra, along Pangong, out to the dark skies of Hanle, and finally Tso Moriri — a lake at roughly 4,500 m that doesn't look real even while you're standing at it.",
      "Up there, nothing loads. No feeds, no Slack, barely any signal. Just stone cairns people leave behind, light that changes every ten minutes, and a camera that never left my hands.",
    ],
    photos: [
      {
        src: "/images/extras/ladakh-tso-moriri-cairn.jpg",
        alt: "A stone cairn on a rock above the deep blue water of Tso Moriri, with snow-capped mountains behind",
        w: 1600,
        h: 1200,
        span: "md:col-span-2 md:row-span-2",
      },
      {
        src: "/images/extras/ladakh-golden-peak.jpg",
        alt: "A snow peak lit orange at sunset above a dark shadow line and the lake",
        w: 899,
        h: 1600,
        span: "md:row-span-2",
      },
      {
        src: "/images/extras/ladakh-tso-moriri-clouds.jpg",
        alt: "Tso Moriri under a deep blue sky with white clouds over brown mountains",
        w: 1600,
        h: 1066,
        span: "",
      },
      {
        src: "/images/extras/ladakh-cairns-dusk.jpg",
        alt: "Four stacked stone cairns silhouetted at dusk with the lake behind",
        w: 1600,
        h: 1066,
        span: "",
      },
      {
        src: "/images/extras/ladakh-tso-moriri-poster.jpg",
        alt: "Poster: TSO MORIRI, Vol 1, Ladak, over a photo of the lake and a cairn",
        w: 1600,
        h: 1200,
        span: "md:col-span-1",
        position: "object-top",
      },
    ],
  },
  {
    id: "thailand",
    name: "Thailand",
    when: "Mar 2026",
    length: "12 days",
    coords: "13°45′N 100°30′E",
    route: ["Phuket", "Krabi", "Bangkok", "Pattaya"],
    story: [
      "Twelve days, four stops, one shot list. Seafood markets and longtail boats around Phuket, turquoise water off Krabi's Hong Islands, Bangkok from the top of the Golden Mount, and the carved wooden Sanctuary of Truth in Pattaya.",
      "One of us shot it like a film, the other did it on a backpacker's budget. Both approaches worked. The 7-Eleven snack hauls were non-negotiable.",
    ],
    photos: [
      {
        src: "/images/extras/thailand-route.svg",
        alt: "Illustrated route map: Phuket, Krabi, Bangkok, Pattaya",
        w: 1200,
        h: 800,
        span: "md:col-span-3 md:row-span-3",
      },
    ],
  },
];

const Label = ({ children }) => (
  <p className="font-mono text-[11px] tracking-wide text-ash">
    <span className="select-none text-ash/60">{"// "}</span>
    {children}
  </p>
);

export default function Extras() {
  return (
    <div className="pt-12 md:pt-20">
      <Reveal>
        <p className="font-mono text-[10px] tracking-[3px] text-ash">EXTRAS</p>
        <h1 className="mt-5 max-w-[820px] font-mono text-[clamp(28px,4.6vw,48px)] font-bold leading-tight tracking-[-0.02em] text-ink">
          Places I&apos;ve been
        </h1>
        <p className="mt-4 max-w-[560px] text-[13.5px] leading-[1.8] text-dim">
          Not everything has to ship. Some trips just reset your head. These are
          the ones that did, with photos where I have them.
        </p>
      </Reveal>

      <div className="mt-16 space-y-24">
        {TRIPS.map((trip) => (
          <section key={trip.id} id={trip.id} data-x={`trip-${trip.id}`}>
            <Reveal>
              <Label>
                {trip.when.toLowerCase()} · {trip.length}
              </Label>
              <div className="mt-4 flex flex-wrap items-baseline justify-between gap-4">
                <h2 className="font-mono text-[clamp(22px,3vw,30px)] font-bold tracking-[-0.3px] text-ink">
                  {trip.name}
                </h2>
                <span className="font-mono text-[10.5px] text-ash">
                  {trip.coords}
                </span>
              </div>

              <ol className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-[11px] text-dim">
                {trip.route.map((stop, i) => (
                  <li key={stop} className="flex items-center gap-2">
                    <span className="rounded-full border border-line px-3 py-1">
                      {stop}
                    </span>
                    {i < trip.route.length - 1 && (
                      <span aria-hidden className="text-ash">
                        →
                      </span>
                    )}
                  </li>
                ))}
              </ol>

              <div className="mt-6 max-w-[640px] space-y-4">
                {trip.story.map((p) => (
                  <p
                    key={p.slice(0, 24)}
                    className="text-[14px] leading-[1.9] text-dim"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 grid auto-rows-[220px] grid-cols-1 gap-3 md:grid-cols-3">
                {trip.photos.map((photo) => (
                  <figure
                    key={photo.src}
                    className={`group relative overflow-hidden rounded-xl border border-line ${photo.span}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      width={photo.w}
                      height={photo.h}
                      loading="lazy"
                      decoding="async"
                      className={`h-full w-full object-cover ${photo.position || ""} transition-transform duration-700 ease-out group-hover:scale-[1.03]`}
                    />
                  </figure>
                ))}
              </div>
            </Reveal>
          </section>
        ))}
      </div>
    </div>
  );
}
