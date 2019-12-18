/**
 * atomのsnippetルールに合わせて調整する
 */
export function adjuster(str: string): string {
  const replacer = new Replacer(str);
  return replacer.getStr();
}

class Replacer {
  private str!: string;
  private index: number = 1;

  constructor(str: string) {
    this.str = str;
    this.setIndex();
  }

  /**
   * すでに${1...}や${2...}があればindexを進める
   */
  private setIndex(): void {
    const reg: RegExp = new RegExp(/\$\{([1-9])/, "g");
    let xArray: RegExpExecArray;
    while ((xArray = reg.exec(this.str))) {
      this.index = Math.max(1, this.index, 1 + +xArray[1]);
    }
  }

  /**
   * 取得
   */
  public getStr(): string {
    // ${...}を置換
    this.valiable();
    // すでにある$1を置換
    this.number();
    // 選択式を変換
    this.selectable();
    return this.str;
  }

  /**
   * ${...}を番号付きに置換
   */
  private valiable(): void {
    const reg: RegExp = new RegExp(/(\$\{[^\d].*?\})/);
    const match = reg.exec(this.str);
    if (match) {
      this.replaceAll(match[1], "${" + this.index + ":" + match[1].substr(2));
      this.index++;
      this.valiable();
    }
  }

  /**
   * $1や$2をindex番号に振り直し
   */
  private number(): void {
    const reg: RegExp = new RegExp(/(\$[1-9])/);
    const match = reg.exec(this.str);
    if (match) {
      this.replaceAll(match[1], "$" + this.index);
      this.index++;
      this.valiable();
    }
  }

  /**
   * 選択式の変換
   * ${1|...|}や${1:|...}を${1:...}に変換する
   */
  private selectable(): void {
    const reg: RegExp = new RegExp(/(\$\{[1-9]:?\|.+?\|\})/);
    const match = reg.exec(this.str);
    if (match) {
      this.replaceAll(
        match[1],
        match[1].replace(/:?\|/, ":").replace(/\|/, "")
      );
      this.selectable();
    }
  }

  /**
   * 全置換
   */
  private replaceAll(strBefore: string, strAfter: string): void {
    this.str = this.str.split(strBefore).join(strAfter);
  }
}
