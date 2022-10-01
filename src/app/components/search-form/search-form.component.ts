import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/**
 * 検索フォーム
 */
@Component({
  selector: 'search-form',
  templateUrl: './search-form.component.html'
})
export class SearchFormComponent {

  /**
   * Constructor
   * @param route
   * @param router
   */
  constructor(protected route: ActivatedRoute, protected router: Router) { }

  /**
   * キーワード検索します
   * @param keyword
   */
  search(keyword: string): void {
      keyword = keyword.trim();
      keyword = keyword.replace(/\s+/g, "+");
      if (keyword.length == 0) return;
      this.router.navigate(['search', keyword], { relativeTo: this.route });
  }

}
