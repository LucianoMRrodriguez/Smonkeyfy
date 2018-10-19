<template>
<div>
  <el-transfer
    v-model="listaDeTemas"
    :data="songs"
    :titles="['Temas', 'Temas']"
  >
  </el-transfer>
</div>
</template>

<script>
export default {
  data() {
    return {
      songs: [],
      listaDeTemas: []
    };
  },
  props: {
    temas: {
      type: Array
    }
  },
  methods: {
    getNewSongs() {
      return this.temas.map(cancion => {
        return {
          label: cancion.name,
          key: cancion.id
        };
      });
    },
    getSelectedSongs() {
      return this.songs.filter(song => this.listaDeTemas.includes(song.key));
    }
  },
  watch: {
    temas() {
      this.songs = [...this.getNewSongs(), ...this.getSelectedSongs()];
    },
    listaDeTemas(nuevaLista, viejaLista) {
      if (nuevaLista.length < viejaLista.length) {
        const idsABorrar = viejaLista.filter(
          temaAnterior =>
            !nuevaLista.includes(temaAnterior) &&
            !this.temas.map(tema => tema.id).includes(temaAnterior)
        );
        this.songs = this.songs.filter(song => !idsABorrar.includes(song.key));
      }
      this.$emit(
        "input",
        this.songs
          .filter(song => this.listaDeTemas.includes(song.key))
          .map(song => {
            return { id: song.key, name: song.label };
          })
      );
    }
  }
};
</script> 

<style>
.el-transfer-panel__item .el-checkbox__input {
  left: 20px;
}
.el-checkbox__label {
  text-align: left;
}
</style>