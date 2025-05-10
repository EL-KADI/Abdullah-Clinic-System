import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Treatment, Patient } from '../../context/DataContext';

interface TreatmentFormProps {
  treatment?: Treatment;
  patients: Patient[];
  onSubmit: (treatmentData: Omit<Treatment, 'id' | 'date'>) => void;
  onCancel: () => void;
}

const TreatmentForm: React.FC<TreatmentFormProps> = ({ 
  treatment, 
  patients, 
  onSubmit, 
  onCancel 
}) => {
  const { t } = useTranslation();
  
  const [patientId, setPatientId] = useState(treatment?.patientId || '');
  const [patientName, setPatientName] = useState(treatment?.patientName || '');
  const [name, setName] = useState(treatment?.name || '');
  const [description, setDescription] = useState(treatment?.description || '');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (treatment) {
      setPatientId(treatment.patientId);
      setPatientName(treatment.patientName);
      setName(treatment.name);
      setDescription(treatment.description);
    }
  }, [treatment]);

  // When patient selection changes, update patient name
  useEffect(() => {
    if (patientId) {
      const selectedPatient = patients.find(p => p.id === patientId);
      if (selectedPatient) {
        setPatientName(selectedPatient.name);
      }
    }
  }, [patientId, patients]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!patientId) {
      newErrors.patientId = 'Patient selection is required';
    }
    
    if (!name.trim()) {
      newErrors.name = 'Treatment name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit({
        patientId,
        patientName,
        name,
        description,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label htmlFor="patientId" className="block text-sm font-medium text-gray-700">
            {t('patients.patientName')}*
          </label>
          <select
            id="patientId"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className={`mt-1 block w-full rounded-md bg-slate-200 border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm ${
              errors.patientId ? 'border-red-300' : ''
            }`}
          >
            <option value="">{t('common.select')}</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>
          {errors.patientId && <p className="mt-1 text-sm text-red-600">{errors.patientId}</p>}
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            {t('treatments.treatmentName')}*
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`mt-1 block w-full rounded-md border-gray-300 bg-slate-200 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm ${
              errors.name ? 'border-red-300' : ''
            }`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            {t('treatments.description')}
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="mt-1 block bg-slate-200 w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-colors"
          >
            {t('common.cancel')}
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none transition-colors"
          >
            {treatment ? t('common.update') : t('common.save')}
          </button>
        </div>
      </div>
    </form>
  );
};

export default TreatmentForm;