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
    iconColor: 'text-alternate',
    title: 'Human',
    description:
      'Fully human-authored, eligible for copyright as original works of authorship by human beings.',
    variant: 'human',
    buttonStyle:
      'bg-transparent text-alternate border border-alternate font-medium pointer-events-none',
  },
  {
    min: 21,
    max: 35,
    icon: 'warning',
    iconColor: 'text-amber-600',
    title: 'Assisted',
    description:
      'Collaborative human-AI creation, may have copyright issues if AI determines expressive elements.',
    variant: 'warning',
    buttonStyle:
      'bg-transparent text-amber-600 border border-amber-600 font-medium pointer-events-none',
  },
  {
    min: 36,
    icon: 'robot',
    iconColor: 'text-red-600',
    title: 'Generated',
    description:
      'Predominantly AI-generated, material not considered a product of human authorship for copyright.',
    variant: 'generated',
    buttonStyle:
      'bg-transparent text-red-600 border border-red-600 font-medium pointer-events-none',
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
            variant="outline"
            className={`flex items-center ${statusVariant.buttonStyle}`}
            asChild
          >
            <div>
              <Icon className="mr-2 h-4 w-4" />
              <span>{statusVariant.title}</span>
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="-mr-20 max-w-sm border border-input bg-primary-foreground p-4 text-foreground">
          <div className="flex justify-between space-x-4">
            <Icon
              className={`h-8 w-8 justify-start ${statusVariant.iconColor}`}
            />
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">{statusVariant.title}</h2>
              <p className="text-sm text-muted-foreground">
                {statusVariant.description}
              </p>
              <div className="flex items-center pt-2">
                <Icons.link className="mr-2 h-4 w-4 opacity-70" />{' '}
                <a
                  href="https://www.copyright.gov/comp3/chap300/ch300-copyrightable-authorship.pdf#page=7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 text-xs text-primary"
                >
                  Compendium of the U.S. Copyright Office Practices
                </a>
              </div>
              <p className="text-xs">
                Not legal advice. For informational purposes only.
              </p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default EditorIpStatusIndicator;
