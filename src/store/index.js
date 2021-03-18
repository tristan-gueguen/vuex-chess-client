import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { posToString } from "../utils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    board: {},
    moves: [],
    activeCell: null,
    fen: "",
    check: "-",
  },
  getters: {
    activePosition(state) {
      return posToString(state.activeCell.row, state.activeCell.col);
    },
    targets(state, getters) {
      if (!state.activeCell) {
        return [];
      }
      return state.moves
        .filter((m) => m.from === getters.activePosition)
        .map((m) => m.to);
    },
    mate(state) {
      return state.moves.length === 0 && state.check != "-";
    },
  },
  mutations: {
    updateState(state, payload) {
      state.board = payload.board;
      state.moves = payload.moves;
      state.fen = payload.fen;
      state.check = payload.check;
    },
    updateActiveCell(state, payload) {
      state.activeCell = payload;
    },
  },
  actions: {
    loadFen({ commit }, fen) {
      axios
        .post("http://127.0.0.1:5000/fen", {
          fen: fen,
        })
        .then(function(response) {
          commit("updateState", response.data);
        });
    },
    sendMove({ commit }, move) {
      axios.get(`http://127.0.0.1:5000/move/${move}`).then(function(response) {
        commit("updateState", response.data);
      });
    },
    clickedCell({ dispatch, commit, state, getters }, pos) {
      const position = posToString(pos.row, pos.col);
      if (state.activeCell) {
        if (getters.targets.includes(position)) {
          const theMove = state.moves.filter(
            (m) => m.to === position && m.from === getters.activePosition
          )[0].move_str;
          dispatch("sendMove", theMove);
          commit("updateActiveCell", null);
        } else {
          commit("updateActiveCell", null);
        }
      } else {
        const movesFrom = state.moves.filter((m) => m.from === position);
        if (movesFrom.length > 0) {
          commit("updateActiveCell", pos);
        }
      }
    },
  },
  modules: {},
});
