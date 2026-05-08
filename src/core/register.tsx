// ============================================================
// app/register.tsx
// Kayıt ekranı — AuthContext.register() kullanır.
// İsim, Boy ve Kilo bilgilerini alarak profileData'yı günceller.
// ============================================================

import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { useAuth } from "../services/AuthContext";
import { updateUserProfile } from "../data/profileData"; // Profil güncelleme fonksiyonu

export default function RegisterScreen() {
  const { register } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [height, setHeight] = useState(""); // Boy state'i
  const [weight, setWeight] = useState(""); // Kilo state'i
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError("");

    // Temel Kontroller
    if (!username || !password || !height || !weight) {
      setError("Lütfen tüm alanları doldur kanka!");
      return;
    }

    if (password !== confirmPass) {
      setError("Şifreler eşleşmiyor.");
      return;
    }

    setLoading(true);

    // 1. Önce verileri profileData'ya kaydet (İsim olarak kullanıcı adını kullanıyoruz)
    try {
      updateUserProfile(username, 20, parseFloat(height), parseFloat(weight));
    } catch (e) {
      console.log("Profil güncellenirken hata oluştu, ama devam ediliyor.");
    }

    // 2. Auth sistemine kayıt yap
    const result = await register(username, password);
    setLoading(false);

    if (!result.success) {
      setError(result.error ?? "Kayıt başarısız.");
    }
    // Başarılıysa RootLayout içindeki AuthGate otomatik / (tabs) içine yönlendirir.
  };

  return (
    <ImageBackground
      source={require("../../assets/images/ana_menu_bg.png")}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
            {/* Logo / Başlık */}
            <View style={styles.header}>
              <Text style={styles.logo}>🏋️</Text>
              <Text style={styles.title}>Hesap Oluştur</Text>
              <Text style={styles.subtitle}>Bilgilerini gir ve FitLife dünyasına katıl.</Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              {/* Kullanıcı adı (İsim) */}
              <View style={styles.inputWrapper}>
                <FontAwesome name="user" size={16} color="#D4AF37" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Kullanıcı Adı / İsmin"
                  placeholderTextColor="#555"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="words"
                />
              </View>

              {/* Boy ve Kilo (Yan yana) */}
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <View style={[styles.inputWrapper, { flex: 1 }]}>
                  <FontAwesome name="arrows-v" size={16} color="#D4AF37" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Boy (cm)"
                    placeholderTextColor="#555"
                    value={height}
                    onChangeText={setHeight}
                    keyboardType="numeric"
                  />
                </View>
                <View style={[styles.inputWrapper, { flex: 1 }]}>
                  <FontAwesome name="dashboard" size={16} color="#D4AF37" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Kilo (kg)"
                    placeholderTextColor="#555"
                    value={weight}
                    onChangeText={setWeight}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              {/* Şifre */}
              <View style={styles.inputWrapper}>
                <FontAwesome name="lock" size={16} color="#D4AF37" style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Şifre"
                  placeholderTextColor="#555"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPass}
                />
                <TouchableOpacity onPress={() => setShowPass(!showPass)} style={styles.eyeBtn}>
                  <FontAwesome name={showPass ? "eye-slash" : "eye"} size={16} color="#555" />
                </TouchableOpacity>
              </View>

              {/* Şifre tekrar */}
              <View style={styles.inputWrapper}>
                <FontAwesome name="check-circle" size={16} color="#D4AF37" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Şifreyi Tekrar Gir"
                  placeholderTextColor="#555"
                  value={confirmPass}
                  onChangeText={setConfirmPass}
                  secureTextEntry={!showPass}
                />
              </View>

              {/* Hata mesajı */}
              {!!error && (
                <View style={styles.errorBox}>
                  <FontAwesome name="exclamation-circle" size={13} color="#FF4444" />
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}

              {/* Kayıt butonu */}
              <TouchableOpacity
                style={styles.btn}
                onPress={handleRegister}
                activeOpacity={0.8}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#0A1128" />
                ) : (
                  <Text style={styles.btnText}>Kaydı Tamamla</Text>
                )}
              </TouchableOpacity>

              {/* Giriş linki */}
              <View style={styles.switchRow}>
                <Text style={styles.switchText}>Zaten hesabın var mı? </Text>
                <TouchableOpacity onPress={() => router.back()}>
                  <Text style={styles.switchLink}>Giriş Yap</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: { flex: 1, backgroundColor: "rgba(10,17,40,0.82)" },
  container: { flex: 1, padding: 28 },

  header: { alignItems: "center", marginBottom: 30, marginTop: 40 },
  logo: { fontSize: 56, marginBottom: 12 },
  title: { fontSize: 28, fontWeight: "bold", color: "#FFF", marginBottom: 6 },
  subtitle: { fontSize: 14, color: "#888", textAlign: "center" },

  form: { gap: 14, marginBottom: 40 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1A2138",
    paddingHorizontal: 14,
    height: 52,
  },
  inputIcon: { marginRight: 10, width: 20, textAlign: 'center' },
  input: { flex: 1, color: "#FFF", fontSize: 15 },
  eyeBtn: { padding: 4 },

  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: "rgba(255,68,68,0.12)",
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "rgba(255,68,68,0.3)",
  },
  errorText: { color: "#FF4444", fontSize: 13 },

  btn: {
    backgroundColor: "#D4AF37",
    borderRadius: 12,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  btnText: { color: "#0A1128", fontWeight: "bold", fontSize: 16 },

  switchRow: { flexDirection: "row", justifyContent: "center", marginTop: 8 },
  switchText: { color: "#666", fontSize: 14 },
  switchLink: { color: "#D4AF37", fontWeight: "bold", fontSize: 14 },
});