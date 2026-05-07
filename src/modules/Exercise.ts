// ============================================================
// models/Exercise.ts
// Kalıtım: BaseModel'den türer.
// Tek bir egzersiz hareketini temsil eder.
// Encapsulation: private alanlar, getter/setter ile yönetilir.
// ============================================================

import { BaseModel } from "./BaseModel";

export class Exercise extends BaseModel {
  // --- Encapsulation: private alanlar ---
  private _name: string;
  private _sets: string;
  private _description: string;

  constructor(id: number, name: string, sets: string, description: string) {
    // Üst sınıf (BaseModel) constructor'ı çağrılıyor → Kalıtım
    super(id);
    this._name = name;
    this._sets = sets;
    this._description = description;
  }

  // --- Getter'lar ---
  get name(): string {
    return this._name;
  }

  get sets(): string {
    return this._sets;
  }

  get description(): string {
    return this._description;
  }

  /**
   * Polymorphism: BaseModel'deki abstract getSummary() burada eziliyor.
   * Exercise için özet: "İsim – Set bilgisi"
   */
  getSummary(): string {
    return `${this._name} – ${this._sets}`;
  }
}
