import React, { useCallback } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

interface PostDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PostDescriptionInput: React.FC<PostDescriptionInputProps> = ({
  value,
  onChange,
}) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <TextareaAutosize
      placeholder="Your super descriptive SEO description goes here. It should include keyword(s) for the post and provide a good summary for search. 157 characters max please."
      minLength={100}
      maxLength={159}
      required
      value={value}
      onChange={handleChange}
      className="w-5/6 resize-none border-none bg-card px-0 font-sans placeholder:text-muted-foreground/70 focus:outline-none focus:ring-0"
    />
  );
};

export default React.memo(PostDescriptionInput);
