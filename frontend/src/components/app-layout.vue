<template>
  <div class="px-5">
    <header>
      <slot name="header"> </slot>
    </header>
    <main class="mt-5 mx-5">
      <slot> </slot>
    </main>
    <footer>
      <slot name="footer"> </slot>
    </footer>
  </div>
</template>
