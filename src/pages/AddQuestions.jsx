import { addQuestionsToFirestore } from "../utils/addQuestions";

const AddQuestions = () => {
    return <button onClick={addQuestionsToFirestore}>Add Questions</button>
}

export default AddQuestions