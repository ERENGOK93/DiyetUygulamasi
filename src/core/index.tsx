// ============================================================
// screens/index.tsx
// Ana menü ekranı: VKİ, DMH, GTEH ve otomatik hedef özeti.
// Tarifler UserProfile.getOtomatikHedef() üzerinden çekilir.
// ============================================================

import { FontAwesome } from "@expo/vector-icons";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getChestExercises } from "../data/workoutData";
import { getDailyRecipes } from "../data/recipeData";
import { getUserProfile } from "../data/profileData";

const MOTIVASYON =
  "Bahane yok kanka! O ağırlıklar bugün kalkacak, şimdi hemen antrenmana başla!";

interface OzetKartProps {
  iconName: string;
  title: string;
  description: string;
}

function OzetKart({ iconName, title, description }: OzetKartProps) {
  return (
    <View style={styles.summaryCard}>
      <View style={styles.cardHeader}>
        <FontAwesome name={iconName as any} size={20} color="#D4AF37" />
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <Text style={styles.cardDesc}>{description}</Text>
    </View>
  );
}

export default function MainMenuScreen() {
  const profile = getUserProfile();

  // Otomatik hedef — kullanıcı seçemez, VKİ belirler
  const hedef        = profile.getOtomatikHedef();
  const hedefEtiketi = profile.getHedefEtiketi();
  const hedefKalori  = profile.getHedefKalori();
  const vki          = profile.getVKI();
  const vkiKat       = profile.getVKIKategorisi();
  const dmh          = profile.getDMH();
  const gteh         = profile.getGTEH();

  const vkiColor =
    vki < 18.5 ? "#60CFFF" : vki < 25 ? "#39FF14" : vki < 30 ? "#FFB347" : "#FF4444";

  const firstExercise = getChestExercises()[0];
  const recipes       = getDailyRecipes(hedef);
  const sabahTarif    = recipes[0];
  const aksamTarif    = recipes[2] ?? recipes[0];

  const antrenmanAciklama = `Bugün Göğüs & Arka Kol günü! İlk hareket: ${firstExercise.name}. Detaylar için Antrenman sekmesine tıkla.`;
  const menuAciklama      = `Sabah: ${sabahTarif.name} · Akşam: ${aksamTarif.name} (${aksamTarif.getTotalCalories()} kcal).`;

  return (
    <ImageBackground
      source={require("../../assets/images/ana_menu_bg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.greeting}>Hadi Başlayalım, {profile.name}!</Text>
          </View>

          {/* Maskot & konuşma balonu */}
          <View style={styles.mascotContainer}>
            <Image
              source={require("../../assets/images/ana_menu_ikon.png")}
              style={styles.mascotImage}
              resizeMode="contain"
            />
            <View style={styles.speechBubble}>
              <Text style={styles.quoteText}>{MOTIVASYON}</Text>
            </View>
          </View>

          {/* Hızlı Metrik Özeti */}
          <View style={styles.metrikRow}>
            {/* VKİ */}
            <View style={styles.metrikBox}>
              <Text style={[styles.metrikValue, { color: vkiColor }]}>{vki}</Text>
              <Text style={styles.metrikLabel}>VKİ</Text>
              <Text style={[styles.metrikAlt, { color: vkiColor }]}>{vkiKat}</Text>
            </View>
            {/* DMH */}
            <View style={styles.metrikBox}>
              <Text style={styles.metrikValue}>{dmh}</Text>
              <Text style={styles.metrikLabel}>DMH</Text>
              <Text style={styles.metrikAlt}>kcal/gün</Text>
            </View>
            {/* GTEH */}
            <View style={styles.metrikBox}>
              <Text style={styles.metrikValue}>{gteh}</Text>
              <Text style={styles.metrikLabel}>GTEH</Text>
              <Text style={styles.metrikAlt}>kcal/gün</Text>
            </View>
            {/* Hedef Kalori */}
            <View style={styles.metrikBox}>
              <Text style={[styles.metrikValue, { color: "#D4AF37" }]}>{hedefKalori}</Text>
              <Text style={styles.metrikLabel}>Hedef</Text>
              <Text style={styles.metrikAlt}>kcal/gün</Text>
            </View>
          </View>

          {/* Sistem Önerisi Pilı */}
          <View style={styles.oneriRow}>
            <FontAwesome name="magic" size={13} color="#D4AF37" />
            <Text style={styles.oneriText}>
              Sistem Önerisi: <Text style={styles.oneriVurgu}>{hedefEtiketi}</Text>
              {"  "}·{"  "}VKİ {vki} → {vkiKat}
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Bugünün Özeti</Text>

          <OzetKart
            iconName="bolt"
            title="Sıradaki Antrenman"
            description={antrenmanAciklama}
          />
          <OzetKart
            iconName="cutlery"
            title="Günün Menüsü"
            description={menuAciklama}
          />
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background:    { flex: 1, width: '100%', height: '100%' },
  overlay:       { flex: 1, backgroundColor: "rgba(10, 17, 40, 0.58)" },
  scrollContent: { padding: 20, paddingTop: 60, paddingBottom: 40 },
  header:        { marginBottom: 16 },
  greeting:      {
    fontSize: 27, fontWeight: "bold", color: "#FFF",
    textShadowColor: "rgba(0,0,0,0.8)", textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 5,
  },

  mascotContainer: { flexDirection: "row", alignItems: "center", marginBottom: 22 },
  mascotImage:     { width: 90, height: 110, marginRight: 10 },
  speechBubble:    {
    flex: 1, backgroundColor: "rgba(0,0,0,0.65)", padding: 14,
    borderRadius: 15, borderBottomLeftRadius: 0, borderWidth: 1, borderColor: "rgba(212,175,55,0.4)",
  },
  quoteText: { fontSize: 13, color: "#FFF", fontStyle: "italic", lineHeight: 19, fontWeight: "600" },

  // Metrik satırı
  metrikRow:   { flexDirection: "row", justifyContent: "space-between", marginBottom: 14 },
  metrikBox:   {
    flex: 1, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 11,
    paddingVertical: 11, alignItems: "center", marginHorizontal: 3,
    borderWidth: 1, borderColor: "#1A2138",
  },
  metrikValue: { fontSize: 16, fontWeight: "bold", color: "#FFF" },
  metrikLabel: { fontSize: 10, color: "#D4AF37", fontWeight: "bold", marginTop: 2 },
  metrikAlt:   { fontSize: 9, color: "#666", marginTop: 1, textAlign: "center" },

  // Öneri pilı
  oneriRow:   { flexDirection: "row", alignItems: "center", gap: 7, backgroundColor: "rgba(212,175,55,0.12)", borderRadius: 20, paddingVertical: 8, paddingHorizontal: 14, alignSelf: "flex-start", marginBottom: 20, borderWidth: 1, borderColor: "rgba(212,175,55,0.3)" },
  oneriText:  { fontSize: 12, color: "#CCC" },
  oneriVurgu: { color: "#D4AF37", fontWeight: "bold" },

  sectionTitle: {
    fontSize: 19, fontWeight: "bold", color: "#FFF", marginBottom: 13,
    textShadowColor: "rgba(0,0,0,0.8)", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 3,
  },
  summaryCard: {
    backgroundColor: "rgba(0,0,0,0.57)", padding: 15, borderRadius: 12,
    marginBottom: 13, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)",
  },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 9, gap: 10 },
  cardTitle:  { fontSize: 16, fontWeight: "bold", color: "#D4AF37" },
  cardDesc:   { color: "#EEE", fontSize: 14, lineHeight: 20 },
});