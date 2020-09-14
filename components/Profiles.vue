<template>
  <div>
    {{title}}
  </div>
</template>

<script>
import yaml from 'js-yaml';
import fs from 'fs';
import {ref} from 'vue';

export default {
  name: 'Profiles',
  props: {
    title: {
      type: String,
      required: false,
      default: () => 'Profiles',
    },
  },
  data() {
    let profiles;
    try {
      profiles = yaml.safeLoad(fs.readFileSync('/home/ixti/example.yml', 'utf8'));
      console.log(profiles);
    } catch (e) {
      console.log(e);
    }

    return {
      profiles,
    }
  }
}
</script>