<template>
  <div id="app">
    <header>
      <h1>ドラッグ&ドロップのサンプル</h1>
    </header>

    <UserList />
  </div>
</template>

<script>
// Components
import UserList from "@/components/UserList.vue";

// JS
import { mapActions } from "vuex";

export default {
  name: "app",
  components: {
    UserList
  },

  created() {
    this.init();
  },

  methods: {
    ...mapActions(["init"])
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  background-color: #f6f7fb;
}
</style>

<style lang="scss" scoped>
header {
  height: 56px;
  box-sizing: border-box;

  background-color: white;
  border-bottom: 1px solid rgba(153, 153, 153, 0.2);

  display: flex;
  align-items: center;

  h1 {
    display: block;
    width: 100%;
    max-width: 1176px;

    margin: 0 auto;
  }
}
</style>
