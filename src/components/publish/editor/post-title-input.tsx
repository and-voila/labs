import React, { useCallback } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';

interface PostTitleInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PostTitleInput: React.FC<PostTitleInputProps> = ({ value, onChange }) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <ReactTextareaAutosize
      placeholder="Your awesome post title of up to 57 characters goes here"
      minLength={10}
      maxLength={57}
      required
      value={value}
      onChange={handleChange}
      className="resize-none border-none bg-card font-sans text-2xl font-semibold placeholder:text-muted-foreground/70 focus:outline-none focus:ring-0"
    />
  );
};

export default React.memo(PostTitleInput);
