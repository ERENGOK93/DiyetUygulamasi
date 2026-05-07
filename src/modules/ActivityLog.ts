// ============================================================
// models/ActivityLog.ts
// Kalıtım: BaseModel'den türer.
// Kullanıcının aktivite geçmiş kaydını temsil eder.
// ============================================================

import { BaseModel } from "./BaseModel";

export class ActivityLog extends BaseModel {
  // --- Encapsulation: private alanlar ---
  private _title: string;
  private _description: string;
  private _time: string;
  private _icon: string; // FontAwesome icon adı

  constructor(
    id: number,
    title: string,
    description: string,
    time: string,
    icon: string
  ) {
    super(id); // Kalıtım
    this._title = title;
    this._description = description;
    this._time = time;
    this._icon = icon;
  }

  // --- Getter'lar ---
  get title(): string { return this._title; }
  get description(): string { return this._description; }
  get time(): string { return this._time; }
  get icon(): string { return this._icon; }

  /**
   * Polymorphism: ActivityLog için özet başlık ve zamanı içerir.
   */
  getSummary(): string {
    return `${this._title} – ${this._time}`;
  }
}
