////////////////////////////////////////////////////////////////////
// 
// EXtext_before は追加レベルの数値の前に入る文字
// EXtext_after は追加レベルの数値の後に入る文字
// 
// EXtext_exp_before は必要経験値の数値の前に入る文字
// EXtext_exp_after は必要経験値の数値の後に入る文字
// 
// EXtext_exp2_before は必要経験値の数値の前に入る文字
// EXtext_exp2_after は必要経験値の数値の後に入る文字
// 
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

const EXtext_before = "＋";
const EXtext_after = "";

const EXtext_exp_before = " あと";
const EXtext_exp_after = "";

const EXtext_exp2_before = " あと";
const EXtext_exp2_after = "";

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
const d = getNodesByXPath("/html/frameset/frame[2]")[0];

d.addEventListener("load", levelCustom);
d.addEventListener("load", levelCustom2);
d.addEventListener("load", addMeter);
////////////////////////////////////////////////////////////////////
const isIncludes = (arr, target) => arr.some(el => target.innerHTML.includes(el));
////////////////////////////////////////////////////////////////////
function levelCustom() {
  const b4 = getDocument().body;
  if (isIncludes(["商品情報", "預かり所"], b4)) {
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

  const newText = `<table style="border-spacing: 0;">
    <tbody>
      <tr>
        <td>${getData("HP")}</td>
        <td>${createMeter(getRate("HP"))}</td>
        <td style="text-align: right;">${getRate100("HP")}%</td>
      </tr>
      <tr>
        <td>${getData("MP")}</td>
        <td>${createMeter(getRate("MP"))}</td>
        <td style="text-align: right;">${getRate100("MP")}%</td>
      </tr>
    </tbody>
  </table>`;

  const old = `${getData("HP")}<br>${getData("MP")}<br>`;
  raplaceInnerHTML(getDocument().body, old, newText);

  return;
}
// <table>
//   <tbody>
//     <tr>
//       <td>HP：186/205</td>
//       <td>
//         <meter value="1" low="0.20000001" high="0.500000001" optimum="1"></meter>
//       </td>
//     </tr>
//     <tr>
//       <td>MP：72/72</td>
//       <td>
//         <meter value="1" low="0.20000001" high="0.500000001" optimum="1"></meter>
//       </td>
//     </tr>
//   </tbody>
// </table>
////////////////////////////////////////////////////////////////////
function getData(key) {
  const getReg = (key) => {
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
      default:
        return "";
    }
  };

  return getDocument().body.innerText.match(getReg(key))?.[0];
}
////////////////////////////////////////////////////////////////////
function getValue(key) {
  const getReg = (key) => {
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
      default:
        return "";
    }
  };

  return getDocument().body.innerText.match(getReg(key))?.[0];
}
////////////////////////////////////////////////////////////////////
function getMaintablesValue(target, key) {
  const getReg = (key) => {
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
  return getValue(`now_${key}`) / getValue(`max_${key}`);
}
////////////////////////////////////////////////////////////////////
function getRate100(key) {
  return (getValue(`now_${key}`) / getValue(`max_${key}`) * 100).toString().split(".")[0];
}
////////////////////////////////////////////////////////////////////
function createMeter(value) {
  return `<meter value="${value}" low="0.20000001" high="0.500000001" optimum="1" style="margin-left: .5em;"></meter>`;
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