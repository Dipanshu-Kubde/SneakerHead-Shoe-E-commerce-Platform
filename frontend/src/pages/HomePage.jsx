// src/pages/HomePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import useProducts from "../hooks/useProducts";
import ProductRider from "../components/customer/ProductRider";

const categories = [
  { name: "Men", img: "https://source.unsplash.com/800x600/?men,shoes" },
  { name: "Women", img: "https://source.unsplash.com/800x600/?women,shoes" },
  { name: "Kids", img: "https://source.unsplash.com/800x600/?kids,shoes" },
  { name: "Sale", img: "https://source.unsplash.com/800x600/?sale,shoes" },
];

const HomePage = () => {
  const navigate = useNavigate();
  const { products } = useProducts();

  const handleCategoryClick = (category) => {
    navigate(`/?section=${category.toLowerCase()}`); // Navigate to shop filtered by section
  };

  // Sample render of product slider
  const ProductSlider = ({ title, products }) => (
    <section className="product-slider">
      <h2>{title}</h2>
      <div className="horizontal-scroll">
        {products.map((p) => (
          <div
            key={p.id}
            className="product-card"
            onClick={() => navigate(`/product/${p.id}`)}
          >
            <img src={p.imageUrl} alt={p.name} />
            <h4>{p.name}</h4>
            <p>₹{p.price.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </section>
  );

    const newArrivals = [...products].reverse().slice(0, 8);
  // const bestSellers = products.filter(p => p.sales && p.sales > 100);
  // const saleItems = products.filter(p => p.originalPrice && p.price < p.originalPrice);


  return (
    <div className="home-page">
      {/* Hero Section with video */}
      <section className="hero-section">
        <video
  className="hero-video"
  autoPlay
  muted
  loop
  playsInline
>
  <source src="/videos/hero1.mp4" type="video/mp4" />
</video>

        <div className="hero-text">
          <h1>New Styles On Sale: Up To 40% Off</h1>
          <button onClick={() => navigate("/all")}>Shop Sale</button>
        </div>
      </section>

      {/* Categories Section */}
  <section className="categories-section">
  <h2>Shop By Category</h2>
  <div className="categories-grid">
    {[
      {
        label: "Men",
        img: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/0c59c317-13c3-49f3-9c59-75502b9b903e/JORDAN+MVP+92.png",
      },
      {
        label: "Women",
        img: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/573cbf07-2e9f-4e70-990b-dd1c5b984603/WMNS+JORDAN+TRUNNER+LX.png",
      },
      {
        label: "Kids",
        img: "https://assets.adidas.com/images/w_766,h_766,f_auto,q_auto,fl_lossy,c_fill,g_auto/5815cb46c6584059badeabab6dec7303_9366/lightblaze-shoes-kids.jpg",
      },
      {
        label: "Sale",
        img: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/521e4f76-da9f-4bca-811a-ded826b65613/AIR+JORDAN+1+LOW.png",
      },
    ].map((cat) => {
      const routeMap = {
        Men: "/men",
        Women: "/women",
        Kids: "/kids",
        Sale: "/all", // Default route for Sale
      };

      return (
        <div
          key={cat.label}
          className="category-card"
          onClick={() => navigate(routeMap[cat.label])}
          style={{
            backgroundImage: `url(${cat.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            cursor: "pointer",
          }}
        >
          <h3>{cat.label}</h3>
        </div>
      );
    })}
  </div>
</section>



      {/* Product Sliders */}
      {/* Product Section (Static Images Redirecting to /all) */}
<section className="product-slider">
  <h2>Popular Picks</h2>
  <div className="horizontal-scroll">
    {[
      {
        name: "A'One EP",
        img: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4104efc3-a3c7-40c7-9de9-fc42cf6bd50e/A%27ONE+EP.png",
      },
      {
        name: "Dunk Low Retro SE",
        img: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/797de1aa-b9dd-4405-a14b-34cb11dd759e/NIKE+DUNK+LOW+RETRO+SE.png",
      },
      {
        name: "Lightblaze Shoes",
        img: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/fc2836b180ad44dca55d0663c54b2536_9366/Lightblaze_Shoes_Kids_White_JQ4760_HM1.jpg",
      },
      {
        name: "Ligra 7 Indoor Shoes",
        img: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/0f4073394ed74dc099e5ad1e00ab2511_9366/Ligra_7_Indoor_Shoes_Black_FZ4681_01_00_standard.jpg",
      },
    ].map((item, index) => (
      <div
        key={index}
        className="product-card"
        onClick={() => navigate("/all")}
        style={{
          cursor: "pointer",
          textAlign: "center",
          padding: "10px",
          minWidth: "180px",
        }}
      >
        <img
          src={item.img}
          alt={item.name}
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
        <h4 style={{ marginTop: "10px" }}>{item.name}</h4>
      </div>
    ))}
  </div>
</section>


      <ProductRider title="New Arrivals" products={newArrivals} />
    

      {/* <ProductSlider title="New Arrivals" products={dummyNewArrivals} />
      <ProductSlider title="Best Sellers" products={dummyBestSellers} />
      <ProductSlider title="Sale Items" products={dummySaleItems} /> */}

      {/* Promotional Section */}
      <section className="promo-section">
        <div className="promo-block">
          <img src="https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmFza2V0YmFsbHxlbnwwfHwwfHx8MA%3D%3D" alt="Basketball" />
          <div>
            <h3>Shop Basketball</h3>
            <button onClick={() => navigate("/all")}>Shop Now</button>
          </div>
        </div>
        <div className="promo-block">
          <img src="https://images.unsplash.com/photo-1538061210394-c72c824af0fb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG9seW1waWNzJTIwcnVufGVufDB8fDB8fHww" alt="Running" />
          <div>
            <h3>Shop Running</h3>
            <button onClick={() => navigate("/all")}>Shop Now</button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <h2>Subscribe for Updates</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thank you for subscribing!");
          }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            required
            aria-label="Email address"
          />
          <button type="submit">Subscribe</button>
        </form>
      </section>
    </div>
  );
};

export default HomePage;
