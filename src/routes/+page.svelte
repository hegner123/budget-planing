

<svelte:head>
	<title>Budget Forecast</title>
</svelte:head>

<div class="entry-content">
<h1 class="page-heading">Budget Forecasting</h1>
    <div class="content">
        <p>Enter in monthly income and expenses.</p>
        <div class="container">
            <a href="/auth">Sign In / Register</a>
        </div>
    </div>
</div>

<style lang="scss">
    $brand-primary: #ff3e00;
    $brand-accent: #5fa3e7;
    h1 {
        color: $brand-primary;
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
        background: $brand-primary;
        opacity: 0.5;
        transition: width .3s;
        z-index: -1;
    }

    a:hover:after{
        content: '';
        
        background:$brand-accent;
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

    .container{
        display: flex;
        justify-content: start;
        align-items: start;
        
    }


    
</style>
