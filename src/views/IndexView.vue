<template>
  <main>
    <div class="container1">
      <span id="iconSetting">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#23252b" stroke="#c2c2c4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </span>
    </div>

    <form action="" method="post">
      <label id="label1">
        <input type="text" placeholder="E-mail address" />
      </label>

      <label id="label2">
        <input type="password" placeholder="Password" />
      </label>

      <label id="checkboxForm">
        <input type="checkbox" />
        Stay logged in
        <div class="tooltip">
          <svg id="iconInfos" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </div>
      </label>

      <input id="sendForm" type="submit" value="Login" />
    </form>

    <p class="or-divider">OR CONNECT WITH</p>

    <div id="iconsAllConnect">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
        <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
        <path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
        <path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
        <path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
      </svg>
    </div>

    <div id="liens">
      <RouterLink to="/test">Create a free Crz.com account</RouterLink> <br />
      <a href="https://www.crz.com">Impossible to connect ?</a>
    </div>
  </main>
</template>

<script lang="ts" setup>
  import ToolTips from "../components/ToolTips.vue";
</script>

<style lang="scss" scoped>
  main {
    margin-top: -10px;

    .container1 {
      display: flex;
      justify-content: flex-end;
      margin-right: 30px;
      margin-bottom: 10px;

      .iconSetting {
        padding: 5px;
        background-color: yellow;
      }
    }
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;

    #label1 {
      margin-bottom: 12px;
    }

    #label1, #label2 {
      width: 90%;
      height: 33px;
    }

    input {
      height: 33px;
      background-color: #101117;
      border: 1px solid #646569;
      border-radius: 4px;
      color: #ffffff;
      width: 100%;
      font-family: 'Poppins-Regular';
      padding: 10px;
    }

    input:focus, input:focus:hover {
      outline: none;
      border: 1px solid #E0A100;
    }

    input:hover {
      outline: none;
      border: 1px solid #626368;
    }

    #sendForm {
      line-height: 0;
      background-color: #E0A100;
      height: 38px;
      border: 5px;
      width: 90%;
      color: black;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
    }

    #sendForm:hover {
      border: 2px solid #FFCC47;
      transition: border 0.4s ease-in-out;
    }

    #checkboxForm {
      display: flex;
      align-items: center;
      margin: 12px 0 25px 5px;
      width: 100%;
      font-family: 'Poppins-Regular';
      font-size: 12px;
      color: #b3b3b3;

      input {
        width: 50px;
        height: 17px;
        margin-right: -9px;
        border: 1px solid #626368;
        border-radius: 6px;
      }
    }
  }

  #label2 {
    input {
    }
  }

  #iconInfos {
    margin-left: 5px;
  }

  .or-divider{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-family: 'Poppins-Regular';
    font-size: 13px;
    margin: 0 1em;
    color: #7e868a;
    margin-top: 30px;
    font-weight: bold;
  }
  .or-divider::before{
    content: '';
    height: 1px;
    background: #3f4147;
    flex: 1;
    margin: 0 17px 0 0;
  }
  .or-divider::after{
    content: '';
    height: 1px;
    background: #3f4147;
    flex: 1;
    margin: 0 0 0 17px;
  }

  #liens {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    a {
      color: #E0A100;
      text-decoration: none;
      font-family: 'Poppins-Regular';
      font-size: 14px;
      font-weight: 400;
    }

    a:hover {
      color: #FFCC47;
      text-decoration: underline;
    }
  }

  #iconsAllConnect {
    display: flex;
    justify-content: center;
    margin: 25px 0;
  }
</style>