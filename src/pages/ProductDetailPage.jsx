import "./ProductDetailPage.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { httpClient } from "../lib/httpClient";
import { formatPrice } from "../lib/books";
import ReviewSection from "../components/ReviewSection";
import { useCart } from "../contexts/CartContext";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCartAPI } = useCart();  // ← dùng API mới

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [userRating, setUserRating] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await httpClient.get(`/products/${id}`);
        const p = res.data?.result;

        if (!p) return;

        setProduct({
          id: p.id,
          title: p.nameProduct,
          author: p.author,
          price: p.sellingPrice,
          salePrice: p.salePrice,
          quantity: p.quantity,
          description: p.description,
          images: p.imagesUrl?.map((i) => i.url) || [],
          image: p.imagesUrl?.[0]?.url || "/placeholder.svg",
        });
      } catch (err) {
        console.error("Lỗi tải sản phẩm:", err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <main className="detail-main">
        <button onClick={() => navigate(-1)} className="back-button-not-found">
          ← Quay lại
        </button>
        <p className="not-found-text">Đang tải sản phẩm...</p>
      </main>
    );
  }

  const handleAddToCart = async () => {
    const success = await addToCartAPI(product.id, quantity);

    if (success) {
      navigate("/cart");
    }
  };

  return (
    <main className="detail-main">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Quay lại
      </button>

      <div className="detail-grid">
        {/* LEFT */}
        <div className="detail-left">
          <div
            className="product-image-container"
            style={{ aspectRatio: "3/4" }}
          >
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
          </div>

          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="wishlist-btn"
          >
            {isWishlisted ? "✓ Muốn đọc" : "Muốn đọc"}
          </button>

          <button
            onClick={handleAddToCart}
            disabled={product.quantity <= 0}
            className="add-to-cart-btn"
          >
            {product.quantity > 0 ? "Thêm vào giỏ hàng" : "Hết hàng"}
          </button>

          {/* Rating */}
          <div className="rating-section">
            <p className="rating-section-title">Đánh giá sản phẩm</p>
            <div className="rating-stars-container">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setUserRating(star)}
                  className="rating-star-btn"
                  style={{
                    color: star <= userRating ? "#fbbf24" : "#e5e7eb",
                  }}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="detail-right">
          <h1 className="detail-title">{product.title}</h1>
          <p className="detail-author">
            bởi {product.author || "Đang cập nhật"}
          </p>

          <p className="detail-description">
            {product.description || "Chưa có mô tả."}
          </p>

          {/* PRICE + QUANTITY */}
          <div className="price-quantity-section">
            <div className="price-container">
              <span className="current-price">{formatPrice(product.price)}</span>
            </div>

            <div className="quantity-container">
              <div className="quantity-control">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="quantity-btn"
                >
                  −
                </button>
                <span className="quantity-display">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <ReviewSection bookId={product.id} bookRating={0} />
        </div>
      </div>
    </main>
  );
}
