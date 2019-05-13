import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    /**
     * ユーザーリスト
     */
    users: null,

    /**
     * 移動しているユーザー
     */
    movingUser: null,

    /**
     * 移動先インデックス
     */
    movingIndex: null
  },

  getters: {
    /**
     * ユーザーリスト
     * @param users
     * @param movingUser
     * @param movingIndex
     * @returns {*[]}
     */
    users({ users, movingUser, movingIndex }) {
      let sortedUsers = _.sortBy(users, ["sortIndex"]);

      if (movingUser != null) {
        sortedUsers = _.reject(sortedUsers, { id: movingUser.id });
        sortedUsers.splice(movingIndex, 0, movingUser);
      }

      return sortedUsers;
    }
  },

  mutations: {
    /**
     * ユーザーリストを設定する。
     * @param state
     * @param users
     */
    users(state, { users }) {
      users.forEach((u, i) => (u.sortIndex = i * 1000));
      state.users = users;
    },

    /**
     * ユーザーを設定する。
     * @param users
     * @param user
     */
    user({ users }, { user }) {
      const target = _.find(users, { id: user.id });
      target.sortIndex = user.sortIndex;
    },

    /**
     * 移動しているユーザーを設定する。
     * @param state
     * @param movingUser
     */
    movingUser(state, { movingUser }) {
      state.movingUser = movingUser;
    },

    /**
     * 移動先インデックスを設定する。
     * @param state
     * @param movingIndex
     */
    movingIndex(state, { movingIndex }) {
      state.movingIndex = movingIndex;
    }
  },

  actions: {
    /**
     * 初期化する。
     * @param commit
     */
    init({ commit }) {
      const users = [
        {
          id: "woman1",
          name: "Sophia",
          image: require("@/assets/woman1.png"),
          tags: ["Splatton", "Dead by daylight", "スマブラ"]
        },
        {
          id: "woman2",
          name: "Emma",
          image: require("@/assets/woman2.png"),
          tags: ["Splatton", "Apex"]
        },
        {
          id: "woman3",
          name: "Olivia",
          image: require("@/assets/woman3.png"),
          tags: ["Splatton", "Fortnite"]
        },
        {
          id: "woman4",
          name: "Isabella",
          image: require("@/assets/woman4.png"),
          tags: ["Splatton", "Twitter"]
        },
        {
          id: "woman5",
          name: "Ava",
          image: require("@/assets/woman5.png"),
          tags: ["Splatton", "TikTok"]
        },
        {
          id: "man1",
          name: "Noah",
          image: require("@/assets/man1.png"),
          tags: ["Splatton", "スマブラ"]
        },
        {
          id: "man2",
          name: "Liam",
          image: require("@/assets/man2.png"),
          tags: ["Splatton", "マリオカート"]
        },
        {
          id: "man3",
          name: "Jacob",
          image: require("@/assets/man3.png"),
          tags: ["Splatton"]
        },
        {
          id: "man4",
          name: "Mason",
          image: require("@/assets/man4.png"),
          tags: ["Splatton", "Mafia"]
        },
        {
          id: "man5",
          name: "William",
          image: require("@/assets/man5.png"),
          tags: ["Splatton", "GitHub"]
        },
        {
          id: "usuba",
          name: "Usuba",
          image: require("@/assets/usuba.jpg"),
          tags: ["Splatton", "Dead by daylight", "スマブラ"]
        }
      ];

      commit("users", { users });
    },

    /**
     * 移動を開始する。
     * @param commit
     * @param movingUser
     * @param movingIndex
     */
    startMoving({ commit }, { movingUser, movingIndex }) {
      commit("movingUser", { movingUser });
      commit("movingIndex", { movingIndex });
    },

    /**
     * 移動を終了する。
     * @param commit
     */
    endMoving({ commit }) {
      commit("movingUser", { movingUser: null });
      commit("movingIndex", { movingIndex: null });
    },

    /**
     * 移動先インデックスを設定する。
     * @param commit
     * @param movingIndex
     */
    setMovingIndex({ commit }, { movingIndex }) {
      commit("movingIndex", { movingIndex });
    },

    /**
     * ユーザーを移動する。
     * @param state
     * @param commit
     * @param dispatch
     */
    async moveUser({ state, commit, dispatch }) {
      const user = _.clone(state.movingUser);
      user.sortIndex = await dispatch("calcSortIndex");

      commit("user", { user });
    },

    /**
     * ソートインデックスを計算する。
     */
    calcSortIndex({ state, getters }) {
      const { movingIndex: destination } = state;
      const prev = getters.users[destination - 1];
      const next = getters.users[destination + 1];

      if (prev == null) return next.sortIndex - 1000;
      if (next == null) return prev.sortIndex + 1000;

      return (prev.sortIndex + next.sortIndex) / 2;
    }
  }
});
