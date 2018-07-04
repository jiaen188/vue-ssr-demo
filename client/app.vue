<template>
    <div id="app">
        <div id="cover"></div>
        <todo-header></todo-header>
        <router-link to="/app/234">app</router-link>
        <!-- <router-link :to="{name: 'app'}">app</router-link> -->
        <router-link to="/login">login</router-link>
        <transition name="fade">
          <router-view />
        </transition>
        <todo-footer></todo-footer>
    </div>
</template>

<script>
import TodoHeader from './layout/TodoHeader.vue'
import TodoFooter from './layout/footer.jsx'
import Todo from './views/todo/todo.vue'

export default {
  components: {
    TodoHeader,
    TodoFooter,
    Todo
  },
  mounted () {
    console.log(this.$route)
  }
}
</script>

<style lang="stylus" scoped>
#app
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    #cover
        position absolute
        left 0
        top 0
        right 0
        bottom 0
        background-color #999
        opacity .9
        z-index -1
</style>
