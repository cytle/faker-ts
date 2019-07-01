export enum Type {
  b,
  a = 'hahah',
}

export interface IProps {
  /**
   * @default 1
   * @minimum 1
   * @maximum 4
   * @type integer
   */
  num: number;
  /**
   * @examples ["#FFF", "#122"]
   */
  color: string;
  /**
   * @examples ["hello", "world"]
   */
  title: string;
  /**
   * @description 类型
   * @default Type.a
   */
  type: 'a' | '12' | Type;
}

export interface IFoo {
  pp: IProps;
  a: 123;
}
