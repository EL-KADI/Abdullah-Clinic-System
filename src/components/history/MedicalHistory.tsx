import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useData, MedicalRecord, Patient } from '../../context/DataContext';
import { PlusCircle, Edit, Trash2, Search } from 'lucide-react';
import Modal from '../ui/Modal';
import ConfirmDialog from '../ui/ConfirmDialog';
import MedicalRecordForm from './MedicalRecordForm';
import PrintButton from '../ui/PrintButton';

const MedicalHistory: React.FC = () => {
  const { t } = useTranslation();
  const { medicalRecords, patients, addMedicalRecord, updateMedicalRecord, deleteMedicalRecord } = useData();
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<MedicalRecord | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const tableRef = useRef<HTMLDivElement>(null);

  const handleAddRecord = (recordData: Omit<MedicalRecord, 'id' | 'date'>) => {
    addMedicalRecord(recordData);
    setIsAddModalOpen(false);
  };

  const handleEditRecord = (recordData: Omit<MedicalRecord, 'id' | 'date'>) => {
    if (currentRecord) {
      updateMedicalRecord(currentRecord.id, recordData);
      setIsEditModalOpen(false);
      setCurrentRecord(null);
    }
  };

  const handleDeleteRecord = () => {
    if (currentRecord) {
      deleteMedicalRecord(currentRecord.id);
      setIsDeleteDialogOpen(false);
      setCurrentRecord(null);
    }
  };

  const openEditModal = (record: MedicalRecord) => {
    setCurrentRecord(record);
    setIsEditModalOpen(true);
  };

  const openDeleteDialog = (record: MedicalRecord) => {
    setCurrentRecord(record);
    setIsDeleteDialogOpen(true);
  };

  // Filter records based on search term
  const filteredRecords = medicalRecords.filter(
    (record) =>
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.notes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{t('common.history')}</h1>
        <p className="text-gray-600">{t('patients.patientDetails')}</p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder={t('common.search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none transition-colors"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Add Medical Record
          </button>
          <PrintButton contentRef={tableRef} />
        </div>
      </div>
      
      <div ref={tableRef} className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
                  {t('patients.patientName')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('patients.diagnosis')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('patients.dateAdded')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('common.edit')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium text-gray-900">
                      {record.patientName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.diagnosis}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {record.notes}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openEditModal(record)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => openDeleteDialog(record)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    No medical records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Medical Record Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Medical Record"
        maxWidth="max-w-xl"
      >
        <MedicalRecordForm  
          patients={patients}
          onSubmit={handleAddRecord} 
          onCancel={() => setIsAddModalOpen(false)} 
        />
      </Modal>

      {/* Edit Medical Record Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Medical Record"
        maxWidth="max-w-xl"
      >
        {currentRecord && (
          <MedicalRecordForm
            record={currentRecord}
            patients={patients}
            onSubmit={handleEditRecord}
            onCancel={() => setIsEditModalOpen(false)}
          />
        )}
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteRecord}
        title={t('common.delete')}
        message={t('common.confirmDelete')}
      />
    </div>
  );
};

export default MedicalHistory;