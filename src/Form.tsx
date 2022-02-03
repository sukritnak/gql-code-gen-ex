import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { CreateVocabDocument, CreateVocabMutation, PublishVocabDocument, PublishVocabMutation, useCreateVocabMutation } from "./generated/graphql";
const PostsMutation = (props: { setfetchMore: React.Dispatch<React.SetStateAction<boolean>> }) => {
    let [word, setWord] = useState('');
    let [meaning, SetMeaning] = useState('');

    // const [createVocabMutation, { data, loading, error }] = useCreateVocabMutation();

    const [createVocabMutation, { data, loading, error }] = useMutation<CreateVocabMutation>(CreateVocabDocument)
    const [publishVocabMutation, { loading: loadingPub }] = useMutation<PublishVocabMutation>(PublishVocabDocument)

    useEffect(() => {
        async function publishVocab() {

            await publishVocabMutation({ variables: { id: data?.createVocab?.id } });
            props.setfetchMore(true);
        }

        if (data?.createVocab?.id)
            publishVocab()

    }, [data?.createVocab?.id]);


    return (
        <div>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    createVocabMutation({ variables: { data: { word, meaning } } })
                }}
            >
                <div>
                    <label>Word :    </label>
                    <input onChange={e => setWord(e.target.value)} />
                </div>
                <div>
                    <label>Meaning :    </label>
                    <input onChange={e => SetMeaning(e.target.value)} />
                </div>
                <button type='submit'>
                    Add Vocab
                </button>
            </form>
            <div>
                {loading ?
                    <div>Loading...</div> : error ?
                        <div>Error...</div> :

                        <div>
                            <h3>คำที่สร้าง{data?.createVocab?.word}</h3>
                            <p>ความหมาย {data?.createVocab?.meaning}</p>

                        </div>

                }
            </div>
        </div>
    )
};

export default PostsMutation;