import { Icons } from '#/components/shared/icons';
import { Button } from '#/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '#/components/ui/tooltip';

type EditorIpStatusIndicatorProps = {
  aiContentPercentage: number;
};

const statusVariants = [
  {
    min: 0,
    max: 20,
    icon: 'circleChecked',
    title: 'Human',
    description: 'Your IP is protected',
    variant: 'human',
  },
  {
    min: 21,
    max: 35,
    icon: 'warning',
    title: 'Assisted',
    description: 'Your IP is at risk',
    variant: 'warning',
  },
  {
    min: 36,
    icon: 'robot',
    title: 'Generated',
    description: 'Your IP is not protected',
    variant: 'generated',
  },
];

const EditorIpStatusIndicator = ({
  aiContentPercentage,
}: EditorIpStatusIndicatorProps) => {
  const statusVariant =
    statusVariants.find(
      (variant) =>
        aiContentPercentage >= variant.min &&
        (variant.max ? aiContentPercentage <= variant.max : true),
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
            asChild
          >
            <div>
              <Icon className="mr-0.5 h-3 w-3" />
              <span>{statusVariant.title}</span>
            </div>
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
