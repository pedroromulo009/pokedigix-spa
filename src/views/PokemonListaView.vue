<script>
import PokemonDataService from "../services/PokemonDataService";
import Ordenacao from '../components/Ordenacao.vue';
import Paginacao from '../components/Paginacao.vue';
export default {
  name: "lista-pokemons",
  data() {
    return {
      pokemons: [],
      pokemonSelecionado: this.inicializaPokemon(),
      pagina: 1,
      tamanho: 4,
      ordenacao: {
        titulo: "",
        direcao: "",
        campo: ""
      },
      url: '#',
      pageParam: 'page',
      totalPaginas: 10,
      quantidade: 3,
      opcoes: [{
        titulo: "Nome: Crescente",
        direcao: "DESC",
        campo: "nivel"
      },
      {
        titulo: "Nome: Decrescente",
        direcao: "DESC",
        campo: "nome"
      },
      {
        titulo: "Numero: Crescente",
        direcao: "ASC",
        campo: "numeroPokedex"
      },
      {
        titulo: "Nivel: Decrescente",
        direcao: "DESC",
        campo: "nivel"
      }],
      termo: ""
    };
  },
  components: {
    Ordenacao,
    Paginacao,
  },
  methods: {
    filtarPeloDigitada() {
      if (this.termo.length > 3) {
        this.buscarPokemons();
      }
    },
    trocarPagina(p) {
      this.pagina = p;
      this.buscarPokemons()
    },
    buscarPokemons() {
      PokemonDataService.buscarTodosPaginadoOrdenado(this.pagina - 1, this.tamanho, this.ordenacao.campo, this.ordenacao.direcao, this.termo)
        .then((resposta) => {
          this.pokemons = resposta.pokemons;
          this.totalPaginas = resposta.totalPaginas;

        })
        .catch((erro) => {
          console.log(erro);
        });
    },
    removerPokemonSelecionado() {
      PokemonDataService.remover(this.pokemonSelecionado.id)
        .then(() => {
          this.pokemons = this.pokemons.filter(pokemon => pokemon.id != this.pokemonSelecionado.id);
          this.inicializaPokemon();
        })
        .catch(() => {
          this.inicializaPokemon();
        });
    },
    selecionar(pokemon) {
      this.pokemonSelecionado.id = pokemon.id;
      this.pokemonSelecionado.nome = pokemon.nome;
    },
    novo() {
      this.$router.push({ name: 'pokemons-novo' });
    },
    inicializaPokemon() {
      return {
        "id": null,
        "nome": null
      }
    },
  },
  mounted() {
    this.ordenacao = this.opcoes[2];
    this.buscarPokemons();
    Array.from(document.querySelectorAll('[data-bs-toggle="popover"]')).forEach(popoverNode => new Popover(popoverNode));
  },
};
</script>

<template>
  <main>
    <div>
      <h2 class="text-center mb-4 mt-4">Lista de Pok??mon:</h2>
      <div class="row justify-content-end">
        <div class="col-2">
          <Ordenacao v-model="ordenacao" @ordenar="buscarPokemons" :ordenacao="ordenacao" :opcoes="opcoes" />
        </div>
        <div class="col-4">
          <form class="d-flex" role="search">
            <input class="form-control me-2" v-model="termo" type="search" placeholder="Procurar" aria-label="Search">
            <button class="btn btn-success" type="button" @click.prevent="buscarPokemons"><svg
                xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search"
                viewBox="0 0 16 16">
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg></button>
          </form>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-6" v-for="pokemon in pokemons" :key="pokemon.id">
          <div class="card mb-3">
            <div class="card-header">
              <div class="row">
                <div class="col-sm-6">
                  <p class="card-text text-start">
                    <strong>{{ pokemon.nome }}</strong>
                  </p>
                </div>
                <div class="col-sm-6 text-end">
                  <p class="card-text">Lv. {{ pokemon.nivel }}</p>
                </div>
              </div>
            </div>
            <div class="row g-0">
              <div class="col-md-3 text-center align-items-center">
                <img :alt="'Imagem do ' + pokemon.nome" :title="pokemon.nome" class="card-img" :src="
                  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/' +
                  pokemon.numeroPokedex +
                  '.png'
                " />
              </div>
              <div class="col-md-9">
                <div class="card-body">
                  <p class="card-text">
                  <div class="row">
                    <div v-for="tipo in pokemon.tipos" :key="tipo.id" class="col-4">
                      <div class="card rounded-4">
                        <div class="card-body text-center p-1">
                          {{tipo.nome}}
                        </div>
                      </div>
                    </div>
                  </div>
                  </p>
                  <p class="card-text">
                    G??nero:
                    <svg v-if="pokemon.genero == 'FEMININO'" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                      fill="currentColor" class="bi bi-gender-female" viewBox="0 0 16 16">
                      <path fill-rule="evenodd"
                        d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      class="bi bi-gender-male" viewBox="0 0 16 16">
                      <path fill-rule="evenodd"
                        d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2H9.5zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
                    </svg>
                  </p>
                  <p class="card-text">N??mero Pok??Dex: {{ pokemon.numeroPokedex }}</p>
                  <div class="collapse" :id="'collapseExample' + pokemon.id">
                    <div class="card card-body">
                      <p class="card-text">Pok??Dex: {{ pokemon.numeroPokedex }} ??</p>
                      <p class="card-text">Peso: {{ pokemon.peso }} kg</p>
                      <p class="card-text">Altura: {{ pokemon.altura }} m</p>
                      <p class="card-text">Felicidade: {{ pokemon.felicidade }}</p>
                    </div>
                  </div>
                  <div class="text-center">
                    <button type="button" data-bs-toggle="collapse" class="btn btn-outline-primary pt-1 m-1"
                      :href="'#collapseExample' + pokemon.id" @click="popover">
                      Mais
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                          d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                      </svg>
                    </button>
                    <button type="button" class="btn btn-outline-warning m-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path
                          d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fill-rule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                      </svg>
                    </button>
                    <button type="button" @click="selecionar(pokemon)" class="btn btn-outline-danger m-1"
                      data-bs-toggle="modal" data-bs-target="#confirmacaoExclusaoPokemon" data-bs-whatever="@mdo"><svg
                        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-trash" viewBox="0 0 16 16">
                        <path
                          d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fill-rule="evenodd"
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                      </svg></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Paginacao :totalPaginas="totalPaginas" :quantidadeItens="quantidade" v-model="pagina" :atual="pagina"
          :trocarPagina="trocarPagina"></Paginacao>
      </div>
      <div class="row">
        <div class="col-1">
          <button @click="novo" class="btn btn-primary">Novo</button>
        </div>
      </div>
    </div>
    <div class="modal fade" id="confirmacaoExclusaoPokemon" tabindex="-1" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">VOC?? EST?? APAGANDO UM
              POK??MON!!</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Voc?? est?? apagando o Pok??mon "<strong> {{pokemonSelecionado.nome}} </strong>". Deseja continuar?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success" @click="removerPokemonSelecionado"
              data-bs-dismiss="modal">Continuar</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>