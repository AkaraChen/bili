import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  code: number;
  message: string;
  data?: any;
};

const boom = (message: string): Data => ({ code: 400, message, data: {} });

const isBV = (id: string) => id.toLowerCase().startsWith("bv");

const isValidID = (id: string) => {
  id = id.toLowerCase();
  let prefix = id.substring(0, 2);
  if (!(prefix === "av" || prefix === "bv")) return false;
  if (isBV(id)) return true;
  return !isNaN(Number(id.substring(2)));
};

const urlFormat = (id: string) => {
  let url = "http://api.bilibili.com/x/web-interface/view?";
  url += isBV(id) ? `bvid=${id}` : `aid=${id.substring(2)}`;
  return url;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (id instanceof Array || id === undefined) {
    res.status(400).json(boom("Unexpected param"));
    return;
  }

  if (!isValidID(id)) {
    res.status(400).json(boom("Not a valid ID"));
    return;
  }

  const data = await (await fetch(urlFormat(id))).json();
  res.json(data);
}
