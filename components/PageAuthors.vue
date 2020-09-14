<template>
  <div class="page-author">
    <h5>Maintained by:</h5>
    <ul>
      <li v-for="author in authors" :key="author.username">
        <v-gravatar :email="author.email" class="gravatar" :alt="author.username" />
        <!-- <span v-html="`${author.username}`"></span> -->
      </li>
    </ul>
  </div>
</template>

<script>
import isNil from 'lodash/isNil'
import { endingSlashRE, outboundRE } from '../util'

export default {
  name: 'PageAuthors',

  computed: {
    authors() {
      return this.$page.authors;
    },
  },
}
</script>

<style lang="stylus">
.page-author
  padding-top 1rem
  padding-bottom 1rem
  overflow auto

  ul
    display: flex
    flex-wrap: wrap
    list-style: none
    margin: 0
    padding: 0

  .gravatar {
    width: 2.5em
    height: 2.5em
    max-width: 2.5em
    max-height: 2.5em
    overflow: hidden
    margin-right: 0.75em
    border-radius: 50%
    border: 1px solid #e7e7e7
  }

@media (max-width: $MQMobile)
  // .page-author

</style>
