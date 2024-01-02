import React from 'react';
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';

import { Icon } from '#/components/tiptap/icon';

interface EmbedInputProps {
  // TODO:
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  node: Record<string, any>;
}

export const EmbedInputView = ({ node: { attrs } }: EmbedInputProps) => {
  const service = attrs.service ?? undefined;

  const iconClass = 'w-4 h-4 text-foreground opacity-50';

  return (
    <NodeViewWrapper data-service={service} data-drag-handle>
      <div className="flex cursor-text items-center gap-2 rounded-xl bg-background p-4">
        {!service && <Icon name="Link" className={iconClass} />}
        {service === 'figma' && <Icon name="Figma" className={iconClass} />}
        {service === 'framer' && <Icon name="Framer" className={iconClass} />}
        {service === 'instagram' && (
          <Icon name="Instagram" className={iconClass} />
        )}
        {service === 'twitter' && <Icon name="Twitter" className={iconClass} />}
        {service === 'youtube' && <Icon name="Youtube" className={iconClass} />}
        <NodeViewContent />
      </div>
    </NodeViewWrapper>
  );
};

export default EmbedInputView;
