
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const address = document.querySelector('#address')
const firstName = document.querySelector('#first-name')
const lastName = document.querySelector('#last-name')
const authSubmit = document.querySelector('#submit-btn')
const optionalMsg = document.querySelector('#optional-msg')
const formTitle = document.querySelector('#form-title')

const labels = document.querySelectorAll(".form-control label");
labels.forEach((label) => {
  label.innerHTML = label.innerText
    .split("")
    .map((letter, idx) => `<span style="transition-delay:${idx * 100}ms">${letter}</span>`)
    .join("");
});

const baseUrl='http://127.0.0.1:5500'
const login = (body) => axios.post(`${baseUrl}/api/login`, body)
    .then((res)=> {
        console.log('hit login')
  
      console.log(res.data)
      let token = res.data.token;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userId", res.data.user_id);

        window.location.href = './index.html'
    })
    .catch((err)=> console.log(err));

const signUp = (body) => axios.post(`${baseUrl}/api/signUp`, body)
    .then( async(res)=> {
        console.log('hit signUp')
      
        let token = await res.data.token;
        console.log(res.data);
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userId", res.data.user_id);
        window.location.href = './login.html'
    })
    .catch((err)=> console.log(err));

    const handleAuth = (authType, body) => {
      if(body.email!=='' && body.password!==''){
        authType === 'SignUp' ? signUp(body) : login(body);
      } else {
        alert('Please, fill out all fields.')
      }
    }


authSubmit.addEventListener('click', (e)=> {
    e.preventDefault();
 
        console.log(authSubmit.textContent)
        if(authSubmit.textContent.trim() === 'Login') {
          const loginBody = {
            email: email.value, 
            password:password.value
          };
          handleAuth("Login", loginBody)
        } else {
          const signUpBody = {
            email: email.value, 
            password: password.value,
            address: address.value,
            firstName: firstName.value,
            lastName: lastName.value,
          };
          handleAuth("SignUp", signUpBody);
        } 
        email.value = ''
        password.value = ''
        address.value = ''
        firstName.value = ''
        lastName.value = ''
})
