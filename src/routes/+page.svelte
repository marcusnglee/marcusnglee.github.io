<script lang='ts'>
  import Bio from "$lib/components/Bio.svelte";
  import Portfolio from "$lib/components/Portfolio.svelte";
  import type { PageProps } from "./$types";
  let {data}: PageProps = $props();
</script>

<div class="frame">
  <Bio/>
  <Portfolio works={data.works}/>
</div>

<style>
  :global(body) {
    background-color: rgb(248, 248, 248);
  }
  .frame {
    padding: 4rem 16rem;
  }
  
</style>
