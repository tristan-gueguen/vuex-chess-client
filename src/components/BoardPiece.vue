<template>
  <div :style="style" @click="$emit('click')">
    <i :style="styleIcon" v-if="!isEmpty || isTarget" :class="icon"></i>
  </div>
</template>

<script>
import { posToString } from "../utils";
export default {
  data() {
    return {
      iconsDico: {
        b: "fa-chess-bishop",
        n: "fa-chess-knight",
        r: "fa-chess-rook",
        k: "fa-chess-king",
        q: "fa-chess-queen",
        p: "fa-chess-pawn",
      },
    };
  },
  computed: {
    isTarget() {
      return this.$store.getters.targets.includes(
        posToString(this.row, this.col)
      );
    },
    isCheck() {
      return this.$store.state.check === posToString(this.row, this.col);
    },
    isActive() {
      const activeCell = this.$store.state.activeCell;
      if (!activeCell) {
        return false;
      }
      return activeCell.row === this.row && activeCell.col === this.col;
    },
    isEmpty() {
      return this.symbol === ".";
    },
    isWhite() {
      return this.symbol === this.symbol.toUpperCase();
    },
    icon() {
      if (this.isTarget && this.isEmpty) {
        return "fas fa-dot-circle";
      }
      //   const colorClass = this.isWhite ? "text-white" : "text-black";
      const sizeClass = "fa-4x";
      const symbol = this.symbol.toLowerCase();
      const symbolClass = this.iconsDico[symbol];
      //   return ["fas", symbolClass, colorClass, sizeClass].join(" ");
      return ["fas", symbolClass, sizeClass].join(" ");
    },
    defaultStyle() {
      const def =
        (this.row + this.col) % 2 === 1
          ? "background-color: #d2a679"
          : "background-color: #996633";
      return def;
    },
    classColor() {
      if (this.isCheck) {
        return "background-color: red";
      }
      if (this.isActive) {
        return "background-color: #588940";
      }
      if (this.isTarget && !this.isEmpty) {
        return "background-color: #FFA500";
      }
      return this.defaultStyle;
    },
    classSize() {
      const size = 80;
      return `width:${size}px; height: ${size}px;`;
    },
    style() {
      return [this.classSize, this.classColor].join(" ");
    },
    styleIcon() {
      if (this.isEmpty) {
        return "position:relative; top:28px; color:silver";
      }
      const ret = this.isWhite
        ? "position:relative; top:7px; color: #ECECEC"
        : "position:relative; top:7px; color:black";
      return ret;
    },
  },
  props: {
    row: {
      type: Number,
    },
    col: {
      type: Number,
    },
    symbol: {
      type: String,
    },
  },
};
</script>
