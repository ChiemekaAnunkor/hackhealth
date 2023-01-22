const apptButtom = document.querySelector(".apptbutton")
const timeContainer = document.querySelector(".time-container")
const logoutBtn = document.querySelector('.logout');
const doctor = document.getElementById("doctors");
const date = document.getElementById("date")
const selectedTime = document.querySelector(".time-container")
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
const availableTimes = document.getElementById("availabletime");
const sucesseMessage = document.querySelector(".successAppointment")
const submitAppointment = document.querySelector(".apt-form")
let formItem = document.getElementById("timeselector")
let desc = document.getElementById("description")

let viewAppointment = document.querySelector(".doctor-container")

if (!sessionStorage.getItem('token')) {
    window.location.href = './login.html'
}
logoutBtn.addEventListener('click', () => {
    sessionStorage.clear();
})


axios.get('http://localhost:4000/getPhysicians').then(({ data: doctors }) => {
    let doctorList = doctors.map((d) => {
        return `
        <option value="${d.doctor_id}">Dr. ${d.first_name} ${d.last_name} - ${d.title}</option>
        `
    })
    doctor.innerHTML = doctorList
}).catch((error) => console.log(error))

let avaiblity = ["09:00:00", "10:00:00", "11:00:00", "12:00:00", "13:00:00", "14:00:00", "15:00:00", "16:00:00"]
let usTime = ["09:00:00", "10:00:00", "11:00:00", "12:00:00", "01:00:00", "02:00:00", "03:00:00", "04:00:00"]

let docstime = []
const findDoctor = (e) => {
    e.preventDefault()

    let doctor_id = parseInt(doctor.value)
    console.log(doctor_id)
    console.log(date.value)


    axios.post('http://localhost:4000/getDoctorsAvaiblity', { doctor_id: doctor_id, date: date.value }).then(({ data: doctorsAvaiblity }) => {
        // console.log(doctorsAvaiblity);
        // console.log(doctorsAvaiblity.length);
        // console.log(usTime.length)

        // console.log(doctorsAvaiblity)
        let doctorTime = avaiblity.map((t, index) => {

            if (doctorsAvaiblity.length > 0) {

                for (let i = 0; i < doctorsAvaiblity.length; i++) {
                    // console.log(t == doctorsAvaiblity[i].time);
                    if (doctorsAvaiblity[i].time != t) {
                        docstime.push(t)

                        return `
                <option value="${usTime[index]}">${usTime[index]}</option>
                  
                `
                    }
                }

            }
            else {
                docstime.push(t)

                return `
                    <option value="${usTime[index]}">${usTime[index]}</option>
                `
            }
        })

        timeContainer.innerHTML = doctorTime
    }).catch((error) => console.log(error))

    const selectedTime = document.querySelector(".time")


    const handleAppointment = (e) => {

        console.log(selectedTime)

    }



}



apptButtom.addEventListener("click", findDoctor)



const appointmentSubmit = (e) => {
    e.preventDefault()


    let foritemCopy = `'${formItem.value}'`
    let doctor_id = parseInt(doctor.value)

    let userId = sessionStorage.getItem('userId')
    body = {
        date: date.value,
        doctor_id: doctor_id,
        user_id: userId,
        time: foritemCopy,
        description: desc.value
    }

    axios.post('http://localhost:4000/appointment', body).then(
        () => alert("sucesss"))
}


submitAppointment.addEventListener("submit", appointmentSubmit)






let userId = sessionStorage.getItem('userId')




setTimeout(() => {
    let doctor_id = parseInt(doctor.value)


    axios.post('http://localhost:4000/getUserAppointment', { user_id: userId }).then(({ data: dbres }) => {
        console.log(dbres)


        let apointmentdata = dbres.map((apt) => {
            return `
      <section class="card">
      <img
        src=${apt.img}
        alt="doctor"
      />
      <div class="content">
      <h3 class="doctor">Dr.${apt.first_name} ${apt.last_name}</h3>
      <h4 class="title">${apt.title}</h4>
      <p>Appointment Date : ${apt.date} </p>
      <p>Appointment Time: ${apt.time}</p>
      <p>Description: ${apt.description} </p>
    </div>
    </section>
    ` })
        viewAppointment.innerHTML = apointmentdata


    })


}, 1000)


