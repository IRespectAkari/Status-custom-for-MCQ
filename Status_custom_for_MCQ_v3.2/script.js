////////////////////////////////////////////////////////////////////
//################################################################//
//######## 以下の書き換えはバグが起こる可能性があります。########//
//################################################################//
////////////////////////////////////////////////////////////////////
const d = getNodesByXPath("/html/frameset/frame[2]")[0];

// console.log(d);
d.addEventListener("load", levelCustom);
d.addEventListener("load", rankingLevelCustom);
d.addEventListener("load", addMeter);
d.addEventListener("load", addAlchemyAlart);
d.addEventListener("load", addBlacksmithAlart);
d.addEventListener("load", addBossAlart);
d.addEventListener("load", addToEmphasisBossChallengeItem);
d.addEventListener("load", addSellAlart);
d.addEventListener("load", anniversary);
d.addEventListener("load", anniversaryHOME);
// console.log(d.addEventListener("load", anniversaryHOME));
// window.addEventListener("load", anniversaryHOME);
window.addEventListener("load", debugDisplay);
////////////////////////////////////////////////////////////////////
function debugDisplay() {
  console.log(`debugMode : ${debugMode}
  %coption.js の内容を書き直してから公開する事！！`, "color: red;");
  if (debugMode === "無効") {
    return;
  }
  const debugText0 = [
    `+----------------------------+`,
    `| Status custom for MCQ v3.2 |`,
    `| update date : 2024/0/00    |`,
    `|             made by canaya |`,
    `+----------------------------+`,
  ].join("\n");
  const debugText2 = [
`必要経験値表示例(ランキング) : EXP:44644${getTxt("RankingOverLevelDispley", true)}1401${getTxt("RankingOverLevelDispley", false)}`,
`必要経験値表示例(ステータス) : EXP：44644${getTxt("nextLevelExpDisplay", true)}1401${getTxt("nextLevelExpDisplay", false)}`,
`超過レベル表示例(ステータス) : レベル：50${getTxt("StatusOverLevelDispley", true)}15${getTxt("StatusOverLevelDispley", false)}`,
  ].join("\n");
  const debugText3 = [
    `##### 道具屋アラート対象アイテム一覧 #####`,
    `${OPTIONS.SellAlart.対象アイテム.状態}`,
    `##########################################`,
    `警告サンプル : %c船の切符を売ろうとしています`
  ].join("\n");
  const debugStyle = [
    `font-size: 16px;`,
    `${NotionStyle("SellAlart")}`,
  ].join("");
  console.log(debugText0);
  console.table(OPTIONS, ["簡易説明", "状態"]);
  console.log(debugText2);
  console.log(debugText3, debugStyle);

  return;
}
////////////////////////////////////////////////////////////////////
function rankingLevelCustom() {
  if (get("RankingOverLevelDispley") !== "有効") {
    return;
  }
  const d = getDocument().body;
  if (isIncludes(["商品情報", "預かり所"], d)) {
    return;
  }

  const list = d.getElementsByClassName("maintables");
  if (!list[0]?.innerHTML.includes("EXP")) {
    return;
  }

  for (let e of list) {
    const exp = getMaintablesValue(e, "EXP");
    if (50 == getMaintablesValue(e, "レベル")) {
      replaceInnerHTML(e, "LV 50", "LV " + getAdvancedLevel(exp));
    }
    const expTxt = "EXP:" + exp;
    const next_exp = [
      expTxt,
      getTxt("RankingOverLevelDispley", true),
      getNextLevelExp(exp),
      getTxt("RankingOverLevelDispley", false),
    ].join("");

    replaceInnerHTML(e, expTxt, next_exp);
  }
  return;
}
// #################################################################
function levelCustom() {
  if (get("StatusOverLevelDispley") !== "有効" 
      && get("nextLevelExpDisplay") !== "有効"){
    return;
  }

  const d = getDocument().body;
  if (isIncludes(["商品情報", "預かり所"], d)) {
    return;
  }
  if (getData("EXP") === undefined) {
    return;
  }

  const exp = getValue("EXP");
  const newLevel = getAdvancedLevel(exp);
  const next_exp = getNextLevelExp(exp);

  if (get("StatusOverLevelDispley") === "有効") {
    if (50 <= getValue("レベル")) {
      const newText = [
        getData("レベル"),
        getTxt("StatusOverLevelDispley", true),
        newLevel - 50,
        getTxt("StatusOverLevelDispley", false),
      ].join("");

      replaceInnerHTML(d, getData("レベル"), newText);
    }
  }

  if (get("nextLevelExpDisplay") === "有効"){
    const newText2 = [
      getData("EXP"),
      getTxt("nextLevelExpDisplay", true),
      next_exp,
      getTxt("nextLevelExpDisplay", false),
    ].join("");
  
    replaceInnerHTML(d, getData("EXP"), newText2);
  }
  return;
}
////////////////////////////////////////////////////////////////////
function addMeter() {
  const d = getDocument().body;
  if (isIncludes(["商品情報", "預かり所"], d)) {
    return;
  }
  if (getData("HP") === undefined) {
    return;
  }

  const png = (e)=>`<img src="./img/${e}.png" width="16px" height="16px">`;
  const oldTable = (isE)=>{
    return [
      `${isE ? png("atk") : ""}${getData(isE ? "武器" : "HP")}<br>`,
      `${isE ? png("def") : ""}${getData(isE ? "防具" : "MP")}<br>`
    ].join("");
  }
  const newTable = (isE)=>{
    return [
      `<table style="border-spacing: 0;">`,
      `  <tbody>`,
      `    <tr>`,
      `      <td>${isE ? png("atk") : ""}${getData(isE ? "武器" : "HP")}</td>`,
      `      <td>${createMeter(getRate(isE ? "武器" : "HP"))}</td>`,
      `      <td style="text-align: right;">${getRate(isE ? "武器" : "HP")}%</td>`,
      `    </tr>`,
      `    <tr>`,
      `      <td>${isE ? png("def") : ""}${getData(isE ? "防具" : "MP")}</td>`,
      `      <td>${createMeter(getRate(isE ? "防具" : "MP"))}</td>`,
      `      <td style="text-align: right;">${getRate(isE ? "防具" : "MP")}%</td>`,
      `    </tr>`,
      `  </tbody>`,
      `</table>`,
    ].join("\n");
  }

  if (get("HP_MP_meterDisplay") === "有効") {
    replaceInnerHTML(d, oldTable(false), newTable(false));
  }

  if (get("Weapon_Armer_meterDisplay") === "有効") {
    replaceInnerHTML(d, oldTable(true), newTable(true));
  }

  if (get("HP_MP_Alart") === "有効") {
    replaceInnerHTML(d, getData("HP"), coloredData("HP"));
    replaceInnerHTML(d, getData("MP"), coloredData("MP"));
  }

  if (get("Weapon_Armer_Alart") === "有効") {
    replaceInnerHTML(d, getData("武器"), coloredData("武器"));
    replaceInnerHTML(d, getData("防具"), coloredData("防具"));
  }

  if (get("ItemAlart") === "有効") {
    replaceInnerHTML(d, getData("アイテム"), coloredData("アイテム"));
  }

  return;
}
////////////////////////////////////////////////////////////////////
function addAlchemyAlart() {
  if (get("AlchemyAlart") !== "有効") {
    return;
  }
  if (getData("依頼内容") !== "錬金術") {
    return;
  }

  for (let e of alchemyList) {
    const txt = [
      `使用アイテム : ${e.items}`,
      `結果         : ${e.result}`,
      `手持ちに全て存在 : ${areHaving(e.items)}`,
    ].join("\n");
    // console.log(txt);

    if (areHaving(e.items)) {
      createNotionDiv(`${e.items.join("と")}で、${e.result}が錬金されます`);
      console.log(txt);
      return;
    }
  }

  for (let e of alchemyList2) {
    const txt = [
      `使用アイテム : ${e.item}`,
      `対象         : ${e.subject}`,
      `手持ち       : ${getData("アイテム一覧")}`,
      `手持ちに全て存在 : ${isHaving(e.item)}`,
    ].join("\n");
    // console.log(txt);
    if (isHaving(e.item)) {
      createNotionDiv(`${e.item}と、${e.subject}が錬金されます`);
      // console.log(txt);
      return;
    }
  }
  
  return;
}
////////////////////////////////////////////////////////////////////
function addBlacksmithAlart() {
  if (get("BlacksmithAlart") !== "有効") {
    return;
  }
  if (getData("依頼内容") !== "鍛冶") {
    return;
  }

  // 防具鍛造
  for (let e of blacksmithArmerList) {
    if (areHaving(e.items)) {
      createNotionDiv(`${e.items.join("と")}を消費して、${e.result}を造ります`);
      const txt = [
        `使用アイテム : ${e.items}`,
        `結果 : ${e.result}`,
        `全て持っているか : ${areHaving(e.items)}`,
      ].join("\n");
      // console.log(txt);
      return;
    }
  }

  // 武器鍛造
  for (let e of blacksmithWeaponList) {
    if (isHaving(e.item)) {
      createNotionDiv(`${e.item}を使用して${e.result[isHaving("魔石") ? 0 : 1]}を鍛造します`);
      return;
    }
  }

  // 砥石・強化石系の使用
  for (let e of blacksmithListExample) {
    if (isHaving(e)) {
      createNotionDiv(`${e}を使用します`);
      const txt = [
        `使用アイテム : ${e}`,
      ].join("\n");
      // console.log(txt);
      return;
    }
  }
}
////////////////////////////////////////////////////////////////////
function addBossAlart() {
  if (get("BossAlart") !== "有効") {
    return;
  }
  if (getData("目的地") === undefined) {
    return;
  }

  const destination = getData("目的地");
  for (let e of bossList) {
    const txt = [
      `ボス名   : ${e.name}`,
      `アイテム : ${e.item}`,
      `場所     : ${e.where}`,
      `目的地   : ${destination}`,
    ].join("\n");
    // console.log(txt);

    if (destination === e.where && isHaving(e.item)) {
      createNotionDiv(`${e.item}を持っている為、${e.where}の隠しボスに挑みます`);
      // `${e.item}を持っている為、${e.where}の隠しボス「${e.name}」に挑みます`
      // console.log(txt);
      return;
    }
  }
  return;
}
////////////////////////////////////////////////////////////////////
function addToEmphasisBossChallengeItem() {
  if (get("EmphasisBossChallengeItem") !== "有効") {
    return;
  }
  if (!isIncludes(["冒険中です。"], getDocument().body)) {
    return;
  }
  if (getData("冒険中目的地") === undefined) {
    return;
  }

  // querySelectorAll(`div.contents > div.maintables2 > small`)?.[2];
  const itemsElement = getDocument().querySelectorAll(`small`)[2];
  // const items = getData("冒険中所持アイテム");
  const items = itemsElement.innerHTML;
  const destination = getData("冒険中目的地");
  for (let e of bossList) {
    const txt = [
      `ボス名   : ${e.name}`,
      `アイテム : ${e.item}`,
      `場所     : ${e.where}`,
      `目的地   : ${destination}`,
      `所持アイテム : ${items}`,
    ].join("\n");
    // console.log(txt);

    if (destination === e.where && items.includes(e.item)) {
      itemsElement.innerHTML = items.replace(e.item, `<b>${e.item}</b>`);
      // console.log(txt);
      return;
    }
  }
  return;
}
////////////////////////////////////////////////////////////////////
function addSellAlart() {
  if (get("SellAlart") !== "有効") {
    return;
  }
  if (getData("売買品") === undefined) {
    return;
  }
  const alartItemList = OPTIONS.SellAlart.対象アイテム.状態
                                          .replaceAll(/、+/g, "、")
                                          .replaceAll(/(\n|「、?|、?」)/g, "")
                                          .split("、");

  const sellingItem = getData("売買品");
  const sellingPrice = getValue("売値");
  for (let e of alartItemList) {
    const txt = [
      `item     : ${e}`,
      `isHaving : ${isHaving(e)}`,
      `itemIsSelling : ${sellingItem === e}`,
      `sellingPrice  : ${sellingPrice}`,
    ].join("\n");
    // console.log(txt);
    if (sellingItem === e && isHaving(e) && sellingPrice < 51) {
      createNotionDiv(`${e}を売ろうとしています`, "SellAlart");
    }
  }
}
////////////////////////////////////////////////////////////////////
function anniversary() {
  if (get("AnniversaryCountdownDisplay") !== "有効") {
    return;
  }
  if (isIncludes(["商品情報", "総合", "資金", "累計"], getDocument().body)) {
    return;
  }
  if (!isIncludes(townNameList, getDocument().body)) {
    return;
  }

  // h2要素（タウン名）を取得
  const h2 = getDocument().querySelector("h2");
  const styleTag = document.createElement("style");
  const styleTag2 = document.createElement("style");
  const selector = `div.contents > h2::after`;
  const styleHTML = [
    `${selector} {`,
    `  position: absolute;`,
    `  left: 155px;`,
    `  width: 300px;`,
    `  color: black;`,
    `}`,
  ].join("\n");
  styleTag.innerHTML = styleHTML;
  // h2要素に、生成した擬似要素をくっつける
  h2.appendChild(styleTag);
  h2.appendChild(styleTag2);
  window.setInterval(delayTimeDisplay, 200, styleTag2, selector);

  return;
}
////////////////////////////////////////////////////////////////////
function delayTimeDisplay(styleTag, selector) {
  const thisYear = new Date().getFullYear();
  const thisYearAnniv = new Date(`${thisYear}-6-16`)
  const nextYearAnniv = new Date(`${thisYear + 1}-6-16`)
  const yyyy = thisYearAnniv > new Date() ? thisYear : thisYear + 1;
  const annivTimes = yyyy - 2023;
  const delay = new Date(`${yyyy}-6-16`) - new Date();

  // 目標時刻と現時刻の差から残り時間を計算
  let Day = Math.floor(delay / 86400000);
  let Hou = Math.floor((delay % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let Min = Math.floor((delay % (1000 * 60 * 60)) / (1000 * 60));
  let Sec = Math.floor((delay % (1000 * 60)) / 1000);

  const contentText = 
    `${annivTimes}周年記念日まで、あと${Day}日${Hou}時間${Min}分${Sec}秒`;

  // 擬似要素の生成
  const styleHTML = [
    `${selector} {`,
    `  content: "${contentText}";`,
    `}`,
  ].join("\n");
  styleTag.innerHTML = styleHTML;
}
////////////////////////////////////////////////////////////////////
function anniversaryHOME() {
  // console.log("anniversaryHOME");
  if (get("AnniversaryCountdownInHomeDisplay") !== "有効") {
    return;
  }
  // ミチクエホームか判定
  if (!getDocument().body.innerText.includes("冒険履歴")) {
    // console.log("ホームでない");
    return;
  }

  // bbsのボタン取得
  const bbs = getDocument()
                .querySelector(`a[href="https://bbs1.sekkaku.net/bbs/milkchoco/"]`)
                .children?.[0]
  // style1, style2タグ生成
  const styleTag1 = document.createElement("style");
  const styleTag2 = document.createElement("style");
  // cssセレクター設定
  // const selector = `a[href="https://bbs1.sekkaku.net/bbs/milkchoco/"] > div::after`;
  const selector = `a[href="https://bbs1.sekkaku.net/bbs/milkchoco/"]::after`;
  // style1タグの中にcontent以外を書き込み
  const styleHTML1 = [
    `${selector} {`,
    `  position: relative;`,
    `  left: 15px;`,
    `  color: black;`,
    `  font-size: 13px;`,
    `}`,
  ].join("\n");
  styleTag1.innerHTML = styleHTML1;
  // ボタンの中にappendChildでstyle1、style2を追加
  bbs.appendChild(styleTag1);
  bbs.appendChild(styleTag2);
  // window.setInterval(delayTimeDisplay, 200)で0.2秒毎に書き換え
  const txt = [
    `anniversaryHOME`,
    `styleTag1 : ${styleTag1.innerHTML}`,
    `styleTag2 : ${styleTag2.innerHTML}`,
    `bbs : ${bbs.innerHTML}`,
    // ` : ${}`,
  ].join("\n");
  // console.log(txt);
  window.setInterval(delayTimeDisplay, 200, styleTag2, selector);
}