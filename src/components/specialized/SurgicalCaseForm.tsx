import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SurgicalCase, Patient } from '../../context/DataContext';

interface SurgicalCaseFormProps {
  surgicalCase?: SurgicalCase;
  patients: Patient[];
  onSubmit: (caseData: Omit<SurgicalCase, 'id'>) => void;
  onCancel: () => void;
}

const SurgicalCaseForm: React.FC<SurgicalCaseFormProps> = ({ 
  surgicalCase, 
  patients, 
  onSubmit, 
  onCancel 
}) => {
  const { t } = useTranslation();
  
  const [patientId, setPatientId] = useState(surgicalCase?.patientId || '');
  const [patientName, setPatientName] = useState(surgicalCase?.patientName || '');
  const [surgeryType, setSurgeryType] = useState(surgicalCase?.surgeryType || '');
  const [date, setDate] = useState(surgicalCase?.date || '');
  const [status, setStatus] = useState<'scheduled' | 'completed' | 'cancelled'>(
    surgicalCase?.status || 'scheduled'
  );
  const [notes, setNotes] = useState(surgicalCase?.notes || '');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (surgicalCase) {
      setPatientId(surgicalCase.patientId);
      setPatientName(surgicalCase.patientName);
      setSurgeryType(surgicalCase.surgeryType);
      setDate(surgicalCase.date);
      setStatus(surgicalCase.status);
      setNotes(surgicalCase.notes);
    }
  }, [surgicalCase]);

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
    
    if (!surgeryType.trim()) {
      newErrors.surgeryType = 'Surgery type is required';
    }
    
    if (!date) {
      newErrors.date = 'Date is required';
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
        surgeryType,
        date,
        status,
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
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-slate-200 focus:border-teal-500 focus:ring-teal-500 sm:text-sm ${
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
          <label htmlFor="surgeryType" className="block text-sm font-medium text-gray-700">
            {t('specialized.surgeryType')}*
          </label>
          <input
            type="text"
            id="surgeryType"
            value={surgeryType}
            onChange={(e) => setSurgeryType(e.target.value)}
            className={`mt-1 block w-full rounded-md border-gray-300 bg-slate-200 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm ${
              errors.surgeryType ? 'border-red-300' : ''
            }`}
          />
          {errors.surgeryType && <p className="mt-1 text-sm text-red-600">{errors.surgeryType}</p>}
        </div>

        <div>
          <label htmlFor="date" className="block text-sm  font-medium text-gray-700">
            {t('specialized.date')}*
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`mt-1 block w-full rounded-md border-gray-300 bg-slate-200 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm ${
              errors.date ? 'border-red-300' : ''
            }`}
          />
          {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            {t('specialized.status')}
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as 'scheduled' | 'completed' | 'cancelled')}
            className="mt-1 block w-full bg-slate-200 rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
          >
            <option className='bg-slate-200' value="scheduled">{t('specialized.scheduled')}</option>
            <option className='bg-slate-200' value="completed">{t('specialized.completed')}</option>
            <option className='bg-slate-200' value="cancelled">{t('specialized.cancelled')}</option>
          </select>
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
            {surgicalCase ? t('common.update') : t('common.save')}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SurgicalCaseForm;