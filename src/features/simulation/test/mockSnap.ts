export const MOCK_SNAP_SOURCE = `
module.exports.onRpcRequest = ({ request }) => {
  console.log("Hello, world!");

  const { method, id } = request;
  return method + id;
};
`;