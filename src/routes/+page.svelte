<script lang="ts">
import { supabase } from '../lib/superclient.ts'

export let activeForm = 'register'

async function handleRegister (e : any) {
    const userEmail = e.target.email.value;
    const userPassword = e.target.password.value;
    // const { data, error } =  await supabase.auth.signUp({
    //     email: 'example@email.com',
    //     password: 'example-password',
    // })
    // return { data, error }
    console.log(userEmail, userPassword)
}

async function handleLogin(e : any){
    const userEmail = e.target.email.value;
    const userPassword = e.target.password.value;
    const {data, error } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: userPassword,
    })
    return { data, error }
}

function setActiveForm(form : string){
    activeForm = form
}
</script>

<svelte:head>
	<title>User Management</title>
</svelte:head>

<div class="entry-content">
<h1 class="page-heading">Budget Planning</h1>
<div class="content">
    <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
    <button on:click={()=>setActiveForm('login')}>Login</button>
    <button on:click={()=>setActiveForm('register')}>Register</button>
    <div class="container">
	<div class="form-container" >
        {#if activeForm === 'login'}
        <form class="form-login" action="" on:submit|preventDefault={handleLogin}>
            <p>Login</p>
            <label class="form-label" for="email">Email</label>
            <input class="form-input" type="email" name="email" id="email" autocomplete="email">
            <label class="form-label" for="password">Password</label>
            <input class="form-input"type="password" name="password" id="password" autocomplete="current-password">
            <button class="form-button" type="submit">Login</button>
        </form>
        {/if}
        {#if activeForm === 'register'}
        <form class="form-login" action="" on:submit|preventDefault={handleRegister}>
            <p>Register</p>
            <label class="form-label" for="email">Email</label>
            <input class="form-input" type="email" name="email" id="email" autocomplete="email">
            <label class="form-label" for="password">Password</label>
            <input class="form-input"type="password" name="password" id="password" autocomplete="current-password">
            <button class="form-button" type="submit">Register</button>
        </form>
        {/if}
	</div>
</div>
</div>

</div>

<style lang="scss">
    $brand-primary: #ff3e00;
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

    .container{
        display: flex;
        justify-content: start;
        align-items: start;
        
    }

    .form-login{
        display:grid;
    }

    .form-label{
        font-size:1.5rem;
        color:#fff;
    }

    .form-input{
        margin-bottom:1rem;
        font-size:1.5rem;
        padding:0.4rem;
    }

    .form-button{
        padding:1rem;
        background: white;
        color:black;
        width: fit-content;
        border:none;
        transition:0.4s;
    }

    .form-button:hover{
        background:#000;
        color:white;
        cursor:pointer;
    }
    
</style>
