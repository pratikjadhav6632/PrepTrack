import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useState } from 'react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='border-b border-slate-200 last:border-0'>
      <button
        className='w-full py-4 flex justify-between items-center text-left focus:outline-none group'
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className='font-semibold text-slate-700 group-hover:text-primary-500 transition-colors'>{question}</span>
        <span className='text-slate-400 group-hover:text-primary-500 transition-colors'>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}
      >
        <p className='text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-lg'>
          {answer}
        </p>
      </div>
    </div>
  );
};

const InterviewGuide = () => {
  const navigate = useNavigate();

  const faqData = [
    {
      question: "Tell me about yourself.",
      answer: "Keep it professional. Summarize your current role, past experience relevant to this job, and why you are interested in this opportunity. Keep it under 2 minutes."
    },
    {
      question: "What are your greatest strengths?",
      answer: "Choose strengths relevant to the job. specific examples to back them up. Common examples: problem-solving, adaptability, collaboration, or leadership."
    },
    {
      question: "What is your greatest weakness?",
      answer: "Choose a real weakness but show how you are working to improve it. For example, 'I sometimes struggle with public speaking, so I joined a local Toastmasters club to practice.'"
    },
    {
      question: "Why do you want to work here?",
      answer: "Show you've done your research. Mention specific projects, company values, or their reputation in the industry that appeals to you."
    },
    {
      question: "Where do you see yourself in 5 years?",
      answer: "Focus on professional growth that aligns with the company's goals. For example, 'I hope to have mastered [Skill] and taken on more leadership responsibilities within this team.'"
    },
    {
      question: "Tell me about a challenge you faced at work.",
      answer: "Use the STAR method (Situation, Task, Action, Result). Describe the challenge, what you specifically did to address it, and the positive outcome."
    },
    {
      question: "Why are you leaving your current job?",
      answer: "Stay positive. Focus on what you are looking forward to (new challenges, growth, learning) rather than complaining about your current employer."
    },
    {
      question: "How do you handle stress and pressure?",
      answer: "Give a concrete example. Mention techniques like prioritizing tasks, taking short breaks, or communicating clearly with the team."
    },
    {
      question: "What are your salary expectations?",
      answer: "If possible, give a range based on your market research. You can also say, 'I am looking for a competitive salary that reflects my experience and the market rate for this role.'"
    },
    {
      question: "How do you prioritize your work?",
      answer: "Mention tools or methods you use, like to-do lists, project management software, or the Eisenhower Matrix (urgent vs. important)."
    },
    {
      question: "Describe a time you disagreed with a coworker.",
      answer: "Focus on resolution and professionalism. Explain how you listened to their perspective, communicated your own, and found a compromise or solution."
    },
    {
      question: "Do you have any questions for us?",
      answer: "Always say yes! Ask about team culture, specific projects, or what success looks like in the first 90 days. It shows you are interested and engaged."
    }
  ];

  return (
    <div className='bg-white rounded-2xl shadow-xl w-full p-8 md:p-12 mb-8 transition-all hover:shadow-2xl border border-slate-100'>
      <div className='flex items-center gap-4 mb-8'>
        <button 
          onClick={() => navigate('/dashboard/interview-prep')}
          className='btn bg-slate-200 text-slate-700 hover:bg-slate-300 flex items-center gap-2'
        >
          <FaChevronLeft /> Back
        </button>
        <h3 className='text-3xl font-extrabold text-slate-800 tracking-tight m-0'>Interview Preparation Guide</h3>
      </div>

      <div className='grid gap-12'>
        {/* Behavioral Section */}
        <section>
          <h4 className='text-2xl font-bold text-primary-500 mb-4 border-b border-slate-100 pb-2'>1. Behavioral Interviews</h4>
          <p className='text-slate-600 mb-4'>
            Behavioral questions focus on how you handle situations. The key is to use the <strong>STAR Method</strong> (Situation, Task, Action, Result).
          </p>
          <div className='grid md:grid-cols-2 gap-6'>
            <div className='aspect-video rounded-xl overflow-hidden shadow-md'>
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/zIm_k9j0C50?si=0V7nSBRLoXU4Sm9z" 
                title="STAR Method" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
             <div className='bg-slate-50 p-6 rounded-xl border border-slate-200'>
                <h5 className='font-bold text-lg mb-2 text-slate-800'>Common Questions</h5>
                <ul className='list-disc list-inside space-y-2 text-slate-600'>
                    <li>Tell me about a time you failed.</li>
                    <li>Describe a conflict with a coworker.</li>
                    <li>Give an example of a goal you reached.</li>
                    <li>Tell me about a time you showed leadership.</li>
                </ul>
            </div>
          </div>
        </section>

        {/* General Tips Section */}
        <section>
          <h4 className='text-2xl font-bold text-primary-500 mb-4 border-b border-slate-100 pb-2'>2. Body Language & Confidence</h4>
          <p className='text-slate-600 mb-4'>
            Non-verbal communication is just as important as your answers. Maintain eye contact and sit up straight.
          </p>
          <div className='grid md:grid-cols-2 gap-6'>
            <div className='aspect-video rounded-xl overflow-hidden shadow-md'>
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/FH5QfKZYnj0?si=8TG5zLX2LbqRqxal" 
                title="Body Language Tips" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
             <div className='bg-slate-50 p-6 rounded-xl border border-slate-200'>
                <h5 className='font-bold text-lg mb-2 text-slate-800'>Quick Tips</h5>
                <ul className='list-disc list-inside space-y-2 text-slate-600'>
                    <li>Dress professionally (even for virtual calls).</li>
                    <li>Arrive 10 minutes early.</li>
                    <li>Listen carefully to the question.</li>
                    <li>Don't be afraid to take a moment to think.</li>
                </ul>
            </div>
          </div>
        </section>

        {/* Salary Negotiation */}
        <section>
          <h4 className='text-2xl font-bold text-primary-500 mb-4 border-b border-slate-100 pb-2'>3. Salary Negotiation</h4>
          <p className='text-slate-600 mb-4'>
            Never accept the first offer immediately. Always express gratitude and ask for time to review it.
          </p>
          <div className='grid md:grid-cols-2 gap-6'>
            <div className='aspect-video rounded-xl overflow-hidden shadow-md'>
               <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/kBIN2h16Rc4?si=G-cIJ8P5ZfLNiCXK" 
                title="Salary Negotiation" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
             <div className='bg-slate-50 p-6 rounded-xl border border-slate-200'>
                <h5 className='font-bold text-lg mb-2 text-slate-800'>Negotiation Tips</h5>
                <ul className='list-disc list-inside space-y-2 text-slate-600'>
                    <li>Research market rates for your role/location.</li>
                    <li>Focus on the value you bring to the company.</li>
                    <li>Don't just focus on base salary; consider equity and benefits.</li>
                    <li>Be professional and polite, but firm.</li>
                </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h4 className='text-2xl font-bold text-primary-500 mb-4 border-b border-slate-100 pb-2'>4. Common HR & Behavioral Questions</h4>
          <p className='text-slate-600 mb-6'>
             Prepare for these standard questions that are asked in almost every interview, fitting for any industry.
          </p>
          <div className='bg-white rounded-xl shadow-lg border border-slate-100 p-6'>
            {faqData.map((item, index) => (
              <FAQItem key={index} {...item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default InterviewGuide;
