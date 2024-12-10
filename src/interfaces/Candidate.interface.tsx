// TODO: Create an interface for the Candidate objects returned by the API
 interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  avatar: string;
}

export default Candidate;