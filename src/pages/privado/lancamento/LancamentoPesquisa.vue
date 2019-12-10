<template>
    <div>
      {{lancamentoList}}
    </div>
</template>
<script>
import api from 'components/util/api'
import util from 'components/util/util'
export default {
  data () {
    return {
      lancamentoList: []
    }
  },
  methods: {
    listarLancamento () {
      this.$axios.get(api.LANCAMENTO).then((result) => {
        this.lancamentoList = result.data
      }).catch((error) => {
        util.mensagemFalha(error)
      })
    }
  },
  mounted () {
    this.listarLancamento()
  }
}

</script>
