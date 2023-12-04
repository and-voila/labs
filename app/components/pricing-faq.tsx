import Balancer from 'react-wrap-balancer';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/app/components/ui/accordion';

const pricingFaqData = [
  {
    question: 'How are payments processed?',
    answer:
      'We partner with Stripe and Discord to process payments. Both platforms are PCI-DSS Level I certified—essentially, your financial data is as secure as it gets.',
  },
  {
    question: 'Can I cancel my membership?',
    answer:
      'Yes, you can cancel at any time. Your membership will remain active until the end of your current billing cycle.',
  },
  {
    question: 'Do you offer refunds?',
    answer:
      "Yes, in line with our 100% Delight Guarantee. If you're not fully satisfied within the first 30 days of your membership, we offer a full refund. After that, you can cancel your membership at any time, and it will remain active until the end of your current billing cycle.",
  },
  {
    question: 'What is this 100% Delight Guaranteed?',
    answer:
      "We’re committed to your satisfaction. If you're not totally in love with what we've created—bummer! Let us know within the first 30 days of your membership. We'll issue a full refund, no questions asked. We want to ensure that you're delighted with your experience.",
  },
  {
    question: 'Do you offer free trials?',
    answer:
      "We don't offer a free trial. However, you can use our Good plan for free, for life. It's a great way to get a feel for the community and our AI tools.",
  },
  {
    question: "What's a credit? How are they calculated?",
    answer:
      "Credits are like tokens you use to access our AI features. Each time you use an AI tool, it consumes a certain number of credits. Think of it as a 'use ticket' - for example, our AI-editor typically uses one credit per task, while more complex tasks, like image generation, might use more.",
  },
  {
    question: 'What are the fair usage limits on AI-tools?',
    answer:
      'Our AI tools are cutting-edge and designed to assist you. However, fair usage limits apply to ensure all members get optimal performance. Details are available in the AI-tools section.',
  },
  {
    question: 'What if I run out of AI credits?',
    answer:
      'If you hit your credit limit, no worries! You can purchase additional credits as needed. These extra credits don’t expire and will be added on top of your regular monthly credits.',
  },
  {
    question: 'What kind of content can I expect?',
    answer:
      "Our content consists of daily insights, weekly AMAs, and a range of exclusive digital marketing resources. You'll learn the about the who's who and the what's what with access to timely information about everything you need to be successful. It’s essentially a one-stop shop for all your marketing needs.",
  },
  {
    question: 'What topics can I ask about?',
    answer:
      'Our expertise covers the entire digital marketing spectrum, from UX design to acquisition to AI. If you have a question that stumps us, we’ll tap into our network to find an answer for you.',
  },
  {
    question: 'How are personalized Q/A sessions handled?',
    answer:
      'We try our best to answer any and all of your questions. For specific queries related to design, marketing, or tech, use the designated channels in the AMA category. For sensitive topics, a DM to one of the mods works. If a questions holds wider community value, we might anonymize and share it.',
  },
  {
    question: 'Who can join?',
    answer:
      "Everyone is welcome, but if you have an interest in digital marketing, you'll be delighted. And Voila is a premium Discord server without the usual challenges. We love everyone, but have no room for trolls and haters. Bye Felicia.",
  },
  {
    question: 'Is this a safe space?',
    answer:
      'Absolutely. Our conversations are candid but respectful. Radical Candor governs our feedback culture. We are very deliberate about creating a safe space for everyone and moderate the Community accordingly.',
  },
  {
    question: 'What is Radical Candor?',
    answer:
      "That's a great question and one Kim Scott lives by (if you don't know who that is, ask ChatGPT for an intro). Radical Candor is direct feedback that’s also deeply empathetic. It’s not about being blunt, it’s about being honest in a way that fosters personal and professional growth.",
  },
  {
    question: 'How do I access the community?',
    answer:
      'As long as you have internet access, log into Discord and find the And Voila server in your sidebar. And voila—you’re in!',
  },
  {
    question: 'Are there any community rules?',
    answer:
      'There sure are. Once you join, you’ll be guided through our Community Guidelines, Terms of Service, and Privacy Policy. You can also refer to the #rules channel in the Pinned categories.',
  },
  {
    question: 'What is your teaching style?',
    answer:
      'Micro-lessons and bite-sized content is our jam. This approach allows you to absorb actionable insights in 5 minutes or less, and even string them together for a comprehensive playbook.',
  },
  {
    question: 'Are you any good at what you do?',
    answer:
      "Well, we don't want to toot our own horn, but our NPS score is 95, and we pride ourselves on that. We let our community’s satisfaction speak for itself.",
  },
  {
    question: 'Why should I join instead of using X, Reddit, etc.?',
    answer:
      "We make sure you don't get lost in the noise. Here, each member receives individualized expert attention with timely and targeted responses.",
  },
  {
    question: 'Is the community active across multiple time zones?',
    answer:
      'Yes, we’re a global community. Whether you’re an early bird or a night owl, one of us will always be around.',
  },
  {
    question: 'What should I do if I encounter issues?',
    answer:
      'Yikes. Contact us through our website Contact page or on the Discord server. We’re committed to resolving any issues you may have.',
  },

  {
    question: 'How do the AI tools work?',
    answer:
      'Our AI tools are designed to assist, not replace you. They help automate repetitive tasks and provide insights, but you have control. We respect your IP rights and help you protect them.',
  },
  {
    question: 'Can I access the community and tools from any device?',
    answer:
      'Absolutely, as long as your device has internet access, you can log into our Discord community and access Labs.',
  },
  {
    question: 'What team collaboration features do you offer?',
    answer:
      'Our platform is built for teamwork. With roles-based access, you can form a team, invite colleagues, and assign roles. This feature amps up your productivity, allowing seamless collaboration on all our tools.',
  },
  {
    question: 'What is the And Voila Savings Club?',
    answer:
      "Think of it like an exclusive club for marketing deals. As a member, you get significant discounts on popular marketing tools. We're constantly adding new deals, so the savings just keep growing.",
  },
  {
    question: 'What about privacy?',
    answer:
      'Your privacy is important to us. We collect only the necessary data to facilitate your membership and offer personalized experiences. For full details, consult our Privacy Policy.',
  },
];

export function PricingFaq() {
  return (
    <section className="container max-w-3xl py-2">
      <div className="mb-14 space-y-6 text-center">
        <h2 className="text-center text-3xl font-bold md:text-5xl">
          <Balancer>Frequently Asked Questions</Balancer>
        </h2>
        <p className="text-md text-muted-foreground">
          <Balancer>
            Explore our comprehensive FAQ to find quick answers to common
            inquiries. If you need further assistance, don&apos;t hesitate to
            contact us for personalized help.
          </Balancer>
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {pricingFaqData.map((faqItem) => (
          <AccordionItem key={faqItem.question} value={faqItem.question}>
            <AccordionTrigger className="text-base font-semibold lg:text-lg">
              {faqItem.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground lg:text-base">
              {faqItem.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
