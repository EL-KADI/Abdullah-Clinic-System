import React, { createContext, useState, useContext, useEffect } from 'react';
import { format } from 'date-fns';

// الأنواع (Types)
export interface Patient {
  id: string;
  name: string;
  age: string;
  phone: string;
  diagnosis: string;
  dateAdded: string;
}

export interface Treatment {
  id: string;
  patientId: string;
  patientName: string;
  name: string;
  description: string;
  date: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  patientName: string;
  diagnosis: string;
  notes: string;
  date: string;
}

export interface SurgicalCase {
  id: string;
  patientId: string;
  patientName: string;
  surgeryType: string;
  date: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  phone: string;
  diagnosis: string;
  promotion: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

// نوع الـ Context
interface DataContextType {
  patients: Patient[];
  treatments: Treatment[];
  medicalRecords: MedicalRecord[];
  surgicalCases: SurgicalCase[];
  appointments: Appointment[];
  addPatient: (patient: Omit<Patient, 'id' | 'dateAdded'>) => void;
  updatePatient: (id: string, patientData: Partial<Omit<Patient, 'id' | 'dateAdded'>>) => void;
  deletePatient: (id: string) => void;
  addTreatment: (treatment: Omit<Treatment, 'id' | 'date'>) => void;
  updateTreatment: (id: string, treatmentData: Partial<Omit<Treatment, 'id' | 'date'>>) => void;
  deleteTreatment: (id: string) => void;
  addMedicalRecord: (record: Omit<MedicalRecord, 'id' | 'date'>) => void;
  updateMedicalRecord: (id: string, recordData: Partial<Omit<MedicalRecord, 'id' | 'date'>>) => void;
  deleteMedicalRecord: (id: string) => void;
  addSurgicalCase: (surgeryCase: Omit<SurgicalCase, 'id'>) => void;
  updateSurgicalCase: (id: string, caseData: Partial<Omit<SurgicalCase, 'id'>>) => void;
  deleteSurgicalCase: (id: string) => void;
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  updateAppointment: (id: string, appointmentData: Partial<Omit<Appointment, 'id'>>) => void;
  deleteAppointment: (id: string) => void;
  getPatientById: (id: string) => Patient | undefined;
  getRecentPatients: (days: number) => Patient[];
  clearAllData: () => void;
}

// إنشاء الـ Context
export const DataContext = createContext<DataContextType>({
  patients: [],
  treatments: [],
  medicalRecords: [],
  surgicalCases: [],
  appointments: [],
  addPatient: () => {},
  updatePatient: () => {},
  deletePatient: () => {},
  addTreatment: () => {},
  updateTreatment: () => {},
  deleteTreatment: () => {},
  addMedicalRecord: () => {},
  updateMedicalRecord: () => {},
  deleteMedicalRecord: () => {},
  addSurgicalCase: () => {},
  updateSurgicalCase: () => {},
  deleteSurgicalCase: () => {},
  addAppointment: () => {},
  updateAppointment: () => {},
  deleteAppointment: () => {},
  getPatientById: () => undefined,
  getRecentPatients: () => [],
  clearAllData: () => {},
});

// هوك لاستخدام الـ Context
export const useData = () => useContext(DataContext);

// المزود (Provider) لإدارة البيانات
export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // تحديد الـ state مع قيم ابتدائية من localStorage
  const [patients, setPatients] = useState<Patient[]>(() => {
    try {
      const stored = localStorage.getItem('patients');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('خطأ في تحميل المرضى من localStorage:', error);
      return [];
    }
  });

  const [treatments, setTreatments] = useState<Treatment[]>(() => {
    try {
      const stored = localStorage.getItem('treatments');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('خطأ في تحميل العلاجات من localStorage:', error);
      return [];
    }
  });

  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>(() => {
    try {
      const stored = localStorage.getItem('medicalRecords');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('خطأ في تحميل السجلات الطبية من localStorage:', error);
      return [];
    }
  });

