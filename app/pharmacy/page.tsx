'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, X, Phone, Volume2, VolumeX, ArrowUp, ChevronLeft } from 'lucide-react';
import VoiceSessionChat from '../components/VoiceSessionChat';
import { pharmacyProducts, PharmacyProduct } from '@/lib/pharmacy-data';

// Basket type
type Basket = { [productId: string]: number };

// Product Card Component matching the HTML design
function ProductCard({
  product,
  onAskQuestion,
  basket,
  onUpdateBasket,
  isGlowing
}: {
  product: PharmacyProduct;
  onAskQuestion: (productId: string, productName: string) => void;
  basket: Basket;
  onUpdateBasket: (productId: string, quantity: number) => void;
  isGlowing: boolean;
}) {
  const [activeView, setActiveView] = useState<'image' | 'details'>('image');
  const quantity = basket[product.id] || 0;

  const handleAdd = () => {
    onUpdateBasket(product.id, quantity + 1);
  };

  const handleRemove = () => {
    if (quantity > 0) {
      onUpdateBasket(product.id, quantity - 1);
    }
  };

  return (
    <div className={`product-card ${isGlowing ? 'product-glow' : ''}`}>
      {/* IMAGE TAB */}
      {activeView === 'image' && (
        <div className="tab-content image-view">
          <div className="image-container">
            <span className="strain-type">{product.strainType}</span>
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <div className="product-name-container">
              <h2 className="product-name">{product.name}</h2>
              {product.badge && (
                <span className={`promo-badge ${product.badge === 'sale' ? 'badge-sale' : 'badge-new'}`}>
                  {product.badge === 'sale' ? 'במבצע' : 'חדש'}
                </span>
              )}
            </div>
          </div>

          <div className="product-info">

            <div className="cannabinoid-info">
              <div className="cannabinoid-grid">
                <div className="cannabinoid-item">
                  <div className="cannabinoid-label">CBD</div>
                  <div className="cannabinoid-value">C{Math.ceil(product.cbd)}</div>
                </div>
                <div className="cannabinoid-item">
                  <div className="cannabinoid-label">THC</div>
                  <div className="cannabinoid-value">T{product.thc}</div>
                </div>
              </div>
            </div>

            <div className="product-details">
              <div className="detail-row">
                <span className="detail-label">יצרן:</span>
                <span className="detail-value">{product.manufacturer}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">זן:</span>
                <span className="detail-value">{product.strainType}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">גנטיקה:</span>
                <span className="detail-value">{product.genetics}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">שיטת גידול:</span>
                <span className="detail-value">{product.growingMethod}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">צורת הגשה:</span>
                <span className="detail-value">{product.servingType}</span>
              </div>
            </div>

            <div className="pricing-section">
              <div className="price-grid">
                <div className="price-item">
                  <div className="price-label">מחיר יחידה ({product.packGrams}g)</div>
                  <div className="price-value">₪{product.packPrice}</div>
                </div>
                {product.wholesalePrice && (
                  <div className="price-item">
                    <div className="price-label">מחיר סיטונאי ({product.wholesaleMinUnits}+ יח')</div>
                    <div className="price-value">₪{product.wholesalePrice}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="action-buttons">
              {quantity === 0 ? (
                <button className="btn btn-primary" onClick={handleAdd} disabled={!product.inStock}>
                  {product.inStock ? 'הוספה להזמנה' : 'אזל מהמלאי'}
                </button>
              ) : (
                <div className="quantity-controls">
                  <button className="qty-btn" onClick={handleRemove}>-</button>
                  <span className="qty-value">{quantity}</span>
                  <button className="qty-btn" onClick={handleAdd}>+</button>
                </div>
              )}
              <button className="btn btn-secondary" onClick={() => setActiveView('details')}>
                פרטי מוצר
              </button>
            </div>
            <button
              className="inquiry-link"
              onClick={() => onAskQuestion(product.id, product.name)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              בירור על המוצר
            </button>
          </div>
        </div>
      )}

      {/* DETAILS TAB */}
      {activeView === 'details' && (
        <div className="tab-content details-view">
          <div className="details-header">
            <span className="badge badge-strain">{product.strainType}</span>
            <h2 className="details-product-name">{product.name}</h2>
          </div>

          <div className="product-description">
            <p>
              {product.name} הוא זן {product.strainType} מבית {product.manufacturer} עם פרופיל של T{product.thc}/C{Math.ceil(product.cbd)}.
              {' '}מגודל בשיטת {product.growingMethod}, מתאפיין בטרפנים {product.terpenes.slice(0, 2).map(t => t.name).join(' ו')} המעניקים לו את אופיו הייחודי.
            </p>
          </div>

          <div className="detail-section">
            <h3 className="section-title">תכולת קנבינואידים</h3>
            <div className="detail-grid">
              <div className="detail-box">
                <span className="box-label">CBD</span>
                <span className="box-value">{product.cbd < 1 ? '<1' : product.cbd}%</span>
              </div>
              <div className="detail-box">
                <span className="box-label">THC</span>
                <span className="box-value">{product.thc}%</span>
              </div>
              <div className="detail-box">
                <span className="box-label">CBN</span>
                <span className="box-value">{product.cbn || 0}%</span>
              </div>
              <div className="detail-box">
                <span className="box-label">CBG</span>
                <span className="box-value">{product.cbg || 0}%</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3 className="section-title">פרופיל טרפנים</h3>
            <div className="terpene-list">
              {product.terpenes.map((terpene, idx) => (
                <div className="terpene-item" key={idx}>
                  <span>{terpene.name}</span>
                  <div className="terpene-bar">
                    <div className="bar-fill" style={{ width: `${Math.min(terpene.percentage * 50, 100)}%` }}></div>
                  </div>
                  <span>{terpene.percentage}%</span>
                </div>
              ))}
            </div>
          </div>


          <div className="details-actions">
            <div className="pricing-section">
              <div className="price-grid">
                <div className="price-item">
                  <div className="price-label">מחיר יחידה ({product.packGrams}g)</div>
                  <div className="price-value">₪{product.packPrice}</div>
                </div>
                {product.wholesalePrice && (
                  <div className="price-item">
                    <div className="price-label">מחיר סיטונאי ({product.wholesaleMinUnits}+ יח')</div>
                    <div className="price-value">₪{product.wholesalePrice}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="action-buttons">
              {quantity === 0 ? (
                <button className="btn btn-primary" onClick={handleAdd} disabled={!product.inStock}>
                  {product.inStock ? 'הוספה להזמנה' : 'אזל מהמלאי'}
                </button>
              ) : (
                <div className="quantity-controls">
                  <button className="qty-btn" onClick={handleRemove}>-</button>
                  <span className="qty-value">{quantity}</span>
                  <button className="qty-btn" onClick={handleAdd}>+</button>
                </div>
              )}
              <button className="btn btn-secondary" onClick={() => setActiveView('image')}>
                חזרה
              </button>
            </div>
            <button
              className="inquiry-link"
              onClick={() => onAskQuestion(product.id, product.name)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              בירור על המוצר
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .product-card {
          max-width: 100%;
          width: 100%;
          background: #f8f9fa;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
          transition: box-shadow 0.3s ease;
          border: 1px solid rgba(0,0,0,0.04);
        }

        @media (min-width: 640px) {
          .product-card {
            max-width: 380px;
          }
        }

        .product-card:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .product-glow {
          animation: product-pulse-glow 1.5s ease-in-out 2;
        }

        @keyframes product-pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16, 132, 126, 0.4); }
          50% { box-shadow: 0 0 0 12px rgba(16, 132, 126, 0); }
        }

        .tab-content {
          animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* IMAGE TAB STYLES */
        .image-view {
          padding: 0;
        }

        .image-container {
          position: relative;
          background: #fafbfc;
          padding: 16px;
          text-align: center;
          border-bottom: none;
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-image {
          width: 100%;
          max-width: 255px;
          height: 245px;
          background: #f8f9fa;
          border-radius: 12px;
          padding: 10px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
          object-fit: contain;
        }

        .certification-badge {
          position: absolute;
          top: 15px;
          left: 15px;
          background: #f8f9fa;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          color: #10847e;
          border: 2px solid #10847e;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .inquiry-link {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          width: 100%;
          padding: 8px 0;
          margin-top: 8px;
          background: transparent;
          border: none;
          color: #6c757d;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .inquiry-link:hover {
          color: #10847e;
        }

        .inquiry-link svg {
          opacity: 0.7;
        }

        .inquiry-link:hover svg {
          opacity: 1;
        }

        .product-info {
          padding: 16px;
        }

        .product-header {
          margin-bottom: 15px;
        }

        .product-name-container {
          position: absolute;
          bottom: 12px;
          right: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f8f9fa;
          padding: 5px 10px;
          border-radius: 8px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.06);
        }

        .product-name {
          font-size: 17px;
          font-weight: 600;
          color: #374151;
          margin: 0;
        }

        .strain-type {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #EDF3F1;
          color: #4E6F68;
          border: 1px solid #D0DDD9;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          z-index: 10;
        }

        .promo-badge {
          padding: 3px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 700;
          white-space: nowrap;
        }

        .badge-sale {
          background: #FEE2E2;
          color: #DC2626;
          border: 1px solid #FECACA;
        }

        .badge-new {
          background: #DBEAFE;
          color: #2563EB;
          border: 1px solid #BFDBFE;
        }

        .cannabinoid-info {
          background: #f9fafb;
          border-radius: 10px;
          padding: 12px;
          margin-bottom: 12px;
          border-right: 3px solid #10847e;
        }

        .cannabinoid-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .cannabinoid-item {
          text-align: center;
        }

        .cannabinoid-label {
          font-size: 10px;
          color: #9ca3af;
          font-weight: 500;
          text-transform: uppercase;
          margin-bottom: 2px;
        }

        .cannabinoid-value {
          font-size: 20px;
          font-weight: 600;
          color: #10847e;
        }

        .product-details {
          display: grid;
          gap: 4px;
          margin-bottom: 12px;
          font-size: 12px;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 6px 9px;
          border-bottom: 1px solid #f3f4f6;
        }

        .detail-label {
          color: #9ca3af;
          font-weight: 500;
        }

        .detail-value {
          color: #4b5563;
          font-weight: 700;
        }

        .pricing-section {
          background: #fefce8;
          border-radius: 10px;
          padding: 10px;
          margin-bottom: 12px;
          border: 1px solid #fef08a;
        }

        .price-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          font-size: 12px;
        }

        .price-item {
          text-align: center;
        }

        .price-label {
          color: #a16207;
          font-size: 10px;
          margin-bottom: 2px;
          font-weight: 500;
        }

        .price-value {
          color: #374151;
          font-weight: 600;
          font-size: 15px;
        }

        .action-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .btn {
          padding: 10px 16px;
          border: none;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: center;
        }

        .btn-primary {
          background: #10847e;
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          background: #0a6b66;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(40, 167, 69, 0.3);
        }

        .btn-primary:disabled {
          background: #6c757d;
          cursor: not-allowed;
        }

        .btn-secondary {
          background: #f8f9fa;
          color: #10847e;
          border: 2px solid #10847e;
        }

        .btn-secondary:hover {
          background: #f8f9fa;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: #10847e;
          border-radius: 8px;
          padding: 8px 16px;
        }

        .qty-btn {
          width: 32px;
          height: 32px;
          border: none;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border-radius: 6px;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }

        .qty-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .qty-value {
          color: white;
          font-size: 18px;
          font-weight: 600;
          min-width: 30px;
          text-align: center;
        }

        /* DETAILS TAB STYLES */
        .details-view {
          padding: 20px;
        }

        .details-header {
          position: relative;
          height: 80px;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-bottom: 2px solid #e9ecef;
          margin-bottom: 20px;
          border-radius: 8px 8px 0 0;
        }

        .details-product-name {
          position: absolute;
          bottom: 10px;
          right: 15px;
          font-size: 20px;
          font-weight: 700;
          color: #212529;
          margin: 0;
          background: #f8f9fa;
          padding: 6px 12px;
          border-radius: 6px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
        }

        .badge-strain {
          position: absolute;
          top: -8px;
          left: -8px;
          background: #EDF3F1;
          color: #4E6F68;
          border: 1px solid #D0DDD9;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
        }

        .product-description {
          padding: 4px 0 12px 0;
          margin-bottom: 16px;
          border-bottom: 1px solid #e9ecef;
        }

        .product-description p {
          font-size: 13px;
          line-height: 1.6;
          color: #4b5563;
          margin: 0;
        }

        .detail-section {
          margin-bottom: 20px;
        }

        .detail-section:last-child {
          margin-bottom: 0;
        }

        .section-title {
          font-size: 13px;
          font-weight: 700;
          color: #10847e;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .detail-box {
          background: #f8f9fa;
          padding: 12px;
          border-radius: 6px;
          text-align: center;
          border: 2px solid #e9ecef;
        }

        .box-label {
          display: block;
          font-size: 11px;
          color: #6c757d;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .box-value {
          display: block;
          font-size: 20px;
          font-weight: 700;
          color: #212529;
        }

        .terpene-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .terpene-item {
          display: grid;
          grid-template-columns: 1fr 2fr auto;
          align-items: center;
          gap: 10px;
          font-size: 12px;
        }

        .terpene-item > span:first-child {
          font-weight: 600;
          color: #495057;
        }

        .terpene-item > span:last-child {
          font-weight: 700;
          color: #10847e;
          min-width: 40px;
          text-align: left;
        }

        .terpene-bar {
          background: #e9ecef;
          height: 8px;
          border-radius: 4px;
          overflow: hidden;
        }

        .bar-fill {
          background: linear-gradient(90deg, #10847e, #3da89e);
          height: 100%;
          border-radius: 4px;
          transition: width 0.5s ease;
        }

        .info-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .info-item {
          display: flex;
          justify-content: space-between;
          padding: 8px;
          background: #f8f9fa;
          border-radius: 4px;
          font-size: 12px;
        }

        .info-item span {
          color: #6c757d;
        }

        .info-item strong {
          color: #212529;
        }

        .details-actions {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 2px solid #e9ecef;
        }
      `}</style>
    </div>
  );
}

export default function PharmacyPage() {
  const [mounted, setMounted] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [basket, setBasket] = useState<Basket>({});
  const [speakerOn, setSpeakerOn] = useState(true);
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [basketAnimating, setBasketAnimating] = useState(false);
  const [glowingProductId, setGlowingProductId] = useState<string | null>(null);

  // Filter state
  const [filterStrain, setFilterStrain] = useState<string | null>(null);
  const [filterServingType, setFilterServingType] = useState<string | null>(null);
  const [filterProfile, setFilterProfile] = useState<string | null>(null);

  // Get unique filter options from products
  const uniqueStrains = [...new Set(pharmacyProducts.map(p => p.strainType))];
  const uniqueServingTypes = [...new Set(pharmacyProducts.map(p => p.servingType))];

  // THC Profile helper
  const getProfile = (thc: number, cbd: number): string => {
    if (cbd > thc) return 'CBD Rich';
    if (thc > 15 && cbd < 5) return 'THC Rich';
    return 'Balanced';
  };
  const uniqueProfiles = [...new Set(pharmacyProducts.map(p => getProfile(p.thc, p.cbd)))];

  // Filter products
  const filteredProducts = pharmacyProducts.filter(product => {
    if (filterStrain && product.strainType !== filterStrain) return false;
    if (filterServingType && product.servingType !== filterServingType) return false;
    if (filterProfile && getProfile(product.thc, product.cbd) !== filterProfile) return false;
    return true;
  });

  // Calculate basket totals
  const basketTotalUnits = Object.values(basket).reduce((sum, qty) => sum + qty, 0);
  const basketTotalPrice = Object.entries(basket).reduce((sum, [productId, qty]) => {
    const product = pharmacyProducts.find(p => p.id === productId);
    return sum + (product ? product.packPrice * qty : 0);
  }, 0);

  useEffect(() => {
    setMounted(true);
    // Load basket from localStorage
    const savedBasket = localStorage.getItem('pharmacy_basket');
    if (savedBasket) {
      setBasket(JSON.parse(savedBasket));
    }
    // Scroll listener
    const handleScroll = () => {
      setShowScrollUp(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateBasket = (productId: string, quantity: number) => {
    const newBasket = { ...basket };
    if (quantity <= 0) {
      delete newBasket[productId];
    } else {
      newBasket[productId] = quantity;
    }
    setBasket(newBasket);
    localStorage.setItem('pharmacy_basket', JSON.stringify(newBasket));
    // Trigger animation
    setBasketAnimating(true);
    setTimeout(() => setBasketAnimating(false), 3000);
  };

  const handleAskQuestion = (productId: string, productName: string) => {
    setSelectedProduct(productName);
    setGlowingProductId(productId);
    setIsAssistantOpen(true);
    // Stop glowing after 3 seconds
    setTimeout(() => setGlowingProductId(null), 3000);
  };

  return (
    <div className="min-h-screen relative" dir="rtl">
      <style jsx global>{`
        html, body {
          scroll-behavior: smooth;
        }
        .products-scroll {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }
        .products-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .products-scroll::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.1);
          border-radius: 4px;
        }
        .products-scroll::-webkit-scrollbar-thumb {
          background: rgba(16, 132, 126, 0.5);
          border-radius: 4px;
        }
        .products-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 132, 126, 0.7);
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16, 132, 126, 0.4); }
          50% { box-shadow: 0 0 0 8px rgba(16, 132, 126, 0); }
        }
        .basket-glow {
          animation: pulse-glow 1.5s ease-in-out 2;
        }
      `}</style>
      {/* Background */}
      <Image
        src="/attract_bg.png"
        alt="Background"
        fill
        className="object-cover"
        priority
        unoptimized
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/25 pointer-events-none" />

      {/* Content */}
      <div className={`relative z-10 min-h-screen flex flex-col transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>

        {/* Header */}
        <header className="sticky top-0 z-30 flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-[#f8f9fa]/95 backdrop-blur-sm border-b border-gray-200 gap-3 sm:gap-0">
          {/* Right side - Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#10847e] flex items-center justify-center">
              <span className="text-white font-bold text-xs sm:text-sm">CP</span>
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-gray-900">בית מסחר לתרופות</h1>
              <p className="text-[10px] sm:text-xs text-gray-500">מערכת הזמנות B2B</p>
            </div>
          </Link>

          {/* Left side - Order Summary and Call button */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            {/* Order Summary */}
            <div className="flex items-center gap-3 w-full sm:w-auto sm:border-l sm:border-gray-300 sm:pl-4">
              <span className="hidden sm:inline text-sm text-gray-600 font-medium">סיכום הזמנה:</span>
              <button
                onClick={() => setIsBasketOpen(true)}
                className={`flex items-center gap-2 px-3 py-1.5 ${basketTotalUnits > 0 ? 'bg-[#10847e] text-white' : 'bg-gray-100 text-gray-500'} rounded-lg hover:opacity-90 transition-colors cursor-pointer w-full sm:w-auto justify-center sm:justify-start ${basketAnimating ? 'basket-glow' : ''}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                {basketTotalUnits > 0 ? (
                  <>
                    <span className="font-medium">{basketTotalUnits} יח׳</span>
                    <span className="text-white/80">|</span>
                    <span className="font-bold">₪{basketTotalPrice.toLocaleString()}</span>
                    <span className="text-white/70 text-xs hidden sm:inline">כולל מע"מ</span>
                  </>
                ) : (
                  <span className="font-medium">סל ריק</span>
                )}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
            </div>

            {/* Call button */}
            <button
              onClick={() => setIsAssistantOpen(true)}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#10847e] text-white rounded-lg hover:bg-[#0a6b66] transition-colors text-sm font-medium shadow-sm cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>מוקד שירות</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Filters */}
          <div className="border-b border-gray-300/50 px-4 sm:px-6 py-4">
            {/* Filter Groups */}
            <div className="flex flex-wrap items-center gap-3 justify-start">

              {/* Results count */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-200/60 rounded-lg">
                <span className="text-xs text-gray-500">נמצאו</span>
                <span className="text-sm font-bold text-[#10847e]">{filteredProducts.length}</span>
                <span className="text-xs text-gray-500">מוצרים</span>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-6 bg-gray-300/60" />

              {/* Profile Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white drop-shadow-sm">פרופיל:</span>
                {uniqueProfiles.map(profile => (
                  <button
                    key={profile}
                    onClick={() => setFilterProfile(filterProfile === profile ? null : profile)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border ${
                      filterProfile === profile
                        ? 'bg-[#10847e] text-white shadow-sm border-[#10847e]'
                        : 'bg-white/50 backdrop-blur-sm text-gray-800 border-gray-400 hover:bg-white/70 hover:border-gray-500'
                    }`}
                  >
                    {profile}
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-6 bg-gray-300/60" />

              {/* Serving Type Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white drop-shadow-sm">צורת הגשה:</span>
                {uniqueServingTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => setFilterServingType(filterServingType === type ? null : type)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border ${
                      filterServingType === type
                        ? 'bg-[#10847e] text-white shadow-sm border-[#10847e]'
                        : 'bg-white/50 backdrop-blur-sm text-gray-800 border-gray-400 hover:bg-white/70 hover:border-gray-500'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-6 bg-gray-300/60" />

              {/* Strain Type Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white drop-shadow-sm">זן:</span>
                {uniqueStrains.map(strain => (
                  <button
                    key={strain}
                    onClick={() => setFilterStrain(filterStrain === strain ? null : strain)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border ${
                      filterStrain === strain
                        ? 'bg-[#10847e] text-white shadow-sm border-[#10847e]'
                        : 'bg-white/50 backdrop-blur-sm text-gray-800 border-gray-400 hover:bg-white/70 hover:border-gray-500'
                    }`}
                  >
                    {strain}
                  </button>
                ))}
              </div>

              {/* Divider */}
              {(filterStrain || filterServingType || filterProfile) && (
                <div className="hidden sm:block w-px h-6 bg-gray-300/60" />
              )}

              {/* Clear button - right side with filters */}
              {(filterStrain || filterServingType || filterProfile) && (
                <button
                  onClick={() => {
                    setFilterStrain(null);
                    setFilterServingType(null);
                    setFilterProfile(null);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/70 backdrop-blur-sm text-white border border-red-400 hover:bg-red-500/90 transition-colors"
                >
                  <X className="w-3 h-3" />
                  נקה הכל
                </button>
              )}

            </div>
          </div>

          {/* Products Area */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-6 bg-gray-100/40 backdrop-blur-sm products-scroll">
            <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(340px,380px))] gap-4 sm:gap-6 justify-center max-w-[400px] sm:max-w-none mx-auto">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAskQuestion={handleAskQuestion}
                  basket={basket}
                  onUpdateBasket={updateBasket}
                  isGlowing={glowingProductId === product.id}
                />
              ))}
            </div>
          </div>

          {/* Footer */}
          <footer className="flex-shrink-0 border-t border-black/25 flex items-center justify-between py-[15px] px-[40px]">
            <p className="text-xs text-white leading-none">
              © {new Date().getFullYear()} איי איי די קאן יל בע״מ. כל הזכויות שמורות.
            </p>
            <div className="flex items-center gap-4 text-xs leading-none ml-20">
              <Link href="/privacy" className="text-white/80 hover:text-white transition-colors focus:outline-none">
                מדיניות פרטיות
              </Link>
              <span className="text-white/50">|</span>
              <Link href="/terms" className="text-white/80 hover:text-white transition-colors focus:outline-none">
                תנאי שימוש
              </Link>
            </div>
          </footer>
        </div>

        {/* Floating Chat Modal */}
        {isAssistantOpen && (
          <>
            <div className="fixed inset-2 sm:inset-auto sm:bottom-6 sm:left-6 sm:w-[380px] sm:h-[525px] bg-white/15 backdrop-blur-sm rounded-2xl shadow-2xl z-[101] flex flex-col overflow-hidden border border-white/20">
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                background: 'rgba(255, 255, 255, 0.88)',
                color: '#333',
                borderBottom: '1px solid rgba(0,0,0,0.1)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    background: 'rgba(16, 132, 126, 0.15)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#10847e'
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>מוקד שירות</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                      <span style={{
                        width: '8px',
                        height: '8px',
                        background: '#4ade80',
                        borderRadius: '50%',
                        boxShadow: '0 0 6px #4ade80',
                        animation: 'pulse 2s infinite'
                      }}></span>
                      <span style={{ fontSize: '12px', opacity: 0.9 }}>זמין</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {/* Speaker Toggle */}
                  <button
                    onClick={() => setSpeakerOn(!speakerOn)}
                    title={speakerOn ? 'קול פעיל - לחץ לכיבוי' : 'קול כבוי - לחץ להפעלה'}
                    style={{
                      width: '40px',
                      height: '40px',
                      border: 'none',
                      outline: 'none',
                      background: speakerOn ? 'rgba(16, 132, 126, 0.15)' : 'rgba(100, 100, 100, 0.1)',
                      borderRadius: '50%',
                      color: speakerOn ? '#10847e' : '#888',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {speakerOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                  </button>
                  {/* Close/Disconnect Button */}
                  <button
                    onClick={() => { setIsAssistantOpen(false); setSelectedProduct(null); }}
                    title="סיים שיחה"
                    style={{
                      width: '40px',
                      height: '40px',
                      border: 'none',
                      outline: 'none',
                      background: 'rgba(220, 38, 38, 0.15)',
                      borderRadius: '50%',
                      color: '#dc2626',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Phone className="w-5 h-5" style={{ transform: 'rotate(135deg)' }} />
                  </button>
                </div>
              </div>
              <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
                <style>{`
                  .hide-chat-header > div > div:first-child { display: none !important; }
                  .hide-chat-header { direction: rtl; text-align: right; height: 100%; }
                  .hide-chat-header * { text-align: right; }
                  .hide-chat-header > div { background: transparent !important; height: 100%; }
                  .hide-chat-header > div > div { background: transparent !important; }
                  .hide-chat-header > div > div:nth-child(2) {
                    height: calc(100% - 60px) !important;
                    max-height: calc(100% - 60px) !important;
                  }
                `}</style>
                <div className="hide-chat-header" style={{ height: '100%' }}>
                <VoiceSessionChat
                  agentId="pharmacy-concierge"
                  sessionId="pharmacy-session"
                  elevenLabsAgentId={process.env.NEXT_PUBLIC_ELEVENLABS_BOUTIQUE_AGENT_ID}
                  title=""
                  avatar=""
                  welcomeMessage="נא להמתין בבקשה. נשמח אם כבר תכתבו את השאלה."
                  suggestions={[
                    "מידע על המוצר",
                    "לאיזה מצבים זה מתאים?",
                    "מה עדיף - פרחים או שמן?",
                    "מידע כללי על קנאביס רפואי"
                  ]}
                  contextData={{
                    products: pharmacyProducts.map(p => ({
                      id: p.id,
                      name: p.name,
                      strainType: p.strainType,
                      thc: p.thc,
                      cbd: p.cbd,
                      manufacturer: p.manufacturer,
                      inStock: p.inStock
                    })),
                    selectedProductId: selectedProduct ? pharmacyProducts.find(p => p.name === selectedProduct)?.id : null,
                    selectedProductName: selectedProduct
                  }}
                  variant="light"
                  language="en"
                  autoStart={true}
                  speakerEnabled={speakerOn}
                />
                </div>
              </div>
              {/* Legal Disclaimer */}
              <div style={{
                padding: '8px 16px',
                background: 'rgba(255, 255, 255, 0.95)',
                borderTop: '1px solid rgba(0, 0, 0, 0.05)',
                flexShrink: 0
              }}>
                <p style={{ fontSize: '11px', color: '#666', textAlign: 'center', margin: 0, lineHeight: 1.4, fontWeight: 600 }}>
                  המידע אינו מהווה ייעוץ רפואי. יש להתייעץ עם רופא מוסמך.
                </p>
                <p style={{ fontSize: '11px', color: '#666', textAlign: 'center', margin: '2px 0 0 0', lineHeight: 1.4, fontWeight: 600 }}>
                  פרטיותך חשובה לנו. אין לשתף מידע אישי.
                </p>
              </div>
              {/* Footer */}
              <div style={{
                padding: '12px 20px',
                borderTop: '1px solid rgba(255, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '11px',
                color: '#555',
                background: 'rgba(255, 255, 255, 0.88)',
                flexShrink: 0
              }}>
                <span
                  onClick={() => navigator.clipboard.writeText('www.95percent.com')}
                  style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                  title="Copy to clipboard"
                >
                  www.95percent.com
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </span>
                <span style={{ opacity: 0.5 }}>|</span>
                <span>All Rights Reserved, 2026.</span>
              </div>
            </div>
          </>
        )}

        {/* Floating Assistant Button */}
        {!isAssistantOpen && (
          <button
            onClick={() => setIsAssistantOpen(true)}
            className="fixed bottom-[66px] right-3 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 bg-[#10847e] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#0a6b66] transition-colors z-40"
            title="פתח עוזר רוקח"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        )}

        {/* Floating Call Button - Mobile only */}
        {!isAssistantOpen && (
          <button
            onClick={() => setIsAssistantOpen(true)}
            className="fixed bottom-[124px] right-3 w-12 h-12 bg-white border border-gray-300 text-[#10847e] rounded-full shadow-lg flex sm:hidden items-center justify-center hover:bg-gray-50 transition-colors z-40"
            title="פתח מוקד שירות"
          >
            <Phone className="w-5 h-5" />
          </button>
        )}

        {/* Basket Dropdown */}
        {isBasketOpen && (
          <>
            {/* Click outside to close */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsBasketOpen(false)}
            />
            {/* Dropdown */}
            <div className="fixed top-[110px] sm:top-[79px] left-2 right-2 sm:left-auto sm:right-[240px] w-auto sm:w-[380px] bg-[#f8f9fa]/95 backdrop-blur-sm border border-gray-200 rounded-lg sm:rounded-b-lg shadow-lg z-50 max-h-[60vh] sm:max-h-[70vh] flex flex-col">
              {/* Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {Object.entries(basket).map(([productId, qty], index) => {
                  const product = pharmacyProducts.find(p => p.id === productId);
                  if (!product) return null;
                  const minQty = 20;
                  const isUnderMinimum = qty < minQty;
                  return (
                    <div key={productId} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.strainType}</p>
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-gray-900">₪{(product.packPrice * qty).toLocaleString()}</p>
                          <p className="text-sm text-gray-500">{qty} × ₪{product.packPrice}</p>
                        </div>
                        <button
                          onClick={() => updateBasket(productId, 0)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                          title="הסר מההזמנה"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      {isUnderMinimum && (
                        <p className="text-xs text-red-500 mt-2">מתחת לכמות מינימום ({minQty} יחידות)</p>
                      )}
                    </div>
                  );
                })}
                {basketTotalUnits === 0 && (
                  <p className="text-center text-gray-500 py-8">ההזמנה ריקה</p>
                )}
              </div>
              {/* Footer */}
              {basketTotalUnits > 0 && (
                <div className="p-4 border-t border-gray-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">סה״כ ({basketTotalUnits} יח׳) כולל מע"מ</span>
                    <span className="text-xl font-bold text-gray-900">₪{basketTotalPrice.toLocaleString()}</span>
                  </div>
                  <button
                    className="w-full py-3 bg-[#10847e] text-white font-medium rounded-lg hover:bg-[#0a6b66] transition-colors"
                    onClick={() => {
                      alert('הזמנה נשלחה בהצלחה!');
                      setBasket({});
                      localStorage.removeItem('pharmacy_basket');
                      setIsBasketOpen(false);
                    }}
                  >
                    שלח הזמנה
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* Scroll to top button */}
        {showScrollUp && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 left-3 sm:left-6 w-10 h-10 sm:w-12 sm:h-12 bg-[#10847e] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#0a6b66] transition-all z-40"
            title="חזרה למעלה"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>

    </div>
  );
}
