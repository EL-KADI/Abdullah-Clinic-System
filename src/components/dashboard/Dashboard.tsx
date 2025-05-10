import React from 'react';
import { useTranslation } from 'react-i18next';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import StatCard from '../ui/StatCard';
import {
  Users,
  ClipboardList,
  Calendar,
  Activity
} from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { 
    patients, 
    treatments, 
    appointments, 
    surgicalCases,
    getRecentPatients 
  } = useData();

  const recentPatients = getRecentPatients(30);

  // Chart data
  const chartData = {
    labels: ['Patients', 'Treatments', 'Appointments', 'Surgeries'],
    datasets: [
      {
        label: t('common.dashboard'),
        data: [patients.length, treatments.length, appointments.length, surgicalCases.length],
        backgroundColor: [
          'rgba(13, 148, 136, 0.7)',
          'rgba(126, 34, 206, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(249, 115, 22, 0.7)'
        ],
        borderColor: [
          'rgb(13, 148, 136)',
          'rgb(126, 34, 206)',
          'rgb(59, 130, 246)',
          'rgb(249, 115, 22)'
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0
        }
      }
    },
    onClick: (event: any, elements: any) => {
      if (elements.length > 0) {
        const paths = ['/patients', '/treatments', '/appointments', '/specialized'];
        window.location.href = paths[elements[0].index];
      }
    }
  };

  // Get upcoming appointments
  const upcomingAppointments = appointments
    .filter(appointment => appointment.status === 'upcoming')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div className="animate-fadeIn">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {t('common.welcome')}, {user?.name}
        </h1>
        <p className="text-gray-600">{new Date().toLocaleDateString()}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title={t('patients.totalPatients')}
          value={patients.length.toString()}
          icon={<Users className="h-8 w-8 text-teal-600" />}
          description={`${recentPatients.length} ${t('patients.last30Days')}`}
          link="/patients"
        />
        
        <StatCard
          title={t('treatments.addTreatment')}
          value={treatments.length.toString()}
          icon={<ClipboardList className="h-8 w-8 text-purple-600" />}
          link="/treatments"
        />
        
        <StatCard
          title={t('appointments.addAppointment')}
          value={appointments.length.toString()}
          icon={<Calendar className="h-8 w-8 text-blue-600" />}
          link="/appointments"
        />
        
        <StatCard
          title={t('specialized.addSurgery')}
          value={surgicalCases.length.toString()}
          icon={<Activity className="h-8 w-8 text-orange-600" />}
          link="/specialized"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
          <h2 className="text-lg font-semibold mb-4">{t('common.dashboard')}</h2>
          <div className="h-64">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
          <h2 className="text-lg font-semibold mb-4">{t('appointments.upcoming')}</h2>
          {upcomingAppointments.length > 0 ? (
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('appointments.patientName')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('appointments.date')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('appointments.time')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {upcomingAppointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {appointment.patientName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {appointment.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {appointment.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {upcomingAppointments.length === 0 && (
                <p className="text-gray-500 text-center py-4">{t('appointments.noAppointments')}</p>
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">{t('appointments.noAppointments')}</p>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{t('patients.last30Days')}</h2>
        </div>
        {recentPatients.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('patients.patientName')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('patients.age')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('patients.phone')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('patients.diagnosis')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('patients.dateAdded')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {patient.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.age}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.diagnosis}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.dateAdded}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">{t('patients.noPatients')}</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;