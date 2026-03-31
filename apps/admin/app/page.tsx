export default function AdminDashboard() {
  const metrics = [
    { label: 'Alunos Registados', value: '1,247', trend: '+12%', icon: '👥' },
    { label: 'Cursos Publicados', value: '154', trend: '+5', icon: '📚' },
    { label: 'Receita Mensal', value: '6.235.000 AOA', trend: '+18%', icon: '💰' },
    { label: 'Certificados Emitidos', value: '342', trend: '+24', icon: '🏆' },
    { label: 'Sessões de Tutor IA', value: '8.920', trend: '+35%', icon: '🤖' },
    { label: 'Taxa de Conclusão', value: '67%', trend: '+3%', icon: '✅' },
  ];

  const recentUsers = [
    { name: 'António Fernandes', area: 'Engenharia Civil', date: 'Hoje', status: 'Ativo' },
    { name: 'Maria João Santos', area: 'Energias Renováveis', date: 'Hoje', status: 'Ativo' },
    { name: 'Carlos Mbemba', area: 'Petróleo & Gás', date: 'Ontem', status: 'Ativo' },
    { name: 'Beatriz Neto', area: 'IA', date: '2 dias atrás', status: 'Pendente' },
    { name: 'Filipe Lopes', area: 'Telecomunicações', date: '3 dias atrás', status: 'Ativo' },
  ];

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '24px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a365d', margin: 0 }}>
          🎓 PORTECOS ACADEMIC IA — Painel Admin
        </h1>
        <p style={{ color: '#64748b', marginTop: '4px' }}>
          Dashboard de gestão da plataforma • {new Date().toLocaleDateString('pt-AO')}
        </p>
      </div>

      {/* Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {metrics.map((m) => (
          <div
            key={m.label}
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              borderLeft: '4px solid #d69e2e',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>{m.label}</p>
                <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#1a365d', margin: '4px 0 0' }}>
                  {m.value}
                </p>
              </div>
              <span style={{ fontSize: '28px' }}>{m.icon}</span>
            </div>
            <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: '500' }}>
              ↑ {m.trend} este mês
            </span>
          </div>
        ))}
      </div>

      {/* Recent Users */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a365d', marginTop: 0, marginBottom: '16px' }}>
          Novos Alunos Recentes
        </h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ textAlign: 'left', padding: '8px', color: '#64748b', fontWeight: '500', fontSize: '13px' }}>Nome</th>
              <th style={{ textAlign: 'left', padding: '8px', color: '#64748b', fontWeight: '500', fontSize: '13px' }}>Área de Interesse</th>
              <th style={{ textAlign: 'left', padding: '8px', color: '#64748b', fontWeight: '500', fontSize: '13px' }}>Registo</th>
              <th style={{ textAlign: 'left', padding: '8px', color: '#64748b', fontWeight: '500', fontSize: '13px' }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {recentUsers.map((user) => (
              <tr key={user.name} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '10px 8px', fontWeight: '500', color: '#1e293b' }}>{user.name}</td>
                <td style={{ padding: '10px 8px', color: '#64748b', fontSize: '14px' }}>{user.area}</td>
                <td style={{ padding: '10px 8px', color: '#94a3b8', fontSize: '14px' }}>{user.date}</td>
                <td style={{ padding: '10px 8px' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '2px 10px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '500',
                    background: user.status === 'Ativo' ? '#dcfce7' : '#fef3c7',
                    color: user.status === 'Ativo' ? '#16a34a' : '#92400e',
                  }}>
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
