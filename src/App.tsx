import React, { useState } from 'react';
import { PlusCircle, Settings2, Power, Trash2, Factory, AlertCircle, ChevronDown, ChevronUp, X, Users, Database, Activity, Clock, AlertTriangle, Target } from 'lucide-react';

interface ProductionLine {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  code: string;
}

interface ProductionGoal {
  id: string;
  lineId: string;
  streamId: string;
  efficiencyGoal: number;
  volumeGoal?: number;
  workHoursGoal?: number;
  paidHoursGoal?: number;
  startDate: string;
  endDate?: string;
  isActive: boolean;
}

interface ValueStream {
  id: string;
  name: string;
  description: string;
  code: string;
  isActive: boolean;
  productionLines: ProductionLine[];
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (line: Omit<ProductionLine, 'id'>) => void;
  title: string;
  initialData?: Omit<ProductionLine, 'id'>;
  isEditing?: boolean;
}

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

interface ValueStreamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (stream: Omit<ValueStream, 'id' | 'productionLines'>) => void;
  title: string;
  initialData?: Omit<ValueStream, 'id' | 'productionLines'>;
  isEditing?: boolean;
}

interface ProductionGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goal: Omit<ProductionGoal, 'id'>) => void;
  title: string;
  initialData?: Omit<ProductionGoal, 'id'>;
  isEditing?: boolean;
  valueStreams: ValueStream[];
}

