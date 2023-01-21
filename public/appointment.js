const apptButtom = document.querySelector(".apptbutton")
const timeContainer = document.querySelector(".time-container")
const doctor = document.getElementById("doctors");
const date = document.getElementById("date")
const selectedTime = document.querySelector(".time-container")
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
const availableTimes = document.getElementById("availabletime");
const sucesseMessage = document.querySelector(".successAppointment")
const submitAppointment = document.querySelector(".submitAppointment")


axios.get('http://localhost:4000/getPhysicians').then(({ data: doctors }) => {
    let doctorList = doctors.map((d) => {
        return `
        <option value="${d.doctor_id}">${d.first_name}</option>
        `
    })
    doctor.innerHTML = doctorList
}).catch((error) => console.log(error))

let avaiblity = ["9:00", "10:00", "11:00", "12:00", "1:00", "2:00", "3:00", "4:00"]

let docstime = []
const findDoctor = (e) => {
    e.preventDefault()

    let doctor_id = parseInt(doctor.value)
    console.log(doctor_id)
    console.log(date.value)


    axios.post('http://localhost:4000/getDoctorsAvaiblity', { doctor_id: doctor_id, date: data.value }).then(({ data: doctorsAvaiblity }) => {

        let doctorTime = avaiblity.map((t) => {

            if (doctorsAvaiblity[0]) {

                for (let i = 0; i < doctorsAvaiblity.length; i++) {
                    if (doctorsAvaiblity[i].time != t) {
                        docstime.push(t)

                        return `<button>
                <div class="time-card">
                  <span class="time">Time:  ${t} </span>
                </div>
              </button>
            ` }
                }
            } else {
                docstime.push(t)

                return `<button>
                <div class="time-card">
                  <span class="time">Time:  ${t} </span>
                </div>
              </button>
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


const handleAppointment = (e) => {
    e.preventDefault()

    console.log(selectedTime)
    modal.style.display = "block";
}
span.onclick = function () {
    modal.style.display = "none";
}
window.onclick = function (event) {
    event.preventDefault()

    if (event.target == modal) {
        modal.style.display = "none";
    }

    let availabletimeSelected = docstime.map((d) => {
        return `
        <option value="${d}">${d}</option>
        `
    })
    availableTimes.innerHTML = availabletimeSelected
}
selectedTime.addEventListener("click", handleAppointment)

apptButtom.addEventListener("click", findDoctor)



const appointmentSubmit = (e) => {

    alert("sucesss")
}



submitAppointment.addEventListener("click", appointmentSubmit)

