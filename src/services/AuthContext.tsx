// ============================================================
// src/context/AuthContext.tsx
// Basit auth sistemi — AsyncStorage ile local kayıt.
// Veritabanı yok, sunucu yok. Tüm kullanıcılar telefonda saklanır.
// ============================================================

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

// ---- Tipler ----
interface StoredUser {
  username: string;
  password: string; // plain text — basit uygulama için yeterli
}

interface AuthContextType {
  isLoggedIn: boolean;
  currentUser: string | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

// ---- Context ----
const AuthContext = createContext<AuthContextType | null>(null);

const USERS_KEY = "gym_app_users";        // tüm kayıtlı kullanıcılar
const SESSION_KEY = "gym_app_session";    // aktif oturum

// ---- Provider ----
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Uygulama açılınca oturumu kontrol et
  useEffect(() => {
    (async () => {
      try {
        const session = await AsyncStorage.getItem(SESSION_KEY);
        if (session) {
          setCurrentUser(session);
          setIsLoggedIn(true);
        }
      } catch (_) {}
      setIsLoading(false);
    })();
  }, []);

  // Kayıtlı kullanıcıları getir
  const getUsers = async (): Promise<StoredUser[]> => {
    try {
      const raw = await AsyncStorage.getItem(USERS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  // Kayıt ol
  const register = useCallback(async (username: string, password: string) => {
    const trimUser = username.trim();
    const trimPass = password.trim();

    if (!trimUser || !trimPass) {
      return { success: false, error: "Kullanıcı adı ve şifre boş olamaz." };
    }
    if (trimUser.length < 3) {
      return { success: false, error: "Kullanıcı adı en az 3 karakter olmalı." };
    }
    if (trimPass.length < 4) {
      return { success: false, error: "Şifre en az 4 karakter olmalı." };
    }

    const users = await getUsers();
    const exists = users.some(
      (u) => u.username.toLowerCase() === trimUser.toLowerCase()
    );
    if (exists) {
      return { success: false, error: "Bu kullanıcı adı zaten alınmış." };
    }

    const newUser: StoredUser = { username: trimUser, password: trimPass };
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    await AsyncStorage.setItem(SESSION_KEY, trimUser);
    setCurrentUser(trimUser);
    setIsLoggedIn(true);
    return { success: true };
  }, []);

  // Giriş yap
  const login = useCallback(async (username: string, password: string) => {
    const trimUser = username.trim();
    const trimPass = password.trim();

    if (!trimUser || !trimPass) {
      return { success: false, error: "Kullanıcı adı ve şifre boş olamaz." };
    }

    const users = await getUsers();
    const user = users.find(
      (u) =>
        u.username.toLowerCase() === trimUser.toLowerCase() &&
        u.password === trimPass
    );

    if (!user) {
      return { success: false, error: "Kullanıcı adı veya şifre hatalı." };
    }

    await AsyncStorage.setItem(SESSION_KEY, user.username);
    setCurrentUser(user.username);
    setIsLoggedIn(true);
    return { success: true };
  }, []);

  // Çıkış yap
  const logout = useCallback(async () => {
    await AsyncStorage.removeItem(SESSION_KEY);
    setCurrentUser(null);
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ---- Hook ----
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
