# 画面いっぱいの高さにしたい時のheight:100%の指定の根拠

次の例みたいに、画面にフィットするセクションを作って並べたいって要望が時々ある。

[例1](https://ryou.github.io/blog_height_100percent/examples/example01.html)

ネットで調べればやり方はいくらでも出てきて実装には困らないのですが、仕様上の根拠が知りたかったので備忘録としてメモ。


## MDN

[MDNのheightの項目](https://developer.mozilla.org/ja/docs/Web/CSS/height)をみれば答えがずばり書いている。

> 相対値の基準  
> パーセンテージは包含ブロックの高さ基準。包含ブロックの高さが明示されず（＝コンテンツの高さ依存の場合）、この要素が絶対位置指定されていないなら、値は auto になります。ルート要素で高さをパーセンテージ指定すると、初期包含ブロックに相対的になります。

まず

> パーセンテージは包含ブロックの高さ基準。

から、heightをパーセント指定すると包含ブロック（厳密には違うけど、親要素と認識して良い）の高さを基準に計算されることがわかる。これはまぁ直感的にわかる。

> 包含ブロックの高さが明示されず（＝コンテンツの高さ依存の場合）、この要素が絶対位置指定されていないなら、値は auto になります。

ここがまず重要、包含ブロックの高さがコンテンツ依存の場合、position: absoluteじゃないのなら高さをパーセント指定しようがautoと同じになると書いている。

なので次の例みたいに

[例2](https://ryou.github.io/blog_height_100percent/examples/example02.html)

```
<div class="row">
  <div class="col col-blue">
    <p>テキスト</p>
  </div><!--
--><div class="col col-green">
    <p>テキスト<br>テキスト</p>
  </div>
</div>
```

こんなHTMLで

```
.row {
  background: #2c3e50;
  width: 400px;
  margin: 0 auto;
}
.col {
  width: 200px;
  height: 100%;
  display: inline-block;
  vertical-align: top;
}
.col-blue {
  background: #3498db;
}
.col-green {
  background: #1abc9c;
}
```

こんなCSS書いて要素を横並び、かつ高さは親要素いっぱいってしようとしても無理で、素直にtableなり使えという話。


> ルート要素で高さをパーセンテージ指定すると、初期包含ブロックに相対的になります。

で、最後。

ルート要素はhtmlタグの事、初期包含ブロックはちょっとまだよくわかってないけど、多分ビューポートの事。

ここでhtmlタグにheight: 100%を指定するとビューポートいっぱいの高さになるよ、って書いてる。
