// ============================================================
// data/recipeData.ts
// Tarif verileri: kilo verme, alma ve koruma için ayrı planlar.
// Hangi plan kullanılacağına UserProfile.getOtomatikHedef() karar verir.
// Bileşenler doğrudan getUserProfile().getOtomatikHedef() geçirir.
// ============================================================

import { Recipe } from "../modules/Recipe";
import { Goal } from "../modules/UserProfile";

// ============================================================
// KİLO VERME TARİFLERİ  (~1 400–1 600 kcal/gün)
// GTEH − 500 kcal açık hedefi için uygundur.
// ============================================================
const loseRecipes: Recipe[] = [
  new Recipe(
    101,
    "1. Öğün (Kahvaltı)",
    "Yumurta Akı Omleti",
    22,
    5,
    6,
    "4 yumurta akını çırp, tuz-karabiber ekle, yapışmaz tavada yağsız pişir. Üzerine domates ve maydanoz serp.",
    "Alternatif: Lor & Salatalık",
    "3 kaşık lor peynirini salatalık ve domates ile servis et, limon sık.",
  ),
  new Recipe(
    102,
    "2. Öğün (Öğle)",
    "Izgara Tavuk Salatası",
    38,
    12,
    7,
    "120g tavuk göğsünü ızgarala, roka-domates-salatalık üzerine koy, sirke-zeytinyağı ile tatlandır.",
    "Alternatif: Ton Balığı Salatası",
    "1 kutu light ton balığını bol yeşillikle karıştır, limon sık.",
  ),
  new Recipe(
    103,
    "3. Öğün (Akşam)",
    "Fırın Balık & Buharda Sebze",
    32,
    10,
    9,
    "150g levrek filetoyu limon-sarımsak ile 180°C fırında 18 dk pişir. Yanında buharda brokoli servis et.",
    "Alternatif: Hindi Göğüs Sote",
    "150g hindi göğsü ince doğra, zeytinyağında sote et, sebzelerle birleştir.",
  ),
  new Recipe(
    104,
    "Ara Öğün",
    "Protein Shake",
    25,
    8,
    3,
    "1 ölçek protein tozu + 250 ml su ya da az yağlı süt ile çırp.",
    "Alternatif: Yoğurt & Tarçın",
    "150g yağsız yoğurda tarçın serp, az bal ekle.",
  ),
  new Recipe(
    105,
    "1. Öğün (Kahvaltı) – B Planı",
    "Avokadolu Haşlanmış Yumurta",
    14,
    8,
    16,
    "2 yumurtayı haşla, yarım avokadoyla servis et. Limon sık, tuz-karabiber.",
    "Alternatif: Yoğurtlu Yeşil Smoothie",
    "150g yağsız yoğurt + ½ muz + ıspanak blenderdan geçir.",
  ),
  new Recipe(
    106,
    "2. Öğün (Öğle) – B Planı",
    "Sebzeli Kırmızı Mercimek Çorbası",
    14,
    28,
    4,
    "Kırmızı mercimeği havuç-soğan-domates ile haşla, blenderdan geçir. Az zeytinyağı ile tatlandır.",
    "Alternatif: Nohutlu Roka Salatası",
    "Haşlanmış nohut + roka + domates + zeytinyağı + limon.",
  ),
];

// ============================================================
// KİLO ALMA TARİFLERİ  (~2 800–3 200 kcal/gün)
// GTEH + 400 kcal fazla hedefi için uygundur.
// ============================================================
const gainRecipes: Recipe[] = [
  new Recipe(
    201,
    "1. Öğün (Kahvaltı)",
    "Yulaf Lapası & Muzlu Fıstık Ezmesi",
    22,
    72,
    14,
    "80g yulafı sütle haşla, 1 muz dilimle, 2 kaşık fıstık ezmesi ve bal ekle.",
    "Alternatif: Tam Buğday Pancake",
    "2 yumurta + 60g tam buğday unu + süt ile hamur yap, tavada pişir.",
  ),
  new Recipe(
    202,
    "2. Öğün (Öğle)",
    "Biftek & Basmati Pirinç & Avokado",
    48,
    65,
    24,
    "200g az yağlı bifteği ızgarala. 100g basmati pirincini haşla. Yarım avokado ile servis et.",
    "Alternatif: Dana Köfte & Bulgur Pilavı",
    "200g dana kıyma köfte yap, ızgarala. 80g bulgur pilavı ile servis et.",
  ),
  new Recipe(
    203,
    "3. Öğün (Akşam)",
    "Fırın Somon & Tatlı Patates",
    38,
    42,
    22,
    "180g somonu 200°C'de 20 dk pişir. 150g tatlı patatesi fırınla. Zeytinyağı gezdir.",
    "Alternatif: Fırın Tavuk But & Sebze",
    "200g tavuk budu fırınla (derili), yanına renkli fırın sebzesi ekle.",
  ),
  new Recipe(
    204,
    "Ara Öğün 1",
    "Yüksek Kalorili Shake",
    30,
    60,
    10,
    "2 ölçek mass gainer + 400 ml tam yağlı süt + 1 muz blenderdan geçir.",
    "Alternatif: Fıstık Ezmeli Muzlu Ekmek",
    "3 dilim tam buğday ekmeği, 3 kaşık fıstık ezmesi, üstüne muz dilimle.",
  ),
  new Recipe(
    205,
    "Ara Öğün 2",
    "Granolalı Tam Yoğurt & Fındık",
    15,
    38,
    18,
    "200g tam yağlı yoğurt üzerine 40g granola ve 20g fındık serp.",
    "Alternatif: Kaşarlı Yumurta Omleti",
    "3 yumurta + 30g kaşar peyniri + tereyağında pişir.",
  ),
  new Recipe(
    206,
    "1. Öğün (Kahvaltı) – B Planı",
    "Proteinli Waffle",
    28,
    45,
    12,
    "1 ölçek protein tozu + 1 yumurta + 50g yulaf unu + süt karıştır, waffle makinesinde pişir.",
    "Alternatif: Tam Yağlı Sütlü Yulaf",
    "80g yulafı 400 ml tam yağlı sütle haşla, bal-tarçın ekle.",
  ),
];

