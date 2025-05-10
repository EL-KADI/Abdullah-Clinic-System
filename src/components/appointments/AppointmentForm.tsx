import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Appointment, Patient } from '../../context/DataContext';

interface AppointmentFormProps {
  appointment?: Appointment;
  patients: Patient[];
  onSubmit: (appointmentData: Omit<Appointment, 'id'>) => void;
  onCancel: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ 
  appointment, 
  patients, 
  onSubmit, 
  onCancel 
}) => {
  const { t } = useTranslation();
  
  const [patientId, setPatientId] = useState(appointment?.patientId || '');
  const [patientName, setPatientName] = useState(appointment?.patientName || '');
  const [date, setDate] = useState(appointment?.date || '');
  const [time, setTime] = useState(appointment?.time || '');
  const [phone, setPhone] = useState(appointment?.phone || '');
  const [diagnosis, setDiagnosis] = useState(appointment?.diagnosis || '');
  const [promotion, setPromotion] = useState(appointment?.promotion || '');
  const [status, setStatus] = useState<'upcoming' | 'completed' | 'cancelled'>(
    appointment?.status || 'upcoming'
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (appointment) {
      setPatientId(appointment.patientId);
      setPatientName(appointment.patientName);
      setDate(appointment.date);
      setTime(appointment.time);
      setPhone(appointment.phone);
      setDiagnosis(appointment.diagnosis);
      setPromotion(appointment.promotion);
      setStatus(appointment.status);
    }
  }, [appointment]);

  // When patient selection changes, update patient name and phone
  useEffect(() => {
    if (patientId) {
      const selectedPatient = patients.find(p => p.id === patientId);
      if (selectedPatient) {
        setPatientName(selectedPatient.name);
        setPhone(selectedPatient.phone);
      }
    }
  }, [patientId, patients]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!patientId) {
      newErrors.patientId = 'Patient selection is required';
    }
    
    if (!date) {
      newErrors.date = 'Date is required';
    }
    
    if (!time) {
      newErrors.time = 'Time is required';
    }
    
    if (!phone) {
      newErrors.phone = 'Phone number is required';
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
        date,
        time,
        phone,
        diagnosis,
        promotion,
        status,
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
            className={`mt-1 bg-slate-200 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm ${
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              {t('appointments.date')}*
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`mt-1 bg-slate-200 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm ${
                errors.date ? 'border-red-300' : ''
              }`}
            />
            {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">
              {t('appointments.time')}*
            </label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={`mt-1 bg-slate-200 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm ${
                errors.time ? 'border-red-300' : ''
              }`}
            />
            {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
          </div>
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
            className={`mt-1 block bg-slate-200 w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm ${
              errors.phone ? 'border-red-300' : ''
            }`}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700">
            {t('patients.diagnosis')}
          </label>
          <input
            type="text"
            id="diagnosis"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            className="mt-1 block w-full bg-slate-200 rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="promotion" className="block text-sm font-medium text-gray-700">
            {t('appointments.promotion')}
          </label>
          <input
            type="text"
            id="promotion"
            value={promotion}
            onChange={(e) => setPromotion(e.target.value)}
            className="mt-1 block w-full bg-slate-200 rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            {t('appointments.status')}
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as 'upcoming' | 'completed' | 'cancelled')}
            className="mt-1 bg-slate-200 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
          >
            <option value="upcoming">{t('appointments.upcoming')}</option>
            <option value="completed">{t('appointments.completed')}</option>
            <option value="cancelled">{t('appointments.cancelled')}</option>
          </select>
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
            {appointment ? t('common.update') : t('common.save')}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AppointmentForm;