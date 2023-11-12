import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/components/ui/avatar';

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>DR</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">David Rose</p>
          <p className="text-sm text-muted-foreground">david.rose@email.com</p>
        </div>
        <div className="ml-auto font-medium">+$1,999.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>MR</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Moira Rose</p>
          <p className="text-sm text-muted-foreground">moira.rose@email.com</p>
        </div>
        <div className="ml-auto font-medium">+$39.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>JR</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Johnny Rose</p>
          <p className="text-sm text-muted-foreground">johnny.rose@email.com</p>
        </div>
        <div className="ml-auto font-medium">+$299.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>AR</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Alexis Rose</p>
          <p className="text-sm text-muted-foreground">alexis.rose@email.com</p>
        </div>
        <div className="ml-auto font-medium">+$99.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>SB</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Stevie Budd</p>
          <p className="text-sm text-muted-foreground">stevie.budd@email.com</p>
        </div>
        <div className="ml-auto font-medium">+$39.00</div>
      </div>
    </div>
  );
}
