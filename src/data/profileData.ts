// ============================================================
// src/data/profileData.ts
// Kullanıcı profili singleton ve aktivite geçmişi.
// ============================================================

import { ActivityLog } from "../modules/ActivityLog"; // ✅
import { UserProfile } from "../modules/UserProfile"; // ✅

// ---- Singleton kullanıcı profili ----
let userProfileInstance: UserProfile = new UserProfile(
  1,
  "Eren",
  19,
  178,
  78.5,
);

export function getUserProfile(): UserProfile {
  return userProfileInstance;
}

/**
 * Kullanıcı isim, yaş, boy ve kilo güncelleyebilir.
 * Hedef otomatik olarak VKİ'den hesaplanır.
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
      "Güncel kilo: 78.5 kg",
      "Dün, 09:15",
      "line-chart",
    ),
  ];
}
