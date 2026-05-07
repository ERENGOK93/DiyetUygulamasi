// ============================================================
// data/workoutData.ts
// Antrenman verileri: Exercise sınıfı örnekleri burada oluşturulur.
// Fonksiyonel Ayrıştırma: veri, bileşenden ayrı tutuldu.
// ============================================================

import { Exercise } from "../modules/Exercise";

/**
 * Göğüs egzersizlerini döndürür.
 * Her Exercise, BaseModel'den kalıtım yoluyla id ve createdAt alır.
 */
export function getChestExercises(): Exercise[] {
  return [
    new Exercise(
      1,
      "Barbell Bench Press",
      "4 Set x 8-10 Tekrar",
      "Kürek kemiklerini sehpaya iyice kilitle. Barı göğüs ucuna yavaşça indir, dirsekleri çok açmadan patlayıcı güçle yukarı it."
    ),
    new Exercise(
      2,
      "Incline Dumbbell Press",
      "4 Set x 10-12 Tekrar",
      "Sehpayı 30 dereceye ayarla. Dambılları yavaşça göğüs hizasına indirip, tepe noktasında üst göğsünü sıkarak birleştir."
    ),
    new Exercise(
      3,
      "Cable Crossover",
      "4 Set x 12-15 Tekrar",
      "Kabloları üstten al, gövdeni hafif öne eğ. Kollarını tamamen bükmeden, hareketi göğüs altında sıkarak tamamla."
    ),
    new Exercise(
      4,
      "Pec Deck Fly",
      "4 Set x 15 Tekrar",
      "Sırtını tamamen daya. Kollarından değil, dirseklerinden güç alarak ağırlığı göğüs kaslarınla ortada kapat."
    ),
  ];
}

/**
 * Arka kol (triceps) egzersizlerini döndürür.
 */
export function getTricepsExercises(): Exercise[] {
  return [
    new Exercise(
      5,
      "Triceps Rope Pushdown",
      "3 Set x 12-15 Tekrar",
      "Dirseklerini vücuduna sabitle. Halatı aşağı iterken en alt noktada bileklerini dışa doğru açıp arka kolu sık."
    ),
    new Exercise(
      6,
      "Overhead Cable Extension",
      "3 Set x 12 Tekrar",
      "Kabloyu başının arkasından al. Sadece ön kolunu hareket ettirerek tepe noktasında arka kolu tam esnet."
    ),
    new Exercise(
      7,
      "Skullcrusher (Z-Bar)",
      "3 Set x 10 Tekrar",
      "Barı alnına doğru yavaşça ve kontrollü indir. Dirseklerini yanlara açmadan, sadece triceps gücüyle yukarı it."
    ),
  ];
}
