<template>
  <main class="page">
    <!-- <slot name="top" /> -->

    <div class="theme-default-content">
      <Content slot-key="page-top"/>

      <PageAuthors class="hidden-md hidden-lg"/>
      <TOCZ class="hidden-md hidden-lg"/>

      <Content class="" />
      <Content slot-key="page-bottom"/>
      <!-- <pre><code>{{JSON.stringify(Object.keys(this.$parent.$children), null, 2)}}</code></pre> -->
      <!-- <pre><code>{{JSON.stringify($parent.$children, null, 2)}}</code></pre> -->
      <!-- <pre><code>{{JSON.stringify($options.propsData, null, 2)}}</code></pre> -->
      <pre><code>{{JSON.stringify($page, null, 2)}}</code></pre>
    </div>
    
    <PageEdit />
    <PageNav v-bind="{ sidebarItems }" />

  </main>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue'
import PageNav from '@theme/components/PageNav.vue'
import PageAuthors from '@theme/components/PageAuthors.vue'

export default {
  components: { PageEdit, PageNav, PageAuthors },
  props: ['sidebarItems'],
  computed: {
    authors() {
      // console.log(this);
      // console.log(this.$parent.$children);
      return this.$page.authors;
    },
  },
}
</script>

<style lang="stylus">
@require '../styles/wrapper.styl'

.page
  padding-bottom 2rem
  display block

</style>
