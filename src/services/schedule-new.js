if (req.method === 'POST') {
  const { id, name, when } = req.body;

  const { data, error } = await supabase
    .from('schedules')
    .insert([{ id, name, when }]);

  if (error) return res.status(500).json({ error: error.message });
  return res.status(201).json(data);
}
