// ============================================================
// models/DayPlan.ts
// Kalıtım: BaseModel'den türer.
// Haftanın bir gününe ait antrenman odağı ve öğün planını içerir.
// ============================================================

import { BaseModel } from "./BaseModel";

export class DayPlan extends BaseModel {
  // --- Encapsulation: private alanlar ---
  private _day: string;   // Gün adı: "Pazartesi" vb.
  private _focus: string; // Antrenman odağı: "Göğüs & Arka Kol"
  private _meal1: string;
  private _meal2: string;
  private _meal3: string;

  constructor(
    id: number,
    day: string,
    focus: string,
    meal1: string,
    meal2: string,
    meal3: string
  ) {
    super(id); // Kalıtım
    this._day = day;
    this._focus = focus;
    this._meal1 = meal1;
    this._meal2 = meal2;
    this._meal3 = meal3;
  }

  // --- Getter'lar ---
  get day(): string { return this._day; }
  get focus(): string { return this._focus; }
  get meal1(): string { return this._meal1; }
  get meal2(): string { return this._meal2; }
  get meal3(): string { return this._meal3; }

  /**
   * Tüm öğünleri dizi olarak döndürür.
   * Bileşenler bu metodu kullanarak öğünleri kolayca render edebilir.
   */
  getMeals(): string[] {
    return [this._meal1, this._meal2, this._meal3];
  }

  /**
   * Polymorphism: DayPlan için özet gün ve odaktan oluşur.
   */
  getSummary(): string {
    return `${this._day}: ${this._focus}`;
  }
}
