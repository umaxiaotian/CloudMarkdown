<template>
  <v-navigation-drawer
    width="380px"
    :class="appBarColor"
    class="darken-3"
    permanent
  >
    <v-toolbar
      :class="appBarColor"
      class="darken-3"
      flat
      :extended="isSearching"
      style="position: sticky; top: 0; z-index: 1; margin-right: 1px"
    >
      <v-btn class="ma-2" text icon color="primary" @click="save()">
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
      <v-toolbar-title> ツールバー </v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-text-field
      autofocus
      style="margin-bottom: -25px"
      class="mr-2"
      prepend-inner-icon="mdi-file-document-edit"
      clearable
      rounded
      filled
      solo
      flat
      dense
      placeholder="タイトル"
      :value="article_detail.title"
      @change="titleChange"
    />
    <v-list subheader two-line>
      <v-subheader>記事の画像</v-subheader>

      <v-file-input
        label="記事トップの画像"
        accept="image/*"
        prepend-icon="mdi-image"
        :value="current_article_img"
        @change="onImageUploaded"
      ></v-file-input>

      <v-subheader>関連タグ</v-subheader>
      <v-combobox
        v-model="selection_tag"
        :items="tags_all_list"
        selection_tag
        clearable
        multiple
        background-color="primary"
        solo
      >
        <template v-slot:selection="{ attrs, item, select, selected }">
          <v-chip
            v-bind="attrs"
            :input-value="selected"
            close
            @click="select"
            @click:close="remove(item)"
          >
            <strong>{{ item }}</strong
            >&nbsp;
          </v-chip>
        </template>
      </v-combobox>

      <v-subheader>構文リスト</v-subheader>

      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>
        <v-dialog v-model="dialog" v-if="dialog" max-width="500">
          <v-card>
            <v-card-title class="text-h5">
              追加する画像を選択してください。
            </v-card-title>
            <v-file-input
              label="画像の選択"
              accept="image/*"
              prepend-icon="mdi-image"
              @change="onUploadArticleImg"
            ></v-file-input>
          </v-card>
        </v-dialog>

        <v-list-item
          v-for="child in item.items"
          :key="child.title"
          @click="editText(child.handle, child.mdTextHead, child.mdTextTail)"
        >
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  components: {},
  methods: {
    //記事を保存する。
    async save() {
      if (this.article_detail.title) {
        //post候補
        var filename = null;
        var selection_tag = null;
        var define_editor_text = null;
        var title = this.article_detail.title;

        if (this.article_img && this.article_img.length != 0) {
          // console.log(this.article_img);
          let params = new FormData();
          params.append("upload_file", this.article_img);
          const file = await this.$util.authPost("/uploadfile/", params);
          filename = file.filename;
        }

        if (this.selection_tag && this.selection_tag.length != 0) {
          selection_tag = this.selection_tag;
        }

        const editorDefine = this.$store.state.editorDefineData;
        if (editorDefine.value) {
          define_editor_text = editorDefine.value;
        }

        // console.log(title);
        // console.log(filename);
        // console.log(selection_tag);
        // console.log(define_editor_text);
        this.$emit("save", title,filename,selection_tag,define_editor_text);

      } else {
        this.$swal.fire({
          icon: "error",
          title: "バリデーションエラー",
          text: "タイトルは必ず入力してください！！",
        });
      }
    },
    onImageUploaded(item) {
      this.article_img = item;
    },

    //タイトルに変更があったっ場合に実行
    titleChange(val) {
      this.article_detail.title = val;
    },

    //画像追加時の処理
    async onUploadArticleImg(item) {

      if ((item && item.name) || (item && item.length != 0)) {
        let params = new FormData();
        params.append("upload_file", item);
        const result = await this.$util.authPost("/uploadfile/", params);
        const ExtraFile = process.env.extrafile;
        this.editText( "LeftAdd","![画像](" + ExtraFile + "/extraResource/" + result.filename + ")\n");
      }
      //自滅
      this.dialog = false;
    },

    //左側に文字を追加するアクション
    editText(handle, mdTextHead, mdTextTail) {
      // console.log(mdTextHead)
      var editorDefine = this.$store.state.editorDefineData;
      var pos_start = editorDefine.selectionStart;
      var pos_end = editorDefine.selectionEnd;
      var val = editorDefine.value;

      if (handle == "addPicture") {
        if (this.dialog == false) {
          this.dialog = true;
        } else {
          this.dialog = false;
        }
      }

      if (handle == "LeftAdd") {
        var headLine = 0;
        for (let i = pos_start; i--; ) {
          var ranges = val.slice(i, pos_start);
          if (ranges.match(/\n/)) {
            //改行コード2文字分を加算
            headLine = i + 1;
            break;
          }
        }

        var beforeNode = val.slice(0, headLine);
        var afterNode = val.slice(headLine);
        var insertNode = mdTextHead + " " ;
        this.$store.commit("markdownText", beforeNode + insertNode + afterNode);
      }
      if (handle == "Center") {
        var range = val.slice(pos_start, pos_end);
        var beforeNode = val.slice(0, pos_start);
        var afterNode = val.slice(pos_end);
        var insertNode = mdTextHead + range + mdTextTail;
        this.$store.commit("markdownText", beforeNode + insertNode + afterNode);
      }
    },
    remove(item) {
      this.selection_tag.splice(this.selection_tag.indexOf(item), 1);
      this.selection_tag = [...this.selection_tag];
    },
  },
  props: {
    article_detail: {
      default: [],
    },
    tags_all: {
      default: [],
    },
  },
  watch: {
    //記事内容のタグを配列に追加
    article_detail(val) {
      const select_tags = [];
      const tags = val.tags;
      tags.forEach((element) => {
        select_tags.push(element.tag_name);
      });
      this.selection_tag = select_tags;

      this.current_article_img = new File(["image"], this.article_detail.img, {
        type: "text/plain",
      });
    },
    //ユーザーが選択できるタグ配列を導入
    tags_all(val) {
      const tags_all = [];
      val.forEach((element) => {
        tags_all.push(element.tag_name);
      });

      this.tags_all_list = tags_all;
    },
  },
  data: () => ({
    selection_tag: [],
    tags_all_list: [],
    current_article_img: [],
    article_img: [],
    dialog: false,
    items: [
      {
        action: "mdi-ab-testing",
        // active: true,
        items: [
          { title: "大見出し(h1)", handle: "LeftAdd", mdTextHead: "#" },
          { title: "大見出し(h2)", handle: "LeftAdd", mdTextHead: "##" },
          { title: "中見出し(h3)", handle: "LeftAdd", mdTextHead: "###" },
          { title: "中見出し(h4)", handle: "LeftAdd", mdTextHead: "####" },
          { title: "小見出し(h5)", handle: "LeftAdd", mdTextHead: "#####" },
          { title: "小見出し(h6)", handle: "LeftAdd", mdTextHead: "######" },
          { title: "引用", handle: "LeftAdd", mdTextHead: ">" },
          { title: "引用ネスト", handle: "LeftAdd", mdTextHead: ">>" },
          {
            title: "太文字",
            handle: "Center",
            mdTextHead: "**",
            mdTextTail: "**",
          },
          {
            title: "打消し線",
            handle: "Center",
            mdTextHead: "~~",
            mdTextTail: "~~",
          },
        ],
        title: "文章見出し",
      },
      {
        action: "mdi-select-place",

        items: [
          {
            title: "中央",
            handle: "Center",
            mdTextHead: '<div style="text-align: center;">',
            mdTextTail: "</div>",
          },
          {
            title: "右寄せ",
            handle: "Center",
            mdTextHead: '<div style="text-align: right;">',
            mdTextTail: "</div>",
          },
          {
            title: "左寄せ",
            handle: "Center",
            mdTextHead: '<div style="text-align: left;">',
            mdTextTail: "</div>",
          },
        ],
        title: "配置",
      },

      {
        action: "mdi-pencil-plus-outline",
        items: [
          {
            title: "水平線",
            handle: "LeftAdd",
            mdTextHead: "\n---------------------------------------\n",
          },
          {
            title: "表（テーブル 2x2）",
            handle: "LeftAdd",
            mdTextHead:
              "\n\n|  TH  |  TH  |\n| ---- | ---- |\n|  TD  |  TD  |\n|  TD  |  TD  |\n\n",
          },
          {
            title: "画像追加",
            handle: "addPicture",
            mdTextHead: null,
          },
        ],

        title: "挿入",
      },
    ],
    drawer: true,
    appBarColor: "grey",
    appBarTitle: "Tasks",
    appBarIcon: "mdi-lightbulb",
    isSearching: false,
    links: [
      { label: "Inbox", icon: "mdi-inbox", color: "background" },
      {
        label: "Planned",
        icon: "mdi-clock-outline",
        color: "background",
      },
    ],
    projects: [
      { label: "Accounting", color: "cyan", due_count: 1 },
      { label: "Secret Game", color: "green" },
      { label: "Dashboard", color: "primary", due_count: 1 },
    ],
  }),
};
</script>
