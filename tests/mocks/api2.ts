export enum Type {
  b,
  a = 'hahah',
}

export enum Type2 {
  b,
  a = 'hahah',
}

export interface IProps {
  /**
   * @minimum 1
   * @maximum 4
   * @type integer
   */
  num: number;
  /**
   * @examples ["hello", "world"]
   */
  title: string;
  /**
   * @description 类型
   */
  type: 'a' | '12' | Type;
}
