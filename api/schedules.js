import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { id, name, when } = req.body;

      console.log("RECEBIDO:", { id, name, when });

      const { data, error } = await supabase
        .from('schedules')
        .insert([{ id, name, when }]);

      if (error) {
        console.error("ERRO NO SUPABASE:", error);
        return res.status(500).json({ error: error.message });
      }

      return res.status(201).json(data);
    } catch (e) {
      console.error("ERRO GERAL:", e);
      return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
  }

  if (req.method === 'GET') {
    const { data, error } = await supabase.from('schedules').select('*');
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  return res.status(405).json({ error: 'Método não permitido.' });
}
