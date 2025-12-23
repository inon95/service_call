'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUp } from 'lucide-react';

export default function TermsPage() {
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
          <h1 className="text-xl font-bold text-gray-900">תנאי שימוש</h1>
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
            <h2 className="text-lg font-bold text-gray-900 mb-4">1. אודות השירות</h2>
            <p className="text-gray-600 leading-relaxed">
              איי איי די קאן יל בע"מ הינה חברה המגדלת ואורזת קנאביס רפואי בהתאם לתקנות משרד הבריאות והחוק הישראלי.
              פלטפורמה זו נועדה לספק חוויית הזמנה ותמיכה עבור בתי מרקחת בעלי רישיון לשיווק קנאביס רפואי.
              אנו מחויבים לאיכות, לעמידה בתקנים ולשירות מקצועי.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">2. תנאי זכאות</h2>
            <p className="text-gray-600 leading-relaxed">
              השירות מיועד לבתי מרקחת בעלי רישיון תקף בלבד.
              השימוש באתר מהווה הצהרה כי הנך מורשה להזמין מוצרי קנאביס רפואי.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">3. אופי השירות</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mr-4">
              <li>הפלטפורמה מספקת ממשק נוח להזמנות ומידע על מוצרים</li>
              <li>כל המוצרים מיוצרים ונארזים על ידינו בהתאם לתקני האיכות הנדרשים</li>
              <li>אנו מחויבים לעמידה בכל התקנות והחוקים הרלוונטיים</li>
            </ul>
          </section>

          <section className="bg-amber-50 p-6 rounded-lg border border-amber-200">
            <h2 className="text-lg font-bold text-amber-800 mb-4">4. אזהרה חשובה</h2>
            <p className="text-amber-700 leading-relaxed">
              המידע המוצג באתר הינו למטרות מידע כללי בלבד ואינו מהווה ייעוץ רפואי.
              האחריות על אופן השימוש במידע זה היא באחריות בית המרקחת בלבד.
              אנו ממליצים להפנות לקוחות להתייעצות עם רופא מוסמך.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">5. אחריות ואיכות</h2>
            <p className="text-gray-600 leading-relaxed">
              אנו אחראים לאיכות המוצרים ולעמידה בכל התקנות הנדרשות.
              האחריות על התאמת המוצר לחולה הספציפי היא על הרופא המטפל ובית המרקחת המנפק.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">6. הזמנות</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mr-4">
              <li>כל ההזמנות כפופות לזמינות המוצרים</li>
              <li>אנו שואפים לספק שירות מהיר ואמין</li>
              <li>לכל שאלה או בירור אנו כאן לעזור</li>
            </ul>
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
            <h2 className="text-lg font-bold text-gray-900 mb-4">8. קניין רוחני</h2>
            <p className="text-gray-600 leading-relaxed">
              כל התכנים, הכלים, שיטות העבודה והטכנולוגיות באתר הם קניינה של החברה. אין להעתיק או להפיץ ללא אישור.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">9. שינויים בתנאים</h2>
            <p className="text-gray-600 leading-relaxed">
              החברה רשאית לעדכן תנאים אלה. שינויים יפורסמו באתר.
            </p>
          </section>

          <section className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              בשימושך באתר הנך מאשר כי קראת והסכמת לתנאי שימוש אלה.
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
