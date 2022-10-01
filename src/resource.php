<?php

 /**
 * 取得階層深度
 */
define('MAX_DEPTH', 6);

?>

<?php

//header("Access-Control-Allow-Origin: *");

// Notice以外の全てのエラーを表示
error_reporting(E_ALL & ~E_NOTICE);
  
try {
  
  // データベースに接続
  $db = new PDO('mysql:host=xxxxxxxxxx; dbname=xxxxxxxxxx; charset=utf8', 'xxxxxxxxxx', 'xxxxxxxxxx');
  
  // 初期セットを取得
  if (is_null($_SERVER['PATH_INFO'])) {
    
    $stt = $db->query(createLatestQuery());
    print(json_encode($stt->fetchAll(PDO::FETCH_ASSOC)));
  }
  // 特定データを取得
  else {
    
    $pathInfo = explode('/', $_SERVER['PATH_INFO']);
    $path = $pathInfo[1];
    
    switch ($path) {
      
      // ピン留め
      case 'pin':
        $pin = $pathInfo[2];
        $pinArray = explode('+', $pin);
        $count = count($pinArray);

        $stt = $db->prepare(createPinQuery($count));

        for ($i = 1; $i <= $count; $i++) {
          $stt->bindValue($i, $pinArray[$i - 1]);
        }
        
        $stt->execute();
        
        print(json_encode($stt->fetchAll(PDO::FETCH_ASSOC)));
        break;

      // デイリー
      case 'daily':
        $stt = $db->query(createDailyQuery());
        print(json_encode($stt->fetchAll(PDO::FETCH_ASSOC)));
        break;
      
      // ウィークリー
      case 'weekly':
        $stt = $db->query(createWeeklyQuery());
        print(json_encode($stt->fetchAll(PDO::FETCH_ASSOC)));
        break;
      
      // マンスリー
      case 'monthly':
        $stt = $db->query(createMonthlyQuery());
        print(json_encode($stt->fetchAll(PDO::FETCH_ASSOC)));
        break;
      
      // その他
      case 'others':
        $stt = $db->query(createOtherQuery());
        print(json_encode($stt->fetchAll(PDO::FETCH_ASSOC)));
        break;

      // イヤーリー
      case 'yearly':
        $stt = $db->query(createYearlyQuery());
        print(json_encode($stt->fetchAll(PDO::FETCH_ASSOC)));
        break;
      
      // 検索
      case 'search':
        $keyword = $pathInfo[2];
        $keywordArray = explode('+', $keyword);
        $count = count($keywordArray);
        
        $stt = $db->prepare(createSearchQuery($count));
        
        for ($i = 1; $i <= $count; $i++) {
          $stt->bindValue($i, '%' . $keywordArray[$i - 1] . '%');
        }
        
        $stt->execute();
        
        print(json_encode($stt->fetchAll(PDO::FETCH_ASSOC)));
        break;
      
      // 開放
      case 'unlock':
        $stt = $db->prepare(createUnlockQuery());
        $stt->bindValue(1, $pathInfo[2]);
        $stt->execute();

        print(json_encode($stt->fetchAll(PDO::FETCH_ASSOC)));
        break;

      // 詳細
      default:
        $stt = $db->prepare(createDetailQuery());
        $stt->bindValue(1, $path);
        $stt->execute();
        
        $questData = NULL;
        
        while ($row = $stt->fetch(PDO::FETCH_ASSOC)) {
          storeRowData($questData, $row, 1);
        }
        
        print(json_encode($questData));
        break;
    }
  }
}
catch (PDOException $e) {
  
  die($e->getMessage());
}
$db = NULL;

?>

<?php 

/**
 * リスト取得クエリ生成
 */
function createListQuery($where = null) {
  
  $query = '';
  
  // SELECT 句
  $query .= 'SELECT ID, Name, Category, Term, Discription, Fuel, Ammo, Steel, Bauxite ';
  
  // FROM 句
  $query .= 'FROM tb_quest ';
  
  // WHERE 句
  if (!is_null($where)) {
    
    $query .= $where;
  }
  
  // ORDER BY 句
  $query .= 'ORDER BY ID ASC ';
  
  return $query;
}

/**
 * 最新取得クエリ作成
 */
function createLatestQuery() {
  
  $where = 'WHERE ID IN (\'B159\', \'B160\', \'B161\', \'C051\', \'F094\', \'G006\', \'G007\', \'A093\', \'B156\', \'B157\', \'B158\', \'C049\', \'C050\', \'F093\', \'SB63\') ';
  
  return createListQuery($where);
}

/**
 * ピン留め取得クエリ作成
 */
function createPinQuery($count) {

  $where = 'WHERE ID IN (';
  
  for ($i = 0; $i < $count; $i++) {
    
    $where .= ($i == 0) ? '?' : ', ?';
  }
  
  $where .= ') ';
  return createListQuery($where);
}

/**
 * デイリー取得クエリ作成
 */
function createDailyQuery() {
  
  $where = 'WHERE Term = 1 AND Remark = \'\' ';
  
  return createListQuery($where);
}

/**
 * ウィークリー取得クエリ作成
 */
function createWeeklyQuery() {
  
  $where = 'WHERE Term = 2 AND Remark = \'\' ';
  
  return createListQuery($where);
}

/**
 * マンスリー取得クエリ作成
 */
