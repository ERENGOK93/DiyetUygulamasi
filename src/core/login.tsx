// ============================================================
// app/login.tsx
// Giriş ekranı — AuthContext.login() kullanır.
// ============================================================
import { useAuth } from "../services/AuthContext";
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
} from "react-native";

export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    const result = await login(username, password);
    setLoading(false);
    if (!result.success) {
      setError(result.error ?? "Giriş başarısız.");
    }
    // Başarılıysa RootLayout otomatik yönlendirir (isLoggedIn değişir)
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
          {/* Logo / Başlık */}
          <View style={styles.header}>
            <Text style={styles.logo}>💪</Text>
            <Text style={styles.title}>Tekrar Hoş Geldin</Text>
            <Text style={styles.subtitle}>Hesabına giriş yap ve antrenmanına başla.</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Kullanıcı adı */}
            <View style={styles.inputWrapper}>
              <FontAwesome name="user" size={16} color="#D4AF37" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Kullanıcı Adı"
                placeholderTextColor="#555"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
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

            {/* Hata mesajı */}
            {!!error && (
              <View style={styles.errorBox}>
                <FontAwesome name="exclamation-circle" size={13} color="#FF4444" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            {/* Giriş butonu */}
            <TouchableOpacity
              style={styles.btn}
              onPress={handleLogin}
              activeOpacity={0.8}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#0A1128" />
              ) : (
                <Text style={styles.btnText}>Giriş Yap</Text>
              )}
            </TouchableOpacity>

            {/* Kayıt ol linki */}
            <View style={styles.switchRow}>
              <Text style={styles.switchText}>Hesabın yok mu? </Text>
              <TouchableOpacity onPress={() => router.push("/register" as any)}>
                <Text style={styles.switchLink}>Kayıt Ol</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: { flex: 1, backgroundColor: "rgba(10,17,40,0.82)" },
  container: { flex: 1, justifyContent: "center", padding: 28 },

  header: { alignItems: "center", marginBottom: 40 },
  logo: { fontSize: 56, marginBottom: 12 },
  title: { fontSize: 28, fontWeight: "bold", color: "#FFF", marginBottom: 6 },
  subtitle: { fontSize: 14, color: "#888", textAlign: "center" },

  form: { gap: 14 },
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
  inputIcon: { marginRight: 10 },
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
