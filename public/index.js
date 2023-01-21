const loginBtn = document.querySelector('#login-btn');
const drContainer = document.querySelector('.doctor-container')

const doctorsArr=[]

const getAllDoctors = () => axios.get(url).then(({data: doctors})=> {
    renderItems(doctors)
}).catch((error)=> console.log(error))

window.addEventListener("DOMContentLoaded", function () {
    getAllDoctors()
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
      <h3 class="doctor">Dr.{item.first_name} {item.last_name}</h3>
      <h4 class="title">{item.title}</h4>
      <p>Start-time: 09:00am</p>
      <p>End-time: 04:00pm</p>
    </div>
    </section>`;
    });
    drContainer.innerHTML = doctor;
  }