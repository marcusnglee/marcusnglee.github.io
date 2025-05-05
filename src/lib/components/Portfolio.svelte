<script lang='ts'>
let {projects}: {projects: Project[]} = $props();
export type Project = {
    title: string;
    img: string,

}
</script>

<div class="container">
    {#each projects as project}
    <div class='project'>
        <img src={project.img} alt={project.title}>
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