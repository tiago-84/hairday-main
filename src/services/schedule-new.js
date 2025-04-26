export async function scheduleNew({ id, name, when }) {
  try {
    const response = await fetch('/api/schedules', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ id, name, when }),
    });

    if (!response.ok) throw new Error('Erro ao agendar');

    alert('Agendamento realizado com sucesso!');
  } catch (error) {
    console.error(error);
    alert('Não foi possível agendar. Tente novamente mais tarde.');
  }
}
