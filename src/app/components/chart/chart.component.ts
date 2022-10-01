import { Component, Input } from '@angular/core';

import { QuestComposite } from '../../define/quest';

/**
 * 解放チャートコンポーネント
 */
@Component({
  selector: 'quest-chart',
  templateUrl: './chart.component.html'
})
export class ChartComponent {

    @Input() quest: QuestComposite;

    /**
     * チャート表示を切り替えます
     */
    switchDisplay(): void {
        this.quest.switchDisplay();
    }
}
