'use client';

import { useState } from 'react';

interface ContentSection {
  id: string;
  title: string;
  description: string;
  items: string[];
  icon: string;
}

export default function ContentManager() {
  const [sections, setSections] = useState<ContentSection[]>([
    {
      id: 'programa-completo',
      title: 'Programa Completo',
      description: 'Durante 12 meses, você terá acesso a um programa completo de preparação, incluindo:',
      items: [
        'Reestruturação de currículo',
        'Carta de apresentação',
        'Treinamentos para entrevistas',
        'Conteúdo cultural',
        'Inclusão no banco de talentos acessado por empresas parceiras'
      ],
      icon: 'book'
    },
    {
      id: 'suporte-continuo',
      title: 'Suporte Contínuo',
      description: 'Nossa equipe estará disponível para auxiliar em todo o processo',
      items: [],
      icon: 'lightning'
    }
  ]);

  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [newItem, setNewItem] = useState('');

  const handleEditSection = (sectionId: string) => {
    setEditingSection(sectionId);
  };

  const handleSaveSection = (sectionId: string) => {
    setEditingSection(null);
    // Aqui você implementaria a lógica para salvar no banco de dados
  };

  const handleAddItem = (sectionId: string) => {
    if (newItem.trim()) {
      setSections(sections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            items: [...section.items, newItem.trim()]
          };
        }
        return section;
      }));
      setNewItem('');
    }
  };

  const handleRemoveItem = (sectionId: string, itemIndex: number) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          items: section.items.filter((_, index) => index !== itemIndex)
        };
      }
      return section;
    }));
  };

  return (
    <div className="space-y-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Gerenciador de Conteúdo</h2>
        
        {sections.map((section) => (
          <div key={section.id} className="mb-8 p-6 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{section.title}</h3>
              <button
                onClick={() => handleEditSection(section.id)}
                className="text-[#D4AF37] hover:text-[#B38F2E]"
              >
                Editar
              </button>
            </div>

            {editingSection === section.id ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Descrição</label>
                  <textarea
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                    rows={3}
                    value={section.description}
                    onChange={(e) => {
                      setSections(sections.map(s => 
                        s.id === section.id ? { ...s, description: e.target.value } : s
                      ));
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Itens</label>
                  <div className="mt-2 space-y-2">
                    {section.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                          value={item}
                          onChange={(e) => {
                            setSections(sections.map(s => {
                              if (s.id === section.id) {
                                const newItems = [...s.items];
                                newItems[index] = e.target.value;
                                return { ...s, items: newItems };
                              }
                              return s;
                            }));
                          }}
                        />
                        <button
                          onClick={() => handleRemoveItem(section.id, index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <input
                    type="text"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                    placeholder="Novo item"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                  />
                  <button
                    onClick={() => handleAddItem(section.id)}
                    className="px-4 py-2 bg-[#D4AF37] text-white rounded-md hover:bg-[#B38F2E]"
                  >
                    Adicionar
                  </button>
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setEditingSection(null)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => handleSaveSection(section.id)}
                    className="px-4 py-2 bg-[#D4AF37] text-white rounded-md hover:bg-[#B38F2E]"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600">{section.description}</p>
                {section.items.length > 0 && (
                  <ul className="space-y-2">
                    {section.items.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <svg className="w-5 h-5 text-[#D4AF37] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 