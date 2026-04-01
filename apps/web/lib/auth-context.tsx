'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  loading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const TOKEN_KEY = 'portecos_access_token';
const REFRESH_KEY = 'portecos_refresh_token';
const USER_KEY = 'portecos_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    tokens: null,
    loading: true,
  });

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const accessToken = localStorage.getItem(TOKEN_KEY);
      const refreshTokenVal = localStorage.getItem(REFRESH_KEY);
      const userJson = localStorage.getItem(USER_KEY);

      if (accessToken && refreshTokenVal && userJson) {
        const user: User = JSON.parse(userJson);
        setState({
          user,
          tokens: { accessToken, refreshToken: refreshTokenVal },
          loading: false,
        });
      } else {
        setState((s) => ({ ...s, loading: false }));
      }
    } catch {
      setState((s) => ({ ...s, loading: false }));
    }
  }, []);

  const saveSession = useCallback((user: User, tokens: AuthTokens) => {
    localStorage.setItem(TOKEN_KEY, tokens.accessToken);
    localStorage.setItem(REFRESH_KEY, tokens.refreshToken);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    setState({ user, tokens, loading: false });
  }, []);

  const clearSession = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USER_KEY);
    setState({ user: null, tokens: null, loading: false });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const body = await res.json();
    if (!res.ok) {
      throw new Error(body.error ?? 'Erro ao iniciar sessão');
    }

    saveSession(body.data.user, {
      accessToken: body.data.accessToken,
      refreshToken: body.data.refreshToken,
    });
  }, [saveSession]);

  const register = useCallback(async (email: string, password: string, name: string) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });

    const body = await res.json();
    if (!res.ok) {
      throw new Error(body.error ?? 'Erro ao criar conta');
    }

    saveSession(body.data.user, {
      accessToken: body.data.accessToken,
      refreshToken: body.data.refreshToken,
    });
  }, [saveSession]);

  const logout = useCallback(() => {
    clearSession();
  }, [clearSession]);

  const refreshToken = useCallback(async () => {
    const storedRefresh = localStorage.getItem(REFRESH_KEY);
    if (!storedRefresh) return;

    const res = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: storedRefresh }),
    });

    const body = await res.json();
    if (!res.ok) {
      clearSession();
      return;
    }

    const { accessToken, refreshToken: newRefresh } = body.data;
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_KEY, newRefresh);
    setState((s) => ({
      ...s,
      tokens: { accessToken, refreshToken: newRefresh },
    }));
  }, [clearSession]);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return ctx;
}
