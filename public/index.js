const loginBtn = document.querySelector('#login-btn');
const drContainer = document.querySelector('.doctor-container')
const logoutBtn = document.querySelector('.logout');
const deleteBtn=document.querySelector('#delete-btn')
const prescriptionList=document.querySelector('.prescription-list')

logoutBtn.addEventListener('click',()=>{
    sessionStorage.clear();
})

if(!sessionStorage.getItem('token')){
    window.location.href='./login.html'
}
const url='http://localhost:4000'
const doctorsArr=[]

const getAllDoctors = () => axios.get('http://localhost:4000/getPhysicians').then(({data: doctors})=> {
    renderItems(doctors)
}).catch((error)=> console.log(error))

window.addEventListener("DOMContentLoaded", function () {
    getAllDoctors()
    getAllPres()
});

function renderItems(doctors) {
    let doctor = doctors.map((item) => {
      return `
      <section class="card">
      <img
        src=${item.img}
        alt="doctor"
      />
      <div class="content">
      <h3 class="doctor">Dr.${item.first_name} ${item.last_name}</h3>
      <h4 class="title">${item.title}</h4>
      <p>Start-time: 09:00am</p>
      <p>End-time: 04:00pm</p>
    </div>
    </section>`;
    });
    drContainer.innerHTML = doctor;
  }

  const errCallback = err =>console.log(err)
  let userId=sessionStorage.getItem('userId')
  console.log(typeof userId, 'userId')
  let body=
  {
    user_id:+userId
  }
  

const getAllPres = () => axios.post(`${url}/getPrescription`,body).then(({data: presList})=> {
    console.log(body,'body')
    renderPres(presList)
}).catch(errCallback)
// const createProduct = (id) => axios.post(`${baseURL}/${id}`).then(productCallback).catch(errCallback)


const renderPres=(presList)=> {
    let pres=presList.map((el)=> {
        return `
        <div class="prescription">
              <h3 class="pres-title">${el.name}</h3>
              <h4 class="dosage">${el.dosage} mg</h4>
              <p>${el.freq} times a day</p>
              <button id="delete-btn" onclick='deletePres(${el.pres_id})'>X</button>
            </div>
      `
    })
    prescriptionList.innerHTML = pres;
}


  const deletePres=(id)=> {
     axios.delete(`${url}/${id}`).then(getAllPres()).catch(errCallback)
  }