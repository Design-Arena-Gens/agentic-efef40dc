'use client';

import { useState } from 'react';

interface AIResponse {
  name: string;
  response: string;
  time: number;
  status: 'loading' | 'success' | 'error';
}

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [responses, setResponses] = useState<AIResponse[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const aiModels = [
    { name: 'Claude (Anthropic)', endpoint: '/api/claude' },
    { name: 'GPT-4 (OpenAI)', endpoint: '/api/openai' },
    { name: 'Gemini (Google)', endpoint: '/api/gemini' },
    { name: 'LLaMA (Meta)', endpoint: '/api/llama' },
  ];

  const simulateAICall = async (model: { name: string; endpoint: string }, userPrompt: string): Promise<AIResponse> => {
    const startTime = Date.now();

    // Simular respuestas de diferentes IAs con diferentes tiempos
    const delay = Math.random() * 2000 + 1000; // 1-3 segundos
    await new Promise(resolve => setTimeout(resolve, delay));

    const responses = [
      `Como ${model.name}, analizo tu pregunta "${userPrompt}" desde mi perspectiva única. Mi arquitectura me permite procesar información de manera eficiente.`,
      `Procesando con ${model.name}: "${userPrompt}". Mi enfoque se basa en patrones de entrenamiento específicos de mi modelo.`,
      `${model.name} responde: He analizado "${userPrompt}" usando mis capacidades especializadas. Aquí está mi interpretación única.`,
      `Desde ${model.name}: Tu consulta "${userPrompt}" es interesante. Mi entrenamiento me permite ofrecer esta perspectiva particular.`,
    ];

    return {
      name: model.name,
      response: responses[Math.floor(Math.random() * responses.length)],
      time: Date.now() - startTime,
      status: 'success',
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsProcessing(true);
    setResponses(aiModels.map(model => ({
      name: model.name,
      response: '',
      time: 0,
      status: 'loading' as const,
    })));

    // Ejecutar todas las llamadas en paralelo
    const promises = aiModels.map((model, index) =>
      simulateAICall(model, prompt).then(result => {
        setResponses(prev => {
          const updated = [...prev];
          updated[index] = result;
          return updated;
        });
        return result;
      })
    );

    await Promise.all(promises);
    setIsProcessing(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <h1 style={{
          color: 'white',
          textAlign: 'center',
          fontSize: '48px',
          marginBottom: '20px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
        }}>
          🤖 Trabajar con Múltiples IAs
        </h1>

        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          marginBottom: '40px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}>
          <h2 style={{ color: '#333', marginBottom: '20px' }}>
            ¿Cómo trabajar con varias IAs simultáneamente?
          </h2>

          <div style={{
            background: '#f8f9fa',
            padding: '20px',
            borderRadius: '10px',
            marginBottom: '30px',
          }}>
            <h3 style={{ color: '#667eea', marginBottom: '15px' }}>🎯 Estrategias Clave:</h3>
            <ul style={{ lineHeight: '1.8', color: '#555' }}>
              <li><strong>Paralelización:</strong> Ejecuta consultas a múltiples IAs simultáneamente usando Promise.all()</li>
              <li><strong>Especialización:</strong> Cada IA tiene fortalezas únicas (código, creatividad, análisis, etc.)</li>
              <li><strong>Comparación:</strong> Obtén múltiples perspectivas sobre el mismo problema</li>
              <li><strong>Fallback:</strong> Si una IA falla, otras pueden completar la tarea</li>
              <li><strong>Orquestación:</strong> Combina respuestas para obtener el mejor resultado</li>
              <li><strong>Optimización de costos:</strong> Usa modelos más baratos para tareas simples</li>
            </ul>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Escribe tu pregunta para todas las IAs..."
              style={{
                width: '100%',
                padding: '15px',
                fontSize: '16px',
                border: '2px solid #ddd',
                borderRadius: '10px',
                marginBottom: '15px',
                boxSizing: 'border-box',
              }}
              disabled={isProcessing}
            />
            <button
              type="submit"
              disabled={isProcessing || !prompt.trim()}
              style={{
                width: '100%',
                padding: '15px',
                fontSize: '18px',
                fontWeight: 'bold',
                color: 'white',
                background: isProcessing ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '10px',
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => {
                if (!isProcessing) {
                  e.currentTarget.style.transform = 'scale(1.02)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {isProcessing ? '⏳ Consultando a todas las IAs...' : '🚀 Consultar a todas las IAs en paralelo'}
            </button>
          </form>
        </div>

        {responses.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}>
            {responses.map((response, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  borderRadius: '15px',
                  padding: '25px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  transition: 'transform 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <h3 style={{
                  color: '#667eea',
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  {response.name}
                  {response.status === 'success' && (
                    <span style={{
                      fontSize: '12px',
                      background: '#e7f5e9',
                      color: '#2d8c3c',
                      padding: '4px 8px',
                      borderRadius: '5px',
                    }}>
                      {response.time}ms
                    </span>
                  )}
                </h3>
                {response.status === 'loading' ? (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100px',
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      border: '4px solid #f3f3f3',
                      borderTop: '4px solid #667eea',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                    }} />
                  </div>
                ) : (
                  <p style={{
                    color: '#555',
                    lineHeight: '1.6',
                    fontSize: '14px',
                  }}>
                    {response.response}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>

        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '15px',
          padding: '30px',
          marginTop: '40px',
          color: 'white',
        }}>
          <h3 style={{ marginBottom: '15px' }}>💡 Casos de Uso:</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '15px',
          }}>
            <div>
              <strong>🎨 Contenido Creativo:</strong>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>Genera múltiples versiones de textos, ideas o conceptos</p>
            </div>
            <div>
              <strong>💻 Código:</strong>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>Compara implementaciones de diferentes modelos</p>
            </div>
            <div>
              <strong>📊 Análisis:</strong>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>Obtén perspectivas diversas sobre datos complejos</p>
            </div>
            <div>
              <strong>✅ Validación:</strong>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>Verifica respuestas usando múltiples fuentes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
