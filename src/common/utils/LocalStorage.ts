export class LocalStorage {
  static set<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  }

  static remove(key: string) {
    localStorage.removeItem(key);
  }
}
