import MarkdownIt from 'markdown-it'
import markdownItGithubToc from 'markdown-it-github-toc'
import MarkdownItMermaid from '@datatracCorporation/markdown-it-mermaid'
export default ({ app }, inject) => {
  const md = new MarkdownIt({
    langPrefix: 'language-',
    preset: 'default',
    linkify: false,
    breaks: true,
    html: true,
    typegraphy: true
  })
  md.use(MarkdownItMermaid, {
    startOnLoad: false,
    securityLevel: true,
    theme: 'dark',
    flowchart: {
      htmlLabels: false,
      useMaxWidth: true
    }
  })
  md.use(require('markdown-it-emoji'))
  //   md.use(require('markdown-it-plantuml'))
  md.use(markdownItGithubToc)

  inject('md', md)
}
