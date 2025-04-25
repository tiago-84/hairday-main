import dayjs from "dayjs"

//Selecionar as sessões manhã, tarde e noite
const periodMorning = document.getElementById("period-morning")
const periodAfternoon = document.getElementById("period-afternoon")
const periodNight = document.getElementById("period-night")

export function scheduleShow({dailySchedules}){
    try{
        //Limpa as listas
        periodMorning.innerHTML = ""
        periodAfternoon.innerHTML = ""
        periodNight.innerHTML = ""

        //Renderiza os agendamento por periodo.
        dailySchedules.forEach((schedule) => {
            const item = document.createElement("li")
            const time = document.createElement("strong")
            const name = document.createElement("span")

        //Adiciona o id do agendamento
        item.setAttribute("data-id", schedule.id)

        time.textContent = dayjs(schedule.when).format("HH:mm")
        name.textContent = schedule.name

        //Cria incone de cancelar o agendamento
        const cancelIcon = document.createElement("img")
        cancelIcon.classList.add("cancel-icon")
        cancelIcon.setAttribute("src", "./src/assets/cancel.svg")
        cancelIcon.setAttribute("alt", "Cancelar")

        //Adiciona o tempo, nome e o icone no item.
        item.append(time, name, cancelIcon)

        //Obtém somente a hora.
        const hour = dayjs(schedule.when).hour()

        //Renderiza o agendamento na sessão (manhã, tarde ou noite).
        if(hour <= 12){
            periodMorning.appendChild(item)
        }else if(hour > 12 && hour <= 18){
            periodAfternoon.appendChild(item)
        }else{
            periodNight.appendChild(item)
        }
        })

    }catch(error){
        console.log(error)
        return alert("Não foi possivel exibir os agendamentos")
    }
}
