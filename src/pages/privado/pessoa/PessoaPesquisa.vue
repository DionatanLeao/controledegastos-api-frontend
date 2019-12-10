<template>
    <div>
      {{pessoaList}}
    </div>
</template>
<script>
import api from 'components/util/api'
import util from 'components/util/util'
export default {
  data () {
    return {
      pessoaList: []
    }
  },
  methods: {
    listarPessoa () {
      this.$axios.get(api.PESSOA).then((result) => {
        this.pessoaList = result.data
      }).catch((error) => {
        util.mensagemFalha(error)
      })
    }
  },
  mounted () {
    this.listarPessoa()
  }
}

</script>
