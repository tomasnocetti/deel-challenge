import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Endpoint, Result } from "../entities";

interface ActionProps {
  listOfEndpoints: Array<Endpoint>;
  setResult: (res: Result | undefined) => void;
}

const Actions: React.FC<ActionProps> = ({ listOfEndpoints, setResult }) => {
  const [activeEndpointIndex, setActiveEndpoint] = useState(0);

  const activeEndpoint = listOfEndpoints[activeEndpointIndex];

  return (
    <Box background="white">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const formProps = Object.fromEntries(formData);

          const result = await activeEndpoint.action(formProps);
          setResult(result);
        }}
      >
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Server URL</FormLabel>
            <Input
              placeholder={"localhost:3001"}
              name={"server_url"}
              type={"text"}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Endpoint</FormLabel>
            <Select
              placeholder="Endpoint"
              onChange={(el) => {
                setActiveEndpoint(Number(el.target.value));
              }}
            >
              {listOfEndpoints.map((endpoint, index) => {
                return (
                  <option
                    key={index}
                    selected={index === activeEndpointIndex}
                    value={index}
                  >
                    {endpoint.title}
                  </option>
                );
              })}
            </Select>
          </FormControl>
          {activeEndpoint.needs_profile && (
            <FormControl>
              <FormLabel>Profile Header ID</FormLabel>
              <Input
                placeholder={"1"}
                name={"profile_header"}
                type={"number"}
              />
            </FormControl>
          )}
          {activeEndpoint.extraFields?.map((el) => {
            return (
              <FormControl key={el.name}>
                <FormLabel>{el.title}</FormLabel>
                <Input name={el.name} type={el.type} />
              </FormControl>
            );
          })}
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Actions;
