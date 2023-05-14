<script lang="ts">
    

export let activeForm = 'register'

async function handleRegister (e : any) {
    const userEmail = e.target.email.value;
    const userPassword = e.target.password.value;
    const { data, error } =  await supabase.auth.signUp({
        email: userEmail,
        password: userPassword,
    })
    return { data, error }
    // console.log(userEmail, userPassword)
}

async function handleLogin(e : any){
    const userEmail = e.target.email.value;
    const userPassword = e.target.password.value;
    // const {data, error } = await supabase.auth.signInWithPassword({
    //     email: userEmail,
    //     password: userPassword,
    // })
    // return { data, error }
    console.log(userEmail, userPassword)
}

function setActiveForm(form : string){
    activeForm = form
}
</script>


<div class="container">

    <button class="form-active-button form-button-login" on:click={()=>setActiveForm('login')}>Login</button>
    <button class="form-active-button form-button-register" on:click={()=>setActiveForm('register')}>Register</button>
    
    <div class="form-container" >
        {#if activeForm === 'login'}
        <form class="form form-login" action="" on:submit|preventDefault={handleLogin}>
            <p class="form-title">Login</p>
            <label class="form-label" for="email">Email</label>
            <input class="form-input" type="email" name="email" id="email" autocomplete="email">
            <label class="form-label" for="password">Password</label>
            <input class="form-input"type="password" name="password" id="password" autocomplete="current-password">
            <button class="form-button" type="submit">Login</button>
        </form>
        {/if}
        {#if activeForm === 'register'}
        <form class="form form-register" action="" on:submit|preventDefault={handleRegister}>
            <p class="form-title">Register</p>
            <label class="form-label" for="email">Email</label>
            <input class="form-input" type="email" name="email" id="email" autocomplete="email">
            <label class="form-label" for="password">Password</label>
            <input class="form-input"type="password" name="password" id="password" autocomplete="current-password">
            <button class="form-button" type="submit">Register</button>
        </form>
        {/if}
	</div>
    
</div>
    
    <style>

    .container{
        display: grid;
        grid-template-columns: 1fr repeat(12, minmax(auto, 8rem)) 1fr;
    }

    .form-active-button{
        background:white;
        grid-column-start: 2;
        color:black;
        border:none;
        padding:1rem;
    }

    .form-active-button:hover{
        background:#9c9c9c;
        cursor:pointer;
    }

    .form-button-login{
        grid-column: 2;
    }

    .form-button-register{
        grid-column: 4;
    }

    .form-container{
        grid-column:2/-2;
        margin-top:2rem;
    }
    
    .form{
        display:grid;
        background:white;
        width: 400px;
        padding:2rem;
    }


    .form-title{
        color:black;
    }

    .form-label{
        font-size:1.5rem;
        color:black;
    }

    .form-input{
        margin-bottom:1rem;
        font-size:1.5rem;
        padding:0.4rem;
    }

    .form-button{
        padding:1rem;
        background: black;
        color:white;
        width: fit-content;
        border:none;
        transition:0.4s;
        box-shadow: 0 0 0.5rem rgba(0,0,0,0.5);
    }

    .form-button:hover{
        background:#ffffff;
        color:black;
        cursor:pointer;
    }


    </style>