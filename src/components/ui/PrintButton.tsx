import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Printer } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PrintButtonProps {
  contentRef: React.RefObject<HTMLElement>;
  label?: string;
}

const PrintButton: React.FC<PrintButtonProps> = ({ contentRef, label }) => {
  const { t } = useTranslation();
  
  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
  });

  return (
    <button
      onClick={handlePrint}
      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-colors"
    >
      <Printer className="mr-2 h-4 w-4" />
      {label || t('common.print')}
    </button>
  );
};

export default PrintButton;