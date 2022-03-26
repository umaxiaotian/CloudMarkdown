
<template>
  <v-app>
    <div style="height: 100vh" @keydown="keydownEditor">
      <textarea id="lineCounter" wrap="off" readonly>1.</textarea>
      <textarea
        id="codeEditor"
        wrap="off"
        @scroll="scrollEditor()"
        @input="changeEditor"
      />
    </div>
  </v-app>
</template>

<script>
export default {
  name: "Editor",
  props: {
    scrollTop: {
      type: Number,
      default: 0,
    },
    mainText: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      lineCountCache: 0,
      codeEditor: "",
      lineCounter: "",
    };
  },
  computed: {},
  watch: {
    mainText(value) {
      document.getElementById("codeEditor").value = value;
      this.line_counter(value);
      // document.getElementById("codeEditor").focus();

      //戻る機能を実装しようと思ったが、現在Clpboard製造中で、execCommmandは廃止の動きのためいったんこのまま
      // document.execCommand('insertText', false, value);
    },
    scrollTop(value) {
      document.getElementById("codeEditor").scrollTop = value;
    },
  },
  created() {},
  mounted() {
    this.codeEditor = document.getElementById("codeEditor");
    this.lineCounter = document.getElementById("lineCounter");
    // document.getElementById("codeEditor").textContent = this.mainText;
    this.$store.commit("editorDefine", document.getElementById("codeEditor"));
    this.$emit("codeEditorDefine", document.getElementById("codeEditor"));
  },
  methods: {
    changeEditor() {
      this.$emit("input", document.getElementById("codeEditor").value);
    },
    scrollEditor() {
      this.lineCounter.scrollTop = this.codeEditor.scrollTop;
      this.lineCounter.scrollLeft = this.codeEditor.scrollLeft;
      // 親コンポーネントにスクロール情報を送信
      const scrollPlace = document.getElementById("codeEditor");
      this.$emit("textAreaScroll", scrollPlace);
    },
    // タブ入力アルゴリズム
    keydownEditor(e) {
      const { keyCode } = e;
      const { value, selectionStart, selectionEnd } = this.codeEditor;

      if (keyCode === 9) {
        // TAB = 9
        e.preventDefault();
        this.codeEditor.value =
          value.slice(0, selectionStart) + "\t" + value.slice(selectionEnd);
        this.codeEditor.setSelectionRange(
          selectionStart + 2,
          selectionStart + 2
        );
      }
    },

    line_counter(val) {
      const lineCount = val.split("\n").length;
      const outarr = new Array();
      if (this.lineCountCache != lineCount) {
        for (let x = 0; x < lineCount; x++) {
          outarr[x] = x + 1 + ".";
        }
        this.lineCounter.value = outarr.join("\n");
      }
      this.lineCountCache = lineCount;
    },
  },
};
</script>
<style scoped>
.theme--dark.v-application {
  color: black;
}
.scroll {
  /* width: 100vh; */
  height: 100vh;
  overflow: auto;
  background: #565656;
  color: #fff;
}
</style>
<style>
html,
body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-family: lucida console, courier new, courier, monospace;
  font-size: 1rem;
  font-weight: 400;
}

#codeEditor,
#lineCounter {
  font-family: lucida console, courier new, courier, monospace;
  margin: 0;
  padding: 10px 0;
  height: 100vh;
  border-radius: 0;
  resize: none;
  font-size: 16px;
  line-height: 1.2;
  outline: none;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
#codeEditor {
  padding-left: calc(3.5rem + 5px);
  width: 100%;
  /* Determine appearance of code editor */
  background-color: #313131;
  border-color: #272727;
  color: #ffffff;
}
#lineCounter {
  display: flex;
  border-color: transparent;
  overflow-y: hidden;
  text-align: right;
  box-shadow: none;
  color: #707070;
  background-color: #d8d8d8;
  position: absolute;
  width: 3.5rem;
  /* Determine appearance of line counter */
  background-color: #242424;
  border-color: #3e3d32;
  color: #928869;
}
#lineCounter:focus-visible,
#codeEditor:focus-visible {
  outline: none;
}
</style>
