export class ClassName {
  classNames: string[] = [];

  constructor(classNames: string[] = []) {
    this.classNames = classNames;
  }

  raw(): string {
    return this.classNames.join(' ');
  }

  add(...classNames: string[]): ClassName {
    for (const cn of classNames) {
      if (!this.has(cn)) {
        this.classNames.push(cn);
      }
    }

    return this;
  }

  remove(...classNames: string[]): ClassName {
    for (const cn of classNames) {
      if (!this.has(cn)) return this;

      const index = this.classNames.indexOf(cn);
      this.classNames.splice(index, 1);
    }

    return this;
  }

  has(str: string): boolean {
    return this.classNames.includes(str);
  }
}
