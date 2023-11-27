import React from 'react';

interface PostTitleInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PostTitleInput = React.memo(
  ({ value, onChange }: PostTitleInputProps) => {
    return (
      <input
        type="text"
        placeholder="Your awesome post title of up to 57 characters goes here"
        minLength={10}
        maxLength={57}
        required
        defaultValue={value}
        autoFocus
        onChange={(e) => onChange(e.target.value)}
        className="border-none bg-card px-0 font-sans text-2xl font-semibold placeholder:text-muted-foreground/70 focus:outline-none focus:ring-0"
      />
    );
  },
);
PostTitleInput.displayName = 'PostTitleInput';

export default PostTitleInput;
