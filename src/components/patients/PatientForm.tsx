import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Patient } from '../../context/DataContext';

interface PatientFormProps {
  patient?: Patient;
  onSubmit: (patientData: Omit<Patient, 'id' | 'dateAdded'>) => void;
  onCancel: () => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ patient, onSubmit, onCancel }) => {
  const { t } = useTranslation();
  
  const [name, setName] = useState(patient?.name || '');
  const [age, setAge] = useState(patient?.age || '');
  const [phone, setPhone] = useState(patient?.phone || '');
  const [diagnosis, setDiagnosis] = useState(patient?.diagnosis || '');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (patient) {
      setName(patient.name);
      setAge(patient.age);
      setPhone(patient.phone);
      setDiagnosis(patient.diagnosis);
    }
  }, [patient]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!name.trim()) {
      newErrors.name = t('auth.nameRequired');
    }
    
    if (!age.trim()) {
      newErrors.age = t('auth.ageRequired');
    } else if (isNaN(Number(age)) || Number(age) <= 0) {
      newErrors.age = t('auth.ageInvalid');
    }
    
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit({
        name,
        age,
        phone,
        diagnosis,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            {t('patients.patientName')}*
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
          <label htmlFor="age" className="block text-sm  font-medium text-gray-700">
            {t('patients.age')}*
          </label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className={`mt-1 block w-full rounded-md bg-slate-200 border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm ${
              errors.age ? 'border-red-300' : ''
            }`}
          />
          {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            {t('patients.phone')}*
          </label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`mt-1 block w-full rounded-md border-gray-300 bg-slate-200 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm ${
              errors.phone ? 'border-red-300' : ''
            }`}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700">
            {t('patients.diagnosis')}
          </label>
          <textarea
            id="diagnosis"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md bg-slate-200 border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
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
            {patient ? t('common.update') : t('common.save')}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PatientForm;