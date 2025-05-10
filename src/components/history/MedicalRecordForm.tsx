import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MedicalRecord, Patient } from '../../context/DataContext';

interface MedicalRecordFormProps {
  record?: MedicalRecord;
  patients: Patient[];
  onSubmit: (recordData: Omit<MedicalRecord, 'id' | 'date'>) => void;
  onCancel: () => void;
}

const MedicalRecordForm: React.FC<MedicalRecordFormProps> = ({ 
  record, 
  patients, 
  onSubmit, 
  onCancel 
}) => {
  const { t } = useTranslation();
  
  const [patientId, setPatientId] = useState(record?.patientId || '');
  const [patientName, setPatientName] = useState(record?.patientName || '');
  const [diagnosis, setDiagnosis] = useState(record?.diagnosis || '');
  const [notes, setNotes] = useState(record?.notes || '');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (record) {
      setPatientId(record.patientId);
      setPatientName(record.patientName);
      setDiagnosis(record.diagnosis);
      setNotes(record.notes);
    }
  }, [record]);

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
    
    if (!diagnosis.trim()) {
      newErrors.diagnosis = 'Diagnosis is required';
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
        diagnosis,
        notes,
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
            className={`mt-1 block w-full bg-slate-200 rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm ${
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
          <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700">
            {t('patients.diagnosis')}*
          </label>
          <input
            type="text"
            id="diagnosis"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            className={`mt-1 block w-full rounded-md bg-slate-200 border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm ${
              errors.diagnosis ? 'border-red-300' : ''
            }`}
          />
          {errors.diagnosis && <p className="mt-1 text-sm text-red-600">{errors.diagnosis}</p>}
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            Notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
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
            {record ? t('common.update') : t('common.save')}
          </button>
        </div>
      </div>
    </form>
  );
};

export default MedicalRecordForm;