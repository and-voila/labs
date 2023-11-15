import Balancer from 'react-wrap-balancer';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/app/components/ui/accordion';

const pricingFaqData = [
  {
    id: '0',
    question: 'How are payments processed?',
    answer:
      'We partner with Stripe and Discord to process payments. Both platforms are PCI-DSS Level I certified—essentially, your financial data is as secure as it gets.',
  },
  {
    id: '1',
    question: 'Can I cancel my membership?',
    answer:
      'Yes, you can cancel at any time. Your membership will remain active until the end of your current billing cycle.',
  },
  {
    id: '2',
    question: 'Do you offer refunds?',
    answer:
      'No, we don’t. However, if the membership isn’t meeting your expectations, let us know, and we’ll do our best to improve your experience.',
  },
  {
    id: '3',
    question: 'What about privacy?',
    answer:
      'Your privacy is important to us. We collect only the necessary data to facilitate your membership and offer personalized experiences. For full details, consult our Privacy Policy.',
  },
  {
    id: '4',
    question: 'What kind of content can I expect?',
    answer:
      "Our content consists of daily insights, weekly AMAs, and a range of exclusive digital marketing resources. You'll learn the about the who's who and the what's what with access to timely information about everything you need to be successful. It’s essentially a one-stop shop for all your marketing needs.",
  },
  {
    id: '5',
    question: 'What topics can I ask about?',
    answer:
      'Our expertise covers the entire digital marketing spectrum, from UX design to acquisition to AI. If you have a question that stumps us, we’ll tap into our network to find an answer for you.',
  },
  {
    id: '6',
    question: 'How are personalized Q/A sessions handled?',
    answer:
      'We try our best to answer any and all of your questions. For specific queries related to design, marketing, or tech, use the designated channels in the AMA category. For sensitive topics, a DM to one of the mods works. If a questions holds wider community value, we might anonymize and share it.',
  },
  {
    id: '7',
    question: 'Who can join?',
    answer:
      "Everyone is welcome, but if you have an interest in digital marketing, you'll be delighted. And Voila is a premium Discord server without the usual challenges. We love everyone, but have no room for trolls and haters. Bye Felicia.",
  },
  {
    id: '8',
    question: 'Is this a safe space?',
    answer:
      'Absolutely. Our conversations are candid but respectful. Radical Candor governs our feedback culture.',
  },
  {
    id: '9',
    question: 'What is Radical Candor?',
    answer:
      "That's a great question and one Kim Scott lives by (if you don't know who that is, ask ChatGPT for an intro). Radical Candor is direct feedback that’s also deeply empathetic. It’s not about being blunt, it’s about being honest in a way that fosters personal and professional growth.",
  },
  {
    id: '10',
    question: 'How do I access the community?',
    answer:
      'As long as you have internet access, log into Discord and find the And Voila server in your sidebar. And voila—you’re in!',
  },
  {
    id: '11',
    question: 'Are there any community rules?',
    answer:
      'There sure are. Once you join, you’ll be guided through our Community Guidelines, Terms of Service, and Privacy Policy. You can also refer to the #rules channel in the Pinned categories.',
  },
  {
    id: '12',
    question: 'What is your teaching style?',
    answer:
      'Micro-lessons and bite-sized content is our jam. This approach allows you to absorb actionable insights in 5 minutes or less, and even string them together for a comprehensive playbook.',
  },
  {
    id: '13',
    question: 'Are you any good at what you do?',
    answer:
      "Well, we don't want to toot our own horn, but our NPS score is 95, and we pride ourselves on that. We let our community’s satisfaction speak for itself.",
  },
  {
    id: '14',
    question: 'Why should I join instead of using X, Reddit, etc.?',
    answer:
      "We make sure you don't get lost in the noise. Here, each member receives individualized expert attention with timely and targeted responses.",
  },
  {
    id: '15',
    question: 'Is the community active across multiple time zones?',
    answer:
      'Yes, we’re a global community. Whether you’re an early bird or a night owl, one of us will always be around.',
  },
  {
    id: '16',
    question: 'What should I do if I encounter issues?',
    answer:
      'Yikes. Contact us through our website Contact page or on the Discord server. We’re committed to resolving any issues you may have.',
  },
  {
    id: '17',
    question: 'What are the fair usage limits on AI-tools?',
    answer:
      'Our AI tools are cutting-edge and designed to assist you. However, fair usage limits apply to ensure all members get optimal performance. Details are available in the AI-tools section.',
  },
  {
    id: '18',
    question: 'Are early access rates permanent?',
    answer:
      'Early access rates are locked in for a year, giving you savings while you enjoy premium features.',
  },
  {
    id: '19',
    question: 'How do the AI tools work?',
    answer:
      'Our AI tools are designed to assist, not replace you. They help automate repetitive tasks and provide insights, but you have control. We respect your IP rights.',
  },
  {
    id: '20',
    question: 'Can I access the community and tools from any device?',
    answer:
      'Absolutely, as long as your device has internet access, you can log into our Discord community and access Labs.',
  },
  {
    id: '21',
    question: 'Do you offer free trials?',
    answer:
      'We offer limited free access to our community and Labs platform, but there is no free trial for premium features.',
  },
];

export function PricingFaq() {
  return (
    <section className="container max-w-3xl py-2">
      <div className="mb-14 space-y-6 text-center">
        <h1 className="text-center text-3xl font-bold md:text-5xl">
          <Balancer>Frequently Asked Questions</Balancer>
        </h1>
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
          <AccordionItem key={faqItem.id} value={faqItem.id}>
            <AccordionTrigger>{faqItem.question}</AccordionTrigger>
            <AccordionContent>{faqItem.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
