import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';
import customFetch from '../../utils/axios';
import QuestionCard from '../../components/QuestionCard';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTimes, FaBook, FaSearch, FaLayerGroup, FaSignal } from 'react-icons/fa';

const InterviewPrep = () => {
  const { user } = useAppContext();
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'Technical',
    difficulty: 'Medium',
  });

  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const { data } = await customFetch.get('/questions');
      setQuestions(data.questions);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await customFetch.post('/questions', formData);
        setFormData({ question: '', answer: '', category: 'Technical', difficulty: 'Medium' });
        setShowForm(false);
        fetchQuestions();
    } catch (error) {
        console.log(error);
    }
  };

  const deleteQuestion = async (id) => {
      try {
          await customFetch.delete(`/questions/${id}`);
          fetchQuestions();
      } catch (error) {
          console.log(error);
      }
  }

  return (
    <section className="min-h-[80vh] w-full relative font-sans pb-20">
        {/* Ambient Background Gradient */}
       <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[20%] w-96 h-96 bg-blue-100/40 rounded-full blur-3xl" />
          <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-3xl" />
       </div>

    <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
    >
        <div className='flex flex-col md:flex-row justify-between items-center gap-6 mb-8'>
            <div>
                 <h3 className='text-3xl font-extrabold text-slate-800 tracking-tight mb-2'>Interview Questions</h3>
                 <p className="text-slate-500 font-medium">Prepare for your next big opportunity</p>
            </div>
            
            <div className='flex gap-4'>
                <Link to="/dashboard/interview-guide" className='btn h-12 px-6 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 border border-green-200 font-bold flex items-center gap-2 transition-colors'>
                    <FaBook /> Preparation Guide
                </Link>
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`btn h-12 px-6 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all ${showForm ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/30'}`}
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? <><FaTimes /> Cancel</> : <><FaPlus /> Add New Question</>}
                </motion.button>
            </div>
        </div>

        <AnimatePresence>
            {showForm && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mb-10"
                >
                    <div className='bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative'>
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent pointer-events-none" />
                        
                        <form className='w-full relative z-10' onSubmit={handleSubmit}>
                            <h4 className="text-xl font-bold text-slate-700 mb-6">Create New Flashcard</h4>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-start'>
                                <div className="group md:col-span-2">
                                    <label htmlFor="question" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Question</label>
                                    <div className="relative overflow-hidden rounded-xl bg-white border border-slate-200 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300 flex items-center">
                                       <div className="pl-4 text-slate-400"><FaSearch /></div>
                                       <input 
                                         type="text" 
                                         name="question" 
                                         value={formData.question} 
                                         onChange={handleChange} 
                                         placeholder="e.g. What is the Virtual DOM?"
                                         className='w-full h-12 px-4 bg-transparent outline-none text-slate-700 placeholder:text-slate-400 font-medium' 
                                         required 
                                       />
                                    </div>
                                </div>

                                <div className="group">
                                    <label htmlFor="category" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Category</label>
                                    <div className="relative overflow-hidden rounded-xl bg-white border border-slate-200 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300 flex items-center">
                                        <div className="pl-4 text-slate-400"><FaLayerGroup /></div>
                                        <select 
                                            name="category" 
                                            value={formData.category} 
                                            onChange={handleChange} 
                                            className='w-full h-12 px-4 bg-transparent outline-none text-slate-700 font-medium appearance-none cursor-pointer'
                                        >
                                            <option value="Technical">Technical</option>
                                            <option value="Behavioral">Behavioral</option>
                                            <option value="HR">HR</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="group">
                                    <label htmlFor="difficulty" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Difficulty</label>
                                    <div className="relative overflow-hidden rounded-xl bg-white border border-slate-200 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300 flex items-center">
                                        <div className="pl-4 text-slate-400"><FaSignal /></div>
                                        <select 
                                            name="difficulty" 
                                            value={formData.difficulty} 
                                            onChange={handleChange} 
                                            className='w-full h-12 px-4 bg-transparent outline-none text-slate-700 font-medium appearance-none cursor-pointer'
                                        >
                                            <option value="Easy">Easy</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Hard">Hard</option>
                                        </select>
                                    </div>
                                </div>

                                 <div className="group md:col-span-2">
                                    <label htmlFor="answer" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Answer</label>
                                    <div className="relative overflow-hidden rounded-xl bg-white border border-slate-200 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300">
                                        <textarea 
                                            name="answer" 
                                            value={formData.answer} 
                                            onChange={handleChange} 
                                            placeholder="Write your answer here..."
                                            className='w-full p-4 bg-transparent outline-none text-slate-700 placeholder:text-slate-400 font-medium min-h-[120px] resize-none' 
                                            required 
                                        />
                                    </div>
                                </div>
                                <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit" 
                                    className='btn h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 md:col-span-2 mt-2 transition-all'
                                >
                                    Save Question
                                </motion.button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.div>

      <section>
        <motion.h5 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='font-bold text-xl mb-6 text-slate-700 flex items-center gap-2'
        >
            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 grid place-items-center text-sm">{questions.length}</span> 
            Saved Questions
        </motion.h5>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <AnimatePresence>
            {questions.map((question) => {
                return (
                    <QuestionCard 
                        key={question._id} 
                        {...question} 
                        deleteQuestion={deleteQuestion} 
                        isOwner={user._id === question.createdBy} 
                    />
                );
            })}
          </AnimatePresence>
        </div>
      </section>
    </section>
  );
};

export default InterviewPrep;
