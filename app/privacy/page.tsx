'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUp } from 'lucide-react';

export default function PrivacyPage() {
  const [showScrollUp, setShowScrollUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollUp(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/pharmacy" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowRight className="w-5 h-5 text-gray-600" />
          </Link>
          <h1 className="text-xl font-bold text-gray-900">מדיניות פרטיות</h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-8">

          <section>
            <p className="text-gray-600 leading-relaxed">
              עודכן לאחרונה: {new Date().toLocaleDateString('he-IL', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">1. אודותינו</h2>
            <p className="text-gray-600 leading-relaxed">
              איי איי די קאן יל בע"מ ("החברה", "אנחנו") הינה חברה המגדלת ואורזת קנאביס רפואי בהתאם לתקנות משרד הבריאות.
              פלטפורמה זו נועדה לספק חוויית הזמנה ותמיכה עבור בתי מרקחת בעלי רישיון לשיווק קנאביס רפואי.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">2. המידע שאנו אוספים</h2>
            <p className="text-gray-600 leading-relaxed mb-3">אנו שומרים מידע מינימלי הנדרש לתפעול השירות:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mr-4">
              <li><strong>פרטי בית מרקחת:</strong> שם בית המרקחת (מידע ציבורי)</li>
              <li><strong>מספר רישיון:</strong> מספר רישיון בית המרקחת (מידע ציבורי)</li>
              <li><strong>פרטי קשר:</strong> מספר טלפון נייד</li>
              <li><strong>היסטוריית הזמנות:</strong> רשימת ההזמנות שבוצעו</li>
              <li><strong>מוצרים מועדפים:</strong> העדפות מוצרים לנוחות ההזמנה</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">3. מטרות השימוש במידע</h2>
            <p className="text-gray-600 leading-relaxed mb-3">אנו משתמשים במידע אך ורק למטרות הבאות:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mr-4">
              <li>עיבוד והעברת הזמנות למפיצים</li>
              <li>יצירת קשר בנוגע להזמנות</li>
              <li>שיפור חוויית ההזמנה (שמירת מועדפים)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">4. שיתוף מידע</h2>
            <p className="text-gray-600 leading-relaxed">
              פרטי ההזמנות מועברים למפיצים המשלחים לצורך ביצוע המשלוח בלבד.
              איננו מוכרים, משכירים או משתפים מידע אישי לצדדים שלישיים למטרות שיווקיות.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">5. אבטחת מידע</h2>
            <p className="text-gray-600 leading-relaxed">
              אנו נוקטים באמצעי אבטחה סבירים להגנה על המידע השמור במערכת.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">6. זכויות המשתמש</h2>
            <p className="text-gray-600 leading-relaxed">
              באפשרותך לבקש עיון, תיקון או מחיקת המידע השמור אודותיך בכל עת.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">7. שירותי בינה מלאכותית</h2>
            <p className="text-gray-600 leading-relaxed">
              האתר משתמש בשירותי בינה מלאכותית ניסיוניים לתמיכה בחוויית המשתמש.
              שירותים אלו אינם אוספים מידע אישי.
              החברה אינה אחראית לביצועים, לאיכות או לאופן השימוש בשירותים אלו.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">8. שינויים במדיניות</h2>
            <p className="text-gray-600 leading-relaxed">
              אנו שומרים על הזכות לעדכן מדיניות זו. שינויים יפורסמו באתר.
            </p>
          </section>

          <section className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              בשימושך באתר הנך מאשר כי קראת והסכמת למדיניות פרטיות זו.
            </p>
            <p className="text-sm text-gray-500 text-center mt-2">
              הפניה בלשון זכר אך מתייחסת לשני המינים. ט.ל.ח.
            </p>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} איי איי די קאן יל בע"מ. כל הזכויות שמורות.
      </footer>

      {/* Scroll to top button */}
      {showScrollUp && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 w-12 h-12 bg-[#10847e] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#0a6b66] transition-all"
          title="חזרה למעלה"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
