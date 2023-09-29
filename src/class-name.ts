export class ClassName {
  classNames: string[] = [];

  constructor(classNames: string[] = []) {
    this.classNames = classNames;
  }

  /** 
   * Returns a string of all the class names separated by spaces.
   */
  raw(): string {
    return this.classNames.join(' ');
  }

  /** Add one or more class names */
  add(...classNames: string[]): ClassName {
    for (const cn of classNames) {
      if (!this.has(cn)) {
        this.classNames.push(cn);
      }
    }

    return this;
  }

  /** Remove one or more class names */
  remove(...classNames: string[]): ClassName {
    for (const cn of classNames) {
      if (!this.has(cn)) return this;

      const index = this.classNames.indexOf(cn);
      this.classNames.splice(index, 1);
    }

    return this;
  }

  /** Check if a class name is present. */
  has(str: string): boolean {
    return this.classNames.includes(str);
  }
}
