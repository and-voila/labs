import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

interface PostDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PostDescriptionInput = React.memo(
  ({ value, onChange }: PostDescriptionInputProps) => {
    return (
      <TextareaAutosize
        placeholder="Your super descriptive SEO description goes here. It should include keyword(s) for the post and provide a good summary for search. 157 characters max please."
        minLength={100}
        maxLength={159}
        required
        defaultValue={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-[5/6 resize-none border-none bg-card px-0 font-sans placeholder:text-muted-foreground/70 focus:outline-none focus:ring-0"
      />
    );
  },
);
PostDescriptionInput.displayName = 'PostDescriptionInput';

export default PostDescriptionInput;
