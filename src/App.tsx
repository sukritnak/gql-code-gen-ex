import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import PostsMutation from "./Form";
import { GetVocabsDocument, GetVocabsQuery, useGetVocabsQuery } from "./generated/graphql";
function App() {
  // const { data, loading, error, refetch } = useGetVocabsQuery();
  const { data, loading, error, refetch } = useQuery<GetVocabsQuery>(GetVocabsDocument)
  let [shouldFetchMore, SetFetchMore] = useState(false);

  useEffect(() => {
    const fetchMoreVocab = async () =>
      await refetch()
    if (shouldFetchMore) {
      fetchMoreVocab()
      SetFetchMore(false)
    }
  }, [shouldFetchMore]);





  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <ul>
      {data?.vocabs.map((vocabs) =>
        <li key={vocabs.id}>{vocabs.word} แปลว่า {vocabs.meaning}</li>)
      }
      <PostsMutation setfetchMore={SetFetchMore} />
    </ul>
  );
}
export default App;