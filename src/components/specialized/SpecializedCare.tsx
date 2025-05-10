import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useData, SurgicalCase } from '../../context/DataContext';
import { PlusCircle, Edit, Trash2, Search } from 'lucide-react';
import Modal from '../ui/Modal';
import ConfirmDialog from '../ui/ConfirmDialog';
import SurgicalCaseForm from './SurgicalCaseForm';
import PrintButton from '../ui/PrintButton';

const SpecializedCare: React.FC = () => {
  const { t } = useTranslation();
  const { surgicalCases, patients, addSurgicalCase, updateSurgicalCase, deleteSurgicalCase } = useData();
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCase, setCurrentCase] = useState<SurgicalCase | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const tableRef = useRef<HTMLDivElement>(null);

  const handleAddCase = (caseData: Omit<SurgicalCase, 'id'>) => {
    addSurgicalCase(caseData);
    setIsAddModalOpen(false);
  };

  const handleEditCase = (caseData: Omit<SurgicalCase, 'id'>) => {
    if (currentCase) {
      updateSurgicalCase(currentCase.id, caseData);
      setIsEditModalOpen(false);
      setCurrentCase(null);
    }
  };

  const handleDeleteCase = () => {
    if (currentCase) {
      deleteSurgicalCase(currentCase.id);
      setIsDeleteDialogOpen(false);
      setCurrentCase(null);
    }
  };

  const openEditModal = (surgeryCase: SurgicalCase) => {
    setCurrentCase(surgeryCase);
    setIsEditModalOpen(true);
  };

  const openDeleteDialog = (surgeryCase: SurgicalCase) => {
    setCurrentCase(surgeryCase);
    setIsDeleteDialogOpen(true);
  };

  // Filter cases based on search term
  const filteredCases = surgicalCases.filter(
    (surgeryCase) =>
      surgeryCase.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surgeryCase.surgeryType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surgeryCase.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{t('common.specialized')}</h1>
        <p className="text-gray-600">{t('specialized.surgeryDetails')}</p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder={t('common.search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
            {t('specialized.addSurgery')}
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
                  {t('specialized.surgeryType')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('specialized.date')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('specialized.status')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('common.edit')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCases.length > 0 ? (
                filteredCases.map((surgeryCase) => (
                  <tr key={surgeryCase.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {surgeryCase.patientName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {surgeryCase.surgeryType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {surgeryCase.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        surgeryCase.status === 'completed' 
                          ? 'bg-green-100 text-green-800'
                          : surgeryCase.status === 'cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {t(`specialized.${surgeryCase.status}`)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openEditModal(surgeryCase)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => openDeleteDialog(surgeryCase)}
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
                    {t('specialized.noSurgeries')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Surgical Case Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={t('specialized.addSurgery')}
        maxWidth="max-w-xl"
      >
        <SurgicalCaseForm 
          patients={patients}
          onSubmit={handleAddCase} 
          onCancel={() => setIsAddModalOpen(false)} 
        />
      </Modal>

      {/* Edit Surgical Case Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={t('specialized.surgeryDetails')}
        maxWidth="max-w-xl"
      >
        {currentCase && (
          <SurgicalCaseForm
            surgicalCase={currentCase}
            patients={patients}
            onSubmit={handleEditCase}
            onCancel={() => setIsEditModalOpen(false)}
          />
        )}
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteCase}
        title={t('common.delete')}
        message={t('common.confirmDelete')}
      />
    </div>
  );
};

export default SpecializedCare;