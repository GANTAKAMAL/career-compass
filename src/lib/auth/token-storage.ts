/**
 * Token storage abstraction.
 *
 * The Spring Boot backend will issue the token; this module is the only place
 * the frontend reads or writes it, so swapping the storage strategy later
 * (cookies, memory, refresh tokens) does not touch the UI.
 */

const TOKEN_KEY = "cdip.auth.token";
const USER_KEY = "cdip.auth.user";

export interface AuthUser {
  id?: string;
  fullName: string;
  email: string;
}

const isBrowser = () => typeof window !== "undefined";

export const tokenStorage = {
  getToken(): string | null {
    if (!isBrowser()) return null;
    try {
      return window.localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  setToken(token: string) {
    if (!isBrowser()) return;
    try {
      window.localStorage.setItem(TOKEN_KEY, token);
    } catch {
      /* storage unavailable */
    }
  },
  getUser(): AuthUser | null {
    if (!isBrowser()) return null;
    try {
      const raw = window.localStorage.getItem(USER_KEY);
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  },
  setUser(user: AuthUser) {
    if (!isBrowser()) return;
    try {
      window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch {
      /* storage unavailable */
    }
  },
  clear() {
    if (!isBrowser()) return;
    try {
      window.localStorage.removeItem(TOKEN_KEY);
      window.localStorage.removeItem(USER_KEY);
    } catch {
      /* storage unavailable */
    }
  },
};
