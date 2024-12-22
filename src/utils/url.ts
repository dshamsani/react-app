import type { StringifiableRecord } from "query-string";

import { baseUrl } from "@/constants/api";
import queryString from "query-string";

export const getUrl = (params?: StringifiableRecord) =>
  queryString.stringifyUrl({
    url: `${baseUrl}`,
    query: params,
  });
