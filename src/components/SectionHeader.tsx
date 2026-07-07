export default function SectionHeader({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="section__head">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="title title--medium">{title}</h2>
      </div>
      <p className="muted">{copy}</p>
    </div>
  );
}
