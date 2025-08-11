import React, { useEffect, useState } from "react";
import ProductCard from "../../components/customer/ProductCard";
import useProducts from "../../hooks/useProducts";
import { addToCart } from "../../api/cartApi";
import axios from "axios";
import FilterSidebar from "../../components/customer/FilterSidebar";
import "./shop.css";

const productMatchesFilters = (product, filters) => {
  for (const [key, values] of Object.entries(filters)) {
    if (!values.length) continue;
    switch (key) {
      case "Color":
        if (!values.some(c =>
          (product.title || product.name).toLowerCase().includes(c.toLowerCase()) ||
          (product.description || "").toLowerCase().includes(c.toLowerCase())
        )) return false;
        break;
      case "Gender":
        const cat = (product.category || "").toLowerCase();
        if (!values.some(g =>
          cat.includes(g.toLowerCase()) ||
          (product.description || "").toLowerCase().includes(g.toLowerCase())
        )) return false;
        break;
      case "Price":
        const price = product.price;
        if (!values.some(range =>
          (range === "₹2,501–7,500" && price >= 2501 && price <= 7500) ||
          (range === "₹7,501–12,999" && price >= 7501 && price <= 12999) ||
          (range === "₹13,000+" && price >= 13000)
        )) return false;
        break;
      default:
        if (!values.some(v =>
          (product.description || "").toLowerCase().includes(v.toLowerCase()) ||
          (product.name || "").toLowerCase().includes(v.toLowerCase())
        )) return false;
    }
  }
  return true;
};

const getSection = (product) => {
  const text = `${product.name} ${product.description} ${product.category}`.toLowerCase();
   if (text.includes("men") && !text.includes("women")) return "men";
  if (text.includes("women") || text.includes("ladies") || text.includes("female")  || text.includes("woman")) return "women";
  if (text.includes("kid") || text.includes("child") || text.includes("boy") || text.includes("girl")) return "kids";
  return "all";
};

const getSectionFromCategory = (category) => {
  if (category.includes("mens")) return "Men";
  if (category.includes("womens")) return "Women";
  if (category.includes("kids")) return "Kids";
  return "Unisex"; // fallback or default
};


const Shop = ({ category = "all" }) => {
  const { products: localProducts, searchTerm } = useProducts();
  const [mens, setMens] = useState([]);
  const [womens, setWomens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [sortBy, setSortBy] = useState("price-asc");
  const [feedback, setFeedback] = useState("");
  const [filters, setFilters] = useState({});

  useEffect(() => {
    axios.all([
      // axios.get("https://dummyjson.com/products/category/mens-shoes"),
      // axios.get("https://dummyjson.com/products/category/womens-shoes")
    ]).then(([m, w]) => {
      setMens(m.data.products);
      setWomens(w.data.products);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const mapDummy = (arr) =>
  arr.map((p) => ({
    id: `d-${p.id}`,
    name: p.title,
    title: p.title,
    description: p.description,
    price: Math.round(p.price * 100),
    brand: p.brand || "",
    imageUrl: p.thumbnail,
    stock: p.stock ?? 10,
    category: p.category,
    section: getSectionFromCategory(p.category), // HERE
    isDummy: true,
  }));



  let combined = [
    ...localProducts,
    ...mapDummy(mens),
    ...mapDummy(womens)
  ].filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    productMatchesFilters(p, filters)
  );

  if (category !== "all") {
    combined = combined.filter(p => getSection(p) === category);
  }

  combined.sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return a.name.localeCompare(b.name);
  });

  const onAdd = async p => {
    if (p.isDummy) {
      setFeedback("❌ This item can't be added (demo only)");
      setTimeout(() => setFeedback(""), 2000);
      return;
    }
    await addToCart(p.id, 1)
      .then(() => setFeedback(`✅ ${p.name} added`))
      .catch(() => setFeedback("❌ Add failed"));
    setTimeout(() => setFeedback(""), 2000);
  };

  if (loading) return <div className="loading">Loading products…</div>;

  return (
    <div className="shop-container">
      {feedback && <div className="toast">{feedback}</div>}
      <div className="shop-header-sticky">
        <h1 className="shop-title">
          {category.charAt(0).toUpperCase() + category.slice(1)} (<span>{combined.length}</span>)
        </h1>
        <div className="header-actions">
          <button onClick={() => setFiltersVisible(!filtersVisible)} className="filter-btn">
            {filtersVisible ? "Hide Filters" : "Show Filters"}
          </button>
          <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="price-asc">Price low to high</option>
            <option value="price-desc">Price high to low</option>
            <option value="name-asc">Name A → Z</option>
            <option value="name-desc">Name Z → A</option>
          </select>
        </div>
      </div>

      <div className="shop-layout">
        {filtersVisible && <aside className="shop-sidebar">
          <FilterSidebar filters={filters} setFilters={setFilters} />
        </aside>}
        <main className="products-grid">
          {combined.map(p => (
            <ProductCard key={p.id} product={p} onAddToCart={() => onAdd(p)} />
          ))}
        </main>
      </div>
    </div>
  );
};

export default Shop;
