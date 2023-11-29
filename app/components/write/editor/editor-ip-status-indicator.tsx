import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/app/components//ui/tooltip';
import { Icons } from '@/app/components/shared/icons';

import { Button } from '../../ui/button';

type EditorIpStatusIndicatorProps = {
  generationCount: number;
};

const statusVariants = [
  {
    min: 0,
    max: 2,
    icon: 'circleChecked',
    title: 'Human',
    description: 'Your IP is protected',
    variant: 'human',
  },
  {
    min: 3,
    max: 4,
    icon: 'warning',
    title: 'Assisted',
    description: 'Your IP is at risk',
    variant: 'warning',
  },
  {
    min: 5,
    icon: 'robot',
    title: 'Generated',
    description: 'Your IP is not protected',
    variant: 'generated',
  },
];

const EditorIpStatusIndicator = ({
  generationCount,
}: EditorIpStatusIndicatorProps) => {
  const statusVariant =
    statusVariants.find(
      (variant) =>
        generationCount >= variant.min &&
        (variant.max ? generationCount <= variant.max : true),
    ) || statusVariants[0];

  const Icon = Icons[statusVariant.icon as keyof typeof Icons];
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button
            variant={statusVariant.variant as 'human' | 'warning' | 'generated'}
            className="flex items-center"
            size="sm"
          >
            <Icon className="mr-0.5 h-3 w-3" />
            <span>{statusVariant.title}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="-mr-20 border border-input bg-primary-foreground px-4 py-2 text-foreground">
          <p>{statusVariant.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default EditorIpStatusIndicator;
