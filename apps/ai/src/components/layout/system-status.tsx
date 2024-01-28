'use client';

import React, { useEffect, useState } from 'react';

type PageStatus = 'UP' | 'HASISSUES' | 'UNDERMAINTENANCE';
type IncidentStatus =
  | 'INVESTIGATING'
  | 'IDENTIFIED'
  | 'MONITORING'
  | 'RESOLVED';
type MaintenanceStatus = 'NOTSTARTEDYET' | 'INPROGRESS' | 'COMPLETED';

interface Incident {
  name: string;
  started: string;
  status: IncidentStatus;
  impact: string;
  url: string;
}

interface Maintenance {
  name: string;
  start: string;
  status: MaintenanceStatus;
  duration: string;
  url: string;
}

interface StatusData {
  page: {
    name: string;
    url: string;
    status: PageStatus;
  };
  activeIncidents: Incident[];
  activeMaintenances: Maintenance[];
}

type GeneralStatus = PageStatus | IncidentStatus | MaintenanceStatus;

interface StatusIndicatorProps {
  status: GeneralStatus;
}

const getStatusProperties = (status: GeneralStatus) => {
  switch (status) {
    case 'UP':
    case 'RESOLVED':
      return {
        color: 'bg-green-600 dark:bg-green-500',
        text: 'Running smooth',
      };
    case 'INVESTIGATING':
    case 'IDENTIFIED':
    case 'MONITORING':
      return {
        color: 'bg-yellow-600 dark:bg-yellow-500',
        text: "Something's up",
      };
    case 'HASISSUES':
    case 'UNDERMAINTENANCE':
    case 'NOTSTARTEDYET':
    case 'INPROGRESS':
      return { color: 'bg-red-600 dark:bg-red-500', text: "We're on it" };
    default:
      return { color: 'bg-gray-400 dark:bg-gray-300', text: 'Status Unknown' };
  }
};

const StatusIndicator = ({ status }: StatusIndicatorProps) => {
  const { color, text } = getStatusProperties(status);
  return (
    <div className="flex items-center gap-2">
      <div className={`h-2 w-2 rounded-full ${color}`} />
      <span className="whitespace-nowrap font-semibold text-muted-foreground">
        {text}
      </span>
    </div>
  );
};

const SystemStatusWidget = () => {
  const [statusData, setStatusData] = useState<StatusData | null>(null);

  useEffect(() => {
    fetch('https://andvoila.instatus.com/summary.json')
      .then((response) => response.json())
      .then((data) => setStatusData(data as StatusData))
      // eslint-disable-next-line no-console
      .catch((error) => console.error('Error fetching status data:', error));
  }, []);

  return (
    <a
      href="https://andvoila.instatus.com/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="System Status Link"
    >
      <div className="hover:underline hover:underline-offset-4">
        {statusData && (
          <div>
            <StatusIndicator status={statusData.page.status} />
            {statusData.activeIncidents?.map((incident, index) => (
              <StatusIndicator key={index} status={incident.status} />
            ))}
            {statusData.activeMaintenances?.map((maintenance, index) => (
              <StatusIndicator key={index} status={maintenance.status} />
            ))}
          </div>
        )}
      </div>
    </a>
  );
};

export default SystemStatusWidget;
