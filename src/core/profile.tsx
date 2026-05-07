// ============================================================
// screens/profile.tsx
// Profil ekranı: VKİ, DMH, GTEH ve otomatik hedef kalori.
// Kullanıcı isim, yaş, boy ve kilo girebilir.
// Hedef (kilo ver/al/koru) sistem tarafından VKİ'ye göre otomatik belirlenir.
// ============================================================

import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityLog } from "../modules/ActivityLog";
import { getActivityHistory, getUserProfile, updateUserProfile } from "../data/profileData";

// ---- Yardımcı Alt Bileşen ----
interface ActivityLogCardProps {
  log: ActivityLog;
}

function ActivityLogCard({ log }: ActivityLogCardProps) {
  return (
    <View style={styles.logCard}>
      <View style={styles.iconBox}>
        <FontAwesome name={log.icon as any} size={20} color="#0A1128" />
      </View>
      <View style={styles.logTextContainer}>
        <Text style={styles.logTitle}>{log.title}</Text>
        <Text style={styles.logDesc}>{log.description}</Text>
        <Text style={styles.logTime}>{log.time}</Text>
      </View>
    </View>
  );
}

// ---- VKİ Renk Yardımcısı ----
function getVKIColor(vki: number): string {
  if (vki < 18.5) return "#60CFFF";
  if (vki < 25)   return "#39FF14";
  if (vki < 30)   return "#FFB347";
  return "#FF4444";
}

