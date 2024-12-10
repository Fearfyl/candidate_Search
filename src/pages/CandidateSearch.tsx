import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';
import CandidateCard from '../components/CandidateCard';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const fetchCandidates = async () => {
    setLoading(true);
    const data = await searchGithub();
    setCandidates(data);
    setLoading(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const data = await searchGithubUser(searchTerm);
    setCandidates(data);
    setLoading(false);
  };

  const savetoLocalStorage = (candidate: Candidate) => {
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    savedCandidates.push(candidate);
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
  };

  const handleSave = () => {
    if (candidates[currentIndex]) {
      savetoLocalStorage(candidates[currentIndex]);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for candidates"
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {candidates[currentIndex] && (
        <CandidateCard
          candidate={candidates[currentIndex]}
          onSave={handleSave}
          onNext={handleNext}
        />
      )}
    </div>
  );
};

export default CandidateSearch;
