<template>
  <aside class="sidebar">
    <NavLinks />

    <slot name="top" />
    

    <PageAuthors class="sidebar-section"/>
    <!-- <TOCZ class="sidebar-section" /> -->
    
    <!-- toc -->
    <!-- <pre><code>{{tocItems}}</code></pre> -->
    <!-- <hr> -->
    <!-- <pre><code>{{items}}</code></pre>
    <hr> -->
    <SidebarLinks
      :depth="0"
      :sidebarDepth="3"
      :items="tocItems"
    />

    <SidebarLinks
      :depth="0"
      :sidebarDepth="1"
      :items="items"
    />
    
    <slot name="bottom" />
  </aside>
</template>

<script>
import SidebarLinks from '@theme/components/SidebarLinks.vue'
import NavLinks from '@theme/components/NavLinks.vue'
import PageAuthors from '@theme/components/PageAuthors.vue'

export default {
  name: 'Sidebar',

  components: { SidebarLinks, NavLinks, PageAuthors },

  props: ['items', 'tocItems']
}
</script>

<style lang="stylus">
.sidebar
  // padding-top:30px;

  // .sidebar-sub-headers
  //   display:none

  ul
    padding 0
    margin 0
    list-style-type none
  a
    display inline-block
  .nav-links
    display none
    border-bottom 1px solid $borderColor
    padding 0.5rem 0 0.75rem 0
    a
      font-weight 600
    .nav-item, .repo-link
      display block
      line-height 1.25rem
      font-size 1.1em
      padding 0.5rem 0 0.5rem 1.5rem
  & > .sidebar-links
    padding 1.5rem 0
    & > li > a.sidebar-link
      font-size 1.1em
      line-height 1.7
      font-weight bold
    & > li:not(:first-child)
      margin-top .75rem
  .sidebar-section.page-author
      padding: 0.35rem 1.5rem 0.35rem 1.25rem
  .sidebar-section.table-of-contents
    h3
      margin: 0
      color $textColor
      transition color .15s ease
      // cursor pointer
      font-size 1.1em
      font-weight bold
      // text-transform uppercase
      padding 0.35rem 1.5rem 0.35rem 1.25rem
      width 100%
      box-sizing border-box
      margin 0
      border-left 0.25rem solid transparent
    ul
      padding 0
      margin 0
      list-style-type none
      & > li
        // padding-left: 2rem;
      & > li > a
        font-size 1em
        font-weight 400
        display inline-block
        color $textColor
        border-left 0.25rem solid transparent
        padding 0.35rem 1rem 0.35rem 2rem
        line-height 1.4
        width: 100%
        box-sizing: border-box
        &:hover
          color $accentColor
        &.router-link-active
          color: $accentColor
          border-left-color: $accentColor
        &.active
          font-weight 600
          color $accentColor
          border-left-color $accentColor
        .sidebar-group &
          padding-left 2rem
        .sidebar-sub-headers &
          padding-top 0.25rem
          padding-bottom 0.25rem
          border-left none
          &.active
            font-weight 500
      // & > li:not(:first-child)
      //   margin-top .75rem

@media (max-width: $MQMobile)
  .sidebar
    .nav-links
      display block
      .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after
        top calc(1rem - 2px)
    & > .sidebar-links
      padding 1rem 0
</style>
