// Rive animation by Bobbeh https://rive.app/@Bobbeh/
'use client';

import type { RiveState } from '@rive-app/react-canvas-lite';

import { useCallback } from 'react';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas-lite';

const Sith404 = () => {
  const { rive, RiveComponent }: RiveState = useRive({
    src: '/sith-by-bobbeh.riv',
    stateMachines: 'State Machine 1',
    artboard: 'New Artboard',
    autoplay: true,
  });

  const toggleSaber = useStateMachineInput(rive, 'State Machine 1', 'toggle');

  const handleToggleClick = useCallback(() => {
    if (toggleSaber && typeof toggleSaber.fire === 'function') {
      toggleSaber.fire();
    }
  }, [toggleSaber]);

  return (
    <>
      {/* Rive animation by Bobbeh https://rive.app/@Bobbeh/ */}
      <div className="h-128 w-128">
        <RiveComponent
          className="animation-container__rive-component"
          onClick={handleToggleClick}
        />
      </div>
    </>
  );
};

export default Sith404;
