// ============================================================
// models/Recipe.ts
// Kalıtım: BaseModel'den türer.
// Bir öğün tarifini ve makro değerlerini temsil eder.
// Encapsulation: private alanlar, getter ile dışarıya açılır.
// ============================================================

import { BaseModel } from "./BaseModel";

export class Recipe extends BaseModel {
  // --- Encapsulation: tüm alanlar private ---
  private _mealType: string;    // Öğün tipi: "1. Öğün (Kahvaltı)" vb.
  private _name: string;         // Ana tarif adı
  private _protein: number;      // gram
  private _carbs: number;        // gram
  private _fat: number;          // gram
  private _instructions: string; // Pişirme talimatı
  private _altName: string;      // Alternatif tarif adı
  private _altInstructions: string;

  constructor(
    id: number,
    mealType: string,
    name: string,
    protein: number,
    carbs: number,
    fat: number,
    instructions: string,
    altName: string,
    altInstructions: string
  ) {
    super(id); // Kalıtım: üst sınıf constructor'ı
    this._mealType = mealType;
    this._name = name;
    this._protein = protein;
    this._carbs = carbs;
    this._fat = fat;
    this._instructions = instructions;
    this._altName = altName;
    this._altInstructions = altInstructions;
  }

  // --- Getter'lar ---
  get mealType(): string { return this._mealType; }
  get name(): string { return this._name; }
  get protein(): number { return this._protein; }
  get carbs(): number { return this._carbs; }
  get fat(): number { return this._fat; }
  get instructions(): string { return this._instructions; }
  get altName(): string { return this._altName; }
  get altInstructions(): string { return this._altInstructions; }

  /**
   * Toplam kalori hesabı (Mifflin–St Jeor yaklaşımı).
   * Pro: 4 kcal/g | Karb: 4 kcal/g | Yağ: 9 kcal/g
   */
  getTotalCalories(): number {
    return this._protein * 4 + this._carbs * 4 + this._fat * 9;
  }

  /**
   * Polymorphism: BaseModel.getSummary() bu sınıfa özgü biçimde eziliyor.
   * Recipe için özet: "Tarif adı (kalori)"
   */
  getSummary(): string {
    return `${this._name} – ${this.getTotalCalories()} kcal`;
  }
}
