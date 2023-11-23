export const defaultEditorContent = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: "Introducing And Voila's AI Editor" }],
    },
    {
      type: 'heading',
      attrs: { level: 3 },
      content: [{ type: 'text', text: 'Notion inspired WYSIWYG' }],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'A user-friendly editor that mirrors the simplicity and efficiency of Notion, offering a straightforward, what-you-see-is-what-you-get experience.',
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 3 },
      content: [
        {
          type: 'text',
          text: 'AI powered editorial feedback, not a generative AI',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'We prioritize protecting your intellectual property. Our AI editor assists by enhancing your writing, providing feedback without creating content for you. Activate it with ',
        },
        {
          type: 'text',
          marks: [{ type: 'code' }],
          text: '++',
        },
        {
          type: 'text',
          text: ' for onscreen feedback that helps you refine and improve your work while maintaining originality.',
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 3 },
      content: [
        {
          type: 'text',
          text: 'Hat tip to Novel, Tiptap, and OSS creators everywhere',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Our editor is built on the innovations of platforms like Novel and Tiptap, combining the best of their features to offer a unique, effective tool for digital marketers.',
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: 'How the editor works' }],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Just like Notion, our editor is designed for intuitive ease. Drop your cursor in and start writing; it’s that simple. The familiar interface lets you translate thoughts to text without friction. You’re in your creative element from the get-go, no complex setup or learning curve.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Enhance your writing with slash commands to toggle elements like headings, lists, or quotes. Need to add an image or a complex layout? Drag and drop makes it seamless. And for the keyboard wizards, there are plenty of keyboard commands to keep your hands on the keyboard and ideas flowing.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'We’re focused on creating a delightful writing experience, sprinkled with a touch of magic. Whether you’re drafting a quick post or weaving a detailed narrative, our editor is your ally, transforming the writing process into an enchanting journey.',
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: 'Examples of content enhancement' }],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: "At And Voila, we're not just about creating tools; we're about crafting experiences. With over 1,300 blog posts published and more than a million analyzed, we've fine-tuned an opinionated yet data-driven approach that simply works. Let’s dive into how our editor can make your content look outstanding, one feature at a time.",
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 1 },
      content: [{ type: 'text', text: 'H1: Commanding attention' }],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Heading 1 is your spotlight. It’s bold, it’s direct, and it commands attention. Ideal for main titles, it sets the stage for your content, drawing readers into the heart of your message.',
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: 'H2: Structuring your narrative' }],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Heading 2 breaks down your story into digestible chapters. It’s the backbone of your content, organizing thoughts and guiding readers through a coherent, captivating journey.',
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 3 },
      content: [{ type: 'text', text: 'H3: Adding depth and detail' }],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Heading 3 adds layers to your narrative. It’s where you dive deeper, offering insights and details that enrich your content, providing texture and context to your main points.',
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: 'Showcasing different types of lists' }],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'If you’re anything like us, you love lists. They’re clear, they’re catchy, and they make information digestible. In the And Voila editor, lists aren’t just functional; they’re a visual treat. Let’s explore how they bring charm and clarity to your content.',
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 3 },
      content: [{ type: 'text', text: 'Unordered lists' }],
    },
    {
      type: 'bulletList',
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                { type: 'text', text: 'Jazz up points with bullet charm.' },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Perfect for highlighting key features.',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                { type: 'text', text: 'Add a dash of style to your lists.' },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 3 },
      content: [{ type: 'text', text: 'Ordered lists' }],
    },
    {
      type: 'orderedList',
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Enumerate ideas for a compelling flow.',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                { type: 'text', text: 'Great for step-by-step instructions.' },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Keep your content organized and clear.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 3 },
      content: [{ type: 'text', text: 'To-do lists too' }],
    },
    {
      type: 'taskList',
      content: [
        {
          type: 'taskItem',
          attrs: { checked: false },
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Tick off tasks in style.' }],
            },
          ],
        },
        {
          type: 'taskItem',
          attrs: { checked: false },
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Interactive and engaging for planning.',
                },
              ],
            },
          ],
        },
        {
          type: 'taskItem',
          attrs: { checked: false },
          content: [
            {
              type: 'paragraph',
              content: [
                { type: 'text', text: 'Bring a dynamic edge to your to-dos.' },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: 'Of course the kitchen sink' }],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'The And Voila editor is not just about text. It’s a canvas for your creativity, allowing you to embed rich media and complex elements. From captivating images to lively social posts, and even the nitty-gritty of code for the tech-savvy, let’s explore how these elements can amplify your storytelling.',
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 3 },
      content: [
        { type: 'text', text: 'Images: A picture is worth a thousand words' },
      ],
    },
    {
      type: 'image',
      attrs: {
        src: '/open-graph.jpg',
        alt: 'Descriptive text about the image',
        title: 'Image Title',
      },
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: 'Embedding social posts' }],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Bringing social media into your content is a breeze with And Voila’s Editor. Simply paste the link of the social post directly into the editor. For example, adding ',
        },
        {
          type: 'text',
          marks: [{ type: 'code' }],
          text: 'https://twitter.com/RebekahRadice/status/1727001436762910996',
        },
        {
          type: 'text',
          text: ' will automatically embed the tweet. Our front-end handles the rest, seamlessly integrating the post into your content, making it more engaging and interactive.',
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 3 },
      content: [{ type: 'text', text: 'Code block: For the tech-savvy' }],
    },
    {
      type: 'codeBlock',
      attrs: { language: 'javascript' },
      content: [
        {
          type: 'text',
          text: 'console.log("Magic happens when creativity meets code.");',
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 3 },
      content: [
        { type: 'text', text: 'Block quote: Highlighting key thoughts' },
      ],
    },
    {
      type: 'blockquote',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: '“In a world full of data, stories are the sparks that make our content come alive.” – Sam, the Tech Wizard',
            },
          ],
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [
        { type: 'text', text: 'Getting started with And Voila’s editor' },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Kickstart your creative journey with And Voila’s editor. Here’s how to dive in:',
        },
      ],
    },
    {
      type: 'taskList',
      content: [
        {
          type: 'taskItem',
          attrs: { checked: false },
          content: [
            { type: 'text', text: 'Title your post – changeable anytime.' },
          ],
        },
        {
          type: 'taskItem',
          attrs: { checked: false },
          content: [{ type: 'text', text: 'Add a flexible description.' }],
        },
        {
          type: 'taskItem',
          attrs: { checked: false },
          content: [{ type: 'text', text: 'Clear default content.' }],
        },
        {
          type: 'taskItem',
          attrs: { checked: false },
          content: [{ type: 'text', text: 'Begin crafting your content.' }],
        },
        {
          type: 'taskItem',
          attrs: { checked: false },
          content: [
            { type: 'text', text: 'Use ' },
            { type: 'text', marks: [{ type: 'code' }], text: '/' },
            { type: 'text', text: ' commands for quick formatting.' },
          ],
        },
        {
          type: 'taskItem',
          attrs: { checked: false },
          content: [
            { type: 'text', text: 'Activate AI assistant with ' },
            { type: 'text', marks: [{ type: 'code' }], text: '++' },
            { type: 'text', text: '.' },
          ],
        },
      ],
    },
  ],
};
