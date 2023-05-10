<header class="page-nav">
			<div class="header-left">
				<a class="logo" href="/">
					Budget Planning
				</a>
			</div>
			<div class="header-right">
				<nav class="nav-primary">
					<ul class="nav-links">
						<li class="nav-link">
							<a class="link" href="/overview">Overview</a>
						</li>
						<li class="nav-link">
							<a class="link" href="/expenses">Expenses</a>
						</li>
					</ul>
				</nav>
			</div>
</header>

<style>
    :global(.page-nav) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1rem;
        height: 3rem;
        background-color: #151515;
        box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
        margin:0;
    }

    .header-left{
        display: flex;
        align-items: center;
        padding-left:1rem;
    }

    .logo{
        color:#fff;
        text-decoration: none;
    }

    .logo:visited{
        color: #fff;
    }

    .logo:hover{
        color: var(--brand-accent);
    }

    .header-right{
        display: flex;
        align-items: center;
        padding-right:1rem;
    }

    .nav-primary{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .nav-links{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 1rem;
        list-style: none;
    }

    .link{
        padding:1rem;
        color:#fff;
        text-decoration: none;
    }

    .link:visited{
        color: #fff;
    }

    .link:hover{
        color: var(--brand-accent);
    }
</style>


<slot><!-- optional fallback --></slot>