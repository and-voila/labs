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
  isUpdate?: boolean;
}

export const ConfirmPublishModal = ({
  children,
  onConfirm,
  isUpdate = false,
}: ConfirmPublishModalProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isUpdate
              ? "Nice! Let's update your published post."
              : "Sweet! You're ready to publish your post."}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isUpdate
              ? 'Make sure your changes are good to go before updating your post.'
              : "Sure you dotted all your i's and crossed all your t's? We'll crank out some html and send you to the publish flow for a final review."}
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
