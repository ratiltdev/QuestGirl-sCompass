import { Pipe, PipeTransform } from '@angular/core';
import { Category, Term } from './quest';

@Pipe({ name: 'categoryIconURL' })
export class CategoryIconURLPipe implements PipeTransform {

  /**
   * カテゴリアイコンのURLに変換します
   * @param category
   */
  transform(category: Category): string {
    return './assets/icon/' + Category[category] + '.png';
  }
}

@Pipe({ name: 'termIconURL' })
export class TermIconURLPipe implements PipeTransform {

  /**
   * カテゴリアイコンのURLに変換します
   * @param term
   */
  transform(term: Term): string {
    return './assets/icon/' + Term[term] + '.png';
  }
}

@Pipe({ name: 'compositionBannerURL' })
export class CompositionBannerURLPipe implements PipeTransform {

  /**
   * 編成指定艦娘バナーのURLに変換します
   * @param composition
   */
  transform(composition: string): string[] {
    const reg: RegExp = new RegExp(/\[([^\[\]\s　]+)\]/g);
    let array: RegExpExecArray;
    const urlList: string[] = new Array();
    while (array = reg.exec(composition)) {
      urlList.push('./assets/ship/' + array[1] + '.png');
    }
    return urlList.length > 0 ? urlList : null;
  }
}

@Pipe({ name: 'compositionName' })
export class CompositionNamePipe implements PipeTransform {

  /**
   * 編成指定艦名に変換します
   * @param composition
   */
  transform(composition: string): string {
    const reg: RegExp = new RegExp(/\[([^\[\]\s　]+)\]/g);
    return composition.replace(reg, '');
  }
}

@Pipe({ name: 'bonusItemClass' })
export class BonusItemClassPipe implements PipeTransform {

  /**
   * 報酬アイテムアイコンのClass名に変換します
   * @param bonusItem
   */
  transform(bonusItem: string): string {
    const reg: RegExp = new RegExp(/\[([^\[\]\s　]+)\]/g);
    const array: RegExpExecArray = reg.exec(bonusItem);
    if (array == null) {
      return undefined;
    }
    const category: string = array[1].substring(0, 1);
    switch (category) {
      case 'c':
        return 'card';
      case 'f':
        return 'furniture';
      case 'i':
        return 'item';
      case 's':
        return 'ship';
      case 'w':
        return 'weapon';
    }
  }
}

@Pipe({ name: 'bonusItemIconURL' })
export class BonusItemIconURLPipe implements PipeTransform {

  /**
   * 報酬アイテムアイコンのURLに変換します
   * @param bonusItem
   */
  transform(bonusItem: string): string {
    const reg: RegExp = new RegExp(/\[([^\[\]\s　]+)\]/g);
    const array: RegExpExecArray = reg.exec(bonusItem);
    if (array == null) {
      return undefined;
    }
    let category: string = array[1].substring(0, 1);
    switch (category) {
      case 'c':
      case 'i':
        category = 'item/';
        break;
      case 'f':
        category = 'furniture/'
        break;
      case 's':
        category = 'ship/';
        break;
      case 'w':
        category = 'weapon/';
        break;
    }
    const url: string = './assets/' + category + array[1] + '.png';
    return url;
  }
}

@Pipe({ name: 'bonusItemName' })
export class BonusItemNamePipe implements PipeTransform {

  /**
   * 報酬アイテム名に変換します
   * @param bonusItem
   */
  transform(bonusItem: string): string {
    const reg: RegExp = new RegExp(/\[([^\[\]\s　]+)\]|★\+[0-9]|×[0-9]+/g);
    return bonusItem.replace(reg, '');
  }
}

@Pipe({ name: 'bonusItemImprovement' })
export class BonusItemImprovementPipe implements PipeTransform {

  /**
   * 報酬アイテムの改修値に変換します
   * @param bonusItem
   */
  transform(bonusItem: string): string {
    const reg: RegExp = new RegExp(/★\+[0-9]/g);
    const array: RegExpExecArray = reg.exec(bonusItem);
    if (array == null) {
      return null;
    }
    else {
      return array[0];
    }
  }
}

@Pipe({ name: 'bonusItemQuantity' })
export class BonusItemQuantityPipe implements PipeTransform {

  /**
   * 報酬アイテムの個数に変換します
   * @param bonusItem
   */
  transform(bonusItem: string): string {
    const reg: RegExp = new RegExp(/×[0-9]+/g);
    const array: RegExpExecArray = reg.exec(bonusItem);
    if (array == null) {
      return null;
    }
    else {
      return array[0].replace('×', '');
    }
  }
}