import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Quest } from '../../define/quest';
import { QuestService } from '../../service/quest.service';

import { fadeInList } from '../../define/animation';
import { PinUtilities } from '../../utilities/pin';

/**
 * 任務リスト
 */
@Component({
  selector: 'quest-list',
  templateUrl: './list.component.html',
  animations: [fadeInList],
  host: { '[@fadeInList]': '' }
})
export class ListComponent implements OnInit {

  questList: Quest[];
  selectedQuest: Quest;

  /**
   * Constructor
   * @param questService
   * @param route
   * @param router
   */
  constructor(protected questService: QuestService, protected route: ActivatedRoute, protected router: Router) { }
  
  /**
   * 任務データを取得します
   */
  getQuests(): void {
      this.questService.getQuests()
          .subscribe(questList => this.questList = questList);
  }
  /**
   * 初期化します
   */
  ngOnInit(): void {
      this.getQuests();
  }
  /**
   * 任務詳細を表示します
   * @param quest
   */
  viewDetail(quest: Quest): void {
      this.selectedQuest = quest;
      this.router.navigate([quest.ID], { relativeTo: this.route });
  }
}

/**
 * ピン留め任務リスト
 */
@Component({
  selector: 'quest-list',
  templateUrl: './list.component.html',
  animations: [fadeInList],
  host: { '[@fadeInList]': '' }
})
export class PinComponent extends ListComponent {

  questList: Quest[];
  selectedQuest: Quest;

  /**
   * Constructor
   * @param questService
   * @param route
   * @param router
   */
  constructor(questService: QuestService, route: ActivatedRoute, router: Router) {
      super(questService, route, router);
  }

  /**
   * 任務データを取得します
   */
  getQuests(): void {
      this.questService.getPinQuests(PinUtilities.getPinIDString())
          .subscribe(questList => this.questList = questList);
  }
}

/**
 * デイリー任務リスト
 */
@Component({
  selector: 'quest-list',
  templateUrl: './list.component.html',
  animations: [fadeInList],
  host: { '[@fadeInList]': '' }
})
export class DailyComponent extends ListComponent {

  questList: Quest[];
  selectedQuest: Quest;

  /**
   * Constructor
   * @param questService
   * @param route
   * @param router
   */
  constructor(questService: QuestService, route: ActivatedRoute, router: Router) {
      super(questService, route, router);
  }

  /**
   * 任務データを取得します
   */
  getQuests(): void {
      this.questService.getDailyQuests()
          .subscribe(questList => this.questList = questList);
  }
}

/**
 * ウィークリー任務リスト
 */
@Component({
  selector: 'quest-list',
  templateUrl: './list.component.html',
  animations: [fadeInList],
  host: { '[@fadeInList]': '' }
})
export class WeeklyComponent extends ListComponent {

  questList: Quest[];
  selectedQuest: Quest;

  /**
   * Constructor
   * @param questService
   * @param route
   * @param router
   */
  constructor(questService: QuestService, route: ActivatedRoute, router: Router) {
      super(questService, route, router);
  }

  /**
   * 任務データを取得します
   */
  getQuests(): void {
      this.questService.getWeeklyQuests()
          .subscribe(questList => this.questList = questList);
  }
}

/**
 * マンスリー任務リスト
 */
@Component({
  selector: 'quest-list',
  templateUrl: './list.component.html',
  animations: [fadeInList],
  host: { '[@fadeInList]': '' }
})
export class MonthlyComponent extends ListComponent {

  questList: Quest[];
  selectedQuest: Quest;

  /**
   * Constructor
   * @param questService
   * @param route
   * @param router
   */
  constructor(questService: QuestService, route: ActivatedRoute, router: Router) {
      super(questService, route, router);
  }

  /**
   * 任務データを取得します
   */
  getQuests(): void {
      this.questService.getMonthlyQuests()
          .subscribe(questList => this.questList = questList);
  }
}

/**
 * その他任務リスト
 */
@Component({
  selector: 'quest-list',
  templateUrl: './list.component.html',
  animations: [fadeInList],
  host: { '[@fadeInList]': '' }
})
export class OthersComponent extends ListComponent {

  questList: Quest[];
  selectedQuest: Quest;

  /**
   * Constructor
   * @param questService
   * @param route
   * @param router
   */
  constructor(questService: QuestService, route: ActivatedRoute, router: Router) {
      super(questService, route, router);
  }

  /**
   * 任務データを取得します
   */
  getQuests(): void {
      this.questService.getOthersQuests()
          .subscribe(questList => this.questList = questList);
  }
}

/**
 * イヤーリー任務リスト
 */
@Component({
  selector: 'quest-list',
  templateUrl: './list.component.html',
  animations: [fadeInList],
  host: { '[@fadeInList]': '' }
})
export class YearlyComponent extends ListComponent {

  questList: Quest[];
  selectedQuest: Quest;

  /**
   * Constructor
   * @param questService
   * @param route
   * @param router
   */
  constructor(questService: QuestService, route: ActivatedRoute, router: Router) {
      super(questService, route, router);
  }

  /**
   * 任務データを取得します
   */
  getQuests(): void {
      this.questService.getYearlyQuests()
          .subscribe(questList => this.questList = questList);
  }
}

/**
 * 検索結果リスト
 */
@Component({
  selector: 'quest-list',
  templateUrl: './list.component.html',
  animations: [fadeInList],
  host: { '[@fadeInList]': '' }
})
export class SearchComponent extends ListComponent {

  questList: Quest[];
  selectedQuest: Quest;

  /**
   * Constructor
   * @param questService
   * @param route
   * @param router
   */
  constructor(questService: QuestService, route: ActivatedRoute, router: Router) {
      super(questService, route, router);
  }

  /**
   * 初期化します
   */
  ngOnInit(): void {
      this.route.params.forEach((params: Params) => {
          const keyword: string = params['keyword'];
          this.searchQuests(keyword);
      });
  }

  /**
   * 任務データを検索します
   */
  searchQuests(keyword: string): void {
      this.questService.searchQuest(keyword)
          .subscribe(questList => this.questList = questList);
  }
}