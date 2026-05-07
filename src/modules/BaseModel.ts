// ============================================================
// models/BaseModel.ts
// Tüm veri modellerinin türediği temel (abstract) sınıf.
// Encapsulation: private _id alanı, getter ile dışarıya açılır.
// Polymorphism: getSummary() her alt sınıfta farklı davranır.
// ============================================================

export abstract class BaseModel {
  // --- Encapsulation: private alan, dışarıdan değiştirilemez ---
  private _id: number;
  private _createdAt: Date;

  constructor(id: number) {
    this._id = id;
    this._createdAt = new Date();
  }

  // --- Getter: _id'yi salt okunur olarak dışarıya açar ---
  get id(): number {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  /**
   * Polymorphism: Her alt sınıf kendi özetini döndürür.
   * Bu metot override edilmek zorundadır.
   */
  abstract getSummary(): string;

  /**
   * Ortak yardımcı: modelin JSON temsilini döndürür.
   */
  toJSON(): object {
    return {
      id: this._id,
      createdAt: this._createdAt.toISOString(),
      summary: this.getSummary(),
    };
  }
}
