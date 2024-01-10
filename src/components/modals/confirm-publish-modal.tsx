import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '#/components/ui/alert-dialog';

interface ConfirmPublishModalProps {
  children: React.ReactNode;
  onConfirm: () => void;
}

export const ConfirmPublishModal = ({
  children,
  onConfirm,
}: ConfirmPublishModalProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Sweet! You&apos;re ready to publish your post.
          </AlertDialogTitle>
          <AlertDialogDescription>
            Sure you you dotted all your i&apos;s and crossed all your t&apos;s?
            We&apos;ll crank out some html and send you to the publish flow for
            a final review.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Wait, no.</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            I&apos;m sure
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
