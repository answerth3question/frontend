<template>
  <v-navigation-drawer
    app
    permanent
    absolute
    floating
    clipped
    width="200"
    dark
    class="accent darken-2"
  >
    <template v-for="route in routes">
      <NavdrawerItem
        :key="route.to"
        :to="route.to"
        :text="route.text"
        :exact="!route.children"
      />
      
        <template v-if="route.children">

          <transition
            :key="route.to + 't'" 
            name="curtain"
            :css="false"
            @before-enter="beforeEnter"
            @enter="enter"
            @leave="leave"
            @before-leave="beforeLeave"
          >
            <div v-if="route.showChildren">hi</div>
          </transition>

          <div  v-if="route.showChildren" :key="route.to + 'cw'" :ref="route.text.toLowerCase() + 'child-wrap'">
            <NavdrawerItem
              v-for="child in route.children"
              :key="child.to"
              :to="child.to"
              :text="child.text"
              isChild
            />
          </div>
          
        </template>
    </template>
  </v-navigation-drawer>
</template>

<script>
import NavdrawerItem from '@/components/app/navdrawer-item'
export default {
  props: {
    routes: Array,
  },
  components: {
    NavdrawerItem,
  },
  data() {
    return {
      styleProxy: {
        height: 10,
      }
    }
  },
  computed: {
    style() {
      return {
        height: this.styleProxy.height + 'px'
      }
    }
  },
  methods: {
    beforeEnter(el) {
      // console.log('entering', el)
      el.style.backgroundColor = 'blue'
      el.style.height = '10px'
      el.style.display = 'flex'
      el.style.position = 'absolute'
      el.style.zIndex = 1000
    },
    beforeLeave(el) {
      // console.log('leaving', el)
    },
    /**
     * @param {HTMLElement} el
     */
    enter(el, done) {
      let handle;
      let count = 0
      handle = requestAnimationFrame(() => {
        this.styleProxy.height += 5
        el.style.height = this.style.height
        count += 1
        if (count > 100) {
          cancelAnimationFrame(handle)
        }
      })

      done()
    },
    leave(el, done) {

      done()
    }
  }
}
</script>

<style scoped>
/* .chidren-enter, .children-leave-to {
  height: 0;
}
.children-enter-to, .children-leave {
  translate: height;

}
.children-enter-active, .children-leave-active {
  transition: all .7s;
}  */


</style>
