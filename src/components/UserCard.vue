<template>
  <div class="user-card">
    <div
      class="thumbnail"
      :style="{ 'background-image': `url(${user.image})` }"
    ></div>

    <div class="user-info">
      <div class="user-name">{{ user.name }}</div>
      <div class="user-id">@{{ user.id }}</div>
    </div>

    <ul class="tag-list">
      <li v-for="tag in user.tags" :key="tag" class="tag">{{ tag }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * ユーザー
     */
    user: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.user-card {
  height: 64px;
  overflow: hidden;

  display: flex;
  align-items: center;

  background-color: white;
  border-radius: 4px;

  .thumbnail {
    flex-basis: 51px;
    height: 51px;
    box-sizing: border-box;

    margin: 0 24px;
    border: 1px solid rgba(153, 153, 153, 0.2);
    border-radius: 50%;

    background-size: cover;
    background-position: center center;
  }

  .user-info {
    flex-basis: 576px;
    box-sizing: border-box;

    margin-right: 24px;

    display: flex;
    align-items: baseline;

    .user-name {
      margin-right: 8px;
      font-size: 18px;
      line-height: 18px;
      font-weight: bold;
    }

    .user-id {
      font-size: 12px;
      color: #999999;
    }
  }

  .tag-list {
    list-style: none;

    height: 32px;
    box-sizing: border-box;

    margin: 0;
    padding: 8px 24px;

    display: flex;
    flex-flow: row wrap;
    align-items: center;
    overflow: hidden;

    .tag {
      display: block;
      height: 16px;

      margin: 0 0 40px 6px;
      text-decoration: underline;
      cursor: pointer;

      font-size: 12px;

      &:before {
        content: "#";
      }

      &:first-child {
        margin-left: 0;
      }
    }
  }
}
</style>
