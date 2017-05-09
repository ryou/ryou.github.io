# 「黒い背景色の時だけリンクの色を白くしたい」って時にやりがちな間違い

test

## 結論

```
.bg-black {
  background: #000;
}
.bg-black a {
  color: #fff;
}
```

これは駄目。「タグに対するスタイル指定を避ける」というCSSを書く時の大原則に逆行してます。

```
.u-whiteTxt {
  color: #fff;
}
```

ってスタイル指定作っておいて、白くしたいaタグに指定しよう。


## 説明

例えば次のようなリンクテキストとボタンモジュールがあるとする

[例1](./examples/example01.html)

HTML/CSSは以下の通り

```
# HTML
<div class="l-container">
  <p><a href="#">リンクテキスト</a></p>
  <p><a href="#" class="m-btn">ボタン</a></p>
</div>
<!-- /.l-container -->

# CSS
a {
  color: #00f;
  text-decoration: underline;
}
a:hover {
  text-decoration: none;
}
.m-btn {
  display: inline-block;
  background: #ddd;
  color: #000;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
}
.m-btn:hover {
  opacity: .8;
}
```

ここで、背景が黒の部分が登場し、「背景が黒の部分は、リンクテキストの色を#fffにしたい」という要件に従って実装すると以下の通りになります。

```
# HTML
<div class="l-container bg-black">
  <p><a href="#">リンクテキスト</a></p>
  <p><a href="#" class="m-btn">ボタン</a></p>
</div>
<!-- /.l-container -->

# CSS
.bg-black {
  background: #000;
}
.bg-black a {
  color: #fff;
}
```

すると結果は以下のようになります、

[例2](./examples/example02.html)

見て分かる通り、aタグを使用している「.m-btn」の文字色も#fffになってしまい、デザインが崩れてしまっています。CSSの詳細度の厄介な所ですね。

これに対して安直に

```
.bg-black a.m-btn {
  color: #000;
}
```

なんてしてしまうとCSS崩壊まっさかさまです。「.m-btn」のスタイル指定が各所に分散してしまうことにより、例えば「ボタンの文字色を濃い灰色に変えたい」ってなった際に「.m-btn」のスタイル指定だけでなく「.bg-black a.m-btn」のスタイル指定も追って変えなければなりません。

「タグに対するスタイル指定は極力避ける」というCSSの基本ですね。

今回の場合の対処法としては、

```
.u-whiteTxt {
  color: #fff;
}
```

といったスタイルを追加して、白いリンクに対してはこのクラスを指定するといった方法がベターかと自分は思います。



## おまけ：そもそもaタグにデフォルトスタイルが当たっているのが悪いのでは？

aタグのスタイルは完全にリセットしてしまって、リンクテキストとしての見た目を適用したい時だけクラスをaタグに指定する、といった手法もありなのかなと思ったり。

例えば以下のようなコード

```
# リセット
a {
  color: inherit;
  text-decoration: none;
}

# リンクテキストには以下のクラスを指定する
.u-linkTxt {
  color: #00f;
  text-decoration: underline;
}
.u-linkTxt:hover {
  text-decoration: none;
}
.u-linkTxt-white {
  color: #fff;
}
```

このようにしておけば、「aタグを使いたいけど、別に見た目がリンクテキストってわけじゃない（ボタンとか）」っていうモジュールに毎回リセットかける必要がない。「スタイルリセットは極力避ける」という原則にも従っている。

問題点としては、当然ながらリンクテキストに対して毎回スタイルを指定する必要があるので、一般的な直感と逆行している点。ドキュメントが作ってガッチリ保守するような案件でないと容易に破綻しそう。

まぁ基本的にはあまり使ってはいけない類の手法かと思いますけど、知識有る人間が保守する範囲に限ってはこの手法を取るのも良いのではと思ったりした。
