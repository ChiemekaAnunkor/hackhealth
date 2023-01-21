const apptButtom = document.querySelector(".apptbutton")
const timeContainer = document.querySelector(".time-container")

const avaiblitity = ["9:00", "8:00", "10:00"]
const handleAppointment = (e) => {
    e.preventDefault()


    for (let i = 0; i < avaiblitity.length; i++) {

        console.log(e.srcElement.childNodes)
        // if (e.target.textContent.trim() == avaiblitity[i]) {
        //     console.log("works")

        //     const s = document.createElement("p")
        //     s.innerHTML = avaiblitity[i]
        //     timeContainer.append(s)
        // }

    }


}

addEventListener("click", handleAppointment)