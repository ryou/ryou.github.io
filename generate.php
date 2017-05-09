<?php

date_default_timezone_set("Asia/Tokyo");

/**
 * ランダム文字列生成 (英数字)
 * $length: 生成する文字数
 */
function makeRandStr($length = 8) {
    static $chars = 'abcdefghijklmnopqrstuvwxyz';
    $str = '';
    for ($i = 0; $i < $length; ++$i) {
        $str .= $chars[mt_rand(0, 61)];
    }
    return $str;
}

for ($i=1; $i<100; $i++) {
  $now = new DateTime();
  // $sub = -1 * $i;
  $now->sub(new DateInterval('P210D'));
  $now->sub(new DateInterval('P' . $i . 'D'));

  $postName = $now->format("Ymd") . "__" . makeRandStr(20);
  $dirName = './docs/posts/' . $postName;

  exec('mkdir ' . $dirName);
  touch($dirName . '/README.md');
  file_put_contents($dirName . '/README.md', $postName);
}
