import { useState } from "react";

export default function App() {
  const [dark, setDark] = useState(true);
  const [cart, setCart] = useState(0);

  const products = [
    {
      id: 1,
      name: "AI Smart Notebook",
      price: 2999,
      discount: 25,
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800"
    },
    {
      id: 2,
      name: "Startup Blueprint",
      price: 1999,
      discount: 20,
      rating: 4,
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800"
    },
    {
      id: 3,
      name: "Design Thinking Pro",
      price: 2499,
      discount: 30,
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800"
    }
  ];

  return (
    <div style={container(dark)}>

      {/* Animated Background Blobs */}
      <div style={blob1}></div>
      <div style={blob2}></div>

      {/* NAVBAR */}
      <div style={navbar(dark)}>
        <h2>NovaStore</h2>
        <div>
          <button onClick={() => setDark(!dark)} style={toggleBtn}>
            Toggle Theme
          </button>
          <span style={cartBadge}>🛒 {cart}</span>
        </div>
      </div>

      {/* HERO */}
      <div style={hero}>
        <h1 style={heroTitle}>Future Commerce</h1>
        <p style={heroSub}>Premium AI-powered products</p>
      </div>

      {/* PRODUCT GRID */}
      <div style={grid}>
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            dark={dark}
            addToCart={() => setCart(cart + 1)}
          />
        ))}
      </div>

    </div>
  );
}

/* ---------- Product Card ---------- */

function ProductCard({ product, dark, addToCart }) {
  const [liked, setLiked] = useState(false);

  const finalPrice =
    product.price - (product.price * product.discount) / 100;

  const handleTilt = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * 15;
    const rotateY = ((x / rect.width) - 0.5) * -15;

    card.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const resetTilt = (e) => {
    e.currentTarget.style.transform =
      "rotateX(0) rotateY(0) scale(1)";
  };

  return (
    <div
      style={card(dark)}
      onMouseMove={handleTilt}
      onMouseLeave={resetTilt}
    >
      <div style={{ position: "relative" }}>
        <img src={product.image} alt="" style={image} />

        <div onClick={() => setLiked(!liked)} style={heart}>
          {liked ? "❤️" : "🤍"}
        </div>

        <div style={discountBadge}>
          -{product.discount}%
        </div>
      </div>

      <h3>{product.name}</h3>

      <div style={{ margin: "10px 0" }}>
        <span style={oldPrice}>₹{product.price}</span>
        <span style={newPrice}> ₹{finalPrice}</span>
      </div>

      <div>{"⭐".repeat(product.rating)}</div>

      <button style={button} onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
}

/* ---------- Styles ---------- */

const container = (dark) => ({
  minHeight: "100vh",
  padding: 40,
  background: dark
    ? "linear-gradient(135deg,#0f172a,#1e293b)"
    : "linear-gradient(135deg,#eef2ff,#f8fafc)",
  fontFamily: "Inter, sans-serif",
  position: "relative",
  overflow: "hidden",
  transition: "0.4s"
});

const blob1 = {
  position: "absolute",
  width: 400,
  height: 400,
  background: "radial-gradient(circle,#6366f1,#3b82f6)",
  filter: "blur(120px)",
  top: -100,
  left: -100,
  opacity: 0.4
};

const blob2 = {
  position: "absolute",
  width: 400,
  height: 400,
  background: "radial-gradient(circle,#ec4899,#ef4444)",
  filter: "blur(120px)",
  bottom: -100,
  right: -100,
  opacity: 0.4
};

const navbar = (dark) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px 40px",
  borderRadius: 20,
  background: dark
    ? "rgba(255,255,255,0.08)"
    : "rgba(255,255,255,0.8)",
  backdropFilter: "blur(20px)",
  marginBottom: 60
});

const hero = {
  textAlign: "center",
  marginBottom: 80
};

const heroTitle = {
  fontSize: 50,
  margin: 0
};

const heroSub = {
  opacity: 0.7
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
  gap: 50
};

const card = (dark) => ({
  padding: 25,
  borderRadius: 25,
  background: dark
    ? "rgba(255,255,255,0.08)"
    : "rgba(255,255,255,0.9)",
  backdropFilter: "blur(15px)",
  boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
  transition: "0.2s ease",
  transformStyle: "preserve-3d"
});

const image = {
  width: "100%",
  borderRadius: 18,
  marginBottom: 15
};

const heart = {
  position: "absolute",
  top: 10,
  right: 10,
  fontSize: 22,
  cursor: "pointer"
};

const discountBadge = {
  position: "absolute",
  top: 10,
  left: 10,
  background: "linear-gradient(135deg,#ef4444,#dc2626)",
  color: "white",
  padding: "5px 12px",
  borderRadius: 20,
  fontSize: 12
};

const oldPrice = {
  textDecoration: "line-through",
  color: "#888"
};

const newPrice = {
  fontWeight: "bold",
  color: "#22c55e",
  fontSize: 18
};

const button = {
  marginTop: 15,
  padding: "10px 20px",
  borderRadius: 12,
  border: "none",
  background: "linear-gradient(135deg,#6366f1,#3b82f6)",
  color: "white",
  cursor: "pointer"
};

const toggleBtn = {
  padding: "6px 12px",
  borderRadius: 10,
  border: "1px solid #ccc",
  background: "transparent",
  cursor: "pointer",
  marginRight: 15
};

const cartBadge = {
  background: "#22c55e",
  color: "white",
  padding: "6px 12px",
  borderRadius: 20,
  fontWeight: "bold"
};
