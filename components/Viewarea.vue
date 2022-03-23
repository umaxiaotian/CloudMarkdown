
<template>
  <div class="viewMdArea" v-html="$md.render(markdown)" @scroll="viewrScroll"/>
</template>
<script>

export default {
  name: 'Viewarea',
  props: {
    markdown: {
      type: String,
      default: ''
    }
  },
  methods:{
    viewrScroll(value){
      // console.log(value);
      this.$emit('vScroll', value)
    }
  }
}
</script>

<style scoped>
::v-deep h1:hover .anchor .octicon-link:before,
::v-deep h2:hover .anchor .octicon-link:before,
::v-deep h3:hover .anchor .octicon-link:before,
::v-deep h4:hover .anchor .octicon-link:before,
::v-deep h5:hover .anchor .octicon-link:before,
::v-deep h6:hover .anchor .octicon-link:before {
  width: 16px;
  height: 16px;
  content: " ";
  display: inline-block;
  background-color: currentColor;
  -webkit-mask-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>");
  mask-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>");
}

::v-deep details,
::v-deep figcaption,
::v-deep figure {
  display: block;
}

::v-deep summary {
  display: list-item;
}

::v-deep [hidden] {
  display: none !important;
}

::v-deep a {
  background-color: transparent;
  color: #58a6ff;
  text-decoration: none;
}

::v-deep a:active,
::v-deep a:hover {
  outline-width: 0;
}

::v-deep abbr[title] {
  border-bottom: none;
  text-decoration: underline dotted;
}

::v-deep b,
::v-deep strong {
  font-weight: 600;
}

::v-deep dfn {
  font-style: italic;
}

::v-deep h1 {
  margin: 0.67em 0;
  font-weight: 600;
  padding-bottom: 0.3em;
  font-size: 2em;
  border-bottom: 1px solid #21262d;
}

::v-deep mark {
  background-color: rgba(187, 128, 9, 0.15);
  color: #c9d1d9;
}

::v-deep small {
  font-size: 90%;
}

::v-deep sub,
::v-deep sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

::v-deep sub {
  bottom: -0.25em;
}

::v-deep sup {
  top: -0.5em;
}

::v-deep img {
  border-style: none;
  max-width: 100%;
  box-sizing: content-box;
  background-color: #0d1117;
}

::v-deep code,
::v-deep kbd,
::v-deep pre,
::v-deep samp {
  font-family: monospace, monospace;
  font-size: 1em;
}

::v-deep figure {
  margin: 1em 40px;
}

::v-deep hr {
  box-sizing: content-box;
  overflow: hidden;
  background: transparent;
  border-bottom: 1px solid #21262d;
  height: 0.25em;
  padding: 0;
  margin: 24px 0;
  background-color: #30363d;
  border: 0;
}

::v-deep input {
  font: inherit;
  margin: 0;
  overflow: visible;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

::v-deep [type="button"],
::v-deep [type="reset"],
::v-deep [type="submit"] {
  -webkit-appearance: button;
}

::v-deep [type="button"]::-moz-focus-inner,
::v-deep [type="reset"]::-moz-focus-inner,
::v-deep [type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

::v-deep [type="button"]:-moz-focusring,
::v-deep [type="reset"]:-moz-focusring,
::v-deep [type="submit"]:-moz-focusring {
  outline: 1px dotted ButtonText;
}

::v-deep [type="checkbox"],
::v-deep [type="radio"] {
  box-sizing: border-box;
  padding: 0;
}

::v-deep [type="number"]::-webkit-inner-spin-button,
::v-deep [type="number"]::-webkit-outer-spin-button {
  height: auto;
}

::v-deep [type="search"] {
  -webkit-appearance: textfield;
  outline-offset: -2px;
}

::v-deep [type="search"]::-webkit-search-cancel-button,
::v-deep [type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}

::v-deep ::-webkit-input-placeholder {
  color: inherit;
  opacity: 0.54;
}

::v-deep ::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}

::v-deep a:hover {
  text-decoration: underline;
}

::v-deep hr::before {
  display: table;
  content: "";
}

::v-deep hr::after {
  display: table;
  clear: both;
  content: "";
}

::v-deep table {
  border-spacing: 0;
  border-collapse: collapse;
  display: block;
  width: max-content;
  max-width: 100%;
  overflow: auto;
}

::v-deep td,
::v-deep th {
  padding: 0;
}

::v-deep details summary {
  cursor: pointer;
}

::v-deep details:not([open]) > *:not(summary) {
  display: none !important;
}

::v-deep kbd {
  display: inline-block;
  padding: 3px 5px;
  font: 11px ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas,
    Liberation Mono, monospace;
  line-height: 10px;
  color: #c9d1d9;
  vertical-align: middle;
  background-color: #161b22;
  border: solid 1px rgba(110, 118, 129, 0.4);
  border-bottom-color: rgba(110, 118, 129, 0.4);
  border-radius: 6px;
  box-shadow: inset 0 -1px 0 rgba(110, 118, 129, 0.4);
}

::v-deep h1,
::v-deep h2,
::v-deep h3,
::v-deep h4,
::v-deep h5,
::v-deep h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}

