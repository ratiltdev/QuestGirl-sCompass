/**
 * 任務
 */
export class Quest {
    /**
     * 任務ID
     */
    ID: string;
    /**
     * 任務名
     */
    name: string;
    /**
     * カテゴリ
     */
    category: Category;
    /**
     * 周期
     */
    term: Term;
    /**
     * 任務説明
     */
    discription: string;
    /**
     * 達成条件
     */
    condition: string;
    /**
     * 編成指定
     */
    composition: string[];
    /**
     * 燃料
     */
    fuel: number;
    /**
     * 弾薬
     */
    ammo: number;
    /**
     * 鋼材
     */
    steel: number;
    /**
     * ボーキサイト
     */
    bauxite: number;
    /**
     * その他
     */
    other: string[];
    /**
     * 備考
     */
    remark: string;

    /**
     * Constructor
     * @param json
     */
    constructor(json: any) {
        this.ID = json['ID'];
        this.name = json['Name'];
        this.category = json['Category'];
        this.term = json['Term'];
        this.discription = json['Discription'];
        this.condition = json['Condition'];
        this.composition = (json['Composition'] != undefined && json['Composition'] != '') ? (json['Composition'] as string).split(",") : undefined;
        this.fuel = json['Fuel'];
        this.ammo = json['Ammo'];
        this.steel = json['Steel'];
        this.bauxite = json['Bauxite'];
        this.other = (json['Other'] != undefined && json['Other'] != '') ? (json['Other'] as string).split(",") : undefined;;
        this.remark = json['Remark'];
    };
}

/**
 * 任務 - Composite
 */
export class QuestComposite extends Quest {
    /**
     * 親ノード
     */
    parent: QuestComposite;
    /**
     * 子ノード
     */
    child: QuestComposite[];
    /**
     * 階層
     */
    depth: number;
    /**
     * 表示フラグ
     */
    display: boolean;

    /**
     * Constructor
     * @param json
     */
    constructor(json: any) {
        super(json);
        this.depth = json['Depth'];
        this.display = true;
        if (json['Child'] != null) {
            this.child = new Array<QuestComposite>();
            for (let key in json['Child']) {
                const composite: QuestComposite = new QuestComposite(json['Child'][key]);
                composite.parent = this;
                if (this.depth > 1) {
                    composite.display = false;
                }
                this.child.push(composite);
            }
        }
    }
    /**
     * 表示を切り替えます
     */
    switchDisplay(): void {
        if (this.parent == null) return;
        let composite: QuestComposite = null;
        for (let i = 0; i < this.child.length; i++) {
            composite = this.child[i];
            composite.display = !composite.display;
        }
    }
}

/**
 * 任務カテゴリ
 */
export enum Category {
    /**
     * 編成
     */
    composition,
    /**
     * 出撃
     */
    sortie,
    /**
     * 演習
     */
    exercise,
    /**
     * 遠征
     */
    expedition,
    /**
     * 補給
     */
    supply,
    /**
     * 工廠
     */
    arsenal,
    /**
     * 改装
     */
    modernization,
    /**
     * その他
     */
    other
}

/**
 * 任務周期
 */
export enum Term {
    /**
     * 単発
     */
    once,
    /**
     * 日
     */
    daily,
    /**
     * 週
     */
    weekly,
    /**
     * 月
     */
    monthly,
    /**
     * 他
     */
    others,
    /**
     * 年
     */
    yearly01,
    yearly02,
    yearly03,
    yearly04,
    yearly05,
    yearly06,
    yearly07,
    yearly08,
    yearly09,
    yearly10,
    yearly11,
    yearly12
}