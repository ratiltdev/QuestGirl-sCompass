import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Quest, QuestComposite } from '../../define/quest';
import { QuestService } from '../../service/quest.service';

import { fadeInDetail } from '../../define/animation';
import { PinUtilities } from '../../utilities/pin';

/**
 * 任務詳細（非表示）
 */
@Component({
  selector: 'quest-detail',
  template: ''
})
export class NullComponent {

  constructor() { }

}

/**
 * 任務詳細
 */
@Component({
  selector: 'quest-detail',
  templateUrl: './detail.component.html',
  animations: [fadeInDetail],
  host: { '[@fadeInDetail]': '' }
})
export class DetailComponent implements OnInit {

  quest: QuestComposite;
  unlocks: Quest[];
  isOpen: boolean;
  isPinned: boolean;

  /**
   * Constructor
   * @param questService
   * @param route
   * @param router
   */
  constructor(private questService: QuestService, private route: ActivatedRoute, private router: Router) { }
  
  /**
   * 初期化します
   */
  ngOnInit(): void {
    this.isOpen = false;
    this.route.params.forEach((params: Params) => {
      const id: string = params['id'];
      this.questService.getQuestDetail(id)
        .subscribe(quest => this.quest = quest);
      this.isPinned = PinUtilities.isPinned(id);
    });
  }
  /**
   * 詳細を非表示にします
   */
  hideDetail(): void {
    this.quest = null;
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  /**
   * ピン留めの状態を切り替えます
   */
  switchPin(): void {
    this.isPinned = !this.isPinned;
    this.isPinned ? PinUtilities.addID(this.quest.ID) : PinUtilities.removeID(this.quest.ID);
  }
  /**
   * 開放任務一覧を表示します
   */
  openUnlock(): void {
    if (this.unlocks == null) {
      this.route.params.forEach((params: Params) => {
        const id: string = params['id'];
        this.questService.getUnlockQuests(id)
          .subscribe(unlocks => this.unlocks = unlocks);
      });
    }
    this.isOpen = !this.isOpen;
  }
  /**
   * リンク先任務詳細へジャンプします
   * @param quest 
   */
  jumpDetail(quest: Quest): void {
    this.unlocks = null;
    this.isOpen = false;
    this.router.navigate(['../' + quest.ID], { relativeTo: this.route });
  }
  /**
   * イベントのバブリングをキャンセルします
   * @param event
   */
  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

}