::v-deep h2 {
  font-weight: 600;
  padding-bottom: 0.3em;
  font-size: 1.5em;
  border-bottom: 1px solid #21262d;
}

::v-deep h3 {
  font-weight: 600;
  font-size: 1.25em;
}

::v-deep h4 {
  font-weight: 600;
  font-size: 1em;
}

::v-deep h5 {
  font-weight: 600;
  font-size: 0.875em;
}

::v-deep h6 {
  font-weight: 600;
  font-size: 0.85em;
  color: #8b949e;
}

::v-deep p {
  margin-top: 0;
  margin-bottom: 10px;
}

::v-deep blockquote {
  margin: 0;
  padding: 0 1em;
  color: #8b949e;
  border-left: 0.25em solid #30363d;
}

::v-deep ul,
::v-deep ol {
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 2em;
}

::v-deep ol ol,
::v-deep ul ol {
  list-style-type: lower-roman;
}

::v-deep ul ul ol,
::v-deep ul ol ol,
::v-deep ol ul ol,
::v-deep ol ol ol {
  list-style-type: lower-alpha;
}

::v-deep dd {
  margin-left: 0;
}

::v-deep tt,
::v-deep code {
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas,
    Liberation Mono, monospace;
  font-size: 12px;
}

::v-deep pre {
  margin-top: 0;
  margin-bottom: 0;
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas,
    Liberation Mono, monospace;
  font-size: 12px;
  word-wrap: normal;
}

::v-deep .octicon {
  display: inline-block;
  overflow: visible !important;
  vertical-align: text-bottom;
  fill: currentColor;
}

::v-deep ::placeholder {
  color: #484f58;
  opacity: 1;
}

::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button {
  margin: 0;
  -webkit-appearance: none;
  appearance: none;
}

::v-deep .pl-c {
  color: #8b949e;
}

::v-deep .pl-c1,
::v-deep .pl-s .pl-v {
  color: #79c0ff;
}

::v-deep .pl-e,
::v-deep .pl-en {
  color: #d2a8ff;
}

::v-deep .pl-smi,
::v-deep .pl-s .pl-s1 {
  color: #c9d1d9;
}

::v-deep .pl-ent {
  color: #7ee787;
}

::v-deep .pl-k {
  color: #ff7b72;
}

::v-deep .pl-s,
::v-deep .pl-pds,
::v-deep .pl-s .pl-pse .pl-s1,
::v-deep .pl-sr,
::v-deep .pl-sr .pl-cce,
::v-deep .pl-sr .pl-sre,
::v-deep .pl-sr .pl-sra {
  color: #a5d6ff;
}

::v-deep .pl-v,
::v-deep .pl-smw {
  color: #ffa657;
}

::v-deep .pl-bu {
  color: #f85149;
}

::v-deep .pl-ii {
  color: #f0f6fc;
  background-color: #8e1519;
}

::v-deep .pl-c2 {
  color: #f0f6fc;
  background-color: #b62324;
}

::v-deep .pl-sr .pl-cce {
  font-weight: bold;
  color: #7ee787;
}

::v-deep .pl-ml {
  color: #f2cc60;
}

::v-deep .pl-mh,
::v-deep .pl-mh .pl-en,
::v-deep .pl-ms {
  font-weight: bold;
  color: #1f6feb;
}

::v-deep .pl-mi {
  font-style: italic;
  color: #c9d1d9;
}

::v-deep .pl-mb {
  font-weight: bold;
  color: #c9d1d9;
}

::v-deep .pl-md {
  color: #ffdcd7;
  background-color: #67060c;
}

::v-deep .pl-mi1 {
  color: #aff5b4;
  background-color: #033a16;
}

::v-deep .pl-mc {
  color: #ffdfb6;
  background-color: #5a1e02;
}

::v-deep .pl-mi2 {
  color: #c9d1d9;
  background-color: #1158c7;
}

::v-deep .pl-mdr {
  font-weight: bold;
  color: #d2a8ff;
}

::v-deep .pl-ba {
  color: #8b949e;
}

::v-deep .pl-sg {
  color: #484f58;
}

::v-deep .pl-corl {
  text-decoration: underline;
  color: #a5d6ff;
}

::v-deep [data-catalyst] {
  display: block;
}

