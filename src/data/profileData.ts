// ============================================================
// src/data/profileData.ts
// Kullanıcı profili singleton ve aktivite geçmişi.
// ============================================================

import { ActivityLog } from "../modules/ActivityLog";
import { UserProfile } from "../modules/UserProfile";

// ---- Singleton kullanıcı profili ----
// Varsayılan değerleri boş/sıfır başlattık ki kayıt verileri üzerine yazılsın.
let userProfileInstance: UserProfile = new UserProfile(
  1,
  "",    // name (kayıtta dolacak)
  0,     // age
  0,     // heightCm
  0,     // weightKg
);

/**
 * Mevcut profil nesnesini döndürür.
 */
export function getUserProfile(): UserProfile {
  return userProfileInstance;
}

/**
 * Kullanıcı kayıt olurken veya bilgilerini güncellerken çağrılır.
 * Bu sayede uygulama genelinde isim, boy ve kilo dinamik hale gelir.
 */
export function updateUserProfile(
  name: string,
  age: number,
  heightCm: number,
  weightKg: number,
): void {
  userProfileInstance.name = name;
  userProfileInstance.age = age;
  userProfileInstance.heightCm = heightCm;
  userProfileInstance.weightKg = weightKg;
}

/**
 * Profil sayfasında görünen örnek aktivite geçmişi.
 */
export function getActivityHistory(): ActivityLog[] {
  return [
    new ActivityLog(
      1,
      "Antrenman Kaydedildi",
      "İtme Günü tamamlandı.",
      "Bugün, 18:30",
      "bolt",
    ),
    new ActivityLog(
      2,
      "Yeni Kilo Girişi",
      `Güncel kilo: ${userProfileInstance.weightKg} kg`,
      "Dün, 09:15",
      "line-chart",
    ),
  ];
}