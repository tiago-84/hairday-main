import dayjs from "dayjs"

export async function scheduleFetchByDay({ date }) {
  try {
    // Fazendo a requisição diretamente
    const response = await fetch(`/api/schedules`)

    // Converte para JSON
    const data = await response.json()

    // Filtra os agendamentos pelo dia selecionado.
    const dailySchedules = data.filter((schedule) =>
      dayjs(date).isSame(schedule.when, "day")
    )

    return dailySchedules
  } catch (error) {
    console.log(error)
    alert("Não foi possível buscar os agendamentos do dia selecionado.")
    return []
  }
}