function createMonthlyQuery() {
  
  $where = 'WHERE Term = 3 AND Remark = \'\' ';
  
  return createListQuery($where);
}

/**
 * その他取得クエリ作成
 */
function createOtherQuery() {
  
  $where = 'WHERE Term = 4 AND Remark = \'\' ';
  
  return createListQuery($where);
}

/**
 * イヤーリー取得クエリ作成
 */
function createYearlyQuery() {
  
  $where = 'WHERE Term >= 5 AND Remark = \'\' ';
  
  return createListQuery($where);
}

/**
 * キーワード検索クエリ作成
 */
function createSearchQuery($count) {
  
  $where = 'WHERE ';
  
  for ($i = 0; $i < $count; $i++) {
    
    $where .= ($i == 0) ? '' : 'AND ';
    $where .= 'CONCAT_WS(\' \', Name, Discription, "Condition", Other, Remark) LIKE ? ';
  }
  
  return createListQuery($where);
}

/**
 * 詳細取得クエリ生成
 */
function createDetailQuery() {
  
  $query = '';
  $q = '';
  $t = '';
  
  // SELECT 句
  $query .= 'SELECT ';
  
  for ($i = 1; $i <= MAX_DEPTH; $i++) {
    
    $query .= createField('ID', $i) . ', ';
    $query .= createField('Name', $i) . ', ';
    $query .= createField('Category', $i) . ', ';
    $query .= createField('Term', $i) . ', ';
    $query .= createField('Discription', $i) . ', ';
    $query .= createField('Condition', $i) . ', ';
    $query .= createField('Composition', $i) . ', ';
    $query .= createField('Fuel', $i) . ', ';
    $query .= createField('Ammo', $i) . ', ';
    $query .= createField('Steel', $i) . ', ';
    $query .= createField('Bauxite', $i) . ', ';
    $query .= createField('Other', $i) . ', ';
    $query .= createField('Remark', $i);
    $query .= ($i < MAX_DEPTH) ? ', ' : ' ';
  }
  
  // FROM 句
  $query .= 'FROM tb_quest AS q1 ';
  
  // JOIN 句
  for ($i = 1; $i < MAX_DEPTH; $i++) {
    
    $q = 'q' . $i;
    $t = 't' . $i;
    
    $query .= 'LEFT JOIN tb_trigger AS t' . $i . ' ON q' . $i . '.ID = t' . $i . '.ID ';
    $query .= 'LEFT JOIN tb_quest AS q' . ($i + 1) . ' ON t' . $i . '.TriggerID = q' . ($i + 1) . '.ID ';
  }
  
  // WHERE 句
  $query .= 'WHERE q1.ID = ?';
  
  return $query;
}

/**
 * 開放任務取得クエリ生成
 */
function createUnlockQuery() {

  $where = 'WHERE ID IN (SELECT ID FROM tb_trigger WHERE TriggerID = ?)';

  return createListQuery($where);
}

/**
 * クエリ生成補助
 */
function createField($name, $depth) {
  
  $prefix = 'q' . $depth;
  
  return $prefix . '.' . $name . ' as ' .$prefix . '_' . $name;
}

/**
 * データ格納
 */
function storeRowData(&$questData, $row, $depth) {
  
  $prefix = 'q' . $depth . '_';
  
  // 子が存在しない場合は再帰終了
  if ($row[$prefix . 'ID'] == NULL) {
    return NULL;
  }
  
  // 新規ノード
  if ($questData == NULL) {
  
    // データ格納
    $questData = array(
      'ID' => $row[$prefix . 'ID'],
      'Name' => $row[$prefix . 'Name'],
      'Category' => $row[$prefix . 'Category'],
      'Term' => $row[$prefix . 'Term'],
      'Discription' => $row[$prefix . 'Discription'],
      'Condition' => $row[$prefix . 'Condition'],
      'Composition' => $row[$prefix . 'Composition'],
      'Fuel' => $row[$prefix . 'Fuel'],
      'Ammo' => $row[$prefix . 'Ammo'],
      'Steel' => $row[$prefix . 'Steel'],
      'Bauxite' => $row[$prefix . 'Bauxite'],
      'Other' => $row[$prefix . 'Other'],
      'Remark' => $row[$prefix . 'Remark'],
      'Child' => NULL,
      'Depth' => $depth
    );
    
    // 再帰処理
    if ($depth <= MAX_DEPTH) {
      
      $child = storeRowData($questData['Child'], $row, ++$depth);
      $questData['Child'] = ($child != NULL) ? array($child) : NULL;
    }
  }
  // 既存ノード
  else {
    
    // ルートノードは必ず一致
    if ($depth == 1) {
      
      // 再帰処理
      storeRowData($questData['Child'], $row, ++$depth);
        
      return NULL;
    }
    
    // 現深度のノードを走査
    foreach ($questData as &$node) {
      
      // 対象が格納済
      if ($node['ID'] === $row[$prefix . 'ID']) {
        
        // 再帰処理
        storeRowData($node['Child'], $row, ++$depth);
        
        return NULL;
      }
    }
    
    // 再帰処理
    $newNode = NULL;
    storeRowData($newNode, $row, $depth);
    
    // 既存ノードに連結
    array_push($questData, $newNode);
  }
  
  return $questData;
}

?>