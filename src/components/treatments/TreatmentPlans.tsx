import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useData, Treatment } from '../../context/DataContext';
import { PlusCircle, Edit, Trash2, Search } from 'lucide-react';
import Modal from '../ui/Modal';
import ConfirmDialog from '../ui/ConfirmDialog';
import TreatmentForm from './TreatmentForm';
import PrintButton from '../ui/PrintButton';

const TreatmentPlans: React.FC = () => {
  const { t } = useTranslation();
  const { treatments, patients, addTreatment, updateTreatment, deleteTreatment } = useData();
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentTreatment, setCurrentTreatment] = useState<Treatment | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const tableRef = useRef<HTMLDivElement>(null);

  const handleAddTreatment = (treatmentData: Omit<Treatment, 'id' | 'date'>) => {
    addTreatment(treatmentData);
    setIsAddModalOpen(false);
  };

  const handleEditTreatment = (treatmentData: Omit<Treatment, 'id' | 'date'>) => {
    if (currentTreatment) {
      updateTreatment(currentTreatment.id, treatmentData);
      setIsEditModalOpen(false);
      setCurrentTreatment(null);
    }
  };

  const handleDeleteTreatment = () => {
    if (currentTreatment) {
      deleteTreatment(currentTreatment.id);
      setIsDeleteDialogOpen(false);
      setCurrentTreatment(null);
    }
  };

  const openEditModal = (treatment: Treatment) => {
    setCurrentTreatment(treatment);
    setIsEditModalOpen(true);
  };

  const openDeleteDialog = (treatment: Treatment) => {
    setCurrentTreatment(treatment);
    setIsDeleteDialogOpen(true);
  };

  // Filter treatments based on search term
  const filteredTreatments = treatments.filter(
    (treatment) =>
      treatment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      treatment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      treatment.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{t('common.treatments')}</h1>
        <p className="text-gray-600">{t('treatments.treatmentDetails')}</p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder={t('common.search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
            {t('treatments.addTreatment')}
          </button>
          <PrintButton contentRef={tableRef} />
        </div>
      </div>
      
      <div ref={tableRef} className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('patients.patientName')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('treatments.treatmentName')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('treatments.description')}
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
              {filteredTreatments.length > 0 ? (
                filteredTreatments.map((treatment) => (
                  <tr key={treatment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {treatment.patientName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {treatment.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {treatment.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {treatment.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openEditModal(treatment)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => openDeleteDialog(treatment)}
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
                    {t('treatments.noTreatments')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Treatment Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={t('treatments.addTreatment')}
        maxWidth="max-w-xl"
      >
        <TreatmentForm 
          patients={patients}
          onSubmit={handleAddTreatment} 
          onCancel={() => setIsAddModalOpen(false)} 
        />
      </Modal>

      {/* Edit Treatment Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={t('treatments.treatmentDetails')}
        maxWidth="max-w-xl"
      >
        {currentTreatment && (
          <TreatmentForm
            treatment={currentTreatment}
            patients={patients}
            onSubmit={handleEditTreatment}
            onCancel={() => setIsEditModalOpen(false)}
          />
        )}
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteTreatment}
        title={t('common.delete')}
        message={t('common.confirmDelete')}
      />
    </div>
  );
};

export default TreatmentPlans;