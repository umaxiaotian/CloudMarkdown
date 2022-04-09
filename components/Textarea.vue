
<template>
  <v-app>
    <div style="height: 100vh" @keydown="keydownEditor">
      <textarea id="lineCounter" wrap="off" readonly>1.</textarea>
      <textarea
        id="codeEditor"
        wrap="off"
        @scroll="scrollEditor()"
        @input="changeEditor"
        v-on:keydown="undoRedo"
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
      history: [],
      history_position: 0,
      editFlg: false,
    };
  },
  computed: {},
  watch: {
    mainText(value) {
      document.getElementById("codeEditor").value = value;
      this.line_counter(value);
      this.changeEditor();
      //更新値と格納値が同値でなければ更新値を履歴として保存する
      if (
        (value != this.history[this.history_position - 1] &&
          this.history_position != 0 &&
          this.history_position == this.history.length) ||
        this.editFlg == false
      ) {
        this.history.push(value);
        this.history_position = this.history.length;
        this.editFlg = true;
      } else {
        if (
          value != this.history[this.history_position - 1] &&
          this.history[this.history_position - 1] != null
        ) {
          //CTRL+Zをした後にキーボード入力されたら入力された以降のARRAYを削除する。
          for (var i = this.history_position; i <= this.history.length; i++) {
            console.log("削除" + i);
            this.history.length--;
            delete this.history[i];
          }
          this.editFlg == false;

          console.log(this.history);
        }
      }
    },
    scrollTop(value) {
      document.getElementById("codeEditor").scrollTop = value;
    },
  },
  created() {},
  mounted() {
    this.codeEditor = document.getElementById("codeEditor");
    this.lineCounter = document.getElementById("lineCounter");
    this.$store.commit("editorDefine", document.getElementById("codeEditor"));
    this.$emit("codeEditorDefine", document.getElementById("codeEditor"));
  },
  methods: {
    changeEditor() {
      this.$emit("input", document.getElementById("codeEditor").value);
    },
    undoRedo(event) {
      //ZYキーの無効化
      if (event.ctrlKey) {
        switch (event.key) {
          case "z":
            this.undoRedoPosition("undo");
            // console.log(this.history);
            event.preventDefault();
            break;
          case "y":
            this.undoRedoPosition("redo");
            event.preventDefault();
            break;
        }
      }
    },
    //UNDO REDO
    undoRedoPosition(event) {
      if (event == "undo" && this.history_position > 0) {
        this.history_position--;
      }
      if (event == "redo" && this.history_position < this.history.length) {
        this.history_position++;
      }

      var text = this.history[this.history_position - 1];
      if (this.history_position == 0) {
        text = "";
      }

      document.getElementById("codeEditor").value = text;
      this.line_counter(text);
      this.changeEditor();

      if (this.history_position != 0) {
        this.changeEditor();
      } else if (this.history_position == 0 && this.editFlg != false) {
        this.$swal
          .fire({
            title: "データクリア",
            text: "これ以上戻るということはこのテキストの一時データをクリアし、新規でテキストを作成することを意味していますがよろしいですか？",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "はい",
            cancelButtonText: "いいえ",
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.resetEditor();
            } else {
              this.history_position = 0;
              //一個進んであげる（親切）
              this.undoRedoPosition("redo");
            }
          });
      }
    },
    resetEditor() {
      // 変数初期化
      this.history = [];
      this.history_position = 0;
      this.editFlg = false;
      this.changeEditor();
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
          selectionStart + 1,
          selectionStart + 1
        );
        this.codeEditor();
      }
    },

    //コードエディタの行数カウント
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