  const [surgicalCases, setSurgicalCases] = useState<SurgicalCase[]>(() => {
    try {
      const stored = localStorage.getItem('surgicalCases');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('خطأ في تحميل الحالات الجراحية من localStorage:', error);
      return [];
    }
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const stored = localStorage.getItem('appointments');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('خطأ في تحميل المواعيد من localStorage:', error);
      return [];
    }
  });

  // حفظ البيانات في localStorage عند تغيير أي نوع بيانات
  useEffect(() => {
    try {
      localStorage.setItem('patients', JSON.stringify(patients));
    } catch (error) {
      console.error('خطأ في حفظ المرضى في localStorage:', error);
    }
  }, [patients]);

  useEffect(() => {
    try {
      localStorage.setItem('treatments', JSON.stringify(treatments));
    } catch (error) {
      console.error('خطأ في حفظ العلاجات في localStorage:', error);
    }
  }, [treatments]);

  useEffect(() => {
    try {
      localStorage.setItem('medicalRecords', JSON.stringify(medicalRecords));
    } catch (error) {
      console.error('خطأ في حفظ السجلات الطبية في localStorage:', error);
    }
  }, [medicalRecords]);

  useEffect(() => {
    try {
      localStorage.setItem('surgicalCases', JSON.stringify(surgicalCases));
    } catch (error) {
      console.error('خطأ في حفظ الحالات الجراحية في localStorage:', error);
    }
  }, [surgicalCases]);

  useEffect(() => {
    try {
      localStorage.setItem('appointments', JSON.stringify(appointments));
    } catch (error) {
      console.error('خطأ في حفظ المواعيد في localStorage:', error);
    }
  }, [appointments]);

  // إدارة المرضى
  const addPatient = (patient: Omit<Patient, 'id' | 'dateAdded'>) => {
    const newPatient: Patient = {
      ...patient,
      id: Date.now().toString(),
      dateAdded: format(new Date(), 'yyyy-MM-dd'),
    };
    setPatients((prev) => [...prev, newPatient]);
  };

  const updatePatient = (id: string, patientData: Partial<Omit<Patient, 'id' | 'dateAdded'>>) => {
    setPatients((prev) =>
      prev.map((patient) =>
        patient.id === id ? { ...patient, ...patientData } : patient
      )
    );
  };

  const deletePatient = (id: string) => {
    setPatients((prev) => prev.filter((patient) => patient.id !== id));
    // حذف السجلات المرتبطة بالمريض
    setTreatments((prev) => prev.filter((treatment) => treatment.patientId !== id));
    setMedicalRecords((prev) => prev.filter((record) => record.patientId !== id));
    setSurgicalCases((prev) => prev.filter((surgeryCase) => surgeryCase.patientId !== id));
    setAppointments((prev) => prev.filter((appointment) => appointment.patientId !== id));
  };

  // إدارة العلاجات
  const addTreatment = (treatment: Omit<Treatment, 'id' | 'date'>) => {
    const newTreatment: Treatment = {
      ...treatment,
      id: Date.now().toString(),
      date: format(new Date(), 'yyyy-MM-dd'),
    };
    setTreatments((prev) => [...prev, newTreatment]);
  };

  const updateTreatment = (id: string, treatmentData: Partial<Omit<Treatment, 'id' | 'date'>>) => {
    setTreatments((prev) =>
      prev.map((treatment) =>
        treatment.id === id ? { ...treatment, ...treatmentData } : treatment
      )
    );
  };

  const deleteTreatment = (id: string) => {
    setTreatments((prev) => prev.filter((treatment) => treatment.id !== id));
  };

  // إدارة السجلات الطبية
  const addMedicalRecord = (record: Omit<MedicalRecord, 'id' | 'date'>) => {
    const newRecord: MedicalRecord = {
      ...record,
      id: Date.now().toString(),
      date: format(new Date(), 'yyyy-MM-dd'),
    };
    setMedicalRecords((prev) => [...prev, newRecord]);
  };

  const updateMedicalRecord = (id: string, recordData: Partial<Omit<MedicalRecord, 'id' | 'date'>>) => {
    setMedicalRecords((prev) =>
      prev.map((record) =>
        record.id === id ? { ...record, ...recordData } : record
      )
    );
  };

  const deleteMedicalRecord = (id: string) => {
    setMedicalRecords((prev) => prev.filter((record) => record.id !== id));
  };

  // إدارة الحالات الجراحية
  const addSurgicalCase = (surgeryCase: Omit<SurgicalCase, 'id'>) => {
    const newCase: SurgicalCase = {
      ...surgeryCase,
      id: Date.now().toString(),
    };
    setSurgicalCases((prev) => [...prev, newCase]);
  };

  const updateSurgicalCase = (id: string, caseData: Partial<Omit<SurgicalCase, 'id'>>) => {
    setSurgicalCases((prev) =>
      prev.map((surgeryCase) =>
        surgeryCase.id === id ? { ...surgeryCase, ...caseData } : surgeryCase
      )
    );
  };

  const deleteSurgicalCase = (id: string) => {
    setSurgicalCases((prev) => prev.filter((surgeryCase) => surgeryCase.id !== id));
  };

  // إدارة المواعيد
  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString(),
    };
    setAppointments((prev) => [...prev, newAppointment]);
  };

  const updateAppointment = (id: string, appointmentData: Partial<Omit<Appointment, 'id'>>) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id ? { ...appointment, ...appointmentData } : appointment
      )
    );
  };

  const deleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((appointment) => appointment.id !== id));
  };

  // دالة لمسح كل البيانات من localStorage
  const clearAllData = () => {
    setPatients([]);
    setTreatments([]);
    setMedicalRecords([]);
    setSurgicalCases([]);
    setAppointments([]);
    localStorage.removeItem('patients');
    localStorage.removeItem('treatments');
    localStorage.removeItem('medicalRecords');
    localStorage.removeItem('surgicalCases');
    localStorage.removeItem('appointments');
  };

  // دوال مساعدة
  const getPatientById = (id: string) => {
    return patients.find((patient) => patient.id === id);
  };

  const getRecentPatients = (days: number) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return patients.filter((patient) => {
      const patientDate = new Date(patient.dateAdded);
      return patientDate >= cutoffDate;
    });
  };

  return (
    <DataContext.Provider
      value={{
        patients,
        treatments,
        medicalRecords,
        surgicalCases,
        appointments,
        addPatient,
        updatePatient,
        deletePatient,
        addTreatment,
        updateTreatment,
        deleteTreatment,
        addMedicalRecord,
        updateMedicalRecord,
        deleteMedicalRecord,
        addSurgicalCase,
        updateSurgicalCase,
        deleteSurgicalCase,
        addAppointment,
        updateAppointment,
        deleteAppointment,
        getPatientById,
        getRecentPatients,
        clearAllData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};