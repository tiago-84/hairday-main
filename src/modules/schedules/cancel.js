import { schedulesDay } from "./load.js"
import { scheduleCancel } from "../../services/schedule-cancel.js"

//Seleciona todos os agendamentos.
const periods = document.querySelectorAll(".period")

//Gera evento de clique para cada lista (manhã, tarde e noite).
periods.forEach(period  => {
    //Captura o evento de click na lista.
    period.addEventListener("click", async (event) => {
        if(event.target.classList.contains("cancel-icon")) {
            //Obtém a "li" pai do elemento clicado.
            const item = event.target.closest("li")

            //Pega o id do agendamento para remover.
            const {id} = item.dataset

            //Confirma que id foi selecionado.
            if(id){
                //Confirma se o usuario quer cancelar.
                const isConfirm = confirm("Tem certeza que deseja cancelar o agendamento?")

                if(isConfirm){
                    //Faz a requisição na API para cancelar.
                    await scheduleCancel({ id })

                    //Recarrega os agendamentos.
                    schedulesDay()
                }
            }
           }
    } )
})