// ============================================================
// KİLO KORUMA TARİFLERİ  (~2 000–2 200 kcal/gün)
// GTEH denge hedefi için uygundur.
// ============================================================
const maintainRecipes: Recipe[] = [
  new Recipe(
    301,
    "1. Öğün (Kahvaltı)",
    "Fıstık Ezmeli Yulaf Lapası",
    15,
    45,
    12,
    "50g yulafı sütle haşla, 1 kaşık fıstık ezmesi ekle.",
    "Alternatif: Fıstık Ezmeli Tam Buğday Ekmek",
    "2 dilim tam buğday ekmeğine fıstık ezmesi sür, 1 bardak süt iç.",
  ),
  new Recipe(
    302,
    "2. Öğün (Öğle)",
    "Izgara Tavuk & Basmati Pirinç",
    45,
    55,
    8,
    "150g tavuğu sotele, 80g basmati pirinci haşla. Yanında yeşillik servis et.",
    "Alternatif: Ton Balıklı Yeşillik Salatası",
    "1 kutu yağı süzülmüş ton balığını bol yeşillikli salataya karıştır.",
  ),
  new Recipe(
    303,
    "3. Öğün (Akşam)",
    "Fırın Somon & Kuşkonmaz",
    35,
    8,
    22,
    "150g somonu 200°C fırında 20 dk pişir. Yanında buharda kuşkonmaz servis et.",
    "Alternatif: Lor Peynirli Sebzeli Omlet",
    "3 yumurta beyazı + 1 tam yumurta + 3 kaşık lor + ıspanak, yağsız tavada pişir.",
  ),
  new Recipe(
    304,
    "Ara Öğün",
    "Meyveli Yoğurt",
    10,
    22,
    5,
    "150g yoğurt üzerine mevsim meyvesi ekle, az bal gezdir.",
    "Alternatif: Beyaz Peynir & Ceviz",
    "30g beyaz peynir + 5-6 ceviz içi.",
  ),
  new Recipe(
    305,
    "1. Öğün (Kahvaltı) – B Planı",
    "Lorlu Ispanaklı Omlet",
    28,
    4,
    14,
    "2 yumurta + 1 yumurta akı çırp, lor peyniri-ıspanak ekle, tavada pişir.",
    "Alternatif: Muzlu Protein Smoothie",
    "1 muz + 150g yoğurt + 1 ölçek protein tozu + süt blenderdan geçir.",
  ),
  new Recipe(
    306,
    "2. Öğün (Öğle) – B Planı",
    "Yağsız Dana Köfte & Bulgur",
    40,
    48,
    10,
    "150g dana kıyma köfte yap, ızgarala. 70g bulgur pilavı ile servis et.",
    "Alternatif: Fırın Tavuk & Tam Buğday Makarna",
    "150g fırın tavuk göğsünü 80g tam buğday makarna ile servis et.",
  ),
];

// ============================================================
// FACTORY FONKSİYONLAR
// ============================================================

/**
 * Hedefe göre ilk 3 tarifi döndürür (ana öğünler: sabah-öğle-akşam).
 * goal parametresi: UserProfile.getOtomatikHedef() çıktısı olmalı.
 */
export function getDailyRecipes(goal: Goal = "maintain"): Recipe[] {
  const map: Record<Goal, Recipe[]> = {
    lose: loseRecipes,
    gain: gainRecipes,
    maintain: maintainRecipes,
  };
  return map[goal].slice(0, 3);
}

/**
 * Hedefe göre tüm tarifleri döndürür (tarif ekranı için).
 * goal parametresi: UserProfile.getOtomatikHedef() çıktısı olmalı.
 */
export function getAllRecipesByGoal(goal: Goal = "maintain"): Recipe[] {
  const map: Record<Goal, Recipe[]> = {
    lose: loseRecipes,
    gain: gainRecipes,
    maintain: maintainRecipes,
  };
  return map[goal];
}
