
<template>
  <v-app>
    <splitpanes
      class="default-theme"
      style="height: 100%"
      @resize="paneSize = $event[0].size"
    >
      <pane :size="paneSize">
        <div @mouseover="forcus('Editor')">
          <Textarea
            id="leftEditor"
            :scroll-top="editorScrollTop"
            :main-text="markdown"
            ref="editor"
            @textAreaScroll="editorScroll"
            @input="inputEditor"
            @codeEditorDefine="codeEditorDefine"
          />
        </div>
      </pane>
      <pane :size="100 - paneSize">
        <div @mouseover="forcus('Viewr')">
          <Viewarea
            id="rightView"
            :markdown="markdown"
            @vScroll="viewrScroll"
          />
        </div>
      </pane>
    </splitpanes>
  </v-app>
</template>

<script>
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import Textarea from "@/components/EditorComponents/Textarea";
import Viewarea from "@/components/EditorComponents/Viewarea";
export default {
  name: "Editor",
  components: { Splitpanes, Pane, Textarea, Viewarea },
  data() {
    return {
      paneSize: 50,
      editorScrollTop: 0,
      editorScrollDefine: null,
      viewrScrollDefine: null,
      markdown: "",

      whichBlockOver: "Editor",
    };
  },
  computed: {
    markdownText() {
      return this.$store.getters.markdownText;
    },
  },
  watch: {
    markdownText(val) {
      this.inputEditor(val);
    },
  },
  mounted() {
    //   this.$store.commit('markdownText',  this.markdown)
    //  this.editorData = this.$store.state.markdownText;
  },
  created() {
  
  },
  mounted() {
    const rView = document.getElementById("rightView");
    this.viewrScrollDefine = rView;
  },
  methods: {
    forcus(val) {
      this.whichBlockOver = val;
    },
    codeEditorDefine(val) {
      // console.log(val);
      this.editorScrollDefine = val;

      this.$emit("editorDefine", this.editorScrollDefine);
    },
    editorScroll(val) {
      // スクロール比率を計算　（100%が1）
      const scrollRatio = val.scrollTop / (val.scrollHeight - val.clientHeight);
      this.scrollMerge(scrollRatio);
    },
    viewrScroll(val) {
      // const leditor = document.getElementById("leftEditor");
      // this.editorScrollDefine = leditor;
      // console.log(this.editorScrollDefine.scrollTop);

      // スクロール比率を計算　（100%が1）
      const scrollRatio =
        val.target.scrollTop /
        (val.target.scrollHeight - val.target.clientHeight);
      this.scrollMerge(scrollRatio);
    },
    scrollMerge(ratio) {
      if (this.whichBlockOver == "Editor") {
        this.viewrScrollDefine.scrollTop =
          (this.viewrScrollDefine.scrollHeight -
            this.viewrScrollDefine.clientHeight) *
          ratio;
      }
      if (this.whichBlockOver == "Viewr") {
        this.editorScrollTop =
          (this.editorScrollDefine.scrollHeight -
            this.editorScrollDefine.clientHeight) *
          ratio;
      }
    },

    // 文字列を更新
    inputEditor(contents) {
      this.markdown = contents;
    },
  },
};
</script>
