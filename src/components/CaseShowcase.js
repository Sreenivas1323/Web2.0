import Image from "next/image";

import Reveal from "./Reveal";

function Panel({ item, featured }) {
  const { Name, web, images } = item;
  const shots = featured ? images.slice(0, 2) : images.slice(0, 1);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-[#101010] transition-colors duration-300 group-hover:border-line-mid">
      <div className="flex h-9 items-center gap-2 border-b border-line px-4">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="ml-2 font-mono text-[9px] tracking-wide text-ash">
          {web || Name.toLowerCase()}
        </span>
      </div>
      <div className={`p-3 ${shots.length > 1 ? "grid gap-3 sm:grid-cols-2" : ""}`}>
        {shots.map((img) => (
          <div
            key={img.src}
            className={`relative overflow-hidden rounded-lg ${
              featured && shots.length === 1 ? "aspect-[2/1]" : "aspect-[16/10]"
            }`}
          >
            <Image
              src={img.src}
              alt={img.words}
              fill
              sizes={
                featured
                  ? "(min-width: 1080px) 1048px, 100vw"
                  : "(min-width: 768px) 50vw, 100vw"
              }
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function Case({ item, featured = false }) {
  const { Name, web, link, desc, tags } = item;
  const Wrapper = link ? "a" : "div";
  const wrapperProps = link
    ? { href: link, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper {...wrapperProps} className="group block">
      <Panel item={item} featured={featured} />
      <div className="mt-4 flex items-start justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="font-mono text-[15px] font-bold text-ink decoration-line-bright underline-offset-4 group-hover:underline">
              {Name}
            </h3>
            {web && (
              <span className="font-mono text-[10px] text-ash">{web}</span>
            )}
          </div>
          <p className="mt-2 max-w-[620px] text-[13px] leading-relaxed text-dim">
            {desc[0].data}
          </p>
          {tags?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tags.slice(0, 3).map(({ name }) => (
                <span
                  key={name}
                  className="rounded-full border border-line px-2.5 py-1 font-mono text-[9px] tracking-wide text-ash"
                >
                  {name}
                </span>
              ))}
            </div>
          )}
        </div>
        {link && (
          <span className="mt-1 shrink-0 text-[14px] text-ash transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink">
            ↗
          </span>
        )}
      </div>
    </Wrapper>
  );
}

export default function CaseShowcase({ items }) {
  const [featured, ...rest] = items;

  return (
    <div className="space-y-16">
      <Reveal>
        <Case item={featured} featured />
      </Reveal>
      <div className="grid gap-x-6 gap-y-14 md:grid-cols-2">
        {rest.map((item) => (
          <Reveal key={item.Name}>
            <Case item={item} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
