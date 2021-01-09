const config = {
  SERVER:
    process.env.REACT_APP_SERVER_LOCATION === "local"
      ? process.env.REACT_APP_LOCAL_SERVER
      : process.env.REACT_APP_SERVER,
  PING:
    process.env.REACT_APP_SERVER_LOCATION === "local"
      ? process.env.REACT_APP_LOCAL_SERVER.slice(0,-3)
      : process.env.REACT_APP_SERVER.slice(0, -3),
};
export default config;
