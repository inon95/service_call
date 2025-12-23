'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, X } from 'lucide-react';
import VoiceSessionChat from '../components/VoiceSessionChat';
import { pharmacyProducts, PharmacyProduct } from '@/lib/pharmacy-data';

// Product Card Component matching the HTML design
function ProductCard({ product }: { product: PharmacyProduct }) {
  const [activeView, setActiveView] = useState<'image' | 'details'>('image');

  const handleOrder = () => {
    const quantity = prompt('הזן כמות יחידות להזמנה:', '10');
    if (quantity) {
      alert(`נוסף לסל: ${quantity} יחידות של ${product.name}`);
    }
  };

  return (
    <div className="product-card">
      {/* IMAGE TAB */}
      {activeView === 'image' && (
        <div className="tab-content image-view">
          <div className="image-container">
            <span className="strain-type">{product.strainType}</span>
            <div className={`stock-indicator ${product.inStock ? '' : 'out-of-stock'}`}>
              <span className="stock-dot"></span>
              {product.inStock ? 'במלאי' : 'אזל'}
            </div>
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <h2 className="product-name">{product.name}</h2>
          </div>

          <div className="product-info">

            <div className="cannabinoid-info">
              <div className="cannabinoid-grid">
                <div className="cannabinoid-item">
                  <div className="cannabinoid-label">CBD</div>
                  <div className="cannabinoid-value">{product.cbd < 1 ? '<1' : product.cbd}%</div>
                </div>
                <div className="cannabinoid-item">
                  <div className="cannabinoid-label">THC</div>
                  <div className="cannabinoid-value">{product.thc}%</div>
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
              <button className="btn btn-primary" onClick={handleOrder} disabled={!product.inStock}>
                {product.inStock ? 'הוספה להזמנה' : 'אזל מהמלאי'}
              </button>
              <button className="btn btn-secondary" onClick={() => setActiveView('details')}>
                לגב המוצר
              </button>
            </div>
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

          <div className="detail-section">
            <h3 className="section-title">מידע נוסף</h3>
            <div className="info-list">
              <div className="info-item">
                <span>יצרן:</span>
                <strong>{product.manufacturer}</strong>
              </div>
              <div className="info-item">
                <span>מספר אצווה:</span>
                <strong>{product.batchNumber}</strong>
              </div>
              <div className="info-item">
                <span>תאריך ייצור:</span>
                <strong>{product.productionDate}</strong>
              </div>
              <div className="info-item">
                <span>תוקף:</span>
                <strong>{product.expiryDate}</strong>
              </div>
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
              <button className="btn btn-primary" onClick={handleOrder} disabled={!product.inStock}>
                {product.inStock ? 'הוספה להזמנה' : 'אזל מהמלאי'}
              </button>
              <button className="btn btn-secondary" onClick={() => setActiveView('image')}>
                לחזית המוצר
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .product-card {
          max-width: 380px;
          width: 100%;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: box-shadow 0.3s ease;
        }

        .product-card:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
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
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 30px;
          text-align: center;
          border-bottom: 3px solid #10847e;
          height: 350px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-image {
          width: 100%;
          max-width: 280px;
          height: 280px;
          background: white;
          border-radius: 8px;
          padding: 15px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          object-fit: contain;
        }

        .certification-badge {
          position: absolute;
          top: 15px;
          left: 15px;
          background: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          color: #10847e;
          border: 2px solid #10847e;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .stock-indicator {
          position: absolute;
          top: 15px;
          right: 15px;
          background: #10847e;
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 5px;
          min-width: 60px;
        }

        .stock-indicator.out-of-stock {
          background: #adb5bd;
        }

        .stock-dot {
          width: 6px;
          height: 6px;
          background: white;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .product-info {
          padding: 20px;
        }

        .product-header {
          margin-bottom: 15px;
        }

        .product-name {
          position: absolute;
          bottom: 15px;
          right: 15px;
          font-size: 20px;
          font-weight: 700;
          color: #212529;
          margin: 0;
          background: white;
          padding: 6px 12px;
          border-radius: 6px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .strain-type {
          position: absolute;
          top: 15px;
          left: 15px;
          background: #EDF3F1;
          color: #4E6F68;
          border: 1px solid #D0DDD9;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          z-index: 10;
        }

        .cannabinoid-info {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 15px;
          border-right: 4px solid #10847e;
        }

        .cannabinoid-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .cannabinoid-item {
          text-align: center;
        }

        .cannabinoid-label {
          font-size: 11px;
          color: #6c757d;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .cannabinoid-value {
          font-size: 24px;
          font-weight: 700;
          color: #10847e;
        }

        .product-details {
          display: grid;
          gap: 8px;
          margin-bottom: 15px;
          font-size: 13px;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #e9ecef;
        }

        .detail-label {
          color: #6c757d;
          font-weight: 600;
        }

        .detail-value {
          color: #212529;
          font-weight: 500;
        }

        .pricing-section {
          background: #fff3cd;
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 15px;
        }

        .price-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          font-size: 13px;
        }

        .price-item {
          text-align: center;
        }

        .price-label {
          color: #856404;
          font-size: 11px;
          margin-bottom: 3px;
          font-weight: 600;
        }

        .price-value {
          color: #212529;
          font-weight: 700;
          font-size: 16px;
        }

        .action-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .btn {
          padding: 12px 20px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
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
          background: white;
          color: #10847e;
          border: 2px solid #10847e;
        }

        .btn-secondary:hover {
          background: #f8f9fa;
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
          background: white;
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
          top: 10px;
          left: 15px;
          background: #EDF3F1;
          color: #4E6F68;
          border: 1px solid #D0DDD9;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
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

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden" dir="rtl">
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
      <div className="absolute inset-0 bg-black/25" />

      {/* Content */}
      <div className={`relative z-10 h-screen flex flex-col transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>

        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-sm border-b border-gray-200">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#10847e] flex items-center justify-center">
              <span className="text-white font-bold text-sm">CP</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">בית מסחר לתרופות</h1>
              <p className="text-xs text-gray-500">מערכת הזמנות B2B</p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              {pharmacyProducts.length} מוצרים
            </span>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex min-h-0">
          {/* Products Area */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-100/90 backdrop-blur-sm">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 380px))',
              gap: '24px',
              justifyContent: 'center'
            }}>
              {pharmacyProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Assistant Panel */}
          {isAssistantOpen && (
            <div className="w-96 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
              <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">עוזר רוקח</span>
                <button
                  onClick={() => setIsAssistantOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                <VoiceSessionChat
                  agentId="pharmacy-concierge"
                  sessionId="pharmacy-session"
                  elevenLabsAgentId={process.env.NEXT_PUBLIC_ELEVENLABS_BOUTIQUE_AGENT_ID}
                  title="רוקח מייעץ"
                  avatar="/avatars/pharmacist.png"
                  welcomeMessage="שלום! אני הרוקח המייעץ. איך אוכל לעזור?"
                  suggestions={[
                    "מה מומלץ לשינה?",
                    "זנים עם CBD גבוה",
                    "זנים לכאבים כרוניים"
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
                    }))
                  }}
                  variant="light"
                  language="he"
                />
              </div>
            </div>
          )}
        </div>

        {/* Floating Assistant Button */}
        {!isAssistantOpen && (
          <button
            onClick={() => setIsAssistantOpen(true)}
            className="fixed bottom-6 left-6 w-14 h-14 bg-[#10847e] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#0a6b66] transition-colors z-40"
            title="פתח עוזר רוקח"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}
