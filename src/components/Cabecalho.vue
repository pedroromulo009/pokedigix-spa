<script>
import { RouterLink } from 'vue-router';
import { useCookies } from "vue3-cookies"
const { cookies } = useCookies();

export default {
    data() {
        return {
            nomeTreinador: ""
        }
    },
    mounted() {
        this.nomeTreinador = cookies.get('treinador_nome');
    }

}
</script>

<template>
    <header>
        <nav class="navbar navbar-dark navbar-expand-lg bg-dark">
            <div class="container-md">
                <RouterLink to="/"><img src='../../public/Poké_Ball_icon.svg.png' width="60" height="60" /></RouterLink>
                <a class="navbar-brand" href="#">PokéDigix</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <RouterLink to="/" class="nav-link active" aria-current="page">Início</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink to="/pokemons-selvagens" class="nav-link">Pokémons Selvagens</RouterLink>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Ataques
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <RouterLink class="dropdown-item" to="/ataques/novo">Novo</RouterLink>
                                </li>
                                <li>
                                    <RouterLink class="dropdown-item" to="/ataques/lista">Lista</RouterLink>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Tipos
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <RouterLink class="dropdown-item" to="/tipos/novo">Novo</RouterLink>
                                </li>
                                <li>
                                    <RouterLink class="dropdown-item" to="/tipos/lista">Lista</RouterLink>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Pokémons
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <RouterLink class="dropdown-item" to="/pokemons/novo">Novo</RouterLink>
                                </li>
                                <li>
                                    <RouterLink class="dropdown-item" to="/pokemons/lista">Lista</RouterLink>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Treinadores
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <RouterLink class="dropdown-item" to="/treinador/novo">Novo</RouterLink>
                                </li>
                                <li>
                                    <RouterLink class="dropdown-item" to="/treinador/lista">Lista</RouterLink>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <RouterLink class="dropdown-item" to="/usuarios/novo"></RouterLink>
                        </li>
                        <div class="d-flex">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle active" href="#" role="button"
                                        data-bs-toggle="dropdown" aria-expanded="false"> <svg
                                            xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                            fill="currentColor" class="bi bi-person-fill mb-1" viewBox="0 0 16 16">
                                            <path
                                                d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                        </svg>
                                        {{ nomeTreinador }}
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li>
                                            <RouterLink class="dropdown-item" to="/treinador/lista">Trocar o treinador
                                            </RouterLink>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <RouterLink class="nav-link" to="/logins/novo" role="button" aria-expanded="false">
                                        <button type="button" class="btn btn-secondary btn-sm"
                                            data-bs-dismiss="modal">Entrar/Cadastrar</button>
                                    </RouterLink>
                                </li>
                            </ul>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>