::v-deep g-emoji {
  font-family: "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 1em;
  font-style: normal !important;
  font-weight: 400;
  line-height: 1;
  vertical-align: -0.075em;
}

::v-deep g-emoji img {
  width: 1em;
  height: 1em;
}

::v-deep::before {
  display: table;
  content: "";
}

::v-deep::after {
  display: table;
  clear: both;
  content: "";
}

::v-deep > *:first-child {
  margin-top: 0 !important;
}

::v-deep > *:last-child {
  margin-bottom: 0 !important;
}

::v-deep a:not([href]) {
  color: inherit;
  text-decoration: none;
}

::v-deep .absent {
  color: #f85149;
}

::v-deep .anchor {
  float: left;
  padding-right: 4px;
  margin-left: -20px;
  line-height: 1;
}

::v-deep .anchor:focus {
  outline: none;
}

::v-deep p,
::v-deep blockquote,
::v-deep ul,
::v-deep ol,
::v-deep dl,
::v-deep table,
::v-deep pre,
::v-deep details {
  margin-top: 0;
  margin-bottom: 16px;
}

::v-deep blockquote > :first-child {
  margin-top: 0;
}

::v-deep blockquote > :last-child {
  margin-bottom: 0;
}

::v-deep sup > a::before {
  content: "[";
}

::v-deep sup > a::after {
  content: "]";
}

::v-deep h1 .octicon-link,
::v-deep h2 .octicon-link,
::v-deep h3 .octicon-link,
::v-deep h4 .octicon-link,
::v-deep h5 .octicon-link,
::v-deep h6 .octicon-link {
  color: #c9d1d9;
  vertical-align: middle;
  visibility: hidden;
}

::v-deep h1:hover .anchor,
::v-deep h2:hover .anchor,
::v-deep h3:hover .anchor,
::v-deep h4:hover .anchor,
::v-deep h5:hover .anchor,
::v-deep h6:hover .anchor {
  text-decoration: none;
}

::v-deep h1:hover .anchor .octicon-link,
::v-deep h2:hover .anchor .octicon-link,
::v-deep h3:hover .anchor .octicon-link,
::v-deep h4:hover .anchor .octicon-link,
::v-deep h5:hover .anchor .octicon-link,
::v-deep h6:hover .anchor .octicon-link {
  visibility: visible;
}

::v-deep h1 tt,
::v-deep h1 code,
::v-deep h2 tt,
::v-deep h2 code,
::v-deep h3 tt,
::v-deep h3 code,
::v-deep h4 tt,
::v-deep h4 code,
::v-deep h5 tt,
::v-deep h5 code,
::v-deep h6 tt,
::v-deep h6 code {
  padding: 0 0.2em;
  font-size: inherit;
}

::v-deep ul.no-list,
::v-deep ol.no-list {
  padding: 0;
  list-style-type: none;
}

::v-deep ol[type="1"] {
  list-style-type: decimal;
}

::v-deep ol[type="a"] {
  list-style-type: lower-alpha;
}

::v-deep ol[type="i"] {
  list-style-type: lower-roman;
}

::v-deep div > ol:not([type]) {
  list-style-type: decimal;
}

::v-deep ul ul,
::v-deep ul ol,
::v-deep ol ol,
::v-deep ol ul {
  margin-top: 0;
  margin-bottom: 0;
}

::v-deep li > p {
  margin-top: 16px;
}

::v-deep li + li {
  margin-top: 0.25em;
}

::v-deep dl {
  padding: 0;
}

::v-deep dl dt {
  padding: 0;
  margin-top: 16px;
  font-size: 1em;
  font-style: italic;
  font-weight: 600;
}

::v-deep dl dd {
  padding: 0 16px;
  margin-bottom: 16px;
}

::v-deep table th {
  font-weight: 600;
}

::v-deep table th,
::v-deep table td {
  padding: 6px 13px;
  border: 1px solid #30363d;
}

::v-deep table tr {
  background-color: #0d1117;
  border-top: 1px solid #21262d;
}

::v-deep table tr:nth-child(2n) {
  background-color: #161b22;
}

::v-deep table img {
  background-color: transparent;
}

::v-deep img[align="right"] {
  padding-left: 20px;
}

::v-deep img[align="left"] {
  padding-right: 20px;
}

::v-deep .emoji {
  max-width: none;
  vertical-align: text-top;
  background-color: transparent;
}

::v-deep span.frame {
  display: block;
  overflow: hidden;
}

::v-deep span.frame > span {
  display: block;
  float: left;
  width: auto;
  padding: 7px;
  margin: 13px 0 0;
  overflow: hidden;
  border: 1px solid #30363d;
}

