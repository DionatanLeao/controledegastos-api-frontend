<template>
  <div class="q-pa-md q-gutter-xs">
    <q-card>
      <q-card-section>
      <div class="row q-gutter-sm">
        <div class="col-6">
          <q-input
            ref="refDescricao"
            label="Descrição"
            Type="text"
            counter
            maxlength="30"
            v-model="lancamento.descricao"
            @keyup.13="pesquisarLancamento"
            dense>
          </q-input>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6 text-left">
          <q-btn icon="fas fa-search" color="warning" label="Pesquisar" @click="pesquisarLancamento"></q-btn>
        </div>

        <div class="col-sm-6 text-right">
          <q-btn icon="fas fa-plus" color="primary" label="Novo" @click="novoLancamento"></q-btn>
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
              <q-th>Categoria</q-th>
              <q-th>Valor</q-th>
              <q-th>Descrição</q-th>
              <div style="float: right">
                <q-th>Operações</q-th>
              </div>
            </q-tr>
              <q-tr v-for="lancamento in lancamentoList" v-bind:key="lancamento.codigo">
                <q-td>{{lancamento.codigo}}</q-td>
                <q-td>{{lancamento.pessoa.nome}}</q-td>
                <q-td>{{lancamento.categoria.nome}}</q-td>
                <q-td>{{lancamento.valor}}</q-td>
                <q-td>{{lancamento.descricao}}</q-td>
                <div style="float: right">
                  <q-td class="col-md-1">
                    <q-btn flat dense size="sm" color="blue" icon="fas fa-search" @click="visualizarLancamento(lancamento)"/>
                  </q-td>

                  <q-td class="col-md-1">
                    <q-btn flat dense size="sm" color="orange" icon="fas fa-pencil-alt" @click="editarLancamento(lancamento)"/>
                  </q-td>

                  <q-td class="col-md-1">
                    <q-btn flat dense size="sm" color="red" icon="fas fa-trash-alt" @click="confirmarExclusao(lancamento)"/>
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
      lancamentoList: [],
      lancamento: {}
    }
  },
  methods: {
    listarLancamento () {
      this.$axios.get(api.LANCAMENTO).then((result) => {
        this.lancamentoList = result.data
      }).catch((error) => {
        util.mensagemFalha(error)
      })
    },
    pesquisarLancamento () {
      var filtro = '?texto='.concat(this.lancamento.descricao)
      this.$axios.get(api.LANCAMENTO_FILTRAR_POR_TEXTO.concat(filtro)).then((result) => {
        this.lancamentoList = result.data
      }).catch((error) => {
        util.mensagemFalha(error)
      })
    },
    novoLancamento () {
      var newPaginaStatus = {
        lancamento: {
          categoria: {},
          pessoa: {}
        }
      }
      this.$router.push({
        name: 'lancamentoCadastro',
        params: {
          paginaStatus: newPaginaStatus
        }
      })
    },
    visualizarLancamento (pLancamento) {
      var newPaginaStatus = {
        lancamento: pLancamento,
        desabilitarEdicao: true
      }
      this.$router.push({
        name: 'lancamentoCadastro',
        params: {
          paginaStatus: newPaginaStatus
        }
      })
    },
    editarLancamento (pLancamento) {
      var newPaginaStatus = {
        lancamento: pLancamento,
        desabilitarEdicao: false
      }
      this.$router.push({
        name: 'lancamentoCadastro',
        params: {
          paginaStatus: newPaginaStatus
        }
      })
    },
    excluirLancamento (lancamento) {
      var filtro = '/'.concat(lancamento.codigo)
      this.$axios.delete(api.LANCAMENTO.concat(filtro)).then((result) => {
        util.mensagemSucessoAoDeletar()
        this.listarLancamento()
      }).catch((error) => {
        util.mensagemFalha(error)
      })
    },
    confirmarExclusao (lancamento) {
      this.$q.dialog({
        title: 'Excluir',
        message: 'Deseja realmente excluir o Lançamento '.concat(lancamento.descricao).concat('?'),
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.excluirLancamento(lancamento)
      })
    }
  },
  mounted () {
    this.listarLancamento()
  }
}
</script>
<style>
  tr:nth-child(even) {
    background-color: #abdef5;
  }
</style>
