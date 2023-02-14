import { Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { IGlobalState } from "../store/reducers";

const ScoreCard: React.FC = (): JSX.Element => {
    const { score } = useSelector((state: IGlobalState) => state);
    return (
        <Heading as="h2" size="md" mt={5} mb={5}>Current Score: {score}</Heading>
    );
}

export default ScoreCard;