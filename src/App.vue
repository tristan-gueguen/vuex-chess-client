<template>
  <div id="app">
    <b-container>
      <b-row v-for="r in 8" :key="r">
        <BoardPiece
          v-for="(c, index) in nthRow(r - 1)"
          :key="r + index"
          :row="8 - r"
          :col="index"
          :symbol="c"
          @click="clickedCell(8 - r, index)"
        />
      </b-row>
      <b-row class="mt-1 align-items-center" style="max-width: 750px">
        <b-col class="col-auto"><strong class="text-muted">FEN</strong></b-col>
        <b-col class="col-auto flex-fill"
          ><div class="p-2 pl-4 rounded border" style="background: lightgrey;">
            {{ this.$store.state.fen }}
          </div></b-col
        >
      </b-row>
    </b-container>
  </div>
</template>

<script>
import BoardPiece from "@/components/BoardPiece.vue";
export default {
  name: "App",
  data() {
    return {
      inputMove: "",
    };
  },
  components: {
    BoardPiece,
  },
  computed: {},
  methods: {
    clickedCell(row, col) {
      this.$store.dispatch("clickedCell", { row: row, col: col });
    },
    nthRow(i) {
      return this.$store.state.board[i];
    },
  },
  created() {
    this.$store.dispatch(
      "loadFen",
      "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    );
  },
};
</script>

<style>
html,
body {
  background-color: #f5f5f5;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f5f5f5;
  margin-top: 60px;
}
</style>
