<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import VideoContainer from '@/components/VideoContainer.vue';

</script>

<template>
  <div class="w-100">
    <header>
      <nav>
        <RouterLink to="/about">Sobre</RouterLink>
        <RouterLink to="/videos">Videos</RouterLink>
        <RouterLink to="/euphemize">Eufemizar uma frase</RouterLink>
        <RouterLink to="/defineword">Definir uma palavra</RouterLink>
      </nav>
    </header>
  </div>
  <div class="wrapper">
    <RouterView />
  </div>
</template>

<style>
@import '@/assets/base.css';

.wrapper {
  height: 80vh;
  display: flex;
  width: 100%;
  align-items: start;
  justify-content: center;
}

#app {
  padding: 2rem;
  font-weight: normal;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav {
  width: 100%;
  font-size: 25px;
  text-align: center;
  margin: 2rem 0;
  background: black ;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  background: black;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  body {
    /* display: flex; */
    place-items: center;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
