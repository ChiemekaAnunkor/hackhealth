const apptButtom = document.querySelector(".apptbutton")
const timeContainer = document.querySelector(".time-container")
const doctor = document.getElementById("doctors");
const date = document.getElementById("date")
const selectedTime = document.querySelector(".time-container")
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
const availableTimes = document.getElementById("availabletime");
const sucesseMessage = document.querySelector(".successAppointment")
const submitAppointment = document.querySelector("#apt-form")
let formItem = document.getElementById("timeselector")
let desc = document.getElementById("description")


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

        console.log(doctorsAvaiblity)
        let doctorTime = avaiblity.map((t, index) => {

            if (doctorsAvaiblity[0]) {

                for (let i = 0; i < doctorsAvaiblity.length; i++) {


                    if (doctorsAvaiblity[i].time != t) {
                        docstime.push(t)

                        return `
            <option value="${usTime[index]}">${usTime[index]}</option>
              
            ` }
                }
            } else {
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


// const handleAppointment = (e) => {
//     e.preventDefault()

//     console.log(selectedTime)
//     modal.style.display = "block";
// }
// span.onclick = function () {
//     modal.style.display = "none";
// }
// window.onclick = function (event) {
//     event.preventDefault()

//     if (event.target == modal) {
//         modal.style.display = "none";
//     }

//     let availabletimeSelected = docstime.map((d) => {
//         return `
//         <option value="${d}">${d}</option>
//         `
//     })
//     availableTimes.innerHTML = availabletimeSelected
// }
// selectedTime.addEventListener("click", handleAppointment)

apptButtom.addEventListener("click", findDoctor)



const appointmentSubmit = (e) => {
    e.preventDefault()

    // alert("sucesss")


    console.log(desc)
    console.log(formItem.value)


    let userId = sessionStorage.getItem('userId')


    // axios.post()
}



submitAppointment.addEventListener("submit", appointmentSubmit)