::v-deep span.frame span img {
  display: block;
  float: left;
}

::v-deep span.frame span span {
  display: block;
  padding: 5px 0 0;
  clear: both;
  color: #c9d1d9;
}

::v-deep span.align-center {
  display: block;
  overflow: hidden;
  clear: both;
}

::v-deep span.align-center > span {
  display: block;
  margin: 13px auto 0;
  overflow: hidden;
  text-align: center;
}

::v-deep span.align-center span img {
  margin: 0 auto;
  text-align: center;
}

::v-deep span.align-right {
  display: block;
  overflow: hidden;
  clear: both;
}

::v-deep span.align-right > span {
  display: block;
  margin: 13px 0 0;
  overflow: hidden;
  text-align: right;
}

::v-deep span.align-right span img {
  margin: 0;
  text-align: right;
}

::v-deep span.float-left {
  display: block;
  float: left;
  margin-right: 13px;
  overflow: hidden;
}

::v-deep span.float-left span {
  margin: 13px 0 0;
}

::v-deep span.float-right {
  display: block;
  float: right;
  margin-left: 13px;
  overflow: hidden;
}

::v-deep span.float-right > span {
  display: block;
  margin: 13px auto 0;
  overflow: hidden;
  text-align: right;
}

::v-deep code,
::v-deep tt {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(110, 118, 129, 0.4);
  border-radius: 6px;
}

::v-deep code br,
::v-deep tt br {
  display: none;
}

::v-deep del code {
  text-decoration: inherit;
}

::v-deep pre code {
  font-size: 100%;
}

::v-deep pre > code {
  padding: 0;
  margin: 0;
  word-break: normal;
  white-space: pre;
  background: transparent;
  border: 0;
}

::v-deep .highlight {
  margin-bottom: 16px;
}

::v-deep .highlight pre {
  margin-bottom: 0;
  word-break: normal;
}

::v-deep .highlight pre,
::v-deep pre {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #161b22;
  border-radius: 6px;
}

::v-deep pre code,
::v-deep pre tt {
  display: inline;
  max-width: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  line-height: inherit;
  word-wrap: normal;
  background-color: transparent;
  border: 0;
}

::v-deep .csv-data td,
::v-deep .csv-data th {
  padding: 5px;
  overflow: hidden;
  font-size: 12px;
  line-height: 1;
  text-align: left;
  white-space: nowrap;
}

::v-deep .csv-data .blob-num {
  padding: 10px 8px 9px;
  text-align: right;
  background: #0d1117;
  border: 0;
}

::v-deep .csv-data tr {
  border-top: 0;
}

::v-deep .csv-data th {
  font-weight: 600;
  background: #161b22;
  border-top: 0;
}

::v-deep .footnotes {
  font-size: 12px;
  color: #8b949e;
  border-top: 1px solid #30363d;
}

::v-deep .footnotes ol {
  padding-left: 16px;
}

::v-deep .footnotes li {
  position: relative;
}

::v-deep .footnotes li:target::before {
  position: absolute;
  top: -8px;
  right: -8px;
  bottom: -8px;
  left: -24px;
  pointer-events: none;
  content: "";
  border: 2px solid #1f6feb;
  border-radius: 6px;
}

::v-deep .footnotes li:target {
  color: #c9d1d9;
}

::v-deep .footnotes .data-footnote-backref g-emoji {
  font-family: monospace;
}

::v-deep .task-list-item {
  list-style-type: none;
}

::v-deep .task-list-item label {
  font-weight: 400;
}

::v-deep .task-list-item.enabled label {
  cursor: pointer;
}

::v-deep .task-list-item + .task-list-item {
  margin-top: 3px;
}

::v-deep .task-list-item .handle {
  display: none;
}

::v-deep .task-list-item-checkbox {
  margin: 0 0.2em 0.25em -1.6em;
  vertical-align: middle;
}

::v-deep .contains-task-list:dir(rtl) .task-list-item-checkbox {
  margin: 0 -1.6em 0.25em 0.2em;
}

::v-deep ::-webkit-calendar-picker-indicator {
  filter: invert(50%);
}

/* mermaid */
/* image container */
::v-deep div.mermaid {
    width: fit-content;
}

/* image title */
::v-deep .mermaid-title {
    width: fit-content;
    margin: auto;
    font-weight: 900;
    font-size: 2em;
    color: white;
    padding-bottom: 0.5em;
}

/* image itself */
::v-deep .mermaid > svg {
    margin: auto;
    display: block;
}

</style>

<style scoped>
/* システム部分のCSS */
.viewMdArea {
  /* width: 100vh; */
  height: 100vh;
  overflow: auto;
  background: #0d1117;
  color: #c9d1d9;
}
</style>
