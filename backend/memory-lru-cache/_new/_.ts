export class NewMemoryLRUCache {
  private static store: Map<string, any> = new Map();
  private static maxSize: number = 3;

  static set(key: string, value: any): void {
    if (this.store.has(key)) {
      this.store.delete(key);
    }
    this.store.set(key, value);
    if (this.store.size > this.maxSize) {
      const oldestKey = this.store.keys().next().value;
      this.store.delete(oldestKey);
    }
  }

  static get(key: string): any | undefined {
    return this.store.get(key);
  }

  static delete(key: string): void {
    this.store.delete(key);
  }

  static clear(): void {
    this.store.clear();
  }

  static configure(maxSize: number): void {
    this.maxSize = maxSize;
  }

}