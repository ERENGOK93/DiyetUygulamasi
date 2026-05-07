// ============================================================
// screens/recipes.tsx
// Tarif ekranı: Kullanıcının VKİ + GTEH'ine göre otomatik tarif planı.
// Kullanıcı plan seçemez; sistem VKİ'ye göre uygun planı belirler.
// useFocusEffect: sekmeye her gelindiğinde profil yeniden okunur.
// ============================================================

import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getUserProfile } from "../data/profileData";
import { getAllRecipesByGoal } from "../data/recipeData";
import { Recipe } from "../modules/Recipe";
import { Goal } from "../modules/UserProfile";

// ---- Yardımcı Alt Bileşen ----
interface RecipeCardProps {
  recipe: Recipe;
  accentColor: string;
}

function RecipeCard({ recipe, accentColor }: RecipeCardProps) {
  return (
    <View style={styles.card}>
      <Text style={[styles.mealType, { color: accentColor }]}>
        {recipe.mealType}
      </Text>
      <Text style={styles.mealName}>{recipe.name}</Text>

      <View style={styles.macroRow}>
        <Text style={styles.macroText}>Protein: {recipe.protein}g</Text>
        <Text style={styles.macroText}>Karb: {recipe.carbs}g</Text>
        <Text style={styles.macroText}>Yağ: {recipe.fat}g</Text>
        <Text style={[styles.macroCalories, { color: accentColor }]}>
          {recipe.getTotalCalories()} kcal
        </Text>
      </View>

      <Text style={styles.instText}>🍳 Ana Tarif: {recipe.instructions}</Text>

      <View style={[styles.altBox, { borderLeftColor: accentColor }]}>
        <Text style={[styles.altTitle, { color: accentColor }]}>
          {recipe.altName}
        </Text>
        <Text style={styles.altInst}>⏱️ {recipe.altInstructions}</Text>
      </View>
    </View>
  );
}

// ---- Ana Bileşen ----
export default function RecipesScreen() {
  // State olarak tutuyoruz ki useFocusEffect tetiklenince yeniden render olsun
  const [hedef, setHedef] = useState<Goal>("maintain");
  const [hedefEtiketi, setHedefEtiketi] = useState("");
  const [hedefKalori, setHedefKalori] = useState(0);
  const [gteh, setGteh] = useState(0);
  const [vki, setVki] = useState(0);
  const [aciklama, setAciklama] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // Sekmeye her gelindiğinde profili yeniden oku
  useFocusEffect(
    useCallback(() => {
      const profile = getUserProfile();

      const yeniHedef = profile.getOtomatikHedef();
      setHedef(yeniHedef);
      setHedefEtiketi(profile.getHedefEtiketi());
      setHedefKalori(profile.getHedefKalori());
      setGteh(profile.getGTEH());
      setVki(profile.getVKI());
      setAciklama(profile.getHedefAciklamasi());
      setRecipes(getAllRecipesByGoal(yeniHedef));
    }, []),
  );

  const accentColor =
    hedef === "lose" ? "#60CFFF" : hedef === "gain" ? "#FFB347" : "#39FF14";

  const toplamKalori = recipes.reduce(
    (sum, r) => sum + r.getTotalCalories(),
    0,
  );

  return (
    <ImageBackground
      source={require("../assets/images/tarifler_bg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.headerTitle}>Günün Tarif Planı</Text>
          <Text style={styles.subTitle}>
            Kaliteli yakıt, kaliteli performans!
          </Text>

          {/* Sistem Öneri Kartı */}
          <View style={[styles.oneriKart, { borderColor: accentColor }]}>
            <View style={styles.oneriUst}>
              <FontAwesome name="magic" size={16} color={accentColor} />
              <Text style={[styles.oneriBaslik, { color: accentColor }]}>
                Sistem Önerisi: {hedefEtiketi}
              </Text>
            </View>
            <Text style={styles.oneriAciklama}>{aciklama}</Text>

            <View style={styles.oneriMetaRow}>
              <View style={styles.oneriMetaItem}>
                <Text style={styles.oneriMetaDeger}>{vki}</Text>
                <Text style={styles.oneriMetaLabel}>VKİ</Text>
              </View>
              <View style={styles.oneriMetaAyirac} />
              <View style={styles.oneriMetaItem}>
                <Text style={styles.oneriMetaDeger}>{gteh}</Text>
                <Text style={styles.oneriMetaLabel}>GTEH (kcal)</Text>
              </View>
              <View style={styles.oneriMetaAyirac} />
              <View style={styles.oneriMetaItem}>
                <Text style={[styles.oneriMetaDeger, { color: accentColor }]}>
                  {hedefKalori}
                </Text>
                <Text style={styles.oneriMetaLabel}>Hedef (kcal)</Text>
              </View>
            </View>

            {/* Günlük plan toplam vs hedef */}
            <View style={styles.karsilastirmaRow}>
              <Text style={styles.karsilastirmaText}>
                Bu Plan: ~{toplamKalori} kcal
              </Text>
              <Text style={styles.karsilastirmaAyirac}>|</Text>
              <Text style={[styles.karsilastirmaText, { color: accentColor }]}>
                Hedefiniz: {hedefKalori} kcal
              </Text>
            </View>
          </View>

          {/* Tarif Kartları */}
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              accentColor={accentColor}
            />
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: "rgba(10, 17, 40, 0.68)" },
  scrollContent: { padding: 20, paddingTop: 60, paddingBottom: 40 },

  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    textShadowColor: "rgba(0,0,0,0.9)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subTitle: {
    fontSize: 15,
    color: "#39FF14",
    marginBottom: 18,
    fontWeight: "bold",
    textShadowColor: "rgba(0,0,0,0.9)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },

  // Öneri kartı
  oneriKart: {
    backgroundColor: "rgba(0,0,0,0.55)",
    borderRadius: 14,
    padding: 18,
    marginBottom: 22,
    borderWidth: 1,
  },
  oneriUst: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  oneriBaslik: { fontSize: 16, fontWeight: "bold" },
  oneriAciklama: {
    fontSize: 13,
    color: "#AAA",
    lineHeight: 19,
    marginBottom: 14,
  },
  oneriMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  oneriMetaItem: { flex: 1, alignItems: "center" },
  oneriMetaAyirac: { width: 1, backgroundColor: "#1A2138" },
  oneriMetaDeger: { fontSize: 18, fontWeight: "bold", color: "#FFF" },
  oneriMetaLabel: { fontSize: 11, color: "#888", marginTop: 3 },
  karsilastirmaRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#1A2138",
  },
  karsilastirmaText: { fontSize: 13, color: "#BBB", fontWeight: "bold" },
  karsilastirmaAyirac: { fontSize: 13, color: "#444" },

  // Tarif kartı
  card: {
    backgroundColor: "rgba(0,0,0,0.62)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  mealType: { fontSize: 13, fontWeight: "bold", marginBottom: 4 },
  mealName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 10,
  },
  macroRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.10)",
    paddingBottom: 10,
    flexWrap: "wrap",
  },
  macroText: { color: "#A0A0A0", fontSize: 13, fontWeight: "bold" },
  macroCalories: { fontSize: 13, fontWeight: "bold" },
  instText: { color: "#CCC", fontSize: 14, lineHeight: 22, marginBottom: 14 },
  altBox: {
    backgroundColor: "rgba(255,140,0,0.10)",
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
  },
  altTitle: { fontWeight: "bold", fontSize: 14, marginBottom: 4 },
  altInst: { color: "#EEE", fontSize: 13, lineHeight: 18 },
});