function ConfirmDialog({ isOpen, onClose, onConfirm, title, message }: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-6 h-6 text-yellow-500" />
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

function Modal({ isOpen, onClose, onSave, title, initialData, isEditing = false }: ModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    code: '',
    isActive: true
  });

  React.useEffect(() => {
    if (isOpen && initialData) {
      setFormData(initialData);
    } else if (isOpen && !initialData) {
      setFormData({ name: '', description: '', code: '', isActive: true });
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de la Línea
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Código
              </label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                rows={3}
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                Línea Activa
              </label>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ValueStreamModal({ isOpen, onClose, onSave, title, initialData, isEditing = false }: ValueStreamModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    code: '',
    isActive: true
  });

  React.useEffect(() => {
    if (isOpen && initialData) {
      setFormData(initialData);
    } else if (isOpen && !initialData) {
      setFormData({ name: '', description: '', code: '', isActive: true });
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del Value Stream
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Código
              </label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                rows={3}
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                Value Stream Activo
              </label>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ProductionGoalModal({ isOpen, onClose, onSave, title, initialData, isEditing = false, valueStreams }: ProductionGoalModalProps) {
  const [formData, setFormData] = useState<Omit<ProductionGoal, 'id'>>({
    lineId: '',
    streamId: '',
    efficiencyGoal: 100,
    volumeGoal: 0,
    workHoursGoal: 0,
    paidHoursGoal: 0,
    startDate: new Date().toISOString().split('T')[0],
    isActive: true
  });
  
  const [selectedStream, setSelectedStream] = useState<string>('');
  const [availableLines, setAvailableLines] = useState<ProductionLine[]>([]);

  React.useEffect(() => {
    if (isOpen && initialData) {
      setFormData(initialData);
      setSelectedStream(initialData.streamId);
      
      const stream = valueStreams.find(s => s.id === initialData.streamId);
      if (stream) {
        setAvailableLines(stream.productionLines);
      }
    } else if (isOpen && !initialData) {
      setFormData({
        lineId: '',
        streamId: '',
        efficiencyGoal: 100,
        volumeGoal: 0,
        workHoursGoal: 0,
        paidHoursGoal: 0,
        startDate: new Date().toISOString().split('T')[0],
        isActive: true
      });
      setSelectedStream('');
      setAvailableLines([]);
    }
  }, [isOpen, initialData, valueStreams]);

  const handleStreamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const streamId = e.target.value;
    setSelectedStream(streamId);
    setFormData(prev => ({ ...prev, streamId, lineId: '' }));
    
    const stream = valueStreams.find(s => s.id === streamId);
    if (stream) {
      setAvailableLines(stream.productionLines);
    } else {
      setAvailableLines([]);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Value Stream
              </label>
              <select
                value={formData.streamId}
                onChange={handleStreamChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                required
              >
                <option value="">Seleccionar Value Stream</option>
                {valueStreams.map(stream => (
                  <option key={stream.id} value={stream.id}>{stream.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Línea de Producción
              </label>
              <select
                value={formData.lineId}
                onChange={(e) => setFormData({ ...formData, lineId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                required
                disabled={!formData.streamId}
              >
                <option value="">Seleccionar Línea</option>
                {availableLines.map(line => (
                  <option key={line.id} value={line.id}>{line.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta de Eficiencia (%)
              </label>
              <input
                type="number"
                value={formData.efficiencyGoal}
                onChange={(e) => setFormData({ ...formData, efficiencyGoal: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                required
                min="0"
                step="0.1"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta de Volumen
              </label>
              <input
                type="number"
                value={formData.volumeGoal || ''}
                onChange={(e) => setFormData({ ...formData, volumeGoal: Number(e.target.value) || undefined })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta de Horas Trabajadas
              </label>
              <input
                type="number"
                value={formData.workHoursGoal || ''}
                onChange={(e) => setFormData({ ...formData, workHoursGoal: Number(e.target.value) || undefined })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta de Horas Pagadas
              </label>
              <input
                type="number"
                value={formData.paidHoursGoal || ''}
                onChange={(e) => setFormData({ ...formData, paidHoursGoal: Number(e.target.value) || undefined })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Inicio
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Fin (opcional)
              </label>
              <input
                type="date"
                value={formData.endDate || ''}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value || undefined })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                Meta Activa
              </label>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function App() {
  const [valueStreams, setValueStreams] = useState<ValueStream[]>([
    {
      id: '1',
      name: 'ENT',
      description: 'ENT',
      code: 'ENT',
      isActive: true,
      productionLines: [
        { id: '1-1', name: 'Línea A', description: 'Línea principal ENT', isActive: true, code: 'ENT-A' },
        { id: '1-2', name: 'Línea B', description: 'Línea secundaria ENT', isActive: false, code: 'ENT-B' },
      ]
    },
    {
      id: '2',
      name: 'Fixation',
      description: 'Fixation',
      code: 'Fixation',
      isActive: true,
      productionLines: [
        { id: '2-1', name: 'Línea Principal', description: 'Línea única de Fixation', isActive: true, code: 'FIX-1' },
      ]
    }
  ]);

  const [selectedStream, setSelectedStream] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStreamId, setCurrentStreamId] = useState<string | null>(null);
  const [currentLineId, setCurrentLineId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [modalInitialData, setModalInitialData] = useState<Omit<ProductionLine, 'id'> | undefined>(undefined);
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });
  const [isValueStreamModalOpen, setIsValueStreamModalOpen] = useState(false);
  const [currentValueStreamId, setCurrentValueStreamId] = useState<string | null>(null);
  const [isEditingValueStream, setIsEditingValueStream] = useState(false);
  const [valueStreamModalInitialData, setValueStreamModalInitialData] = useState<Omit<ValueStream, 'id' | 'productionLines'> | undefined>(undefined);
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('valueStreams');
  const [productionGoals, setProductionGoals] = useState<ProductionGoal[]>([
    {
      id: '1',
      lineId: '1-1',
      streamId: '1',
      efficiencyGoal: 116,
      volumeGoal: 1000,
      workHoursGoal: 160,
      paidHoursGoal: 168,
      startDate: '2025-01-05',
      isActive: true
    },
    {
      id: '2',
      lineId: '1-2',
      streamId: '1',
      efficiencyGoal: 105,
      volumeGoal: 800,
      workHoursGoal: 160,
      paidHoursGoal: 168,
      startDate: '2025-01-05',
      isActive: true
    },
    {
      id: '3',
      lineId: '2-1',
      streamId: '2',
      efficiencyGoal: 110,
      volumeGoal: 1200,
      workHoursGoal: 160,
      paidHoursGoal: 168,
      startDate: '2025-01-05',
      isActive: true
    }
  ]);
  const [selectedGoalType, setSelectedGoalType] = useState<string>('efficiency');
  const [isProductionGoalModalOpen, setIsProductionGoalModalOpen] = useState(false);
  const [currentGoalId, setCurrentGoalId] = useState<string | null>(null);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [goalModalInitialData, setGoalModalInitialData] = useState<Omit<ProductionGoal, 'id'> | undefined>(undefined);

  const toggleSection = (streamId: string) => {
    setCollapsedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(streamId)) {
        newSet.delete(streamId);
      } else {
        newSet.add(streamId);
      }
      return newSet;
    });
  };

  const handleToggleValueStream = (streamId: string, currentStatus: boolean) => {
    if (currentStatus) {
      setConfirmDialog({
        isOpen: true,
        title: 'Confirmar Desactivación',
        message: 'Esta acción va a inhabilitar el registro de Value Stream. ¿Está seguro?',
        onConfirm: () => {
          setValueStreams(streams => 
            streams.map(stream => 
              stream.id === streamId 
                ? { ...stream, isActive: false }
                : stream
            )
          );
        },
      });
    } else {
      setValueStreams(streams => 
        streams.map(stream => 
          stream.id === streamId 
            ? { ...stream, isActive: true }
            : stream
        )
      );
    }
  };

  const handleToggleProductionLine = (streamId: string, lineId: string, currentStatus: boolean) => {
    if (currentStatus) {
      setConfirmDialog({
        isOpen: true,
        title: 'Confirmar Desactivación',
        message: 'Esta acción va a inhabilitar el registro de Línea de Producción. ¿Está seguro?',
        onConfirm: () => {
          setValueStreams(streams =>
            streams.map(stream =>
              stream.id === streamId
                ? {
                    ...stream,
                    productionLines: stream.productionLines.map(line =>
                      line.id === lineId ? { ...line, isActive: false } : line
                    )
                  }
                : stream
            )
          );
        },
      });
    } else {
      setValueStreams(streams =>
        streams.map(stream =>
          stream.id === streamId
            ? {
                ...stream,
                productionLines: stream.productionLines.map(line =>
                  line.id === lineId ? { ...line, isActive: true } : line
                )
              }
            : stream
        )
      );
    }
  };

  const handleAddProductionLine = (streamId: string) => {
    setCurrentStreamId(streamId);
    setCurrentLineId(null);
    setIsEditing(false);
    setModalInitialData(undefined);
    setIsModalOpen(true);
  };

  const handleEditProductionLine = (streamId: string, lineId: string) => {
    const stream = valueStreams.find(s => s.id === streamId);
    if (!stream) return;
    
    const line = stream.productionLines.find(l => l.id === lineId);
    if (!line) return;
    
    setCurrentStreamId(streamId);
    setCurrentLineId(lineId);
    setIsEditing(true);
    setModalInitialData({
      name: line.name,
      description: line.description,
      code: line.code,
      isActive: line.isActive
    });
    setIsModalOpen(true);
  };

  const handleSaveProductionLine = (lineData: Omit<ProductionLine, 'id'>) => {
    if (!currentStreamId) return;

    if (isEditing && currentLineId) {
      // Actualizar línea existente
      setValueStreams(streams =>
        streams.map(stream =>
          stream.id === currentStreamId
            ? {
                ...stream,
                productionLines: stream.productionLines.map(line =>
                  line.id === currentLineId
                    ? { ...line, ...lineData }
                    : line
                )
              }
            : stream
        )
      );
    } else {
      // Crear nueva línea
      const newLine: ProductionLine = {
        ...lineData,
        id: Date.now().toString(),
      };

      setValueStreams(streams =>
        streams.map(stream =>
          stream.id === currentStreamId
            ? { ...stream, productionLines: [...stream.productionLines, newLine] }
            : stream
        )
      );
    }
  };

  const removeProductionLine = (streamId: string, lineId: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Confirmar Eliminación',
      message: '¿Está seguro que desea eliminar esta línea de producción?',
      onConfirm: () => {
        setValueStreams(streams =>
          streams.map(stream =>
            stream.id === streamId
              ? {
                  ...stream,
                  productionLines: stream.productionLines.filter(line => line.id !== lineId)
                }
              : stream
          )
        );
      },
    });
  };

  const handleAddValueStream = () => {
    setCurrentValueStreamId(null);
    setIsEditingValueStream(false);
    setValueStreamModalInitialData(undefined);
    setIsValueStreamModalOpen(true);
  };

  const handleEditValueStream = (streamId: string) => {
    const stream = valueStreams.find(s => s.id === streamId);
    if (!stream) return;
    
    setCurrentValueStreamId(streamId);
    setIsEditingValueStream(true);
    setValueStreamModalInitialData({
      name: stream.name,
      description: stream.description,
      code: stream.code,
      isActive: stream.isActive
    });
    setIsValueStreamModalOpen(true);
  };

  const handleSaveValueStream = (streamData: Omit<ValueStream, 'id' | 'productionLines'>) => {
    if (isEditingValueStream && currentValueStreamId) {
      // Actualizar Value Stream existente
      setValueStreams(streams =>
        streams.map(stream =>
          stream.id === currentValueStreamId
            ? { ...stream, ...streamData }
            : stream
        )
      );
    } else {
      // Crear nuevo Value Stream
      const newStream: ValueStream = {
        ...streamData,
        id: Date.now().toString(),
        productionLines: []
      };

      setValueStreams(prevStreams => [...prevStreams, newStream]);
    }
  };

  const handleSaveChanges = () => {
    setIsSaving(true);
    
    // Simulamos una operación de guardado
    setTimeout(() => {
      setIsSaving(false);
      setShowSaveSuccess(true);
      
      // Ocultar el mensaje de éxito después de 3 segundos
      setTimeout(() => {
        setShowSaveSuccess(false);
      }, 3000);
    }, 1000);
  };

  const handleAddProductionGoal = () => {
    setCurrentGoalId(null);
    setIsEditingGoal(false);
    setGoalModalInitialData(undefined);
    setIsProductionGoalModalOpen(true);
  };

  const handleEditProductionGoal = (goalId: string) => {
    const goal = productionGoals.find(g => g.id === goalId);
    if (!goal) return;
    
    setCurrentGoalId(goalId);
    setIsEditingGoal(true);
    setGoalModalInitialData({
      lineId: goal.lineId,
      streamId: goal.streamId,
      efficiencyGoal: goal.efficiencyGoal,
      volumeGoal: goal.volumeGoal,
      workHoursGoal: goal.workHoursGoal,
      paidHoursGoal: goal.paidHoursGoal,
      startDate: goal.startDate,
      endDate: goal.endDate,
      isActive: goal.isActive
    });
    setIsProductionGoalModalOpen(true);
  };

  const handleSaveProductionGoal = (goalData: Omit<ProductionGoal, 'id'>) => {
    if (isEditingGoal && currentGoalId) {
      // Actualizar meta existente
      setProductionGoals(goals =>
        goals.map(goal =>
          goal.id === currentGoalId
            ? { ...goal, ...goalData }
            : goal
        )
      );
    } else {
      // Crear nueva meta
      const newGoal: ProductionGoal = {
        ...goalData,
        id: Date.now().toString(),
      };

      setProductionGoals(prevGoals => [...prevGoals, newGoal]);
    }
  };

  const removeProductionGoal = (goalId: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Confirmar Eliminación',
      message: '¿Está seguro que desea eliminar esta meta de producción?',
      onConfirm: () => {
        setProductionGoals(goals => goals.filter(goal => goal.id !== goalId));
      },
    });
  };

  const getStreamNameById = (streamId: string): string => {
    const stream = valueStreams.find(s => s.id === streamId);
    return stream ? stream.name : 'Desconocido';
  };

  const getLineNameById = (streamId: string, lineId: string): string => {
    const stream = valueStreams.find(s => s.id === streamId);
    if (!stream) return 'Desconocido';
    
    const line = stream.productionLines.find(l => l.id === lineId);
    return line ? line.name : 'Desconocido';
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Parámetros de Producción</h1>
          <div className="flex items-center gap-3">
            {showSaveSuccess && (
              <span className="text-green-600 text-sm">Cambios guardados correctamente</span>
            )}
            <button 
              onClick={handleSaveChanges}
              disabled={isSaving}
              className={`px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2 ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSaving ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Guardando...
                </>
              ) : (
                <>
                  <Settings2 className="w-5 h-5" />
                  Guardar Cambios
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow mb-8">
          <div className="flex flex-wrap items-center justify-between px-4 py-4 sm:px-6 border-b border-gray-200">
            <div className="flex space-x-8 overflow-x-auto">
              <button 
                onClick={() => setActiveTab('valueStreams')}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'valueStreams' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Factory className="w-5 h-5" />
                <span>Value Streams</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('capacidad')}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'capacidad' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Users className="w-5 h-5" />
                <span>Capacidad</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('entradaDatos')}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'entradaDatos' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Database className="w-5 h-5" />
                <span>Entrada de Datos</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('runRates')}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'runRates' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Activity className="w-5 h-5" />
                <span>Run Rates</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('parosProgramados')}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'parosProgramados' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Clock className="w-5 h-5" />
                <span>Paros Programados</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('causas')}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'causas' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <AlertTriangle className="w-5 h-5" />
                <span>Causas</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('metasProduccion')}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'metasProduccion' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Target className="w-5 h-5" />
                <span>Metas de Producción</span>
              </button>
            </div>
          </div>
        </div>

        {activeTab === 'valueStreams' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Value Streams</h2>
                <button 
                  onClick={handleAddValueStream}
                  className="text-purple-600 hover:text-purple-700 flex items-center gap-2"
                >
                  <PlusCircle className="w-5 h-5" />
                  Agregar Value Stream
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {valueStreams.map(stream => (
                  <div key={stream.id} className={`bg-white border rounded-lg shadow-sm ${!stream.isActive && 'opacity-75'}`}>
                    <div className="p-4 border-b">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{stream.name}</h3>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditValueStream(stream.id)}
                            className="p-1 text-blue-600 hover:text-blue-700 rounded-full"
                          >
                            <Settings2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleToggleValueStream(stream.id, stream.isActive)}
                            className={`p-1 rounded-full ${
                              stream.isActive ? 'text-green-600 hover:text-green-700' : 'text-gray-400 hover:text-gray-500'
                            }`}
                          >
                            <Power className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">Código: {stream.code}</p>
                    </div>

                    <div className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium text-gray-700">Líneas de Producción</h4>
                          <button
                            onClick={() => toggleSection(stream.id)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            {collapsedSections.has(stream.id) ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronUp className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <button
                          onClick={() => handleAddProductionLine(stream.id)}
                          className="text-purple-600 hover:text-purple-700"
                        >
                          <PlusCircle className="w-5 h-5" />
                        </button>
                      </div>

                      {!collapsedSections.has(stream.id) && (
                        <div className="space-y-3">
                          {stream.productionLines.map(line => (
                            <div key={line.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <Factory className={`w-4 h-4 ${line.isActive ? 'text-green-600' : 'text-gray-400'}`} />
                                  <span className="text-sm font-medium text-gray-700">{line.name}</span>
                                </div>
                                <p className="text-xs text-gray-500 ml-6">{line.description}</p>
                                <p className="text-xs text-gray-500 ml-6">Código: {line.code}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleToggleProductionLine(stream.id, line.id, line.isActive)}
                                  className={`p-1 rounded-full ${
                                    line.isActive ? 'text-green-600 hover:text-green-700' : 'text-gray-400 hover:text-gray-500'
                                  }`}
                                >
                                  <Power className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleEditProductionLine(stream.id, line.id)}
                                  className="p-1 text-blue-600 hover:text-blue-700 rounded-full"
                                >
                                  <Settings2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => removeProductionLine(stream.id, line.id)}
                                  className="p-1 text-red-600 hover:text-red-700 rounded-full"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'capacidad' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Capacidad</h2>
            <div className="text-center py-12 text-gray-500">
              <p>Contenido de Capacidad en desarrollo</p>
            </div>
          </div>
        )}

        {activeTab === 'entradaDatos' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Entrada de Datos</h2>
            <div className="text-center py-12 text-gray-500">
              <p>Contenido de Entrada de Datos en desarrollo</p>
            </div>
          </div>
        )}

        {activeTab === 'runRates' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Run Rates</h2>
            <div className="text-center py-12 text-gray-500">
              <p>Contenido de Run Rates en desarrollo</p>
            </div>
          </div>
        )}

        {activeTab === 'parosProgramados' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Paros Programados</h2>
            <div className="text-center py-12 text-gray-500">
              <p>Contenido de Paros Programados en desarrollo</p>
            </div>
          </div>
        )}

        {activeTab === 'causas' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Causas</h2>
            <div className="text-center py-12 text-gray-500">
              <p>Contenido de Causas en desarrollo</p>
            </div>
          </div>
        )}

        {activeTab === 'metasProduccion' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Metas de Producción</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                  <button
                    onClick={() => setSelectedGoalType('efficiency')}
                    className={`px-3 py-1.5 text-sm ${
                      selectedGoalType === 'efficiency' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Eficiencia
                  </button>
                  <button
                    onClick={() => setSelectedGoalType('volume')}
                    className={`px-3 py-1.5 text-sm ${
                      selectedGoalType === 'volume' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Volumen
                  </button>
                  <button
                    onClick={() => setSelectedGoalType('hours')}
                    className={`px-3 py-1.5 text-sm ${
                      selectedGoalType === 'hours' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Horas
                  </button>
                </div>
                <button 
                  onClick={handleAddProductionGoal}
                  className="text-purple-600 hover:text-purple-700 flex items-center gap-2"
                >
                  <PlusCircle className="w-5 h-5" />
                  Agregar Meta
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value Stream
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Línea de Producción
                    </th>
                    {selectedGoalType === 'efficiency' && (
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Meta de Eficiencia
                      </th>
                    )}
                    {selectedGoalType === 'volume' && (
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Meta de Volumen
                      </th>
                    )}
                    {selectedGoalType === 'hours' && (
                      <>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Horas Trabajadas
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Horas Pagadas
                        </th>
                      </>
                    )}
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vigencia
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {productionGoals.map(goal => (
                    <tr key={goal.id} className={!goal.isActive ? 'bg-gray-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {getStreamNameById(goal.streamId)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {getLineNameById(goal.streamId, goal.lineId)}
                      </td>
                      {selectedGoalType === 'efficiency' && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-md">
                            {goal.efficiencyGoal}%
                          </span>
                        </td>
                      )}
                      {selectedGoalType === 'volume' && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {goal.volumeGoal || 'No definido'}
                        </td>
                      )}
                      {selectedGoalType === 'hours' && (
                        <>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {goal.workHoursGoal || 'No definido'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {goal.paidHoursGoal || 'No definido'}
                          </td>
                        </>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(goal.startDate)}
                        {goal.endDate && ` - ${formatDate(goal.endDate)}`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          goal.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {goal.isActive ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditProductionGoal(goal.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Settings2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeProductionGoal(goal.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {productionGoals.length === 0 && (
                    <tr>
                      <td colSpan={selectedGoalType === 'hours' ? 7 : 6} className="px-6 py-4 text-center text-sm text-gray-500">
                        No hay metas de producción definidas
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProductionLine}
        title={isEditing ? "Editar Línea de Producción" : "Agregar Línea de Producción"}
        initialData={modalInitialData}
        isEditing={isEditing}
      />

      <ValueStreamModal
        isOpen={isValueStreamModalOpen}
        onClose={() => setIsValueStreamModalOpen(false)}
        onSave={handleSaveValueStream}
        title={isEditingValueStream ? "Editar Value Stream" : "Agregar Value Stream"}
        initialData={valueStreamModalInitialData}
        isEditing={isEditingValueStream}
      />

      <ProductionGoalModal
        isOpen={isProductionGoalModalOpen}
        onClose={() => setIsProductionGoalModalOpen(false)}
        onSave={handleSaveProductionGoal}
        title={isEditingGoal ? "Editar Meta de Producción" : "Agregar Meta de Producción"}
        initialData={goalModalInitialData}
        isEditing={isEditingGoal}
        valueStreams={valueStreams}
      />

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        message={confirmDialog.message}
      />
    </div>
  );
}

export default App;