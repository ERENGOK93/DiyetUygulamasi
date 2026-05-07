// ============================================================
// src/modules/UserProfile.ts
// Kalıtım: BaseModel'den türer.
// Kullanıcının fiziksel bilgilerini ve metabolizma hesaplarını içerir.
//
// Terimler (Türkçeleştirilmiş):
//   BMR  → DMH  (Dinlenme Metabolizma Hızı)
//   TDEE → GTEH (Günlük Toplam Enerji Harcaması)
//   BMI  → VKİ  (Vücut Kitle İndeksi)
//
// Hedef (lose/maintain/gain) kullanıcı tarafından seçilemez;
// VKİ değerine göre uygulama otomatik olarak belirler.
// ============================================================

import { BaseModel } from "./BaseModel"; // modules/BaseModel.ts — aynı klasörde ✅

export type Goal = "lose" | "maintain" | "gain";

export class UserProfile extends BaseModel {
  private _name: string;
  private _age: number;
  private _heightCm: number;
  private _weightKg: number;

  constructor(
    id: number,
    name: string,
    age: number,
    heightCm: number,
    weightKg: number
  ) {
    super(id);
    this._name     = name;
    this._age      = age;
    this._heightCm = heightCm;
    this._weightKg = weightKg;
  }

  // --- Getter'lar ---
  get name(): string     { return this._name; }
  get age(): number      { return this._age; }
  get heightCm(): number { return this._heightCm; }
  get weightKg(): number { return this._weightKg; }

  // --- Setter'lar ---
  set name(v: string)     { this._name     = v; }
  set age(v: number)      { this._age      = v; }
  set heightCm(v: number) { this._heightCm = v; }
  set weightKg(v: number) { this._weightKg = v; }

  getVKI(): number {
    const m = this._heightCm / 100;
    return parseFloat((this._weightKg / (m * m)).toFixed(1));
  }

  getVKIKategorisi(): string {
    const v = this.getVKI();
    if (v < 18.5) return "Zayıf";
    if (v < 25)   return "Normal";
    if (v < 30)   return "Fazla Kilolu";
    return "Obez";
  }

  getDMH(): number {
    return Math.round(10 * this._weightKg + 6.25 * this._heightCm - 5 * this._age + 5);
  }

  getGTEH(): number {
    return Math.round(this.getDMH() * 1.55);
  }

  getOtomatikHedef(): Goal {
    const v = this.getVKI();
    if (v < 18.5) return "gain";
    if (v < 25)   return "maintain";
    return "lose";
  }

  getHedefEtiketi(): string {
    const h = this.getOtomatikHedef();
    if (h === "gain") return "Kilo Al";
    if (h === "lose") return "Kilo Ver";
    return "Kilonu Koru";
  }

  getHedefKalori(): number {
    const gteh = this.getGTEH();
    const h    = this.getOtomatikHedef();
    if (h === "lose") return gteh - 500;
    if (h === "gain") return gteh + 400;
    return gteh;
  }

  getHedefAciklamasi(): string {
    const v = this.getVKI();
    if (v < 18.5)
      return `VKİ ${v} → Zayıf. Sağlıklı kiloya ulaşmak için kalori fazlası planı öneriliyor.`;
    if (v < 25)
      return `VKİ ${v} → Normal aralıkta. Mevcut kilonu korumak için denge planı öneriliyor.`;
    if (v < 30)
      return `VKİ ${v} → Fazla Kilolu. Sağlıklı hızda kilo vermek için kalori açığı planı öneriliyor.`;
    return `VKİ ${v} → Obez. Kilo vermek için düşük kalorili plan öneriliyor.`;
  }

  getSummary(): string {
    return `${this._name} – ${this._weightKg} kg / ${this._heightCm} cm / VKİ: ${this.getVKI()}`;
  }
}
