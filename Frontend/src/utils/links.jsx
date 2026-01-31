import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms, FaGraduationCap } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';

const links = [
  { id: 1, text: 'stats', path: '/', icon: <IoBarChartSharp /> },
  { id: 3, text: 'add job', path: 'add-job', icon: <FaWpforms /> },
  { id: 4, text: 'tracker', path: 'tracker', icon: <FaWpforms /> },
  { id: 5, text: 'profile', path: 'profile', icon: <ImProfile /> },
  { id: 6, text: 'Learn with Gaplify', path: 'https://www.gaplify.in', icon: <FaGraduationCap />, external: true },
];

export default links;
