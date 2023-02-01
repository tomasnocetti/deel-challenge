import { Endpoint } from "../entities";

const getContractById = async (
  server_url: string,
  profileId: string,
  contractId: string
) => {
  const path = `${server_url}/contracts/${contractId}`;
  const headers = {
    profile_id: profileId,
  };

  try {
    const res = await fetch(path, {
      headers,
    });
    const jsonRes = await res.json();

    return {
      req: {
        path,
        headers,
      },
      res: {
        status: res.status,
        body: jsonRes,
      },
    };
  } catch (err) {
    console.log(err);
  }
};

const getContracts = async (server_url: string, profileId: string) => {
  const path = `${server_url}/contracts`;
  const headers = {
    profile_id: profileId,
  };

  try {
    const res = await fetch(path, {
      headers,
    });
    const jsonRes = await res.json();

    return {
      req: {
        path,
        headers,
      },
      res: {
        status: res.status,
        body: jsonRes,
      },
    };
  } catch (err) {
    console.log(err);
  }
};

const getJobsUnpaid = async (server_url: string, profileId: string) => {
  const path = `${server_url}/jobs/unpaid`;
  const headers = {
    profile_id: profileId,
  };

  try {
    const res = await fetch(path, {
      headers,
    });
    const jsonRes = await res.json();

    return {
      req: {
        path,
        headers,
      },
      res: {
        status: res.status,
        body: jsonRes,
      },
    };
  } catch (err) {
    console.log(err);
  }
};

const postPayJob = async (
  server_url: string,
  profileId: string,
  jobId: string
) => {
  const path = `${server_url}/jobs/${jobId}/pay`;
  const headers = {
    profile_id: profileId,
  };

  try {
    const res = await fetch(path, {
      method: "POST",
      headers,
    });
    const jsonRes = await res.json();

    return {
      req: {
        path,
        headers,
      },
      res: {
        status: res.status,
        body: jsonRes,
      },
    };
  } catch (err) {
    console.log(err);
  }
};

const postBalancesDeposit = async (
  server_url: string,
  user_id: string,
  amount: string
) => {
  const path = `${server_url}/balances/deposit/${user_id}`;

  try {
    const res = await fetch(path, {
      method: "POST",
      body: JSON.stringify({ amount }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonRes = await res.json();

    return {
      req: {
        path,
      },
      res: {
        status: res.status,
        body: jsonRes,
      },
    };
  } catch (err) {
    console.log(err);
  }
};
const getAdminBestJob = async (
  server_url: string,
  start: string,
  end: string
) => {
  const path = `${server_url}/admin/best-profession?start=${start}&end=${end}`;

  try {
    const res = await fetch(path, {
      method: "GET",
    });
    const jsonRes = await res.json();

    return {
      req: {
        path,
      },
      res: {
        status: res.status,
        body: jsonRes,
      },
    };
  } catch (err) {
    console.log(err);
  }
};

const getAdminBestClients = async (
  server_url: string,
  start: string,
  end: string,
  limit?: string
) => {
  const path = `${server_url}/admin/best-clients?start=${start}&end=${end}&limit=${limit}`;

  try {
    const res = await fetch(path, {
      method: "GET",
    });
    const jsonRes = await res.json();

    return {
      req: {
        path,
      },
      res: {
        status: res.status,
        body: jsonRes,
      },
    };
  } catch (err) {
    console.log(err);
  }
};

const listOfEndpoints: Array<Endpoint> = [
  {
    title: "**_GET_** `/contracts/:id` ",
    action: async (fields) => {
      const { server_url, contract_id, profile_header } = fields;
      const res = await getContractById(
        server_url as string,
        profile_header as string,
        contract_id as string
      );
      return res;
    },
    needs_profile: true,
    extraFields: [
      {
        title: "Contract ID",
        name: "contract_id",
        type: "text",
      },
    ],
  },
  {
    title: "**_GET_** `/contracts` ",
    action: async (fields) => {
      const { server_url, profile_header } = fields;
      const res = await getContracts(
        server_url as string,
        profile_header as string
      );
      return res;
    },
    needs_profile: true,
    extraFields: [],
  },
  {
    title: "**_GET_** `/jobs/unpaid` ",
    action: async (fields) => {
      const { server_url, profile_header } = fields;
      const res = await getJobsUnpaid(
        server_url as string,
        profile_header as string
      );
      return res;
    },
    extraFields: [],
    needs_profile: true,
  },
  {
    title: "**_POST_** `/jobs/:job_id/pay`",
    action: async (fields) => {
      const { server_url, profile_header, job_id } = fields;
      const res = await postPayJob(
        server_url as string,
        profile_header as string,
        job_id as string
      );
      return res;
    },
    needs_profile: true,
    extraFields: [
      {
        title: "Job ID",
        name: "job_id",
        type: "text",
      },
    ],
  },
  {
    title: "**_POST_** `/balances/deposit/:userId`",
    action: async (fields) => {
      const { server_url, user_id, amount } = fields;
      const res = await postBalancesDeposit(
        server_url as string,
        user_id as string,
        amount as string
      );
      return res;
    },
    extraFields: [
      {
        title: "User ID",
        name: "user_id",
        type: "text",
      },
      {
        title: "Amount to Deposit",
        name: "amount",
        type: "number",
      },
    ],
  },
  {
    title: "**_GET_** `/admin/best-profession?start=<date>&end=<date>` ",
    action: async (fields) => {
      const { server_url, start, end } = fields;
      const res = await getAdminBestJob(
        server_url as string,
        start as string,
        end as string
      );
      return res;
    },
    extraFields: [
      {
        title: "Start Date",
        name: "start",
        type: "date",
      },
      {
        title: "End Date",
        name: "end",
        type: "date",
      },
    ],
  },
  {
    title:
      "**_GET_** `/admin/best-clients?start=<date>&end=<date>&limit=<integer>`",
    action: async (fields) => {
      const { server_url, start, end, limit } = fields;
      const res = await getAdminBestClients(
        server_url as string,
        start as string,
        end as string,
        limit as string
      );
      return res;
    },
    extraFields: [
      {
        title: "Start Date",
        name: "start",
        type: "date",
      },
      {
        title: "End Date",
        name: "end",
        type: "date",
      },
      {
        title: "Limit",
        name: "limit",
        type: "number",
      },
    ],
  },
];

export default listOfEndpoints;
