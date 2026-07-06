import { STORAGE_KEYS } from "../constants";
import type { SavedIdea, UsageStats } from "../types";

const DEFAULT_STATS: UsageStats = {
  generatedCount: 0,
  savedCount: 0,
};

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (raw) {
      return JSON.parse(raw) as T;
    }
  } catch {
  }

  try {
    const raw = window.sessionStorage.getItem(key);
    if (raw) {
      return JSON.parse(raw) as T;
    }
  } catch {
  }

  try {
    const raw = readCookie(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return;
  }

  const serialized = JSON.stringify(value);

  try {
    window.localStorage.setItem(key, serialized);
  } catch {
  }

  try {
    window.sessionStorage.setItem(key, serialized);
  } catch {
  }

  writeCookie(key, serialized);
}

function cookieName(key: string) {
  return key.replace(/[^a-zA-Z0-9_-]/g, "_");
}

function readCookie(key: string) {
  const name = `${cookieName(key)}=`;
  const raw = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(name))
    ?.slice(name.length);

  return raw ? decodeURIComponent(raw) : undefined;
}

function writeCookie(key: string, value: string) {
  document.cookie = `${cookieName(key)}=${encodeURIComponent(value)}; path=/; max-age=31536000; SameSite=Lax`;
}

export function getSavedIdeas(): SavedIdea[] {
  return readJson<SavedIdea[]>(STORAGE_KEYS.savedIdeas, []).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function getSavedIdea(id: string): SavedIdea | undefined {
  return getSavedIdeas().find((idea) => idea.id === id);
}

export async function loadSavedIdeas(): Promise<SavedIdea[]> {
  return getSavedIdeas();
}

export async function loadSavedIdea(id: string): Promise<SavedIdea | undefined> {
  return (await loadSavedIdeas()).find((idea) => idea.id === id);
}

export async function saveIdea(idea: SavedIdea) {
  const existing = getSavedIdeas().filter((item) => item.id !== idea.id);
  writeJson(STORAGE_KEYS.savedIdeas, [idea, ...existing]);
  syncSavedCount();
}

export async function deleteIdea(id: string) {
  writeJson(
    STORAGE_KEYS.savedIdeas,
    getSavedIdeas().filter((idea) => idea.id !== id),
  );
  syncSavedCount();
}

export function getUsageStats(): UsageStats {
  return readJson<UsageStats>(STORAGE_KEYS.usageStats, DEFAULT_STATS);
}

export function incrementGeneratedCount() {
  const current = getUsageStats();
  writeJson(STORAGE_KEYS.usageStats, {
    ...current,
    generatedCount: current.generatedCount + 1,
    lastGeneratedAt: new Date().toISOString(),
  });
}

function syncSavedCount() {
  const current = getUsageStats();
  writeJson(STORAGE_KEYS.usageStats, {
    ...current,
    savedCount: getSavedIdeas().length,
  });
}
