// ============================================================
// screens/program.tsx
// Haftalık program ekranı: DayPlan nesnelerini render eder.
// Accordion (açılır/kapanır) mantığı useState ile yönetilir.
// ============================================================

import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DayPlan } from "../modules/DayPlan";
import { getWeeklyPlan } from "../data/programData";

// ---- Yardımcı Alt Bileşen ----
// Tek bir gün kartını render eder.
// Fonksiyonel Ayrıştırma: accordion mantığı ana bileşenden ayrıldı.

interface DayCardProps {
  plan: DayPlan;           // OOP nesnesi
  isExpanded: boolean;
  onToggle: () => void;
}

/**
 * DayCard: Tek bir DayPlan nesnesini accordion kart olarak gösterir.
 * plan.getMeals() → DayPlan sınıfının kendi metodu (encapsulation + yardımcı)
 * plan.getSummary() → Polymorphism (BaseModel override)
 */
function DayCard({ plan, isExpanded, onToggle }: DayCardProps) {
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        style={[styles.dayHeader, isExpanded && styles.activeHeader]}
        onPress={onToggle}
        activeOpacity={0.7}
      >
        {/* plan.day → Encapsulation: getter ile erişim */}
        <Text style={styles.dayText}>{plan.day}</Text>
        <FontAwesome
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={18}
          color="#D4AF37"
        />
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.detailsContainer}>
          <View style={styles.focusBox}>
            <Text style={styles.focusTitle}>🏋️‍♂️ Günün Odağı:</Text>
            {/* plan.focus → getter ile erişim */}
            <Text style={styles.focusText}>{plan.focus}</Text>
          </View>

          <View style={styles.mealsBox}>
            <Text style={styles.mealsTitle}>🍽️ Günün Öğünleri:</Text>
            {/* plan.getMeals() → DayPlan sınıfının yardımcı metodu */}
            {plan.getMeals().map((meal, idx) => (
              <Text key={idx} style={styles.mealText}>{meal}</Text>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

// ---- Ana Bileşen ----
export default function ProgramScreen() {
  // Hangi günün açık olduğunu tutar; null ise hiçbiri açık değil
  const [expandedDayId, setExpandedDayId] = useState<number | null>(null);

  // OOP nesneleri factory fonksiyonundan alınır
  const weeklyPlan: DayPlan[] = getWeeklyPlan();

  /**
   * Aynı güne tıklanırsa kapatır, farklı güne tıklanırsa açar.
   * Fonksiyonel Ayrıştırma: toggle mantığı ayrı fonksiyon olarak tanımlı.
   */
  const handleToggle = (id: number): void => {
    setExpandedDayId(expandedDayId === id ? null : id);
  };

  return (
    <ImageBackground
      source={require("../assets/images/program_bg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.headerTitle}>Haftalık Program</Text>
          <Text style={styles.subTitle}>Gününü seç, hedefe odaklan.</Text>

          {weeklyPlan.map((plan) => (
            // plan.id → Encapsulation: private _id'ye getter üzerinden erişim
            <DayCard
              key={plan.id}
              plan={plan}
              isExpanded={expandedDayId === plan.id}
              onToggle={() => handleToggle(plan.id)}
            />
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: "cover" },
  overlay: { flex: 1, backgroundColor: "rgba(10, 17, 40, 0.50)" },
  scrollContent: { padding: 20, paddingTop: 60, paddingBottom: 40 },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 5,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subTitle: {
    fontSize: 16,
    color: "#D4AF37",
    marginBottom: 25,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  cardContainer: { marginBottom: 15 },
  dayHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  activeHeader: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderColor: "#D4AF37",
    backgroundColor: "rgba(212, 175, 55, 0.35)",
  },
  dayText: { fontSize: 20, fontWeight: "bold", color: "#FFF" },
  detailsContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    padding: 20,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: "#D4AF37",
  },
  focusBox: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.15)",
    paddingBottom: 15,
  },
  focusTitle: {
    color: "#39FF14",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  focusText: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
  mealsBox: {},
  mealsTitle: {
    color: "#FF8C00",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  mealText: { color: "#E0E0E0", fontSize: 15, marginBottom: 8, lineHeight: 22 },
});
