<template>
  <ul class="user-list">
    <template v-for="(user, index) in users">
      <li
        :key="user.id"
        class="user-list-item"
        :class="{ dragging: user === movingUser }"
        @dragenter="setMovingIndex({ movingIndex: index })"
        @dragover.prevent
        @drop="moveUser"
      >
        <UserCard
          :user="user"
          draggable="true"
          @dragstart.native="
            startMoving({ movingUser: user, movingIndex: index })
          "
          @dragend.native="endMoving"
        />
      </li>
    </template>
  </ul>
</template>

<script>
// Components
import UserCard from "./UserCard";

// JS
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  components: {
    UserCard
  },

  data() {
    return {
      moveDestination: null
    };
  },

  computed: {
    ...mapState(["movingUser", "movingDestination"]),
    ...mapGetters(["users"])
  },

  methods: {
    ...mapActions({
      startMoving: "startMoving",
      endMoving: "endMoving",
      setMovingIndex: "setMovingIndex",
      moveUser: "moveUser"
    })
  }
};
</script>

<style lang="scss" scoped>
.user-list {
  max-width: 1176px;
  margin: 32px auto;

  list-style: none;
  padding: 0;

  display: flex;
  flex-direction: column;

  .user-list-item {
    padding: 12px 0;

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      padding-bottom: 0;
    }

    &.dragging,
    &.ghost {
      opacity: 0.2;
    }
  }
}
</style>
