import './App.css';
import {
  useQuery,
  gql,
  useMutation
} from "@apollo/client";
import { useState } from 'react';

const BOOKS_ATTRS=gql`
fragment bookAttrs on Book{
  title
  author
}
`
const GET_BOOKS = gql`
  ${BOOKS_ATTRS}
  query GetBooks {
    books {
      ...bookAttrs
    }
    events {
      name
    }
  }
`;

const ADD_BOOKS = gql`
  mutation AddBooks($title:String!,$author:String!) {
    addBooks(title:$title,author:$author) {
      title
      author
    }
  }
`;
function Showbooks({addedBooks}){
  let { loading, error, data } = useQuery(GET_BOOKS);
  console.log('addedBooks',addedBooks)
    
   
    return (loading)? <div>Loading books....</div>
    :
    <div>
      { 
        data.books.map(book=><ul>
                                <li>{book.title} &nbsp;&nbsp; {book.author}</li>
                            </ul>
        )
      }
        {addedBooks.map(book=><ul>
          <li>{book.title} &nbsp;&nbsp; {book.author}</li>
      </ul>
        )
      }
      
    </div>
  

}
function App() {
  const [addBooks,{ data, loading, error }] = useMutation(ADD_BOOKS);
  const [addedBooks,setAddedBooks] = useState([]);

  const [inputTitle,setInputTitle]=useState(null)
  const [inputAuthor,setInputAuthor]=useState(null)

  const createBooks=()=>{
    if(!loading && !error){
      addBooks({variables:{title:inputTitle,author:inputAuthor}})
      
      if(!error)
        setAddedBooks(addedBooks=>[...addedBooks,{title:inputTitle,author:inputAuthor}])  
    
  }
    
  }

  return (
    <div>
      <div>
            <input type='text' value={inputTitle} onChange={evt=>setInputTitle(evt.target.value)}/> <br />
            <input type='text' value={inputAuthor} onChange={evt=>setInputAuthor(evt.target.value)}/> 
            <button onClick={createBooks}>Add</button>
      </div>
      <Showbooks addedBooks={addedBooks}/>
    </div>
  );
}

export default App
