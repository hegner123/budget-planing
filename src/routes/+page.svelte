<main class="entry-content">
<h1 class="page-heading">Budget Planning</h1>
<div class="content">
    <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
</div>
</main>

<style>
    h1 {
        color: var(--brand-accent);
        margin-block:0;
        margin-inline:0;
    }

    p, a{
        font-size: 1.5rem;
        color:var(--brand-white);
    }

    a{
        position: relative;
        text-decoration: none;
    }

    a:after{
        
        content: '';
        display: block;
        position: absolute;
        left:0;
        bottom:-.25rem;
        width: 100%;
        height: 0.5rem;
        background: var(--brand-accent);
        opacity: 0.5;
        transition: width .3s;
        z-index: -1;
    }

    .entry-content{
        display: grid;
        grid-template-columns: 1fr repeat(12, minmax(auto, 8rem)) 1fr;
        grid-template-rows: max-content 1fr;
        height: calc(100vh - 3rem);
        padding: 3rem 0;
    }
    .page-heading{
        grid-column: 2 / -2;
        grid-row: 1;
        font-size: 5rem;
        line-height: 1;
        font-weight: 400;
        
    }
    .content{
        grid-column: 2 / span 12;
        grid-row: 2;
        
    }
    
</style>
