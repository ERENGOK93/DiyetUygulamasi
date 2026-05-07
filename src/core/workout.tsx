// ============================================================
// screens/workout.tsx
// Antrenman ekranı: Exercise nesnelerini render eder.
// Veriler artık dışarıdan (workoutData.ts) OOP nesneleri olarak gelir.
// Bu dosya yalnızca UI sorumluluğunu taşır.
// ============================================================

import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Exercise } from "../modules/Exercise";
import { getChestExercises, getTricepsExercises } from "../data/workoutData";

// ---- Yardımcı Alt Bileşen ----
// Tek bir egzersiz kartını render eden fonksiyon.
// Fonksiyonel Ayrıştırma: render mantığı ana bileşenden ayrıldı.

interface ExerciseCardProps {
  exercise: Exercise; // OOP nesnesi doğrudan prop olarak alınır
  index: number;
  badgeStyle: object;
}

/**
 * ExerciseCard: Tek bir Exercise nesnesini kart olarak gösterir.
 * Exercise.getSummary() → Polymorphism örneği (BaseModel override)
 */
function ExerciseCard({ exercise, index, badgeStyle }: ExerciseCardProps) {
  return (
    <View style={styles.workoutCard}>
      <View style={styles.cardTop}>
        {/* exercise.name → Encapsulation: getter ile erişim */}
        <Text style={styles.moveName}>
          {index + 1}. {exercise.name}
        </Text>
        {/* exercise.sets → getter ile erişim */}
        <Text style={badgeStyle}>{exercise.sets}</Text>
      </View>
      {/* exercise.description → getter ile erişim */}
      <Text style={styles.descText}>{exercise.description}</Text>
    </View>
  );
}

// ---- Ana Bileşen ----
export default function WorkoutScreen() {
  // OOP nesneleri factory fonksiyonlarından alınır
  const chestExercises: Exercise[] = getChestExercises();
  const tricepsExercises: Exercise[] = getTricepsExercises();

  return (
    <ImageBackground
      source={require("../assets/images/antrenman_bg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.headerTitle}>Günün Antrenmanı</Text>
          <Text style={styles.subTitle}>İtme Günü (Göğüs & Arka Kol)</Text>

          {/* GÖĞÜS bölümü */}
          <Text style={styles.sectionTitle}>Göğüs (Büyük Kas)</Text>
          {chestExercises.map((exercise, index) => (
            // Exercise.id → Encapsulation: private _id'ye getter üzerinden erişim
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              index={index}
              badgeStyle={styles.badge}
            />
          ))}

          {/* ARKA KOL bölümü */}
          <Text style={styles.sectionTitle}>Arka Kol (Küçük Kas)</Text>
          {tricepsExercises.map((exercise, index) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              index={index}
              badgeStyle={styles.badgeDark}
            />
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: "rgba(10, 17, 40, 0.65)" },
  scrollContent: { padding: 20, paddingTop: 60, paddingBottom: 40 },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    textShadowColor: "rgba(0, 0, 0, 0.9)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subTitle: {
    fontSize: 16,
    color: "#D4AF37",
    marginBottom: 20,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.9)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 10,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.2)",
    paddingBottom: 5,
  },
  workoutCard: {
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.3)",
  },
  cardTop: { marginBottom: 8 },
  moveName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 4,
  },
  badge: { color: "#D4AF37", fontWeight: "bold", fontSize: 14 },
  badgeDark: { color: "#39FF14", fontWeight: "bold", fontSize: 14 },
  descText: {
    color: "#EEE",
    fontSize: 13,
    lineHeight: 20,
    fontStyle: "italic",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
    paddingTop: 8,
  },
});
