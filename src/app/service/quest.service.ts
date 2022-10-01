import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Quest, QuestComposite } from '../define/quest';

/**
 * 任務データ取得サービスng
 */
@Injectable()
export class QuestService {

    private apiURL: string = 'http://localhost/example/resource.php';

    /**
     * Constructor
     * @param http
     */
    constructor(private http: HttpClient) { }

    /**
     * 全任務データを取得します
     */
    getQuests(): Observable<Quest[]> {
        return this.http.get<Quest[]>(this.apiURL);
    }
    /**
     * ピン留め任務データを取得します
     * @param pinList 
     */
    getPinQuests(pinID: string): Observable<Quest[]> {
        const url: string = this.apiURL + '/pin/' + pinID;
        return this.http.get<Quest[]>(url);
    }
    /**
     * デイリー任務データを取得します
     */
    getDailyQuests(): Observable<Quest[]> {
        const url: string = this.apiURL + '/daily';
        return this.http.get<Quest[]>(url);
    }
    /**
     * ウィークリー任務データを取得します
     */
    getWeeklyQuests(): Observable<Quest[]> {
        const url: string = this.apiURL + '/weekly';
        return this.http.get<Quest[]>(url);
    }
    /**
     * マンスリー任務データを取得します
     */
    getMonthlyQuests(): Observable<Quest[]> {
        const url: string = this.apiURL + '/monthly';
        return this.http.get<Quest[]>(url);
    }
    /**
     * その他任務データを取得します
     */
    getOthersQuests(): Observable<Quest[]> {
        const url: string = this.apiURL + '/others';
        return this.http.get<Quest[]>(url);
    }
    /**
     * イヤーリー任務データを取得します
     */
    getYearlyQuests(): Observable<Quest[]> {
        const url: string = this.apiURL + '/yearly';
        return this.http.get<Quest[]>(url);
    }
    /**
     * 特定IDの任務詳細を取得します
     * @param id
     */
    getQuestDetail(id: string): Observable<QuestComposite> {
        const url: string = this.apiURL + '/' + id;
        return this.http.get<QuestComposite>(url);
    }
    /**
     * 特定IDの開放任務データを取得します
     * @param id
     */
    getUnlockQuests(id: string): Observable<Quest[]> {
        const url: string = this.apiURL + '/unlock/' + id;
        return this.http.get<Quest[]>(url);
    }
    /**
     * キーワードを含む任務データを取得します
     * @param keyword
     */
    searchQuest(keyword: string): Observable<Quest[]> {
        const url: string = this.apiURL + '/search/' + keyword;
        return this.http.get<Quest[]>(url);
    }
}