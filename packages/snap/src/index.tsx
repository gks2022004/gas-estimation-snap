import type { OnRpcRequestHandler } from '@metamask/snaps-sdk';
import { Box, Text, Copyable, Bold } from '@metamask/snaps-sdk/jsx';

/**
 * Fetch current gas fees from BeaconChain's API.
 *
 * @returns A promise that resolves with the gas fees data as a string.
 */
async function getFees(): Promise<string> {
  const response = await fetch('https://beaconcha.in/api/v1/execution/gasnow');
  if (!response.ok) {
    throw new Error(`Failed to fetch gas fees: ${response.statusText}`);
  }
  const data = await response.json();
  return JSON.stringify(data, null, 2); // Format JSON into a readable string.
}

/**
 * Handle incoming JSON-RPC requests sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args.
 * @param args.origin - The origin of the request, e.g., the website that invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  switch (request.method) {
    case 'hello': {
      // Wrapping the block in curly braces to scope variables.
      const fees = await getFees();
      return await snap.request({
        method: 'snap_dialog',
        params: {
          type: 'alert',
          content: (
            <Box>
              <Text>
                Hello, <Bold>{origin}</Bold>!
              </Text>
              <Text>Current gas fee estimates:</Text>
              <Copyable value={fees} />
            </Box>
          ),
        },
      });
    }
    default:
      throw new Error('Method not found.');
  }
};
