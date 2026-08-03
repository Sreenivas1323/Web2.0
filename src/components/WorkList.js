export default function WorkList({ items }) {
  return (
    <div className="border-b border-line">
      {items.map((item, index) => {
        const { Name, web, link, desc, tags } = item;
        const Wrapper = link ? "a" : "div";
        const wrapperProps = link
          ? { href: link, target: "_blank", rel: "noopener noreferrer" }
          : {};

        return (
          <Wrapper
            key={Name}
            {...wrapperProps}
            className="group grid grid-cols-[2.5rem_1fr] items-start gap-4 border-t border-line py-8 transition-colors hover:bg-white/[0.02] md:grid-cols-[2.5rem_1fr_auto] md:gap-8"
          >
            <span className="pt-1 font-mono text-[11px] text-ash">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-mono text-[16px] font-bold text-ink decoration-line-bright underline-offset-4 group-hover:underline">
                  {Name}
                </h3>
                {web && (
                  <span className="font-mono text-[10px] text-ash">{web}</span>
                )}
              </div>
              <p className="mt-2 max-w-[560px] text-[13px] leading-relaxed text-dim">
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
              <span className="hidden self-center text-[14px] text-ash transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink md:block">
                ↗
              </span>
            )}
          </Wrapper>
        );
      })}
    </div>
  );
}
