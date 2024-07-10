const turnList = document.getElementsByClassName("maintables");

for (let i = 0; i < turnList.length; i++) {
  turnList.innerText.
}

for (let i = 0; i < turnList.length; i++) {
  console.log(`${i + 1}ターン目\n${t[i].innerText}`);
}
for (let i = 0; i < turnList.length; i++) {
  const text = [
    `${i + 1}ターン目`,
    `  ${turnList[i].innerText}`,
    ``,
    ``,
    ``,
    ``,
  ].join("\n").replaceAll("\n\n", "");
  console.log(text);
}

/(?<=次の回復まで)\d{1,}(?=分)/;

const me = document.body.innerText.match(/(?<=ヒーロー：).+/)?.[0];
const dmg = new RegExp(`(?<=${me}の攻撃！)\d{1,}(?=のダメージを与えた！)`);

const enemy = /.+(?=の攻撃！).+(?=のダメージを受けた！)/;
const defDamage = /(?<=の攻撃！)\d{1,}(?=のダメージを受けた！)/;
const battle = [
  [
    `1ターン目`,
    `canaya2の攻撃！4のダメージを与えた！`,
    `プラチナマイマイの攻撃！0のダメージを受けた！`,
  ].join("\n"),
  [
    `2ターン目`,
    `canaya2の攻撃！4のダメージを与えた！`,
    `プラチナマイマイの攻撃！しかしプラチナマイマイは感電して動けない！`,
  ].join("\n"),
  [
    `3ターン目`,
    `戦闘に勝利した！！`,
    `canaya2はHPを4回復した。`,
  ].join("\n")
];
match(/(?<=ヒーロー：).+/)?.[0]
for (let i = 0; i < battle.length; i++) {
  console.log(battle[i]);
  const t = [
    `攻撃者: ${battle[i].match(attackerName)?.[0]}`,
    `与えたダメージ: ${battle[i].match(atkDamage)?.[0]}`,
    `敵: ${battle[i].match(enemyName)?.[0]}`,
    `受けたダメージ: ${battle[i].match(defDamage)?.[0]}`,
    ``,
    ``,
  ].join("\n");
}
1ターン目
canaya2の攻撃！4のダメージを与えた！
プラチナマイマイの攻撃！0のダメージを受けた！

2ターン目
canaya2の攻撃！4のダメージを与えた！
プラチナマイマイの攻撃！しかしプラチナマイマイは感電して動けない！

3ターン目
戦闘に勝利した！！
canaya2はHPを4回復した。