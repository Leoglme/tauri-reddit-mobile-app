<template>
  <div class="tabs">
    <ul>
      <li v-for="(tab, index) in tabs" :key="tab.to" :class="{ active: activeTabIndex === index }">
        <router-link :to="tab.to" @click="activeTabIndex = index">{{ tab.title }}</router-link>
      </li>
      <li class="active-border" :style="{ transform: 'translateX(' + activeTabIndex * 100 + '%)' }"></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  props: {
    tabs: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      activeTabIndex: 0
    })

    return {
      ...state
    }
  }
})
</script>

<style>
.tabs {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

ul {
  list-style: none;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
}

li {
  margin: 0 10px;
}

li a {
  display: block;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  color: #333;
}

.active-border {
  height: 4px;
  width: 100%;
  background-color: #333;
  position: absolute;
  bottom: 0;
  transition: transform 0.3s ease-in-out;
}

li.active {
  font-weight: bold;
}

li.active a {
  color: #333;
}

li.active + .active-border {
  transform: translateX(100%);
}
</style>
