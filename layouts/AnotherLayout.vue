<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <Navbar
      v-if="shouldShowNavbar"
      @toggle-sidebar="toggleSidebar"
    />

    <div
      class="sidebar-mask"
      @click="toggleSidebar(false)"
    />

    <Sidebar
      :items="sidebarItems"
      :toc-items="tocbarItems"
      @toggle-sidebar="toggleSidebar"
    >
      <template #top>
        <!-- <slot name="sidebar-top" /> -->
        <Content slot-key="sidebar-top"/>
      </template>
      <template #bottom>
        <!-- <slot name="sidebar-bottom" /> -->
        <Content slot-key="sidebar-bottom"/>
      </template>
    </Sidebar>

    <Home v-if="$page.frontmatter.home" />

    <Page
      v-else
      :sidebar-items="sidebarItems"
    >
      <!-- <template #top>
        <Content slot-key="page-top"/>
      </template> -->
      <template #bottom>
        <!-- <slot name="page-bottom" /> -->
        <Content slot-key="page-bottom"/>
      </template>
    </Page>
    <!-- <pre><code>{{dis(this)}}</code></pre> -->
  </div>
</template>

<script>
const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};
import {stringify} from 'flatted';
import Home from '../components/Home.vue'
import Navbar from '../components/Navbar.vue'
import Page from '../components/Page.vue'
import Sidebar from '../components/Sidebar.vue'
import { resolveSidebarItems, resolveTocItems } from '../util'
export default {
  name: 'Layout',
  components: {
    Home,
    Page,
    Sidebar,
    Navbar
  },
  data () {
    return {
      isSidebarOpen: false
    }
  },
  computed: {
    // dis() {
    //   // return stringify(this);
    //   // return JSON.parse(JSON.stringify(this));
    // },
    shouldShowNavbar () {
      const { themeConfig } = this.$site
      const { frontmatter } = this.$page
      if (
        frontmatter.navbar === false
        || themeConfig.navbar === false) {
        return false
      }
      return (
        this.$title
        || themeConfig.logo
        || themeConfig.repo
        || themeConfig.nav
        || this.$themeLocaleConfig.nav
      )
    },
    shouldShowSidebar () {
      const { frontmatter } = this.$page
      return (
        !frontmatter.home
        && frontmatter.sidebar !== false
        && this.sidebarItems.length
      )
    },
    tocbarItems() {
      return resolveTocItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      )
    },
    sidebarItems () {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      )
    },
    pageClasses () {
      const userPageClass = this.$page.frontmatter.pageClass
      return [
        {
          'no-navbar': !this.shouldShowNavbar,
          'sidebar-open': this.isSidebarOpen,
          'no-sidebar': !this.shouldShowSidebar
        },
        userPageClass
      ]
    }
  },
  mounted () {
    this.$router.afterEach(() => {
      this.isSidebarOpen = false
    })
  },
  methods: {
    toggleSidebar (to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
      this.$emit('toggle-sidebar', this.isSidebarOpen)
    },
    // side swipe
    onTouchStart (e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
    },
    onTouchEnd (e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x
      const dy = e.changedTouches[0].clientY - this.touchStart.y
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true)
        } else {
          this.toggleSidebar(false)
        }
      }
    },
    getCircularReplacer,
    stringify,
    dis(data) {
      stringify(data);
    }
  }
}
</script>

<style scoped>
.theme-container {
  background:rgb(210, 167, 167);
}
</style>