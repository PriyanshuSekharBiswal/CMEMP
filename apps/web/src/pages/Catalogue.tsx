import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Plus,
  Search,
  SlidersHorizontal,
  Layers3,
  ShieldCheck,
  Truck,
  ArrowRight,
  Activity,
  Compass,
} from "lucide-react";
import type { Product } from "../../../../packages/shared/src/types";
import { money } from "../lib/api";
import { Modal, Empty } from "../components/UI";
import { ArchitecturalHeroCanvas } from "../components/ArchitecturalHeroCanvas";
import { Reveal } from "../components/Reveal";
export function Catalogue({
  products,
  onAdd,
  cart,
  onStart,
}: {
  products: Product[];
  onAdd: (p: Product) => void;
  cart: Record<string, number>;
  onStart: () => void;
}) {
  const [query, setQuery] = useState(""),
    [category, setCategory] = useState("All materials"),
    [sort, setSort] = useState("recommended"),
    [compare, setCompare] = useState<string[]>([]),
    [showCompare, setShowCompare] = useState(false),
    [detail, setDetail] = useState<Product | null>(null);
  const categories = [
    "All materials",
    ...new Set(products.map((p) => p.category)),
  ];
  const filtered = useMemo(
    () =>
      products
        .filter(
          (p) =>
            (category === "All materials" || p.category === category) &&
            `${p.name} ${p.brand} ${p.sku}`
              .toLowerCase()
              .includes(query.toLowerCase()),
        )
        .sort((a, b) =>
          sort === "price"
            ? a.price - b.price
            : sort === "brand"
              ? a.brand.localeCompare(b.brand)
              : 0,
        ),
    [products, category, query, sort],
  );
  const compared = products.filter((p) => compare.includes(p.id));
  return (
    <>
      <section className="hero cmemp-hero">
        <ArchitecturalHeroCanvas />
        <div className="hero-copy">
          <h1>
            <span className="cmemp-line-mask">
              <span className="hero-line cmemp-reveal cmemp-delay-1">
                Precision Materials.
              </span>
            </span>
            <span className="cmemp-line-mask">
              <span className="hero-line hero-line-accent cmemp-reveal cmemp-delay-2">
                Built With Certainty.
              </span>
            </span>
          </h1>
          <div className="cmemp-reveal cmemp-delay-3">
            <p>
              Source certified structural materials, compare transparent multi-supplier
              quotations, and orchestrate site dispatches from foundation pour to final handover.
            </p>
          </div>
          <div className="cmemp-reveal cmemp-delay-4">
            <div className="hero-actions">
              <a className="cmemp-button-primary" href="#materials">
                <span>Explore Materials</span>
                <div className="cmemp-button-circle">
                  <ArrowUpRight className="cmemp-arrow cmemp-arrow-1" size={15} />
                  <ArrowUpRight className="cmemp-arrow cmemp-arrow-2" size={15} />
                </div>
              </a>
              <button className="cmemp-button-ghost" onClick={onStart}>
                <span>My Procurement</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
          <div className="cmemp-reveal cmemp-delay-5">
            <div className="hero-pills">
              <span className="hero-pill-item">
                <ShieldCheck size={14} /> IS 1786 Fe550D & IS 269 Certified
              </span>
              <span className="hero-pill-item">
                <Activity size={14} /> Real-Time Supplier Bidding
              </span>
              <span className="hero-pill-item">
                <Truck size={14} /> Digital Dispatch Challans
              </span>
            </div>
          </div>
        </div>
      </section>
      <Reveal delay={0.05}>
        <div className="catalogue-heading" id="materials">
          <div>
            <span className="eyebrow">THE MATERIAL LIBRARY</span>
            <h2>Everything your next build needs.</h2>
            <p className="muted">
              Sample catalogue · indicative rates · final pricing confirmed in
              your quotation
            </p>
          </div>
          <span className="count-label">
            {products.length} materials available
          </span>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="catalogue-tools">
          <div className="search">
            <Search size={18} />
            <input
              aria-label="Search materials"
              placeholder="Search materials, brands or SKU…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <label className="sort">
            <SlidersHorizontal size={17} />
            <select
              aria-label="Sort materials"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="recommended">Recommended</option>
              <option value="price">Price: low to high</option>
              <option value="brand">Brand name</option>
            </select>
          </label>
        </div>
      </Reveal>
      <Reveal delay={0.15}>
        <div className="category-tabs">
          {categories.map((c) => (
            <button
              key={c}
              className={category === c ? "active" : ""}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </Reveal>
      <div className="product-grid">
        {filtered.map((p, index) => (
          <Reveal key={p.id} delay={(index % 4) * 0.08} className="product-card-reveal">
            <article className="product-card">
              <button
                className={`product-art art-${p.category.split(" ")[0].toLowerCase()}`}
                onClick={() => setDetail(p)}
                aria-label={`View ${p.name}`}
              >
                <span className="product-category">
                  {p.category.split(" & ")[0]}
                </span>
                <div className="material-object">
                  {p.category.includes("Steel") ? (
                    <div className="rebar">
                      {Array.from({ length: 7 }, (_, i) => (
                        <i key={i} />
                      ))}
                    </div>
                  ) : p.category.includes("Cement") ? (
                    <div className="cement-bag">
                      <span>{p.brand}</span>
                      <strong>CEMENT</strong>
                      <small>50 KG</small>
                    </div>
                  ) : (
                    <div className="pipe-set">
                      <i />
                      <i />
                      <i />
                    </div>
                  )}
                </div>
                <span className="art-index">0{index + 1}</span>
                <ArrowUpRight className="art-arrow" size={21} />
              </button>
              <div className="product-info">
                <span className="brand">{p.brand}</span>
                <button className="product-name" onClick={() => setDetail(p)}>
                  {p.name}
                </button>
                <p className="sku">{p.sku}</p>
                <div className="product-price">
                  <strong>
                    {money(Math.round(p.price * (1 - p.discount / 100)))}
                  </strong>
                  <span>/ {p.unit}</span>
                  {p.discount > 0 && <small>{p.discount}% off</small>}
                </div>
                <p className="tax-note">Excludes GST & delivery</p>
                <div className="product-actions">
                  <label>
                    <input
                      type="checkbox"
                      checked={compare.includes(p.id)}
                      disabled={!compare.includes(p.id) && compare.length >= 3}
                      onChange={() =>
                        setCompare((old) =>
                          old.includes(p.id)
                            ? old.filter((id) => id !== p.id)
                            : [...old, p.id],
                        )
                      }
                    />{" "}
                    Compare
                  </label>
                  <button
                    className={cart[p.id] ? "add added" : "add"}
                    onClick={() => onAdd(p)}
                  >
                    {cart[p.id] ? <Check size={16} /> : <Plus size={16} />}{" "}
                    {cart[p.id] ? "Added" : "Add to list"}
                  </button>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      {!filtered.length && (
        <Empty title="No materials found">
          Try another search or category.
        </Empty>
      )}
      <Reveal delay={0.1}>
        <section className="how-it-works">
          <div>
            <Layers3 size={26} />
            <h2>One list. A clearer way to build.</h2>
            <p>
              Take procurement from scattered conversations to a single, traceable
              workflow.
            </p>
          </div>
          {[
            "Build your material list",
            "Compare supplier quotations",
            "Confirm & track your order",
          ].map((s, i) => (
            <div className="how-step" key={s}>
              <span>0{i + 1}</span>
              <h3>{s}</h3>
              <p>
                {
                  [
                    "Choose materials and quantities for your project.",
                    "Review item rates, tax, freight and delivery terms.",
                    "Keep your order details and delivery progress together.",
                  ][i]
                }
              </p>
            </div>
          ))}
        </section>
      </Reveal>
      {compare.length > 0 && (
        <div className="compare-bar">
          <span>
            <strong>{compare.length}/3</strong> materials selected
          </span>
          <button className="text-button" onClick={() => setCompare([])}>
            Clear
          </button>
          <button
            className="button primary"
            disabled={compare.length < 2}
            onClick={() => setShowCompare(true)}
          >
            Compare materials <ArrowRight size={16} />
          </button>
        </div>
      )}
      {showCompare && (
        <Modal
          title="Material comparison"
          onClose={() => setShowCompare(false)}
          wide
        >
          <p className="muted">
            Compare materials in the same category and unit for meaningful price
            comparisons.
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Specification</th>
                  {compared.map((p) => (
                    <th key={p.id}>{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Indicative rate</td>
                  {compared.map((p) => (
                    <td key={p.id}>
                      {money(Math.round(p.price * (1 - p.discount / 100)))} /{" "}
                      {p.unit}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>GST</td>
                  {compared.map((p) => (
                    <td key={p.id}>{p.gst}%</td>
                  ))}
                </tr>
                {[
                  ...new Set(compared.flatMap((p) => Object.keys(p.specs))),
                ].map((key) => (
                  <tr key={key}>
                    <td>{key.replace(/([A-Z])/g, " $1")}</td>
                    {compared.map((p) => (
                      <td key={p.id}>{p.specs[key] || "—"}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal>
      )}
      {detail && (
        <Modal title={detail.name} onClose={() => setDetail(null)}>
          <p className="brand">
            {detail.brand} · {detail.sku}
          </p>
          <h2>
            {money(Math.round(detail.price * (1 - detail.discount / 100)))}{" "}
            <small>/ {detail.unit}</small>
          </h2>
          <dl className="spec-list">
            {Object.entries(detail.specs).map(([k, v]) => (
              <div key={k}>
                <dt>{k.replace(/([A-Z])/g, " $1")}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <button
            className="button primary"
            onClick={() => {
              onAdd(detail);
              setDetail(null);
            }}
          >
            Add to material list <Plus size={18} />
          </button>
        </Modal>
      )}
    </>
  );
}
