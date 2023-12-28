export const initialContent = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: {
        textAlign: 'left',
        level: 1,
      },
      content: [
        {
          type: 'emoji',
          attrs: {
            name: 'fire',
          },
        },
        {
          type: 'text',
          text: "Introducing And Voila's AI Editor",
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        class: null,
        textAlign: 'left',
      },
      content: [
        {
          type: 'text',
          text: 'A user-friendly editor that mirrors the simplicity and efficiency of Notion, offering a straightforward, what-you-see-is-what-you-get experience. Purpose built for the way you work.',
        },
      ],
    },
    {
      type: 'codeBlock',
      attrs: {
        language: null,
      },
      content: [
        {
          type: 'text',
          text: "import { useState } from 'react';\n\nfunction App() {\n  const [state, setState] = useState<any>('Strictly TypeScript');\n\n  const breakRules = () => {\n    setState({\n      type: 'Not a string anymore',\n      payload: Math.random() > 0.5 ? 'Oops' : ['An', 'array', '?', 'Really', '?'],\n    });\n  };\n\n  return <button onClick={breakRules}>Break the rules</button>;\n}",
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        textAlign: 'left',
        level: 2,
      },
      content: [
        {
          type: 'emoji',
          attrs: {
            name: 'sparkles',
          },
        },
        {
          type: 'text',
          text: "An AI assisted editor that's built for you",
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        class: null,
        textAlign: 'left',
      },
      content: [
        {
          type: 'text',
          text: "Bring out your inner Shakespeare (or Hemingway, if you're into brevity) with our AI-powered editor. It's like having a tiny genius in your computer, eager to assist with tools like Write, Image, Simplify, and more, all while making sure your unique voice isn't lost in translation.",
        },
      ],
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
                {
                  type: 'text',
                  marks: [{ type: 'bold' }],
                  text: 'AI Auto-complete',
                },
                {
                  type: 'text',
                  text: ': Imagine a crystal ball for writing - start typing, hit the ',
                },
                {
                  type: 'text',
                  marks: [{ type: 'code' }],
                  text: ' TAB ',
                },
                {
                  type: 'text',
                  text: ' key, and watch it predict your next masterpiece.',
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
                {
                  type: 'text',
                  marks: [{ type: 'bold' }],
                  text: 'Write',
                },
                {
                  type: 'text',
                  text: ': Like a virtual muse, this tool whispers creative suggestions in your ear, helping transform your thoughts into words.',
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
                {
                  type: 'text',
                  marks: [{ type: 'bold' }],
                  text: 'Image',
                },
                {
                  type: 'text',
                  text: ': Need eye candy for your words? Say no more. This tool conjures images that make your content pop.',
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
                {
                  type: 'text',
                  marks: [{ type: 'bold' }],
                  text: 'Simplify',
                },
                {
                  type: 'text',
                  text: ": Ever wish you had a 'make it simple' button for convoluted text? Well, now you do. Simplify turns complex jargon into something even your grandma can understand.",
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
                {
                  type: 'text',
                  marks: [{ type: 'bold' }],
                  text: 'Emojify',
                },
                {
                  type: 'text',
                  text: ": Transform your text into an emoji wonderland. It's like adding a dash of spice to a bland dish, but with smiley faces and thumbs up.",
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
              attrs: {
                class: null,
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'bold',
                    },
                  ],
                  text: 'Complete',
                },
                {
                  type: 'text',
                  text: ': Finishes your sentences like a mind-reading sidekick. Ideal for those moments when the right words are just on the tip of your tongue.',
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
              attrs: {
                class: null,
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'bold',
                    },
                  ],
                  text: 'Spellcheck',
                },
                {
                  type: 'text',
                  text: ': Banishes typos and spelling gremlins with a magical flick of its digital wand, ensuring your writing is as polished as a shiny apple.',
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
              attrs: {
                class: null,
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'bold',
                    },
                  ],
                  text: 'Expand',
                },
                {
                  type: 'text',
                  text: ': Like a friendly chatterbox, this tool helps you add more meat to your prose, turning succinct sentences into detailed explanations.',
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
              attrs: {
                class: null,
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'bold',
                    },
                  ],
                  text: 'Expand',
                },
                {
                  type: 'text',
                  text: ': Like a friendly chatterbox, this tool helps you add more meat to your prose, turning succinct sentences into detailed explanations.',
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
              attrs: {
                class: null,
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'bold',
                    },
                  ],
                  text: 'TLDR',
                },
                {
                  type: 'text',
                  text: ": The superhero of summarization, swooping in to distill lengthy text into bite-sized, snackable content. Perfect for the 'give me the gist' crowd.",
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
              attrs: {
                class: null,
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'bold',
                    },
                  ],
                  text: 'Tone',
                },
                {
                  type: 'text',
                  text: ': A mood ring for your text, this tool adjusts the emotional vibe of your writing, ensuring it resonates just right with your audience.',
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
              attrs: {
                class: null,
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'bold',
                    },
                  ],
                  text: 'Translate',
                },
                {
                  type: 'text',
                  text: ': A linguistic chameleon, this tool seamlessly transforms your text across a variety of languages, including Arabic, Chinese, English, French, German, Greek, Italian, Japanese, Korean, Russian, Spanish, Swedish, and Ukrainian. Ideal for global communication without the babel.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        textAlign: 'left',
        level: 3,
      },
      content: [
        {
          type: 'emoji',
          attrs: {
            name: 'wink',
          },
        },
        {
          type: 'text',
          text: " The editor also has cool stuff you'll love using:",
        },
      ],
    },
    {
      type: 'bulletList',
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              attrs: {
                class: null,
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  text: 'Live collaboration, because two (or more) brains are better than one, complete with content synchronization and collaborative cursors that dance around your document.',
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
              attrs: {
                class: null,
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  text: 'A DragHandle – not just any handle, but one that comes with its own menu for all your drag-and-drop adventures.',
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
              attrs: {
                class: null,
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  text: 'The Slash menu, activated by a simple click on the ',
                },
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'code',
                    },
                  ],
                  text: ' / ',
                },
                {
                  type: 'text',
                  text: ' key. ',
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
              attrs: {
                class: null,
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  text: 'A TextFormatting menu that lets you play dress-up with your text, changing ',
                },
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'textStyle',
                      attrs: {
                        fontSize: '18px',
                        fontFamily: null,
                        color: null,
                      },
                    },
                  ],
                  text: 'font size',
                },
                {
                  type: 'text',
                  text: ', ',
                },
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'bold',
                    },
                  ],
                  text: 'font weight',
                },
                {
                  type: 'text',
                  text: ', and even ',
                },
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'textStyle',
                      attrs: {
                        fontSize: null,
                        fontFamily: 'Georgia',
                        color: null,
                      },
                    },
                  ],
                  text: 'font family',
                },
                {
                  type: 'text',
                  text: ', not to mention a splash of color here and a dab of ',
                },
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'textStyle',
                      attrs: {
                        fontSize: null,
                        fontFamily: null,
                        color: '#4a86e8',
                      },
                    },
                  ],
                  text: 'color',
                },
                {
                  type: 'text',
                  text: ' there.',
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
              attrs: {
                class: null,
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  text: "A Table of Contents button that's like a GPS for your document – click it and never get lost in your own words.",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'imageBlock',
      attrs: {
        src: '/post-placeholder.jpg',
        width: '100%',
        align: 'center',
      },
    },
  ],
};
