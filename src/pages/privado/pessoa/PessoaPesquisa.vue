<template>
   <div>

     <q-card>
      <q-card-section>
      <div class="row q-gutter-sm">
        <div class="col-6">
          <q-input
            ref="refNome"
            label="Nome"
            Type="text"
            counter
            maxlength="30"
            v-model="pessoa.nome"
            @keyup.13="pesquisarPessoa"
            dense>
          </q-input>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6 text-left">
          <q-btn icon="fas fa-search" color="warning" label="Pesquisar" @click="pesquisarPessoa"></q-btn>
        </div>

        <div class="col-sm-6 text-right">
          <q-btn icon="fas fa-plus" color="primary" label="Nova" @click="novaPessoa"></q-btn>
        </div>
      </div>
    </q-card-section>
  </q-card>

      <q-card>
        <q-card-section>
              <table style="width:100%">
            <q-tr>
              <q-th>Codigo</q-th>
              <q-th>Pessoa</q-th>
              <div style="float: right">
                <q-th>Operações</q-th>
              </div>
            </q-tr>
              <q-tr v-for="pessoa in pessoaList" v-bind:key="pessoa.codigo">
                <q-td>{{pessoa.codigo}}</q-td>
                <q-td>{{pessoa.nome}}</q-td>
                <div style="float: right">
                  <q-td class="col-md-1">
                    <q-btn flat dense size="sm" color="blue" icon="fas fa-search" @click="visualizarPessoa(pessoa)"/>
                  </q-td>

                  <q-td class="col-md-1">
                    <q-btn flat dense size="sm" color="orange" icon="fas fa-pencil-alt" @click="editarPessoa(pessoa)"/>
                  </q-td>

                  <q-td class="col-md-1">
                    <q-btn flat dense size="sm" color="red" icon="fas fa-trash-alt" @click="confirmarExclusao(pessoa)"/>
                  </q-td>
                </div>
              </q-tr>
          </table>
        </q-card-section>
      </q-card>
    </div>
</template>
<script>
import api from 'components/util/api'
import util from 'components/util/util'
export default {
  data () {
    return {
      pessoaList: [],
      pessoa: {}
    }
  },
  methods: {
    listarPessoa () {
      this.$axios.get(api.PESSOA).then((result) => {
        this.pessoaList = result.data
      }).catch((error) => {
        util.mensagemFalha(error)
      })
    },
    pesquisarPessoa () {

    },
    novaPessoa () {

    },
    visualizarPessoa (pessoa) {

    },
    editarPessoa (pessoa) {

    },
    confirmarExclusao (pessoa) {

    }
  },
  mounted () {
    this.listarPessoa()
  }
}
</script>
<style>
  tr:nth-child(even) {
    background-color: #abdef5;
  }
</style>
