/**
 * ピン留めユーティリティ
 */
export class PinUtilities {

  /**
   * 当該任務がピン留め済かを判定します
   * @param questID 
   */
  static isPinned(questID: string): boolean {
    return this.getPinList().some(pinID => pinID == questID);
  }

  /**
   * ピン留めします
   * @param questID 
   */
  static addID(questID: string): void {
    const pinList: string[] = this.getPinList();
    pinList.push(questID);
    localStorage.setItem(this.key, JSON.stringify(pinList));
    return;
  }

  /**
   * ピン留めを解除します
   * @param questID 
   */
  static removeID(questID: string): void {
    const pinList: string[] = this.getPinList().filter(pinID => pinID != questID);
    localStorage.setItem(this.key, JSON.stringify(pinList));
    return;
  }
  
  /**
   * 検索用ID文字列を取得します
   */
  static getPinIDString(): string {
    return this.getPinList().join("+");
  }

  /**
   * ピン留めリストを取得します
   */
  private static getPinList(): string[] {
    return (localStorage.getItem(this.key) != null) ? JSON.parse(localStorage.getItem(this.key)) : [];
  }

  /**
   * ストレージ保存キーを取得します
   */
  private static get key(): string {
    return "pinList";
  }
}