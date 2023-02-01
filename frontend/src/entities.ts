interface Endpoint {
  title: string;
  action: (fields: {
    [key: string]: FormDataEntryValue;
  }) => Promise<Result | undefined>;
  needs_profile?: boolean;
  extraFields: Array<{
    title: string;
    name: string;
    type: string;
  }>;
}

interface Result {
  req: {
    path: string;
    headers?: {
      profile_id: string;
    };
  };
  res: {
    status: number;
    body: ReadableStream<Uint8Array> | null;
  };
}
export type { Endpoint, Result };
