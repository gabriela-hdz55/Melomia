import sampleProfilePic from '../assets/samplepfp.jpg';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
      <nav className="flex items-center justify-between px-8 py-4 bg-pink-300 shadow">
        <div className="flex items-center gap-8">
          <Link to="/"><span className="text-xl font-bold text-pink-500">Melomia</span></Link>
          <Link to="/"><span className="text-lg text-pink-500">Home</span></Link>
        </div>
        <Link to="/profile" aria-label="Go to profile">
          <img
            className="h-10 w-10 rounded-full object-cover border-2 border-pink-500 cursor-pointer"
            src={sampleProfilePic}
            alt="User Profile"
          />
        </Link>
      </nav>
  );
}