
import FileUpload from '../../components/post/FileUpload'
import { toast } from 'react-toastify';

const Search = () => {
  const notify = () => toast.success("Wow so easy !");
  return (
    <div>
      Search
      <FileUpload />
      <button onClick={notify}>Notify !</button>

    </div>
    
  )
}

export default Search