// ---- Ana Bileşen ----
export default function ProfileScreen() {
  const profile        = getUserProfile();
  const activityHistory: ActivityLog[] = getActivityHistory();

  // Yerel state — profil getter'larından başlatılır
  const [name,   setName]   = useState(profile.name);
  const [age,    setAge]    = useState(String(profile.age));
  const [height, setHeight] = useState(String(profile.heightCm));
  const [weight, setWeight] = useState(String(profile.weightKg));
  const [modalVisible, setModalVisible] = useState(false);

  // Canlı önizleme hesaplamaları (kaydetmeden önce)
  const nameVal  = name.trim() || profile.name;
  const ageN     = parseInt(age)      || profile.age;
  const heightN  = parseFloat(height) || profile.heightCm;
  const weightN  = parseFloat(weight) || profile.weightKg;

  const mH   = heightN / 100;
  const vki  = parseFloat((weightN / (mH * mH)).toFixed(1));
  const dmh  = Math.round(10 * weightN + 6.25 * heightN - 5 * ageN + 5);
  const gteh = Math.round(dmh * 1.55);

  // Otomatik hedef: VKİ'ye göre sistem karar verir
  const hedef        = vki < 18.5 ? "gain" : vki < 25 ? "maintain" : "lose";
  const hedefKalori  = hedef === "lose" ? gteh - 500 : hedef === "gain" ? gteh + 400 : gteh;
  const hedefEtiketi = hedef === "gain" ? "Kilo Al" : hedef === "lose" ? "Kilo Ver" : "Kilonu Koru";
  const hedefAciklamasi =
    vki < 18.5 ? `VKİ ${vki} → Zayıf. Kalori fazlası planı öneriliyor.` :
    vki < 25   ? `VKİ ${vki} → Normal. Denge planı öneriliyor.` :
    vki < 30   ? `VKİ ${vki} → Fazla Kilolu. Kalori açığı planı öneriliyor.` :
                 `VKİ ${vki} → Obez. Düşük kalorili plan öneriliyor.`;

  const vkiColor  = getVKIColor(vki);
  const vkiPct    = Math.min(Math.max(((vki - 10) / 30) * 100, 0), 100);
  const vkiKat    = vki < 18.5 ? "Zayıf" : vki < 25 ? "Normal" : vki < 30 ? "Fazla Kilolu" : "Obez";
  const hedefColor = hedef === "gain" ? "#FFB347" : hedef === "lose" ? "#60CFFF" : "#39FF14";

  function handleSave() {
    updateUserProfile(nameVal, ageN, heightN, weightN);
    setModalVisible(false);
  }

  return (
    <ImageBackground
      source={require("../assets/images/maskot.png")}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scrollContent}>

          {/* Profil başlık */}
          <View style={styles.header}>
            <View style={styles.avatarPlaceholder}>
              <FontAwesome name="user" size={40} color="#0A1128" />
            </View>
            <Text style={styles.name}>{nameVal}</Text>
            <Text style={styles.bio}>{ageN} Yaş | Ankara</Text>
            <Text style={styles.level}>Seviye 5: Demir İrade</Text>
          </View>

          {/* Fiziksel Özet */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{weightN} kg</Text>
              <Text style={styles.statLabel}>Kilo</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{heightN} cm</Text>
              <Text style={styles.statLabel}>Boy</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{ageN}</Text>
              <Text style={styles.statLabel}>Yaş</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={[styles.statValue, { color: vkiColor }]}>{vki}</Text>
              <Text style={styles.statLabel}>VKİ</Text>
            </View>
          </View>

          {/* Bilgileri Güncelle Butonu */}
          <TouchableOpacity style={styles.editBtn} onPress={() => setModalVisible(true)}>
            <FontAwesome name="pencil" size={14} color="#0A1128" />
            <Text style={styles.editBtnText}>Bilgileri Güncelle</Text>
          </TouchableOpacity>

          {/* VKİ Kartı */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>VKİ — Vücut Kitle İndeksi</Text>
            <View style={styles.vkiBarBg}>
              <View style={[styles.vkiBarFill, { width: `${vkiPct}%` as any, backgroundColor: vkiColor }]} />
              <View style={[styles.vkiMarker, { left: `${vkiPct}%` as any }]} />
            </View>
            <View style={styles.vkiLabels}>
              <Text style={[styles.vkiLabelText, { color: "#60CFFF" }]}>Zayıf{"\n"}&lt;18.5</Text>
              <Text style={[styles.vkiLabelText, { color: "#39FF14" }]}>Normal{"\n"}18.5–25</Text>
              <Text style={[styles.vkiLabelText, { color: "#FFB347" }]}>Fazla{"\n"}25–30</Text>
              <Text style={[styles.vkiLabelText, { color: "#FF4444" }]}>Obez{"\n"}&gt;30</Text>
            </View>
            <Text style={[styles.vkiResult, { color: vkiColor }]}>
              {vki} – {vkiKat}
            </Text>
          </View>

          {/* Metabolizma Kartı */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Metabolizma Hesabı</Text>

            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Text style={styles.metaValue}>{dmh}</Text>
                <Text style={styles.metaLabel}>DMH</Text>
                <Text style={styles.metaSubLabel}>Dinlenme{"\n"}Metabolizma Hızı</Text>
              </View>
              <View style={styles.metaSep} />
              <View style={styles.metaItem}>
                <Text style={styles.metaValue}>{gteh}</Text>
                <Text style={styles.metaLabel}>GTEH</Text>
                <Text style={styles.metaSubLabel}>Günlük Toplam{"\n"}Enerji Harcaması</Text>
              </View>
              <View style={styles.metaSep} />
              <View style={styles.metaItem}>
                <Text style={[styles.metaValue, { color: hedefColor }]}>{hedefKalori}</Text>
                <Text style={styles.metaLabel}>Hedef</Text>
                <Text style={styles.metaSubLabel}>Günlük Kalori{"\n"}Hedefiniz</Text>
              </View>
            </View>

            {/* Otomatik Hedef Pilı */}
            <View style={[styles.hedefPil, { borderColor: hedefColor }]}>
              <FontAwesome name="magic" size={13} color={hedefColor} style={{ marginRight: 6 }} />
              <Text style={[styles.hedefPilText, { color: hedefColor }]}>
                Sistem Önerisi: {hedefEtiketi}
              </Text>
            </View>

            <Text style={styles.hedefAciklama}>{hedefAciklamasi}</Text>
          </View>

          {/* Aktivite Geçmişi */}
          <Text style={styles.sectionTitle}>Son Etkinlik Kayıtları</Text>
          {activityHistory.map((log) => (
            <ActivityLogCard key={log.id} log={log} />
          ))}
        </ScrollView>
      </View>

      {/* Güncelleme Modalı */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Bilgilerini Güncelle</Text>
            <Text style={styles.modalSubtitle}>
              Hedefin VKİ'ne göre otomatik belirlenir.
            </Text>

            <Text style={styles.inputLabel}>İsim</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="örn. Eren"
              placeholderTextColor="#555"
              autoCapitalize="words"
            />

            <Text style={styles.inputLabel}>Yaş</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={age}
              onChangeText={setAge}
              placeholder="örn. 19"
              placeholderTextColor="#555"
            />

            <Text style={styles.inputLabel}>Boy (cm)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={height}
              onChangeText={setHeight}
              placeholder="örn. 178"
              placeholderTextColor="#555"
            />

            <Text style={styles.inputLabel}>Kilo (kg)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
              placeholder="örn. 78.5"
              placeholderTextColor="#555"
            />

            {/* Canlı VKİ önizlemesi */}
            <View style={[styles.previewBox, { borderColor: vkiColor }]}>
              <Text style={[styles.previewVki, { color: vkiColor }]}>VKİ: {vki} — {vkiKat}</Text>
              <Text style={styles.previewHedef}>
                Sistem Önerisi: {hedefEtiketi}  ({hedefKalori} kcal/gün)
              </Text>
            </View>

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveBtnText}>Kaydet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelBtnText}>İptal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background:    { flex: 1, resizeMode: "cover" },
  overlay:       { flex: 1, backgroundColor: "rgba(10, 17, 40, 0.82)" },
  scrollContent: { padding: 20, paddingTop: 60, paddingBottom: 40 },

  header:            { alignItems: "center", marginBottom: 22 },
  avatarPlaceholder: { width: 90, height: 90, borderRadius: 45, backgroundColor: "#D4AF37", justifyContent: "center", alignItems: "center", marginBottom: 12 },
  name:              { fontSize: 26, fontWeight: "bold", color: "#FFF" },
  bio:               { fontSize: 15, color: "#A0A0A0", marginTop: 4 },
  level:             { fontSize: 13, color: "#D4AF37", marginTop: 8, fontWeight: "bold" },

  statsRow:  { flexDirection: "row", justifyContent: "space-between", marginBottom: 14 },
  statBox:   { flex: 1, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 10, padding: 10, alignItems: "center", marginHorizontal: 3 },
  statValue: { fontSize: 16, fontWeight: "bold", color: "#FFF" },
  statLabel: { fontSize: 11, color: "#888", marginTop: 3 },

  editBtn:     { flexDirection: "row", alignItems: "center", alignSelf: "center", backgroundColor: "#D4AF37", borderRadius: 20, paddingVertical: 8, paddingHorizontal: 18, marginBottom: 20, gap: 6 },
  editBtnText: { color: "#0A1128", fontWeight: "bold", fontSize: 14 },

  card:      { backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 14, padding: 18, marginBottom: 18, borderWidth: 1, borderColor: "#1A2138" },
  cardTitle: { fontSize: 16, fontWeight: "bold", color: "#D4AF37", marginBottom: 14 },

  vkiBarBg:     { height: 10, backgroundColor: "#1A2138", borderRadius: 5, overflow: "hidden", marginBottom: 6, position: "relative" },
  vkiBarFill:   { height: "100%", borderRadius: 5 },
  vkiMarker:    { position: "absolute", top: -3, width: 16, height: 16, borderRadius: 8, backgroundColor: "#FFF", borderWidth: 2, borderColor: "#0A1128", marginLeft: -8 },
  vkiLabels:    { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  vkiLabelText: { fontSize: 10, fontWeight: "bold", textAlign: "center" },
  vkiResult:    { fontSize: 20, fontWeight: "bold", textAlign: "center" },

  metaRow:      { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 },
  metaItem:     { flex: 1, alignItems: "center" },
  metaSep:      { width: 1, height: 60, backgroundColor: "#1A2138", alignSelf: "center" },
  metaValue:    { fontSize: 20, fontWeight: "bold", color: "#FFF" },
  metaLabel:    { fontSize: 12, color: "#D4AF37", fontWeight: "bold", marginTop: 3 },
  metaSubLabel: { fontSize: 10, color: "#666", textAlign: "center", marginTop: 3, lineHeight: 13 },

  hedefPil:      { flexDirection: "row", alignItems: "center", borderRadius: 20, paddingVertical: 7, paddingHorizontal: 14, alignSelf: "center", borderWidth: 1, marginBottom: 12 },
  hedefPilText:  { fontWeight: "bold", fontSize: 13 },
  hedefAciklama: { fontSize: 12, color: "#888", textAlign: "center", lineHeight: 18 },

  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#FFF", marginBottom: 16 },
  logCard:      { flexDirection: "row", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 15, marginBottom: 14, borderWidth: 1, borderColor: "#1A2138" },
  iconBox:      { width: 40, height: 40, borderRadius: 20, backgroundColor: "#D4AF37", justifyContent: "center", alignItems: "center", marginRight: 14 },
  logTextContainer: { flex: 1 },
  logTitle:     { fontSize: 15, fontWeight: "bold", color: "#FFF", marginBottom: 3 },
  logDesc:      { fontSize: 13, color: "#CCC", lineHeight: 19, marginBottom: 6 },
  logTime:      { fontSize: 12, color: "#888", fontStyle: "italic" },

  // Modal
  modalOverlay:  { flex: 1, backgroundColor: "rgba(0,0,0,0.78)", justifyContent: "flex-end" },
  modalBox:      { backgroundColor: "#0D1530", borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 28, paddingBottom: 44 },
  modalTitle:    { fontSize: 20, fontWeight: "bold", color: "#FFF", marginBottom: 4, textAlign: "center" },
  modalSubtitle: { fontSize: 12, color: "#888", textAlign: "center", marginBottom: 16 },
  inputLabel:    { fontSize: 13, color: "#A0A0A0", marginBottom: 6, marginTop: 12 },
  input:         { backgroundColor: "#1A2138", color: "#FFF", borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, fontSize: 16, borderWidth: 1, borderColor: "#2A3350" },
  previewBox:    { borderRadius: 10, padding: 12, marginTop: 16, borderWidth: 1, alignItems: "center" },
  previewVki:    { fontSize: 15, fontWeight: "bold", marginBottom: 4 },
  previewHedef:  { fontSize: 12, color: "#CCC" },
  saveBtn:       { backgroundColor: "#D4AF37", borderRadius: 12, paddingVertical: 14, alignItems: "center", marginTop: 18 },
  saveBtnText:   { color: "#0A1128", fontWeight: "bold", fontSize: 16 },
  cancelBtn:     { paddingVertical: 12, alignItems: "center", marginTop: 6 },
  cancelBtnText: { color: "#888", fontSize: 14 },
});
