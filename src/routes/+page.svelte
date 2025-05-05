<script lang='ts'>
  import Portfolio from "$lib/components/Portfolio.svelte";
  import type { PageProps } from "./$types";
  let {data}: PageProps = $props();
</script>

<div class="content">
  <!-- Your page content -->
  <p><strong>Marcus Lee</strong> is an engineer. Marcus is currently pursuing his BA in Computer Science at Williams College.</p>

  <Portfolio projects={data.projects}/>
</div>

<style>
  :global(body) {
    background-color: rgb(218, 218, 218);
  }
  .content {
    padding: 4rem;
  }
  
</style>
