////////////////////////////////////////////////////////////////////
//################################################################//
//######## 以下の書き換えはバグが起こる可能性があります。########//
//################################################################//
////////////////////////////////////////////////////////////////////
const d = getNodesByXPath("/html/frameset/frame[2]")[0];

d.addEventListener("load", levelCustom);
d.addEventListener("load", levelCustom2);
d.addEventListener("load", addMeter);
////////////////////////////////////////////////////////////////////
const isIncludes = (arr,target)=>arr.some(el=>target.innerHTML.includes(el));
////////////////////////////////////////////////////////////////////
function levelCustom() {
  const b4 = getDocument().body;
  if (isIncludes(["商品情報", "預かり所"], b4)) {
    return;
  }
  if (getData("EXP") === undefined) {
    return;
  }
  console.log(`ステータス画面で、50レベル以上の表示 : ${StatusOverLevelDispley}`);
  if (StatusOverLevelDispley !== "有効") {
    return;
  }

  const exp = getValue("EXP");

  const newLevel = getAdvancedLevel(exp);
  const next_exp = getNextLevelExp(exp);
  if (50 <= getValue("レベル")) {
    const newText = getData("レベル") + EXtext_before + (newLevel - 50) + EXtext_after;
    raplaceInnerHTML(b4, getData("レベル"), newText);
  }
  const newText2 = getData("EXP") + EXtext_exp_before + next_exp + EXtext_exp_after;

  raplaceInnerHTML(b4, getData("EXP"), newText2);

  return;
}
////////////////////////////////////////////////////////////////////
function levelCustom2() {
  const d = getDocument().body;
  if (isIncludes(["商品情報", "預かり所"], d)) {
    return;
  }

  const list = d.getElementsByClassName("maintables");
  if (!list[0]?.innerHTML.includes("EXP")) {
    return;
  }
  console.log(`ランキングで、50レベル以上の表示 : ${RankingOverLevelDispley}`);
  if (RankingOverLevelDispley !== "有効") {
    return;
  }

  for (let e of list) {
    const exp = getMaintablesValue(e, "EXP");
    if (50 == getMaintablesValue(e, "レベル")) {
      raplaceInnerHTML(e, "LV 50", "LV " + getAdvancedLevel(exp));
    }
    const expTxt = "EXP:" + exp;
    const next_exp = expTxt + EXtext_exp2_before + getNextLevelExp(exp) + EXtext_exp2_after;
    raplaceInnerHTML(e, expTxt, next_exp);
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

  const old = `${getData("HP")}<br>${getData("MP")}<br>`;
  const newText = `<table style="border-spacing: 0;">
    <tbody>
      <tr>
        <td>${coloredData("HP")}</td>
        <td>${createMeter(getRate("HP"))}</td>
        <td style="text-align: right;">${getRate("HP")}%</td>
      </tr>
      <tr>
        <td>${getData("MP")}</td>
        <td>${createMeter(getRate("MP"))}</td>
        <td style="text-align: right;">${getRate("MP")}%</td>
      </tr>
    </tbody>
  </table>`;
  console.log(`HPとMPのメーターの表示 : ${HP_MP_meterDisplay}`);
  if (HP_MP_meterDisplay === "有効") {
    raplaceInnerHTML(getDocument().body, old, newText);
  }

  const old2 = `<img src="./img/atk.png" width="16px" height="16px">${getData("武器")}<br><img src="./img/def.png" width="16px" height="16px">${getData("防具")}<br>`;
  const newTable = `<table style="border-spacing: 0;">
  <tbody>
    <tr>
      <td><img src="./img/atk.png" width="16px" height="16px">${getData("武器")}</td>
      <td>${createMeter(getRate("武器"))}</td>
      <td style="text-align: right;">${getRate("武器")}%</td>
    </tr>
    <tr>
      <td><img src="./img/def.png" width="16px" height="16px">${coloredData("防具")}</td>
      <td>${createMeter(getRate("防具"))}</td>
      <td style="text-align: right;">${getRate("防具")}%</td>
    </tr>
  </tbody>
</table>`;
  console.log(`武器と防具の耐久値のメーターの表示 : ${Weapon_Armer_meterDisplay}`);
  if (Weapon_Armer_meterDisplay === "有効") {
    raplaceInnerHTML(getDocument().body, old2, newTable);
  }

  console.log(`HPとMPのアラート用の色変更 : ${HP_MP_Alart}`);
  if (HP_MP_Alart === "有効") {
    raplaceInnerHTML(getDocument().body, getData("HP"), coloredData("HP"));
    raplaceInnerHTML(getDocument().body, getData("MP"), coloredData("MP"));
  }

  console.log(`耐久値アラート用の色変更 : ${Weapon_Armer_Alart}`);
  if (Weapon_Armer_Alart === "有効") {
    raplaceInnerHTML(getDocument().body, getData("武器"), coloredData("武器"));
    raplaceInnerHTML(getDocument().body, getData("防具"), coloredData("防具"));
  }

  console.log(`アイテム数アラート用の色変更 : ${ItemAlart}`);
  if (ItemAlart === "有効") {
    raplaceInnerHTML(getDocument().body, getData("アイテム"), coloredData("アイテム"));
  }

  return;
}
////////////////////////////////////////////////////////////////////
function getData(key) {
  const getReg = (key)=>{
    switch (key) {
    case "ヒーロー":
      return /ヒーロー：.+/;
    case "レベル":
      return /レベル：\d{1,}/;
    case "EXP":
      return /EXP：\d{1,}/;
    case "G":
      return /G：\d{1,}/;
    case "HP":
      return /HP：\d{1,}\/\d{1,}/;
    case "MP":
      return /MP：\d{1,}\/\d{1,}/;
    case "武器":
      return /武器：.+\(\d{1,}\/\d{1,}\)/;
    case "防具":
      return /防具：.+\(\d{1,}\/\d{1,}\)/;
    case "アイテム":
      return /アイテム（\d{1,}\/\d{1,}）/;
    case "HP括弧":
      return /(?<=HP：)\d{1,}\/\d{1,}/;
    case "MP括弧":
      return /(?<=MP：)\d{1,}\/\d{1,}/;
    case "武器括弧":
      return /(?<=武器：.+)\(.+\)/;
    case "防具括弧":
      return /(?<=防具：.+)\(.+\)/;
    case "アイテム括弧":
      return /(?<=アイテム)（\d{1,}\/\d{1,}）/;
    default:
      return "";
    }
  };

  return getDocument().body.innerText.match(getReg(key))?.[0];
}
////////////////////////////////////////////////////////////////////
function getValue(key) {
  const getReg = (key)=>{
    switch (key) {
    case "ヒーロー":
      return /(?<=ヒーロー：).+/;
    case "レベル":
      return /(?<=レベル：)\d{1,}/;
    case "あと":
      return /(?<=あと)\d{1,}/;
    case "EXP":
      return /(?<=EXP：)\d{1,}/;
    case "G":
      return /(?<=G：)\d{1,}/;
    case "now_HP":
      return /(?<=HP：)\d{1,}(?=\/\d{1,})/;
    case "max_HP":
      return /(?<=HP：\d{1,}\/)\d{1,}/;
    case "now_MP":
      return /(?<=MP：)\d{1,}(?=\/\d{1,})/;
    case "max_MP":
      return /(?<=MP：\d{1,}\/)\d{1,}/;
    case "状態":
      return /(?<=状態：- ).+(?= -)/;
    case "次の回復まで":
      return /(?<=次の回復まで)\d{1,}(?=分)/;
    // case "武器":
    //   return /(?<=武器：).+/;
    // case "防具":
    //   return /(?<=防具：).+/;
    case "武器名":
      return /(?<=武器：).+(?=\+?\(\d{1,})/;
    case "防具名":
      return /(?<=防具：).+(?=\+?\(\d{1,})/;
    case "武器能力":
      return /(?<=武器：.+\()\d{1,}(?=\/\d{1,}\))/;
    case "防具能力":
      return /(?<=防具：.+\()\d{1,}(?=\/\d{1,}\))/;
    case "武器耐久":
      return /(?<=武器：.+\(\d{1,}\/)\d{1,}(?=\))/;
    case "防具耐久":
      return /(?<=防具：.+\(\d{1,}\/)\d{1,}(?=\))/;
    case "アイテム数":
      return /(?<=アイテム（)\d{1,}(?=\/\d{1,}）)/;
    case "アイテム数上限":
      return /(?<=アイテム（\d{1,}\/)\d{1,}(?=）)/;
    default:
      return "";
    }
  };

  return getDocument().body.innerText.match(getReg(key))?.[0];
}
////////////////////////////////////////////////////////////////////
function getMaintablesValue(target, key) {
  const getReg = (key)=>{
    switch (key) {
    case "ヒーロー":
      return /(?<=<small>\().+?(?=\)<\/small>)/;
    case "レベル":
      return /(?<=LV )\d{1,}(?=／)/;
    case "EXP":
      return /(?<=EXP:)\d{1,}/;
    case "G":
      return /(?<=G:)\d{1,}/;
    case "HP":
      return /(?<=HP )\d{1,}(?=／)/;
    case "MP":
      return /(?<=／MP )\d{1,}/;
    case "状態":
      return /(?<=状態：- ).+(?= -)/;
    default:
      return "";
    }
  };

  return target.innerText.match(getReg(key))?.[0];
}
////////////////////////////////////////////////////////////////////
function getRate(key) {
  let r;
  switch (key) {
    case "武器":
    case "防具":
      r = (getValue(`${key}耐久`) / 2).toString().split(".")[0];
      break;
    case "HP":
    case "MP":
      r = (getValue(`now_${key}`) / getValue(`max_${key}`) * 100).toString().split(".")[0];
      break;
  }
  return r == 0 ? 1 : r;
}
////////////////////////////////////////////////////////////////////
function coloredData(key) {
  const target = getData(`${key}括弧`);
  if (key === "アイテム") {
    switch (getValue("アイテム数上限") - getValue("アイテム数")) {
      case 0:
        return `アイテム${setColor(target, "red")}`;
      case 1:
        return `アイテム${setColor(target, "yellow")}`;
      default:
        return `アイテム${target}`;
    }
  }
  const rate = getRate(key);
  let d = getData(key);
  if (rate  < 21) {
    return `${d.replace(target, "")}${setColor(target, "red")}`;
  }else if (rate < 51) {
    return `${d.replace(target, "")}${setColor(target, "yellow")}`;
  }
  return d;
}
////////////////////////////////////////////////////////////////////
function setColor(target, color) {
  return `<span style="color: ${color};">${target}</span>`;
}
////////////////////////////////////////////////////////////////////
function createMeter(value) {
  return `<meter value="${value / 100}" low="0.21" high="0.51" optimum="1" style="margin-left: .5em;"></meter>`;
}
////////////////////////////////////////////////////////////////////
function raplaceInnerHTML(target, oldTxt, newTxt) {
  target.innerHTML = target.innerHTML.replace(oldTxt, newTxt);
}
////////////////////////////////////////////////////////////////////
const expList = [12, 36, 72, 120, 180, 252, 336, 432, 540, 660, 792, 936, 1092, 1260, 1440, 1632, 1836, 2052, 2280, 2520, 2772, 3036, 3312, 3600, 4933, 5393, 5879, 6389, 6925, 7486, 8073, 8687, 9328, 9996, 10691, 11414, 12166, 12946, 13756, 14595, 15463, 16362, 17290, 18250, 19240, 20262, 21316, 22402, 23520, 24670, 25853, 27070, 28320, 29604, 30922, 32275, 33662, 35085, 36542, 38035, 39564, 41130, 42731, 44369, 46045, 47757, 49507, 51295, 53121, 54985, 56888, 58829, 60810, 62830, 64889, 66989, 69129, 71309, 73529, 75791, 78093, 80437, 82823, 85250, 87720, 90231, 92786, 95383, 98023, 100707, 103434, 106204, 109019, 111878, 114781, 117729, 120722, 123760, 126843, 129972];

function getAdvancedLevel(exp) {
  for (let i = 0; i < expList.length; i++) {
    if (exp < expList[i]) {
      return i + 1;
    }
  }

  return 0;
}

function getNextLevelExp(exp) {
  for (let i = 0; i < expList.length; i++) {
    if (exp < expList[i]) {
      return expList[i] - exp;
    }
  }

  return 0;
}
////////////////////////////////////////////////////////////////////
function getNodesByXPath(xpath) {
  const result = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  return [...Array(result.snapshotLength)].map((_,i)=>result.snapshotItem(i));
}
////////////////////////////////////////////////////////////////////
function stop(txt) {
  console.log(`STOP : ${txt}`);
}
////////////////////////////////////////////////////////////////////
// フレーム内documentを取得して返す
////////////////////////////////////////////////////////////////////
function getDocument() {
  const doc = window.document.getElementsByTagName("frame");

  return doc === 0 ? document : doc[1].contentDocument;
}
