<script lang='ts'>
let {works}: {works: Work[]} = $props();
export type Work = {
    category: CATEGORY,
    title: string;
    img: string,
    description: string,
    link: string
}
type CATEGORY = "Professional Experience" | "Project"
</script>

<div class="container">
    {#each works as work}
    <div class='project'>
        <img src={work.img} alt={work.title}>
    </div>
    {/each}
</div>

<style>
.container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
    gap: 1rem;
    width: 100%;
}

.project {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9; /* Maintains a 16:9 ratio */
    overflow: hidden;
}

</style>