var allOutline = document.getElementsByTagName("body")[0].getElementsByTagName("*");
var allLength = allOutline.length;


function toggleHidden() {
  var allOutlines = new Array();
  for (var i = 0, j = 0, len = allOutline.length; i < len; i++) {
    var outline = allOutline[i];
    var goutline = outline.className.startsWith("outline-text-")
      ? outline
      : null;
    if (!goutline) continue;
    allOutlines[j++] = goutline;
  }

  if (!isAllHidden(allOutlines)) {
    hiddenAllElement(allOutlines);
  } else {
    showAllElement(allOutlines);
  }

}

function isAllHidden(elements) {
  for (var i = 0; i < elements.length; ++i) {
    if (elements[i].style.display === "") {
      return false;
    }
  }
  return true;
}

function hiddenAllElement(elements) {
  for (var i = 0; i < elements.length; ++i) {
    hiddenElement(elements[i]);
  }
}

function showAllElement(elements) {
  for (var i = 0; i < elements.length; ++i) {
    showElement(elements[i]);
  }

}

function hiddenElement(element) {
  element.style.display = "none";
}

function showElement(element) {
  element.style.display = "";
}

function createToggleButton() {
  var toggleElement = document.createElement("input");
  toggleElement.setAttribute("value", "😱");
  toggleElement.setAttribute("title", "⇲循环⇱");
  toggleElement.setAttribute(
    "style",
    "position: fixed; bottom: 20px; right: 10px;"
    + "background:white;font-size:2rem;"
    + "border-radius:25px;border:solid 2px white;"
    + "cursor:pointer;"
  );
  toggleElement.setAttribute("type", "button");
  toggleElement.setAttribute("id", "toggle");
  document.getElementsByTagName("body")[0].appendChild(toggleElement);

}

function toggleSignedHidden(element) {
  var isDisplay = element.style.display === "";
  if (isDisplay) {
    // element.setAttribute("style", "display:none");
    element.style.display = "none";
  } else {
    // element.removeAttribute("style");
    element.style.display = "";
  }
}

function initToggleOutline(e) {
  for (var i = 0; i < allLength; ++i) {
    if (allOutline[i].className.search(/outline-[0-9]+/i) != -1) {
      var currOutline = allOutline[i];  /* currOutline的类名为 outline-[0-9]+ */
      if (!currOutline) continue;
      currOutline.onclick = function (e) {    /* 大纲被点击了 */
        var thisEle = e.target;
        e.stopPropagation();
        var thisEleTagName = thisEle.tagName;
        if (thisEleTagName.search(/h[0-9]/i) == -1) return;
        var num = thisEleTagName.substring(thisEleTagName.length - 1, thisEleTagName.length);
        // var currText = thisEle.getElementsByClassName("outline-text-" + num)[0];
        var currText = thisEle.querySelector("#" + thisEle.id + "+.outline-text-" + num);
        if (!currText) return;
        toggleSignedHidden(currText);
        return;
      }
    }
  }
}

function createSourceCodeTool() {
  var openTool = document.createElement("span");
  openTool.setAttribute("style", "display:none; position: absolute; right:0.7%; top: 40px; z-index: 9; "
    + "cursor:pointer;");
  openTool.className = "openTool";
  openTool.innerHTML = "展开";

  for (var i = 0; i < allLength; ++i) {
    var srcOrg;
    if (allOutline[i].className && allOutline[i].className === "org-src-container") {
      srcOrg = allOutline[i].getElementsByClassName("src")[0];


      // srcOrg.setAttribute("style", "position:relative;");
      srcOrg.addEventListener("mouseenter", function (event) {
        var openChild = event.target.getElementsByClassName("openTool")[0];
        openChild.style.display = "inline";
      });
      srcOrg.addEventListener("mouseleave", function () {
        var openChild = event.target.getElementsByClassName("openTool")[0];
        openChild.style.display = "none";
      });
      var openToolClone = openTool.cloneNode(true);
      openToolClone.onclick = function (e) {
        var curr = e.target;
        if (curr.parentNode.style.maxHeight !== "100%") {
          curr.parentNode.style.maxHeight = "100%";
          curr.innerHTML = "收缩";
        } else {
          curr.parentNode.style.maxHeight = "400px";
          curr.innerHTML = "展开";

        }
      }
      srcOrg.appendChild(openToolClone);
    }

  }

  /*     color: #fff;
    background-color: #449d44;
    border-color: #398439; */


}

/**
 * 为网页添加图标
 * @param icon的路径 url
 * @param icon资源的类型,例如标题栏的图标"icon",收藏夹的图标"shortcut icon" type
 */
function addIcon(url,type) {
  var headEle = document.getElementsByTagName("head")[0];
  var icon = document.createElement("link");
  icon.setAttribute("rel", type);
  icon.setAttribute("href", url);
  icon.setAttribute("type", "image/x-icon");

  headEle.append(icon)
}

function init() {
  /* 制作全局折叠/展开大纲按钮 */
  createToggleButton();
  var toggle = document.getElementById("toggle");
  toggle.onclick = toggleHidden;

  /* 大纲的显示/折叠 */
  initToggleOutline();

  /* 添加icon */
  addIcon("./logo_rain2.ico", "icon"); /* 创建标题栏的icon */
  addIcon("./logo_rain2.ico","shortcut icon") /* 创建收藏夹的icon */

  /* 制作源码工具栏 */
  createSourceCodeTool();
}
