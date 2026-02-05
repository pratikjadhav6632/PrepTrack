import { FaChevronDown, FaChevronUp, FaTrash } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const QuestionCard = ({ _id, question, answer, category, difficulty, createdAt, deleteQuestion, isOwner }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  // Helper for difficulty colors
  const getDifficultyColor = (diff) => {
      switch(diff) {
          case 'Easy': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
          case 'Medium': return 'bg-amber-100 text-amber-700 border-amber-200';
          case 'Hard': return 'bg-rose-100 text-rose-700 border-rose-200';
          default: return 'bg-slate-100 text-slate-700 border-slate-200';
      }
  };

  return (
    <motion.article 
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        className='bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-2xl border border-white/60 flex flex-col transition-shadow duration-300 relative overflow-hidden group'
    >
      {/* Decorative gradient header */}
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>

      <header className='p-6 pb-2 flex justify-between items-start gap-4'>
        <div className='flex items-start gap-4'>
            <div className='w-12 h-12 flex-shrink-0 grid place-items-center bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl text-xl font-bold text-indigo-600 shadow-sm border border-indigo-50'>
                {question.charAt(0).toUpperCase()}
            </div>
            <div>
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 mb-1 border border-slate-200">
                    {category}
                </span>
                <span className={`ml-2 inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getDifficultyColor(difficulty)}`}>
                    {difficulty}
                </span>
            </div>
        </div>
      </header>

      <div className='px-6 py-4 flex flex-col flex-1'>
        <div className='mb-4 flex-1'>
            <h4 className='font-bold text-lg text-slate-800 leading-snug'>{question}</h4>
        </div>
        
        <AnimatePresence>
            {showAnswer && (
                <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                >
                    <div className='bg-slate-50/80 p-5 rounded-xl border border-slate-200 mb-4 text-slate-700 leading-relaxed font-medium shadow-inner'>
                        {answer}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        <footer className='mt-auto pt-4 border-t border-slate-100 flex gap-3'>
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type='button'
                className={`flex-1 h-10 rounded-lg font-semibold text-sm transition-colors border flex items-center justify-center gap-2 ${
                    showAnswer 
                    ? 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200' 
                    : 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20'
                }`}
                onClick={() => setShowAnswer(!showAnswer)}
            >
                {showAnswer ? (
                    <>Hide Answer <FaChevronUp /></>
                ) : (
                    <>Show Answer <FaChevronDown /></>
                )}
            </motion.button>
            
            {isOwner && (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type='button'
                    className='w-10 h-10 rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 hover:text-rose-600 border border-rose-100 flex items-center justify-center transition-colors'
                    onClick={() => deleteQuestion(_id)}
                    title="Delete Question"
                >
                   <FaTrash />
                </motion.button>
            )}
        </footer>
      </div>
    </motion.article>
  );
};

export default QuestionCard;
