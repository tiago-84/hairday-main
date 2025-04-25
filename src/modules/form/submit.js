import dayjs from 'dayjs';
import { scheduleNew } from '../../services/schedule-new.js';
import { schedulesDay } from "../schedules/load.js"

const form = document.querySelector('form');
const clientName = document.getElementById('client');
const selectedDate = document.getElementById('date');

//Data atual para formatar o input.
const inputToday = dayjs(new Date()).format('YYYY-MM-DD');

//Carrega a data atual e defini a data minima como sendo a data atual.
selectedDate.value = inputToday;
selectedDate.min = inputToday;

form.onsubmit = async (event) => {
  //Previne o comportamento padrão de carregar a pagina
  event.preventDefault();

  try {
    //Recuperando o nome do cliente.
    const name = clientName.value.trim();
    if (!name) {
      return alert('Informe o nome do cliente!');
    }

    //Recupera o horario selecionado.
    const hourSelected = document.querySelector('.hour-selected');

    //Recupera o horario selecionado.
    if (!hourSelected) {
      return alert('Selecione a hora!');
    }

    //Recupera somente a hora
    const [hour] = hourSelected.innerText.split(':');

    //Inserir a hora na data.
    const when = dayjs(selectedDate.value).add(hour, 'hour');

    //gera um ID.
    const id = new Date().getTime();

    //Faz o agendamento
    await scheduleNew({
      id,
      name,
      when,
    })

    //Recarregar os agendamentos.
    await schedulesDay()

    clientName.value = ""

  } catch (error) {
    alert('Não foi possível realizar o agendamento');
    console.log(error);
  }
};
