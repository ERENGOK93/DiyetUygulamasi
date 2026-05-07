// ============================================================
// data/programData.ts
// Haftalık program verisi: DayPlan sınıfı örnekleri burada üretilir.
// Fonksiyonel Ayrıştırma: veri, bileşenden ayrı tutuldu.
// ============================================================

import { DayPlan } from "../modules/DayPlan";

/**
 * 7 günlük haftalık programı DayPlan dizisi olarak döndürür.
 * Her DayPlan, BaseModel'den kalıtım yoluyla id ve createdAt alır.
 * getMeals() metodu DayPlan sınıfı içinde sağlanır.
 */
export function getWeeklyPlan(): DayPlan[] {
  return [
    new DayPlan(1, "Pazartesi", "Göğüs & Arka Kol",
      "1. Öğün: Fıstık Ezmeli Yulaf Lapası",
      "2. Öğün: Izgara Tavuk & Basmati Pirinç",
      "3. Öğün: Fırın Somon & Kuşkonmaz"),

    new DayPlan(2, "Salı", "Sırt & Ön Kol",
      "1. Öğün: 3 Yumurtalı Lorlu Omlet",
      "2. Öğün: Yağsız Dana Köfte & Bulgur",
      "3. Öğün: Izgara Hindi Göğüs & Salata"),

    new DayPlan(3, "Çarşamba", "Dinlenme & Esneme",
      "1. Öğün: Muzlu & Yulaflı Protein Smoothie",
      "2. Öğün: Zeytinyağlı Sebze Yemeği",
      "3. Öğün: Izgara Levrek & Yeşillik"),

    new DayPlan(4, "Perşembe", "Bacak & Karın",
      "1. Öğün: Peynirli Tam Buğday Tost",
      "2. Öğün: Fırın Patates & Biftek",
      "3. Öğün: Tavuklu Sezar Salata (Hafif Sos)"),

    new DayPlan(5, "Cuma", "Omuz & Kalf",
      "1. Öğün: Protein Krep (Yulaf Unundan)",
      "2. Öğün: Tavuk Sote & Karabuğday",
      "3. Öğün: Ton Balıklı Kepekli Makarna"),

    new DayPlan(6, "Cumartesi", "Tam Vücut (Full Body) Pump",
      "1. Öğün: Haşlanmış Yumurta & Zeytin",
      "2. Öğün: Kırmızı Et & Fırın Sebze",
      "3. Öğün: Hindi Sote & Yoğurt"),

    new DayPlan(7, "Pazar", "Dinlenme & Yemek Hazırlığı",
      "1. Öğün: Serbest Kahvaltı (Cheat Meal)",
      "2. Öğün: Hafif Sebze Çorbası",
      "3. Öğün: Izgara Tavuk Şiş"),
  ];
}
