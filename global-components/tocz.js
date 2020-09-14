export default {
  name: 'TableOfContents',

  props: {
    includeLevel: {
      type: Array,
      required: false,
      default: () => [2, 3],
    },
    className: {
      type: String,
      required: false,
      default: () => 'table-of-contents',
    },
    title: {
      type: String,
      required: false,
      default: () => 'On this page',
    }
  },

  computed: {
    // className(ppp) {
    //   console.log('class=====>', this.class, ppp.$props);
    //   return this.$props
    // },
    // class() {
    //   return 'table-of-contents hidden-md hidden-lg';
    // },
    headers () {
      if (this.$page && this.$page.headers) {
        const minLevel = this.includeLevel[0]
        const maxLevel = this.includeLevel[1]

        const processHeaders = (headers, rootLevel = minLevel) => {
          const result = []
          for (let i = 0; i !== headers.length;) {
            const nextRootOffset = headers.slice(i + 1).findIndex(h => h.level === rootLevel)
            const nextRootIndex = nextRootOffset === -1 ? headers.length : nextRootOffset + i + 1
            const thisHeader = headers[i]

            if (thisHeader.level >= rootLevel && thisHeader.level <= maxLevel) {
              const childHeaders = headers.slice(i + 1, nextRootIndex)
              const children = rootLevel < maxLevel && childHeaders.length > 0
                ? processHeaders(childHeaders, rootLevel + 1)
                : null
              result.push({
                ...thisHeader,
                children,
              })
            }
            i = nextRootIndex
          }
          return result
        }
        return processHeaders(this.$page.headers)
      }

      return null
    },
  },

  render (h) {
    if (!this.headers) {
      return null
    }

    const renderTitle = item => {
      if (!item) return;
      return h('h3', this.title)
    }
    const renderHeaders = items => {
      return h('ul', items.map(item => h('li', [
        h('RouterLink', {
          props: {
            to: `#${item.slug}`,
            // className: 'sidebar-linkz',
          },
        }, item.title),
        item.children ? renderHeaders(item.children) : null,
      ])))
    }
console.log('this.class ->', JSON.stringify(this.className), this.className);
    return h('div', {class: this.className}, [
      renderTitle(this.title),
      renderHeaders(this.headers),
    ])
  },
}