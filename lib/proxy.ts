export async function fetchWithAuth(input: RequestInfo, init?: RequestInit) {
  // include credentials so auth cookie is forwarded
  const opts: RequestInit = {
    ...init,
    credentials: "include",
    headers: {
      ...(init && init.headers ? init.headers : {}),
      "Content-Type": "application/json",
    },
  };

  return fetch(input, opts);
}
