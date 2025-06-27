import { useMemo } from "react";
import { useReadContract, useReadContracts } from "wagmi";
import { useAccount } from "wagmi";
import nftAbi from "@/config/abis/nft";
import tokenAbi from "@/config/abis/token";

// Example 1: Basic multicall for multiple contracts
export function useBasicMulticall() {
  const { address } = useAccount();

  const contracts = useMemo(
    () => [
      {
        address: "0x1234567890123456789012345678901234567890" as `0x${string}`,
        abi: tokenAbi as any,
        functionName: "balanceOf",
        args: [address as `0x${string}`]
      },
      {
        address: "0x0987654321098765432109876543210987654321" as `0x${string}`,
        abi: tokenAbi as any,
        functionName: "balanceOf",
        args: [address as `0x${string}`]
      }
    ],
    [address]
  );

  const { data: results, isLoading } = useReadContracts({
    contracts,
    query: {
      enabled: !!address
    }
  });

  return { results, isLoading };
}

// Example 2: Multicall for batch reading same contract with different parameters
export function useBatchReadSameContract() {
  const { address } = useAccount();

  const contracts = useMemo(() => {
    if (!address) return [];

    // Read multiple token balances from the same contract
    return [
      {
        address: "0x1234567890123456789012345678901234567890" as `0x${string}`,
        abi: tokenAbi as any,
        functionName: "balanceOf",
        args: [address as `0x${string}`]
      },
      {
        address: "0x1234567890123456789012345678901234567890" as `0x${string}`,
        abi: tokenAbi as any,
        functionName: "totalSupply"
      },
      {
        address: "0x1234567890123456789012345678901234567890" as `0x${string}`,
        abi: tokenAbi as any,
        functionName: "name"
      },
      {
        address: "0x1234567890123456789012345678901234567890" as `0x${string}`,
        abi: tokenAbi as any,
        functionName: "symbol"
      }
    ];
  }, [address]);

  const { data: results, isLoading } = useReadContracts({
    contracts,
    query: {
      enabled: contracts.length > 0
    }
  });

  return { results, isLoading };
}

// Example 3: Dynamic multicall based on user input
export function useDynamicMulticall(
  tokenIds: number[],
  contractAddress: string
) {
  const contracts = useMemo(() => {
    if (!tokenIds.length || !contractAddress) return [];

    return tokenIds.map((tokenId) => ({
      address: contractAddress as `0x${string}`,
      abi: nftAbi as any,
      functionName: "ownerOf",
      args: [BigInt(tokenId)]
    }));
  }, [tokenIds, contractAddress]);

  const { data: results, isLoading } = useReadContracts({
    contracts,
    query: {
      enabled: contracts.length > 0
    }
  });

  return { results, isLoading };
}

// Example 4: Multicall with error handling
export function useMulticallWithErrorHandling() {
  const { address } = useAccount();

  const contracts = useMemo(
    () => [
      {
        address: "0x1234567890123456789012345678901234567890" as `0x${string}`,
        abi: tokenAbi as any,
        functionName: "balanceOf",
        args: [address as `0x${string}`]
      },
      {
        address: "0x1234567890123456789012345678901234567890" as `0x${string}`,
        abi: tokenAbi as any,
        functionName: "totalSupply"
      }
    ],
    [address]
  );

  const {
    data: results,
    isLoading,
    error
  } = useReadContracts({
    contracts,
    query: {
      enabled: !!address,
      retry: 3,
      retryDelay: 1000
    }
  });

  // Process results with error handling
  const processedResults = useMemo(() => {
    if (!results) return null;

    return results.map((result, index) => {
      if (result.status === "success") {
        return {
          index,
          data: result.result,
          error: null
        };
      } else {
        return {
          index,
          data: null,
          error: result.error
        };
      }
    });
  }, [results]);

  return { results: processedResults, isLoading, error };
}

// Example 5: Conditional multicall
export function useConditionalMulticall(
  shouldFetch: boolean,
  contractAddress: string
) {
  const { address } = useAccount();

  const contracts = useMemo(() => {
    if (!shouldFetch || !address || !contractAddress) return [];

    return [
      {
        address: contractAddress as `0x${string}`,
        abi: tokenAbi as any,
        functionName: "balanceOf",
        args: [address as `0x${string}`]
      },
      {
        address: contractAddress as `0x${string}`,
        abi: tokenAbi as any,
        functionName: "totalSupply"
      }
    ];
  }, [shouldFetch, address, contractAddress]);

  const { data: results, isLoading } = useReadContracts({
    contracts,
    query: {
      enabled: contracts.length > 0
    }
  });

  return { results, isLoading };
}

// Example 6: Multicall with different function names
export function useMixedFunctionMulticall() {
  const { address } = useAccount();

  const contracts = useMemo(
    () => [
      {
        address: "0x1234567890123456789012345678901234567890" as `0x${string}`,
        abi: tokenAbi as any,
        functionName: "balanceOf",
        args: [address as `0x${string}`]
      },
      {
        address: "0x0987654321098765432109876543210987654321" as `0x${string}`,
        abi: nftAbi as any,
        functionName: "currentSupply"
      },
      {
        address: "0x1111111111111111111111111111111111111111" as `0x${string}`,
        abi: tokenAbi as any,
        functionName: "decimals"
      }
    ],
    [address]
  );

  const { data: results, isLoading } = useReadContracts({
    contracts,
    query: {
      enabled: !!address
    }
  });

  return { results, isLoading };
}
