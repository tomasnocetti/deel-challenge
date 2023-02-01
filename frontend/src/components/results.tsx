import { Heading, Text } from "@chakra-ui/react";
import { Result } from "../entities";

const Results: React.FC<{
  result: Result | undefined;
}> = ({ result }) => {
  return (
    <>
      {!result ? (
        <Text>Submit a Request to see results</Text>
      ) : (
        <>
          <Heading as="h6" size={"sm"}>
            Request
          </Heading>
          <pre className="code code-css">
            PATH: {result?.req.path}
            <br />
            HEADERS: {JSON.stringify(result?.req.headers)}
          </pre>
          <Heading as="h6" size={"sm"}>
            Response
          </Heading>
          <pre className="code code-css">
            STATUS: {result?.res.status}
            <br />
            PAYLOAD:
            <br />
            {JSON.stringify(result?.res.body)}
          </pre>
        </>
      )}
    </>
  );
};
export default Results;
