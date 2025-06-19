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
            <a target="_blank" rel="noopener noref" href={work.link}>
                <img src={work.img} alt={work.title}>
                <div class="overlay">
                    <div class="text-content">
                        <h3 class="title">{work.title}</h3>
                        <p class="description">{work.description}</p>
                    </div>
                </div>
            </a>
        </div>
        {/each}
    </div>
    
    <style>
    .container {
        font-family: Montserrat, Arial;
        display: grid;
        grid-template-columns: 1fr 1fr; /* Fixed 2 columns */
        gap: 1rem;
        width: 100%;
    }
    
    .project {
        position: relative;
        width: 100%;
        aspect-ratio: 16 / 9; /* Maintains a 16:9 ratio */
        overflow: hidden;
        cursor: pointer;
        transition: transform 0.3s ease;
    }
    
    .project:hover {
        transform: scale(1.02);
    }
    
    .project img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: filter 0.3s ease;
    }
    
    .project:hover img {
        filter: brightness(0.4) grayscale(0.3);
    }
    
    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
        background: rgba(0, 0, 0, 0.1);
    }
    
    .project:hover .overlay {
        opacity: 1;
    }
    
    .text-content {
        text-align: center;
        color: rgb(209, 209, 209);
        padding: 1rem;
        max-width: 90%;
    }
    
    .title {
        font-size: 1.25rem;
        font-weight: bold;
        margin: 0 0 0.5rem 0;
    }
    
    .description {
        font-size: 0.9rem;
        margin: 0;
        line-height: 1.4;
    }
    </style>