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
} from '@av/ui/alert-dialog';

interface ConfirmDeleteModalProps {
  children: React.ReactNode;
  onConfirm: () => void;
  item?: string;
}

export const ConfirmDeleteModal = ({
  children,
  onConfirm,
  item,
}: ConfirmDeleteModalProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Heads up! Deleting this{item ? ` ${item}` : ''} is permanent.
          </AlertDialogTitle>
          <AlertDialogDescription>
            There&apos;s no turning back once you hit delete.
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
