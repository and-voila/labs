'use client';

import { useState } from 'react';
import axios from 'axios';

import { Button } from '@/app/components/ui/button';
import { toast } from '@/app/components/ui/use-toast';
import { formatPrice } from '@/app/lib/format';

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}

export const CourseEnrollButton = ({
  price,
  courseId,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(`/api/courses/${courseId}/checkout`);

      window.location.assign(response.data.url);
    } catch {
      toast({
        title: 'Uh oh! An error occurred.',
        description:
          'Honestly, we have no idea what happened. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="secondary"
      onClick={onClick}
      disabled={isLoading}
      size="sm"
      className="w-full flex-shrink-0 lg:w-auto"
    >
      Buy for {formatPrice(price)}
    </Button>
  );
};
