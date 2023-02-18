import "./css/editor.css";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import cursorPosition from "../globalModules/cursorPosition";
import setCursorPosition from "../globalModules/setCursorPosition";
import AllCharacterAndSymbols from "../globalModules/AllCharacterAndSymbols";
import copy from "copy-to-clipboard";
import createSpan from "../globalModules/createSpan";
import findSelectionIndexes from "../globalModules/findSelectionIndex";
import "bootstrap/dist/css/bootstrap.min.css";
import { currentFeatureData } from "./redux/reducers/featureData";
import { useSelector } from "react-redux";
import { currentFontData } from "./redux/reducers/fontData";
import { currentTextAlign } from "./redux/reducers/textAlign";
import { currentFontFamilyData } from "./redux/reducers/fontFamilyData";
import getCaretPosition from "../globalModules/getCaretPosition";

const Editor = ({ id }) => {
  const [editorValue, setEditorValue] = useState("");
  const [isPasted, setIsPasted] = useState(false);

  const featureData = useSelector(currentFeatureData);

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isTextStrike, setIsTextStrike] = useState(false);
  const [textColor, setTextColor] = useState(false);
  const [textBackgroundColor, setTextBackgroundColor] = useState(false);

  const fontSize = useSelector(currentFontData);
  const textAlign = useSelector(currentTextAlign);
  const fontFamily = useSelector(currentFontFamilyData);

  useEffect(() => {
    getId().style.textAlign = textAlign;
  }, [textAlign]);

  useEffect(() => {
    getId().style.fontFamily = fontFamily;
  }, [fontFamily]);

  useEffect(() => {
    let findBold = featureData.find((a) => a.value == "bold");
    let findUnder = featureData.find((a) => a.value == "underline");
    let findItalic = featureData.find((a) => a.value == "italic");
    let findStrike = featureData.find((a) => a.value == "strike");

    setIsUnderline(findUnder);
    setIsBold(findBold);
    setIsItalic(findItalic);
    setIsTextStrike(findStrike);
  }, [featureData]);

  useEffect(() => {
    getId().addEventListener("contextmenu", (e) => {
      e.preventDefault();
      let selected = window.getSelection();
      let range = selected.getRangeAt(0);
      let word = range.toString();
      let pos = cursorPosition();
      let text = getId().innerText;
      let parent = getId();

      if (word) {
        let findIndex = findSelectionIndexes(text, pos, word);
        let s = findIndex.startIndex;
        let e = findIndex.endIndex;
      }
    });
  }, []);

  const selectTextToClip = () => {
    window.getSelection().selectAllChildren(getId());
    document.execCommand("selectAll");
  };

  const removeSelected = () => {
    let selection = window.getSelection();
    if (selection && selection.toString() != "") {
      let range = selection.getRangeAt(0).toString();
      let word = range;
      let text = getId().innerText;
      let pos = cursorPosition();
      let length1 = text.length;
      let length2 = range.length;

      if (length1 == length2) {
        setEditorValue("");
        getId().innerHTML = "";
      } else {
        let find = findSelectionIndexes(text, pos, word);
        let s = find.startIndex;
        let e = find.endIndex;

        let str = text.substring(0, s) + text.substring(e);
        setEditorValue(str);

        readTheString(str);
        setCursorPosition(pos, getId());
      }
    }
  };

  const readTheString = (text) => {
    let parent = getId();
    let str = text.trim();
    if (str && parent) {
      parent.innerHTML = "";
      for (var i = 0; i <= str.length; i++) {
        let node = document.createElement("span");
        node.contentEditable = true;

        if (str.charAt(i) === " ") node.innerHTML = "&nbsp;";
        else node.innerText = str.charAt(i);

        if (parent.children.length === 0) {
          parent.appendChild(node);
        } else {
          if (parent.children && parent.children.length > 0 && parent.children[i - 1]) {
            parent.children[i - 1].insertAdjacentElement("afterEnd", node);
          }
        }
      }
    }
  };

  const pasteString = (e) => {
    e.preventDefault();

    const text = window.getSelection().toString();

    if (text != "") {
      setEditorValue("");
      getId().innerHTML = "";
    }

    let paste = (e.clipboardData || window.clipboardData || e.originalEvent.clipboardData).getData("text");

    let pos = cursorPosition();
    let str = editorValue;

    if (str.length != 0) {
      let output = [str.slice(0, pos), " " + paste + " ", str.slice(pos)].join("");
      str = output;
      setEditorValue(str);
    } else {
      setEditorValue((str = paste));
    }

    setIsPasted(true);
  };

  useEffect(() => {
    if (isPasted) {
      getId().innerHTML = "";
      getId().innerHTML = createSpan(editorValue);
      setIsPasted(false);

      setTimeout(() => {
        setCursorPosition(cursorPosition() + 1, getId());
      }, 1500);
    }
  }, [isPasted]);

  const handleKeys = (e) => {
    var cKey = 67;
    var vKey = 86;

    let arr = AllCharacterAndSymbols;

    if ((e.ctrlKey || e.metaKey) && e.keyCode === vKey) {
      return false;
    }
    e.preventDefault();
    let selection = document.getSelection();

    if ((e.ctrlKey || e.metaKey) && e.keyCode === cKey) {
      e.preventDefault();
      copySelected();
      return false;
    }

    if ((e.ctrlKey || e.metaKey) && e.keyCode === 65) {
      selectTextToClip();
      e.preventDefault();
      return false;
    }

    if ((e.keyCode >= 112 && e.keyCode <= 123) || e.key === "Meta" || e.key === "ContextMenu") {
      e.preventDefault();
      return false;
    }
    if ((e.keyCode >= 65 && e.keyCode <= 95) || (e.keyCode >= 108 && e.keyCode <= 126)) {
      createNode(e.key);
    } else if (e.key == "Backspace") {
      if (selection.toString()) {
        removeSelected();
      } else {
        removeElement();
      }
    } else if (e.key == "Delete") {
      if (selection.toString()) {
        removeSelected();
      } else {
        removeByDelete();
      }
    } else if (e.code == "ArrowLeft") {
      selection.modify("move", "left", "character", "granularity");
    } else if (e.code == "ArrowRight") {
      selection.modify("move", "right", "character", "granularity");
    } else if (e.code == "ArrowUp") {
      selection.modify("move", "left", "line", "granularity");
      // getId().scrollBy(0, -25);
    } else if (e.code == "ArrowDown") {
      selection.modify("move", "right", "line", "granularity");
      // getId().scrollBy(0, 25);
    } else {
    }

    if (e.key == "Enter") {
      e.preventDefault();
    }

    arr.forEach((char) => {
      if (e.key == char) {
        createNode(e.key);
      }
    });
  };

  const removeByDelete = () => {
    try {
      let parent = getId();
      let childrens = parent.children;
      let pos = cursorPosition();
      if (childrens.length > 0 && editorValue.length !== pos) {
        let elem = childrens[pos];
        parent.removeChild(elem);
        let str = editorValue.split("");
        setCursorPosition(pos, getId());
        str.splice(pos, 1);
        str = str.join("");
        setEditorValue(str);
      } else {
        setCursorPosition(pos, getId());
      }
    } catch (e) {}
  };

  const copySelected = () => {
    let text = window.getSelection();
    let f = text.getRangeAt(0).toString();
    if (text == "") {
      copyTextToClip();
    } else {
      copy(f);
    }
  };

  const copyTextToClip = () => {
    var text = String(getId().innerText);
    copy(text);
  };

  const getId = () => {
    return document.getElementById(id);
  };

  const createNode = (ch) => {
    let pos = cursorPosition();
    let parent = getId();
    const span = document.createElement("span");
    span.contentEditable = true;

    if (ch == "Enter") {
      let br = document.createElement("br");
      br.style.whiteSpace = "pre-line";
      span.appendChild(br);
    } else {
      if (ch === " ") {
        span.innerHTML = "&nbsp;";
      } else {
        span.innerText = ch;
      }
    }

    applyFeature(span);

    if (parent.children.length === 0) {
      parent.appendChild(span);
    } else {
      if (parent.children[pos - 1]) {
        parent.children[pos - 1].insertAdjacentElement("afterEnd", span);
      } else {
        parent.children[pos].insertAdjacentElement("beforebegin", span);
      }
    }

    setCursorPosition(pos + 1, getId());
  };

  const applyFeature = (spanTag) => {
    spanTag.style.fontSize = fontSize + "px";

    if (isBold) {
      spanTag.style.fontWeight = "bold";
    }

    if (isUnderline) {
      spanTag.style.textDecoration = "underline";
    }

    if (isItalic) {
      spanTag.style.fontStyle = "italic";
    }

    if (isTextStrike) {
      spanTag.style.textDecoration = "line-through";
    }
  };

  const removeElement = () => {
    let parent = getId();
    let childrens = parent.children;
    let pos = cursorPosition();
    if (childrens.length > 0 && pos != 0) {
      let elem = childrens[pos - 1];
      parent.removeChild(elem);
      let str = editorValue.split("");
      str.splice(pos - 1, 1);
      str = str.join("");
      setEditorValue(str);
    }
  };

  const editorMain = (e) => {
    let wholeString = e.currentTarget.textContent;
    setEditorValue(wholeString);
  }; // use to get current editor value

  return (
    <>
      <div
        id={id}
        contentEditable={true}
        onInput={editorMain}
        className="main-editor-page"
        readOnly={true}
        onKeyDown={handleKeys}
        onPaste={pasteString}
      ></div>
    </>
  );
};

export default Editor;
