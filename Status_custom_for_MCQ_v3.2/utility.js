const get = (key)=>{return OPTIONS[key].状態;};
const getColor = (key)=>{return OPTIONS[key].style.color.状態;};
const getBgColor = (key)=>{return OPTIONS[key].style.bgColor.状態;};
const getBold = (key)=>{return OPTIONS[key].style.bold.状態;};
const getTxt = (key, isB4)=>{return OPTIONS[key][isB4 ? "BeforeText" : "AfterText"].状態;};
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
      return /アイテム（\d{1,}\/10）/;
    case "アイテム一覧":
      return /(?<=アイテム（\d{1,}\/10）\n).+/;
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
    case "依頼内容":
      return /(?<=依頼内容:).+(?=\n)/;
    case "目的地":
      return /(?<=目的地:).+(?=\n)/;
    case "冒険中目的地":
      return /(?<=目的地：).+(?=\n)/;
    case "所要時間":
      return /(?<=所要時間:).+(?=\n)/;
    case "パーティー人数":
      return /(?<=パーティー人数:).+(?=\n)/;
    case "冒険中所持アイテム":
      return /(?<=DF:\d{1,}\n).+(?=\n)/;
    case "売買品":
      return /(?<=「).+(?=(は\d{1,2}Gだが、これでいいか？」|は\d{1,2}Gだ、どうだい？」))/;
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
    case "所要時間":
      return /(?<=所要時間:).+(?=時間)/;
    case "パーティー人数":
      return /(?<=パーティー人数:).+(?=人)/;
    case "売値":
      return /(?<=「.+は)\d{1,2}(?=(Gだが、これでいいか？」|Gだ、どうだい？」))/;
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
      r = getValue(`${key}耐久`) / 2;
      break;
    case "HP":
    case "MP":
      r = getValue(`now_${key}`) / getValue(`max_${key}`) * 100;
      break;
  }
  return r === 0 ? 0 : Math.max(r.toString().split(".")[0], 1);
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
function replaceInnerHTML(target, oldTxt, newTxt) {
  target.innerHTML = target.innerHTML.replace(oldTxt, newTxt);
}
////////////////////////////////////////////////////////////////////
function getNodesByXPath(xpath) {
  const result = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  return [...Array(result.snapshotLength)].map((_,i)=>result.snapshotItem(i));
}
////////////////////////////////////////////////////////////////////
// フレーム内documentを取得して返す
////////////////////////////////////////////////////////////////////
function getDocument() {
  const Document = window.document.getElementsByTagName("frame");

  return Document === 0 ? document : Document[1].contentDocument;
}
////////////////////////////////////////////////////////////////////
const isIncludes = (arr,target)=>arr.some(el=>target.innerHTML.includes(el));
const isMax = () => {return getValue("武器能力") == 20 && getValue("防具能力") == 20;};
////////////////////////////////////////////////////////////////////
function howMenyItems(itemName) {
  return getData("アイテム一覧")?.split("/").filter(e=>e===itemName).length;
}
function isHaving(itemName) {
  return getData("アイテム一覧")?.includes(itemName);
}
function areHaving(itemNames) {
  const list = getData("アイテム一覧")?.split("/");
  let counter = 0;
  for (let i = 0; i < itemNames.length; i++) {
    if (list.includes(itemNames[i])) {
      list.splice(list.indexOf(itemNames[i]), 1);
      counter++;
    }
  }
  const txt = [
    `元の手持ち : ${getData("アイテム一覧")?.split("/")}`,
    `対象       : ${itemNames.toString()}`,
    `改変手持ち : ${list.toString()}`,
    `counter    : ${counter}`,
    `錬金 ${itemNames.length === counter ? "可能" : "不可能"}`,
  ].join("\n");
  // console.log(txt);
  return itemNames.length === counter;
}
////////////////////////////////////////////////////////////////////
function createNotionDiv(txt, key = "DEFAULT_STYLE") {
  console.log(txt);
  const div = document.createElement("div");
  const styleHTML = [
    `position: absolute;`,
    `display: block;`,
    `top: 6px;`,
    `right: 5px;`,
    `${NotionStyle(key)}`,
    `z-index: 99999999;`,
  ].join("");

  div.style = styleHTML;
  div.innerText = txt;
  getDocument().body.appendChild(div);

  return;
}
////////////////////////////////////////////////////////////////////
function NotionStyle(key) {
  return [
    `padding: 1px 3px;`,
    `color: ${getColor(key)};`,
    `background-color: ${getBgColor(key)};`,
    `font-weight: ${getBold(key) === "有効" ? "bold" : "normal"};`,
  ].join("");
}